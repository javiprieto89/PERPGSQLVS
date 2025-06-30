# app/main.py
# Ruta: app/main.py
#====================== VIEJO ======================

#import os
#from dotenv import load_dotenv
#from strawberry.asgi import GraphQL
#from app.graphql.schema import schema
#from app.db import Base, engine

# --- Cargar variables de entorno ---
#load_dotenv()

# --- Crear tablas en la base de datos ---
#Base.metadata.create_all(bind=engine)

# --- Instanciar la app de GraphQL ---
#app = GraphQL(schema)

#====================== VIEJO ======================
#====================== NUEVO ======================
# app/main.py
import os
import time
import logging
from dotenv import load_dotenv
from starlette.applications import Starlette
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.gzip import GZipMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.routing import Route, Mount
from strawberry.asgi import GraphQL

from app.graphql.schema import schema
from app.db import Base, engine

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
        request_counts[client_ip] = [t for t in timestamps if current_time - t < 60]

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
        logger.info(f"[REQUEST] {request.method} {request.url.path}")

        response = await call_next(request)

        process_time = time.time() - start_time
        response.headers["X-Process-Time"] = str(process_time)

        status_emoji = "[OK]" if response.status_code < 400 else "[ERROR]"
        logger.info(f"{status_emoji} {response.status_code} - {process_time:.3f}s")

        return response

# =======================
# Middleware para agregar user a GraphQL context
# =======================
class GraphQLContextMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.url.path.startswith("/graphql"):
            from app.auth import get_user_model
            from app.db import get_db

            user = None
            auth_header = request.headers.get("Authorization")
            if auth_header and auth_header.startswith("Bearer "):
                token = auth_header.split(" ")[1]
                db = next(get_db())
                try:
                    user = get_user_model(token, db)
                except Exception:
                    pass
                finally:
                    db.close()

            request.state.user = user
            request.state.start_time = time.time()

        return await call_next(request)

# =======================
# Rutas HTTP simples
# =======================
async def health_check(request: Request):
    return JSONResponse({
        "status": "healthy",
        "timestamp": time.time(),
        "version": "1.0.0"
    })

async def get_metrics(request: Request):
    total_requests = sum(len(timestamps) for timestamps in request_counts.values())
    return JSONResponse({
        "active_connections": len(request_counts),
        "total_requests_last_minute": total_requests
    })

async def root(request: Request):
    return JSONResponse({
        "message": "LubricentroDB API v1.0",
        "graphql_endpoint": "/graphql",
        "health": "/health",
        "metrics": "/metrics",
        "features": [
            "GraphQL con resolvers",
            "Autenticación JWT",
            "Rate limiting",
            "Métricas de performance"
        ]
    })

# =======================
# GraphQL app
# =======================
graphql_app = GraphQL(schema)

# =======================
# App final Starlette
# =======================
app = Starlette(
    routes=[
        Route("/", root),
        Route("/health", health_check),
        Route("/metrics", get_metrics),
        Mount("/graphql", graphql_app),
    ],
)

# Middlewares globales
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(RateLimitMiddleware)
app.add_middleware(ProcessTimeMiddleware)
app.add_middleware(GraphQLContextMiddleware)

#====================== NUEVO ======================
