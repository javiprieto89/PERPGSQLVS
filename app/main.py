# app/main.py
import json
import os
import time
import logging
from typing import Any, Union
from starlette.applications import Starlette
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.responses import Response
from starlette import status
from starlette.websockets import WebSocket
from dataclasses import asdict
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.gzip import GZipMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.routing import Route, Mount
from strawberry.asgi import GraphQL
from app.config import settings
from app.auth import (
    get_userinfo_from_token,
    create_user_token,
    decode_token,
    AuthenticationError,
    get_user_model,
    get_active_session_by_token,
    list_sessions_for_user,
    revoke_session,
    generate_refresh_token,
    calculate_refresh_expiration,
    get_primary_permission_ids,
)
from datetime import datetime, timezone
from app.graphql.context import GraphQLRequestContext
from app.graphql.schema import schema
from app.db import Base, engine, SessionLocal
from app.models.sessions import Sessions
from app.security.geoip import CountryAllowlistMiddleware, DEBUG_ENDPOINT_ENABLED, geoip_debug
from dotenv import load_dotenv
# Cargar variables de entorno
load_dotenv()


PUBLIC_GRAPHQL_OPERATIONS = {"login", "instropectionquery"}
ALLOWED_METRICS_IPS = {"127.0.0.1", "localhost", "::1"}


def _is_public_graphql_request(body: bytes | bytearray | str | None) -> bool:
    """Detecta si la petición GraphQL es pública (no requiere autenticación)."""
    if not body:
        return False
    if isinstance(body, (bytes, bytearray)):
        try:
            body = body.decode("utf-8")
        except UnicodeDecodeError:
            return False
    try:
        payload = json.loads(body)
    except (ValueError, TypeError):
        return False

    if not isinstance(payload, dict):
        return False

    op_name = payload.get("operationName")
    if isinstance(op_name, str) and op_name.lower() in PUBLIC_GRAPHQL_OPERATIONS:
        return True

    query = payload.get("query")
    if isinstance(query, str):
        lowered = query.lower()
        if "__schema" in lowered or "__type" in lowered:
            return True
        return any(name in lowered for name in PUBLIC_GRAPHQL_OPERATIONS)

    return False


# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# Crear tablas si estamos en desarrollo
if os.getenv("ENVIRONMENT") == "development":
    Base.metadata.create_all(bind=engine)
    logger.info("[DATABASE] Tablas de base de datos verificadas")

# =======================
# Rate limiting básico
# =======================
request_counts = {}


class RateLimitMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        client_ip = request.client.host if request.client else "unknown"
        current_time = time.time()

        # Limpiar timestamps viejos (>1 min)
        timestamps = request_counts.get(client_ip, [])
        request_counts[client_ip] = [
            t for t in timestamps if current_time - t < 60]

        if len(request_counts[client_ip]) >= 100:
            return JSONResponse({"detail": "Rate limit exceeded"}, status_code=429)

        request_counts[client_ip].append(current_time)
        return await call_next(request)

# =======================
# Middleware de tiempo de procesamiento
# =======================


class ProcessTimeMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        ip = request.client.host if request.client else "unknown"
        start_timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        logger.info(
            f"[{start_timestamp}] [FROM {ip}] {request.method} {request.url.path}")

        response = await call_next(request)

        process_time = time.time() - start_time
        end_timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        response.headers["X-Process-Time"] = str(process_time)

        status_emoji = "[OK]" if response.status_code < 400 else "[ERROR]"
        logger.info(
            f"[{end_timestamp}] {status_emoji} {response.status_code} - {process_time:.3f}s")

        return response

# =======================
# Middleware para agregar user a GraphQL context
# =======================


class GraphQLContextMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.url.path.startswith("/graphql"):
            auth_header = request.headers.get("Authorization")
            accepts_html = "text/html" in request.headers.get("accept", "")
            is_graphiql_get = request.method == "GET" and accepts_html
            is_preflight = request.method == "OPTIONS"
            payload = None
            user = None
            token = None
            allow_unauthenticated = False

            if auth_header and auth_header.startswith("Bearer "):
                token = auth_header.split(" ", 1)[1]
                try:
                    payload = decode_token(token)
                    user = get_userinfo_from_token(token)
                except AuthenticationError:
                    return JSONResponse({"detail": "Token inválido"}, status_code=401)
                if user is None:
                    return JSONResponse({"detail": "Token inválido"}, status_code=401)
            else:
                if is_graphiql_get or is_preflight:
                    allow_unauthenticated = True
                else:
                    body = await request.body()
                    request._body = body
                    if not _is_public_graphql_request(body):
                        return JSONResponse({"detail": "Token de autorización requerido"}, status_code=401)
                    allow_unauthenticated = True

            request.state.user = user
            request.state.token = token
            request.state.token_payload = payload
            request.state.allow_unauthenticated = allow_unauthenticated
            request.state.start_time = time.time()

        return await call_next(request)

# =======================
# Rutas HTTP simples
# =======================


async def health_check(request: Request):
    return JSONResponse({"status": "healthy"})
"""     return JSONResponse({
        "status": "healthy",
        "timestamp": time.time(),
        "version": "1.0.0",
        "graphql_endpoint": "/graphql/"
    }) """


""" async def get_metrics(request: Request):
    client_ip = request.client.host if request.client else None
    if client_ip not in ALLOWED_METRICS_IPS:
        return JSONResponse({"detail": "No autorizado"}, status_code=status.HTTP_403_FORBIDDEN)

    total_requests = sum(len(timestamps)
                         for timestamps in request_counts.values())
    return JSONResponse({
        "active_connections": len(request_counts),
        "total_requests_last_minute": total_requests
    }) """


async def get_metrics(request: Request):
    # 1) Filtro por IP (rápido)
    client_ip = request.client.host if request.client else None
    if client_ip not in ALLOWED_METRICS_IPS:
        return JSONResponse({"detail": "No autorizado (IP)"}, status_code=status.HTTP_403_FORBIDDEN)

    # 2) (Opcional) Filtro por País si METRICS_REQUIRE_COUNTRY=true
    if os.getenv("METRICS_REQUIRE_COUNTRY", "false").lower() == "true":
        # Reutilizamos el mismo mecanismo del middleware pero inline:
        from app.security.geoip import _ip_country, ALLOWED_COUNTRIES
        if ALLOWED_COUNTRIES:
            code = _ip_country(request)
            if not code or code not in ALLOWED_COUNTRIES:
                return JSONResponse({"detail": "No autorizado (País)"}, status_code=status.HTTP_403_FORBIDDEN)

    total_requests = sum(len(timestamps)
                         for timestamps in request_counts.values())
    return JSONResponse({
        "active_connections": len(request_counts),
        "total_requests_last_minute": total_requests
    })


async def root(request: Request):
    return JSONResponse({"status": "ok"})
    """ return JSONResponse({
        "message": "LubricentroDB API v1.0",
        "graphql_endpoint": "/graphql/",
        "health": "/health",
        "metrics": "/metrics",
        "login": "/login",
        "logout": "/logout",
        "refresh": "/auth/refresh",
        "sessions": "/sessions",
        "revoke": "/auth/revoke",
        "features": [
            "GraphQL con resolvers",
            "Autenticación JWT",
            "Rate limiting",
            "Métricas de performance"
        ]
    }) """

# =======================
# Endpoints REST adicionales
# =======================


def _extract_bearer_token(request: Request) -> str | None:
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return None
    return auth_header.split(" ", 1)[1].strip() or None


def _normalize_datetime(dt: datetime | None) -> datetime | None:
    if dt is None:
        return None
    if dt.tzinfo is None:
        return dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(timezone.utc)


def _serialize_session(session) -> dict:
    now = datetime.now(timezone.utc)

    created_at = _normalize_datetime(session.CreatedAt)
    last_seen_at = _normalize_datetime(session.LastSeenAt)
    expires_at = _normalize_datetime(session.ExpiresAt)
    revoked_at = _normalize_datetime(session.RevokedAt)

    def _iso(value):
        return value.isoformat() if value else None

    return {
        "sessionId": session.SessionID,
        "userId": session.UserID,
        "isRevoked": bool(session.IsRevoked),
        "isActive": bool(not session.IsRevoked and expires_at and expires_at > now),
        "createdAt": _iso(created_at),
        "lastSeenAt": _iso(last_seen_at),
        "expiresAt": _iso(expires_at),
        "revokedAt": _iso(revoked_at),
        "revokedByUserId": session.RevokedByUserID,
        "revokeReason": session.RevokeReason,
        "clientIp": session.ClientIP,
        "clientHost": session.ClientHost,
        "requestHost": session.RequestHost,
        "userAgent": session.UserAgent,
    }


def _user_info_to_dict(user_info: Any) -> Any:
    if user_info is None:
        return None
    perms = []
    for perm in getattr(user_info, "UserPermissions", []) or []:
        perms.append(
            {
                "UserID": getattr(perm, "UserID", None),
                "CompanyID": getattr(perm, "CompanyID", None),
                "CompanyName": getattr(perm, "CompanyName", None),
                "BranchID": getattr(perm, "BranchID", None),
                "BranchName": getattr(perm, "BranchName", None),
                "RoleID": getattr(perm, "RoleID", None),
                "RoleName": getattr(perm, "RoleName", None),
            }
        )
    return {
        "UserID": getattr(user_info, "UserID", None),
        "Nickname": getattr(user_info, "Nickname", None),
        "FullName": getattr(user_info, "FullName", None),
        "IsActive": getattr(user_info, "IsActive", None),
        "IsFullAdmin": getattr(user_info, "IsFullAdmin", None),
        "UserPermissions": perms,
    }


def _extract_access_token(input_payload: Any) -> str | None:
    if isinstance(input_payload, dict):
        value = input_payload.get("token")
        if isinstance(value, str) and value:
            return value
        for nested in input_payload.values():
            token = _extract_access_token(nested)
            if token:
                return token
    elif isinstance(input_payload, list):
        for item in input_payload:
            token = _extract_access_token(item)
            if token:
                return token
    return None


def _extract_refresh_token(input_payload: Any) -> str | None:
    """Busca recursivamente refreshToken en un payload arbitrario."""
    if isinstance(input_payload, dict):
        value = input_payload.get("refreshToken")
        if isinstance(value, str) and value:
            return value
        for nested in input_payload.values():
            token = _extract_refresh_token(nested)
            if token:
                return token
    elif isinstance(input_payload, list):
        for item in input_payload:
            token = _extract_refresh_token(item)
            if token:
                return token
    return None


async def refresh_access_token(request: Request) -> JSONResponse:
    try:
        payload = await request.json()
    except json.JSONDecodeError:
        return JSONResponse({"detail": "JSON inválido"}, status_code=status.HTTP_400_BAD_REQUEST)

    access_token_in = _extract_access_token(payload)
    refresh_token = _extract_refresh_token(payload)
    if not refresh_token:
        return JSONResponse({"detail": "refreshToken requerido"}, status_code=status.HTTP_400_BAD_REQUEST)

    db = SessionLocal()
    try:
        session = get_active_session_by_token(db, refresh_token)
        if session is None:
            return JSONResponse({"detail": "Refresh token inválido o expirado"}, status_code=status.HTTP_401_UNAUTHORIZED)

        user = session.user
        if user is None or not getattr(user, "IsActive", False):
            return JSONResponse({"detail": "Usuario inválido o inactivo"}, status_code=status.HTTP_401_UNAUTHORIZED)

        company_id, branch_id, role_id = get_primary_permission_ids(user)
        new_refresh_token = generate_refresh_token()
        new_refresh_expires = calculate_refresh_expiration()

        access_token = create_user_token(
            user,
            company_id=company_id,
            branch_id=branch_id,
            role_id=role_id,
            session_id=session.SessionID,
        )
        session.Token = new_refresh_token
        session.ExpiresAt = new_refresh_expires
        session.LastSeenAt = datetime.now(timezone.utc)
        db.add(session)
        db.commit()
        db.refresh(session)

        user_info = get_userinfo_from_token(access_token)
        user_payload = _user_info_to_dict(user_info)

        return JSONResponse({
            "success": True,
            "message": "Token refrescado",
            "token": access_token,
            "refreshToken": new_refresh_token,
            "refreshExpiresAt": session.ExpiresAt.isoformat(),
            "sessionId": session.SessionID,
            "user": user_payload,
        })
    except Exception:
        logger.exception("Error al refrescar token")
        db.rollback()
        return JSONResponse({"detail": "Error interno al refrescar token"}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    finally:
        db.close()


async def list_sessions_endpoint(request: Request) -> JSONResponse:
    bearer = _extract_bearer_token(request)
    if not bearer:
        return JSONResponse({"detail": "Token de autorización requerido"}, status_code=status.HTTP_401_UNAUTHORIZED)

    db = SessionLocal()
    try:
        try:
            user = get_user_model(bearer, db)
        except AuthenticationError:
            return JSONResponse({"detail": "Token inválido"}, status_code=status.HTTP_401_UNAUTHORIZED)

        include_all = bool(getattr(user, "IsFullAdmin", False))
        sessions = list_sessions_for_user(db, user, include_all=include_all)
        return JSONResponse({"sessions": [_serialize_session(s) for s in sessions]})
    except Exception:
        logger.exception("Error listando sesiones")
        db.rollback()
        return JSONResponse({"detail": "Error interno listando sesiones"}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    finally:
        db.close()


async def revoke_session_endpoint(request: Request) -> JSONResponse:
    bearer = _extract_bearer_token(request)
    if not bearer:
        return JSONResponse({"detail": "Token de autorización requerido"}, status_code=status.HTTP_401_UNAUTHORIZED)

    try:
        payload = await request.json()
    except json.JSONDecodeError:
        return JSONResponse({"detail": "JSON inválido"}, status_code=status.HTTP_400_BAD_REQUEST)

    session_id = payload.get("sessionId")
    reason = payload.get("reason")

    if session_id is None:
        return JSONResponse({"detail": "sessionId requerido"}, status_code=status.HTTP_400_BAD_REQUEST)

    db = SessionLocal()
    try:
        try:
            user = get_user_model(bearer, db)
        except AuthenticationError:
            return JSONResponse({"detail": "Token inválido"}, status_code=status.HTTP_401_UNAUTHORIZED)

        session = db.query(Sessions).filter(
            Sessions.SessionID == session_id).first()
        if session is None:
            return JSONResponse({"detail": "Sesión no encontrada"}, status_code=status.HTTP_404_NOT_FOUND)

        if not getattr(user, "IsFullAdmin", False) and session.UserID != user.UserID:
            return JSONResponse({"detail": "No autorizado"}, status_code=status.HTTP_403_FORBIDDEN)

        updated = revoke_session(
            db,
            session,
            revoked_by_user_id=user.UserID,
            reason=reason,
        )

        return JSONResponse({
            "detail": "Sesión revocada",
            "session": _serialize_session(updated),
        })
    except Exception:
        logger.exception("Error revocando sesión")
        db.rollback()
        return JSONResponse({"detail": "Error interno revocando sesión"}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    finally:
        db.close()


async def logout(request: Request) -> JSONResponse:
    bearer = _extract_bearer_token(request)
    if not bearer:
        return JSONResponse({"detail": "Token de autorización requerido"}, status_code=status.HTTP_401_UNAUTHORIZED)

    try:
        payload = decode_token(bearer)
    except AuthenticationError:
        return JSONResponse({"detail": "Token inválido"}, status_code=status.HTTP_401_UNAUTHORIZED)

    session_id = payload.get("SessionID")
    if session_id is None:
        return JSONResponse(
            {"detail": "Sesión actual no identificada"},
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    db = SessionLocal()
    try:
        try:
            user = get_user_model(bearer, db)
        except AuthenticationError:
            return JSONResponse({"detail": "Token inválido"}, status_code=status.HTTP_401_UNAUTHORIZED)

        session = db.query(Sessions).filter(
            Sessions.SessionID == session_id).first()
        if session is None:
            return JSONResponse({"detail": "Sesión no encontrada"}, status_code=status.HTTP_404_NOT_FOUND)

        if session.UserID != user.UserID:
            return JSONResponse({"detail": "No autorizado"}, status_code=status.HTTP_403_FORBIDDEN)

        updated = revoke_session(
            db,
            session,
            revoked_by_user_id=user.UserID,
            reason="User logged out",
        )

        return JSONResponse(
            {
                "detail": "Sesión cerrada",
                "session": _serialize_session(updated),
            }
        )
    except Exception:
        logger.exception("Error cerrando sesión")
        db.rollback()
        return JSONResponse({"detail": "Error interno cerrando sesión"}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    finally:
        db.close()

# Endpoint de diagnóstico sin _FakeReq (compatible con Pylance)


# =======================
# GraphQL app
# =======================


class LubricentroGraphQL(GraphQL[GraphQLRequestContext, None]):
    async def get_context(
        self,
        request: Union[Request, WebSocket],
        response: Union[Response, WebSocket],
    ) -> GraphQLRequestContext:
        state = getattr(request, "state", None)
        user = getattr(state, "user", None) if state else None
        token = getattr(state, "token", None) if state else None
        payload = getattr(state, "token_payload", None) if state else None
        allow_unauthenticated = getattr(
            state, "allow_unauthenticated", False) if state else False
        return GraphQLRequestContext(
            request=request,
            user=user,
            token=token,
            token_payload=payload,
            allow_unauthenticated=allow_unauthenticated,
        )


graphql_app = LubricentroGraphQL(
    schema,
    graphiql=settings.ENVIRONMENT.lower() not in {"prod", "production"}
)

# =======================
# App final Starlette
# =======================
app = Starlette(
    routes=[
        Route("/", root),
        Route("/health", health_check),
        Route("/metrics", get_metrics),
        Route("/auth/refresh", refresh_access_token, methods=["POST"]),
        Route("/sessions", list_sessions_endpoint, methods=["GET"]),
        Route("/auth/revoke", revoke_session_endpoint, methods=["POST"]),
        Route("/logout", logout, methods=["POST"]),
        Mount("/graphql/", graphql_app),  # Con barra al final
        Mount("/graphql", graphql_app),   # Sin barra (compatibilidad)
    ],
)
if os.getenv("ENVIRONMENT") == "dev" and DEBUG_ENDPOINT_ENABLED:
    app.add_route("/debug/geoip", geoip_debug)

# 1) GeoIP país (protege /graphql* y /metrics)
raw_protected = os.getenv("GEOIP_PROTECTED_PATHS", "/graphql*,/metrics")
paths = {p.strip() for p in raw_protected.split(",") if p.strip()}

app.add_middleware(
    CountryAllowlistMiddleware,
    paths_protected=paths,
    # fail_closed=True,  # si no puede determinar país => 403
)

# 2) Middlewares globales
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "http://computron.selfip.com:5173",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
    allow_origin_regex=r"https?://127.0.0.1(:\d+)?"
)
# 3) GZip (si tamaño respuesta > umbral)
app.add_middleware(GZipMiddleware, minimum_size=1000)
# 4) Logging detallado de requests y tiempos
app.add_middleware(ProcessTimeMiddleware)
# 5) Rate limiting básico
app.add_middleware(RateLimitMiddleware)
# 6) Contexto GraphQL (user, token, etc)
app.add_middleware(GraphQLContextMiddleware)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
