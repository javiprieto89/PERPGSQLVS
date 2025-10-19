# app/security/geoip.py
# -*- coding: utf-8 -*-
import os
import ipaddress
import logging
from pathlib import Path
from typing import Optional, Set, Any
from starlette.requests import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
from starlette import status

logger = logging.getLogger(__name__)

# ===========================
# Config (env)
# ===========================
ENABLE_GEOIP: bool = os.getenv("ENABLE_GEOIP", "true").lower() == "true"
USE_CF_IPCOUNTRY: bool = os.getenv(
    "USE_CF_IPCOUNTRY", "false").lower() == "true"
TRUST_XFF: bool = os.getenv("TRUST_X_FORWARDED_FOR", "true").lower() == "true"
TRUSTED_PROXY_IPS: Set[str] = {ip.strip() for ip in os.getenv(
    "TRUSTED_PROXY_IPS", "127.0.0.1,::1").split(",") if ip.strip()}
GEOIP_FAIL_CLOSED: bool = os.getenv(
    "GEOIP_FAIL_CLOSED", "true").lower() == "true"

ALLOWED_COUNTRIES: Set[str] = {c.strip().upper() for c in os.getenv(
    "ALLOWED_COUNTRIES", "").split(",") if c.strip()}

# Debug endpoint flags (ahora viven acá)
DEBUG_ENDPOINT_ENABLED: bool = os.getenv(
    "DEBUG_ENDPOINT_ENABLED", "false").lower() == "true"
DEBUG_ENDPOINT_TOKEN: str = os.getenv("DEBUG_ENDPOINT_TOKEN", "").strip()

GEOIP_READER: Optional[Any] = None


# ===========================
# Path resolve (.mmdb)
# ===========================
def _resolve_geoip_path() -> Optional[Path]:
    env_val = os.getenv("GEOIP_DB_PATH", "").strip().strip('"').strip("'")
    candidates: list[Path] = []
    if env_val:
        p = Path(env_val.replace("\\", "/"))
        if p.is_absolute():
            candidates.append(p)
        else:
            candidates.append(Path.cwd() / p)
            candidates.append(Path(__file__).resolve().parents[1] / p)
            candidates.append(Path(__file__).resolve().parent / p)
    else:
        candidates.append(Path(__file__).resolve().parent /
                          "GeoLite2-Country.mmdb")
        candidates.append(Path(__file__).resolve(
        ).parents[1] / "security/GeoLite2-Country.mmdb")
    for c in candidates:
        if c.is_file():
            return c
    logger.error("[GEOIP] No se encontró el .mmdb. Intentos: %s", candidates)
    return None


def _maybe_init_reader() -> None:
    global GEOIP_READER
    if USE_CF_IPCOUNTRY or not ENABLE_GEOIP or GEOIP_READER is not None:
        return
    mmdb_path = _resolve_geoip_path()
    if not mmdb_path:
        return
    try:
        from geoip2.database import Reader  # type: ignore
        GEOIP_READER = Reader(str(mmdb_path))
        logger.info(f"[GEOIP] Cargado GeoLite2 desde {mmdb_path}")
    except Exception as ex:
        logger.exception(f"[GEOIP] Error cargando base GeoLite2: {ex}")
        GEOIP_READER = None


# ===========================
# Helpers IP / Country
# ===========================
def _parse_ip(s: str) -> Optional[str]:
    try:
        return ipaddress.ip_address(s.strip()).compressed
    except Exception:
        return None


def _is_private_or_loopback(ip_str: str) -> bool:
    try:
        ip = ipaddress.ip_address(ip_str)
        return ip.is_private or ip.is_loopback or ip.is_link_local
    except ValueError:
        return False


def _client_ip(req: Request) -> str:
    cf_ip = req.headers.get("cf-connecting-ip")
    if cf_ip:
        ip = _parse_ip(cf_ip)
        if ip:
            return ip

    peer_ip = req.client.host if req.client else "127.0.0.1"

    if TRUST_XFF and peer_ip in TRUSTED_PROXY_IPS:
        xff = req.headers.get("x-forwarded-for")
        if xff:
            first = (xff.split(",")[0] or "").strip()
            ip = _parse_ip(first)
            # ignorar XFF privados/loopback
            if ip and not _is_private_or_loopback(ip):
                return ip

    xri = req.headers.get("x-real-ip")
    if xri:
        ip = _parse_ip(xri)
        if ip and not _is_private_or_loopback(ip):
            return ip

    return peer_ip


def _ip_country_from_headers(req: Request) -> Optional[str]:
    code = req.headers.get("cf-ipcountry")
    return code.upper() if code else None


def country_from_ip(ip: str) -> Optional[str]:
    """Resuelve país (ISO-3166 alpha-2) a partir de una IP textual, sin Request."""
    if not ENABLE_GEOIP:
        return None
    _maybe_init_reader()
    if GEOIP_READER is None:
        return None
    norm = _parse_ip(ip)
    if not norm:
        return None
    try:
        rec = GEOIP_READER.country(norm)  # type: ignore[attr-defined]
        code = getattr(getattr(rec, "country", None), "iso_code", None)
        return code.upper() if isinstance(code, str) else None
    except Exception:
        return None


def _ip_country(req: Request) -> Optional[str]:
    if USE_CF_IPCOUNTRY:
        return _ip_country_from_headers(req)
    _maybe_init_reader()
    if GEOIP_READER is None:
        return None
    ip = _client_ip(req)
    try:
        rec = GEOIP_READER.country(ip)  # type: ignore[attr-defined]
        code = getattr(getattr(rec, "country", None), "iso_code", None)
        return code.upper() if isinstance(code, str) else None
    except Exception:
        return None


# ===========================
# Middleware
# ===========================
class CountryAllowlistMiddleware(BaseHTTPMiddleware):
    """
    Aplica allowlist de países a rutas dadas.
    Bypass permitido: *solo loopback* (127.0.0.1 / ::1) para desarrollo local.
    """

    def __init__(self, app, paths_protected: Optional[Set[str]] = None, fail_closed: Optional[bool] = None):
        super().__init__(app)
        self.paths: Set[str] = paths_protected or set()
        self.fail_closed: bool = GEOIP_FAIL_CLOSED if fail_closed is None else fail_closed

    def _is_protected(self, path: str) -> bool:
        if path in self.paths:
            return True
        for p in self.paths:
            if p.endswith("*") and path.startswith(p[:-1]):
                return True
        return False

    async def dispatch(self, request: Request, call_next):
        if not ENABLE_GEOIP or not ALLOWED_COUNTRIES:
            return await call_next(request)

        if self._is_protected(request.url.path):
            client_ip = _client_ip(request)

            # único bypass: loopback/localhost (para GraphiQL/health locales)
            try:
                if ipaddress.ip_address(client_ip).is_loopback:
                    return await call_next(request)
            except ValueError:
                pass

            code = _ip_country(request)

            if not code:
                if self.fail_closed:
                    return JSONResponse({"detail": "Acceso denegado"}, status_code=status.HTTP_403_FORBIDDEN)
                return await call_next(request)

            if code not in ALLOWED_COUNTRIES:
                return JSONResponse({"detail": "Acceso denegado"}, status_code=status.HTTP_403_FORBIDDEN)

        return await call_next(request)


# ===========================
# Debug endpoint (opcional)
# ===========================
async def _ensure_debug_access(request: Request):
    """403 salvo que la llamada sea local/privada y (si hay) traiga el token correcto."""
    client_ip = request.client.host if request.client else "127.0.0.1"
    if not _is_private_or_loopback(client_ip):
        return JSONResponse({"detail": "Forbidden"}, status_code=403)
    if DEBUG_ENDPOINT_TOKEN:
        sent = request.headers.get("x-debug-token", "")
        if sent != DEBUG_ENDPOINT_TOKEN:
            return JSONResponse({"detail": "Forbidden"}, status_code=403)
    return None


async def geoip_debug(request: Request):
    """
    GET /debug/geoip?ip=<IPv4/IPv6>
    - Usa exclusivamente el parámetro 'ip' para resolver país.
    - No inspecciona cabeceras ni el peer del socket.
    """
    denied = await _ensure_debug_access(request)
    if denied:
        return denied

    ip_param = request.query_params.get("ip")
    if not ip_param:
        return JSONResponse({"detail": "Falta parámetro 'ip'"}, status_code=400)

    code = country_from_ip(ip_param)
    return JSONResponse({
        "ip_tested": ip_param,
        "country_detected": code,
        "geoip_db_path": os.getenv("GEOIP_DB_PATH"),
    })
