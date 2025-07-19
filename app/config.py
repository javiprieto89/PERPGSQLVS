# app/config.py
# import os
# from pydantic_settings import BaseSettings
# from dotenv import load_dotenv

# load_dotenv()  # Carga variables desde un .env si existe


# class Settings(BaseSettings):
#     SECRET_KEY: str = os.getenv("SECRET_KEY", "lvCExuRie_iGmnAcbsyvMODcNWbPuFOmTmHGo77t4rE")
#     ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
#     ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
#         os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 300)
#     )


# settings = Settings()
#------------------------------------
# app/config.py
import os
from typing import List, Optional
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    # Base de datos
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "mssql+pyodbc://sa:Ladeda78@127.0.0.1/LubricentroDB2?driver=ODBC+Driver+17+for+SQL+Server"
    )
    
    # JWT
    SECRET_KEY: str = os.getenv("SECRET_KEY", "changeme-in-production")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "300"))
    
    # CORS
    ALLOWED_ORIGINS: List[str] = os.getenv("ALLOWED_ORIGINS", "*").split(",")
    
    # Cache
    CACHE_TTL_STATIC: int = int(os.getenv("CACHE_TTL_STATIC", "3600"))  # 1 hora
    CACHE_TTL_DYNAMIC: int = int(os.getenv("CACHE_TTL_DYNAMIC", "300"))  # 5 minutos
    CACHE_TTL_USER: int = int(os.getenv("CACHE_TTL_USER", "600"))  # 10 minutos
    
    # Rate limiting
    RATE_LIMIT_REQUESTS: int = int(os.getenv("RATE_LIMIT_REQUESTS", "100"))
    RATE_LIMIT_WINDOW: int = int(os.getenv("RATE_LIMIT_WINDOW", "60"))  # segundos
    
    # Paginación
    DEFAULT_PAGE_SIZE: int = int(os.getenv("DEFAULT_PAGE_SIZE", "25"))
    MAX_PAGE_SIZE: int = int(os.getenv("MAX_PAGE_SIZE", "100"))
    
    # Logs
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    LOG_FORMAT: str = os.getenv("LOG_FORMAT", "%(asctime)s - %(name)s - %(levelname)s - %(message)s")
    
    # Entorno
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"
    
    # Compresión
    GZIP_MINIMUM_SIZE: int = int(os.getenv("GZIP_MINIMUM_SIZE", "1000"))
    
    # Métricas
    ENABLE_METRICS: bool = os.getenv("ENABLE_METRICS", "True").lower() == "true"
    ENABLE_DETAILED_LOGGING: bool = os.getenv("ENABLE_DETAILED_LOGGING", "True").lower() == "true"

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()

# Configuración específica por entorno
if settings.ENVIRONMENT == "production":
    # Configuración de producción
    settings.DEBUG = False
    settings.LOG_LEVEL = "WARNING"
    settings.CACHE_TTL_STATIC = 7200  # 2 horas
    settings.RATE_LIMIT_REQUESTS = 50  # Más restrictivo
    
elif settings.ENVIRONMENT == "testing":
    # Configuración de testing
    settings.CACHE_TTL_STATIC = 60  # Cache corto para tests
    settings.CACHE_TTL_DYNAMIC = 30
    settings.ACCESS_TOKEN_EXPIRE_MINUTES = 60
    
elif settings.ENVIRONMENT == "development":
    # Configuración de desarrollo
    settings.DEBUG = True
    settings.LOG_LEVEL = "DEBUG"
    settings.ENABLE_DETAILED_LOGGING = True