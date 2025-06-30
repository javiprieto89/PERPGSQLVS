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
from dotenv import load_dotenv
from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from strawberry.asgi import GraphQL
from contextlib import asynccontextmanager
import logging

# Importar schema principal
from app.graphql.schema import schema
from app.db import Base, engine
from app.auth import get_current_user

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Cargar variables de entorno
load_dotenv()

# Context manager para startup/shutdown
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Gestión del ciclo de vida de la aplicación"""
    # Startup
    logger.info("[INICIANDO] Iniciando LubricentroDB API...")
    
    # Crear tablas si no existen (solo en desarrollo)
    if os.getenv("ENVIRONMENT") == "development":
        Base.metadata.create_all(bind=engine)
        logger.info("[DATABASE] Tablas de base de datos verificadas")
    
    logger.info("[COMPLETADO] Aplicacion iniciada correctamente")
    
    yield
    
    # Shutdown
    logger.info("[CERRANDO] Cerrando aplicacion...")
    logger.info("[COMPLETADO] Aplicacion cerrada")

# Crear aplicación FastAPI
app = FastAPI(
    title="LubricentroDB API",
    description="API GraphQL para gestión de lubricentros",
    version="1.0.0",
    lifespan=lifespan
)

# Middleware de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especificar dominios exactos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware de compresión
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Middleware personalizado para métricas y logging
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    """Middleware para medir tiempo de respuesta y logging"""
    start_time = time.time()
    
    # Log de request
    logger.info(f"[REQUEST] {request.method} {request.url.path}")
    
    response = await call_next(request)
    
    # Calcular tiempo de procesamiento
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    
    # Log de response
    status_emoji = "[OK]" if response.status_code < 400 else "[ERROR]"
    logger.info(f"{status_emoji} {response.status_code} - {process_time:.3f}s")
    
    return response

# Middleware de rate limiting simple (en producción usar Redis)
request_counts = {}

@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    """Rate limiting básico por IP"""
    client_ip = request.client.host
    current_time = time.time()
    
    # Limpiar contadores antiguos (más de 1 minuto)
    request_counts[client_ip] = [
        timestamp for timestamp in request_counts.get(client_ip, [])
        if current_time - timestamp < 60
    ]
    
    # Verificar límite (100 requests por minuto por IP)
    if len(request_counts.get(client_ip, [])) >= 100:
        raise HTTPException(status_code=429, detail="Rate limit exceeded")
    
    # Agregar timestamp actual
    if client_ip not in request_counts:
        request_counts[client_ip] = []
    request_counts[client_ip].append(current_time)
    
    response = await call_next(request)
    return response

# Dependency para autenticación opcional
async def get_optional_user(request: Request):
    """Obtiene el usuario actual si está autenticado, sino None"""
    try:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]
            # Importar aquí para evitar imports circulares
            from app.db import get_db
            db = next(get_db())
            try:
                from app.auth import get_user_model
                return get_user_model(token, db)
            finally:
                db.close()
        return None
    except:
        return None

# Instanciar aplicación GraphQL directamente sin custom context
graphql_app = GraphQL(schema)

# Rutas GraphQL con middleware personalizado
@app.middleware("http")
async def add_graphql_context(request: Request, call_next):
    """Middleware para agregar context a GraphQL"""
    if request.url.path.startswith("/graphql"):
        user = await get_optional_user(request)
        # Agregar al state del request para que los resolvers puedan accederlo
        request.state.user = user
        request.state.start_time = time.time()
    
    response = await call_next(request)
    return response

# Rutas GraphQL
app.include_router(graphql_app, prefix="/graphql", tags=["GraphQL"])

# Endpoints adicionales para health check y métricas
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "version": "1.0.0"
    }

@app.get("/metrics")
async def get_metrics():
    """Métricas básicas de la aplicación"""
    return {
        "active_connections": len(request_counts),
        "total_requests_last_minute": sum(len(timestamps) for timestamps in request_counts.values())
    }

@app.get("/")
async def root():
    """Endpoint raíz con información de la API"""
    return {
        "message": "LubricentroDB API v1.0",
        "graphql_endpoint": "/graphql",
        "graphql_playground": "/graphql",
        "docs": "/docs",
        "health": "/health",
        "features": [
            "GraphQL con resolvers", 
            "Autenticación JWT",
            "Rate limiting",
            "Métricas de performance"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True,
        log_level="info"
    )
#====================== NUEVO ======================
