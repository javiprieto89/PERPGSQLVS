# app/main.py
import json
import os
import time
import logging
from typing import Union

from dotenv import load_dotenv
from starlette.applications import Starlette
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.responses import Response
from starlette.websockets import WebSocket
from dataclasses import asdict
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.gzip import GZipMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.routing import Route, Mount
from strawberry.asgi import GraphQL
from app.auth import (
    get_userinfo_from_token,
    authenticate_user,
    create_access_token,
    decode_token,
    AuthenticationError,
)
from datetime import datetime

from app.graphql.context import GraphQLRequestContext
from app.graphql.schema import schema
from app.db import Base, engine


PUBLIC_GRAPHQL_OPERATIONS = {"login", "instropectionquery"}


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

# Cargar variables de entorno
load_dotenv()

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
    return JSONResponse({
        "status": "healthy",
        "timestamp": time.time(),
        "version": "1.0.0",
        "graphql_endpoint": "/graphql/"
    })


async def get_metrics(request: Request):
    total_requests = sum(len(timestamps)
                         for timestamps in request_counts.values())
    return JSONResponse({
        "active_connections": len(request_counts),
        "total_requests_last_minute": total_requests
    })


async def root(request: Request):
    return JSONResponse({
        "message": "LubricentroDB API v1.0",
        "graphql_endpoint": "/graphql/",
        "health": "/health",
        "metrics": "/metrics",
        "login": "/login",
        "logout": "/logout",
        "features": [
            "GraphQL con resolvers",
            "Autenticación JWT",
            "Rate limiting",
            "Métricas de performance"
        ]
    })

# =======================
# Endpoints REST adicionales
# =======================

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


graphql_app = LubricentroGraphQL(schema)

# =======================
# App final Starlette
# =======================
app = Starlette(
    routes=[
        Route("/", root),
        Route("/health", health_check),
        Route("/metrics", get_metrics),
        Mount("/graphql/", graphql_app),  # Con barra al final
        Mount("/graphql", graphql_app),   # Sin barra (compatibilidad)
    ],
)

# Middlewares globales
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5173",
        "http://localhost:5173",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
    allow_origin_regex=r"https?://127.0.0.1(:\d+)?"
)
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(ProcessTimeMiddleware)
app.add_middleware(RateLimitMiddleware)
app.add_middleware(GraphQLContextMiddleware)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
