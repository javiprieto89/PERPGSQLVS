# app/config.py
import os
from typing import List, Optional, Union
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv

# Load .env from project root (parent directory)
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env_path = os.path.join(project_root, '.env')
load_dotenv(env_path)


class Settings(BaseSettings):
    # Use the same env_path we calculated above
    model_config = SettingsConfigDict(env_file=env_path, case_sensitive=True)

    # Database configuration components
    DB_USER: str = Field(default="sa")
    DB_PASSWORD: str = Field(default="Ladeda78")
    DB_HOST: str = Field(default="127.0.0.1")
    DB_NAME: str = Field(default="LubricentroDB2")
    DB_DRIVER: str = Field(default="ODBC+Driver+17+for+SQL+Server")
    DB_TRUST_CERTIFICATE: str = Field(default="yes")
    DB_ENCRYPT: str = Field(default="optional")

    # The connection string is auto-built from components above
    # This property will be set programmatically after initialization
    DATABASE_URL: Optional[str] = Field(default=None)

    # JWT
    SECRET_KEY: str = Field(default="changeme-in-production")
    ALGORITHM: str = Field(default="HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(default=300)

    # AFIP Configuration (Argentina Tax Authority)
    AFIP_CUIT: Optional[str] = Field(default=None)
    AFIP_CERT_PATH: Optional[str] = Field(default=None)
    AFIP_CERT_PASSWORD: Optional[str] = Field(default=None)
    AFIP_PRODUCTION: bool = Field(default=False)

    # CORS - Handle comma-separated string
    ALLOWED_ORIGINS: Union[str, List[str]] = Field(
        default="http://localhost:5173,http://localhost:3000")

    @field_validator('ALLOWED_ORIGINS')
    @classmethod
    def parse_origins(cls, v):
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(',') if origin.strip()]
        return v

    # Cache
    CACHE_TTL_STATIC: int = Field(default=3600)  # 1 hora
    CACHE_TTL_DYNAMIC: int = Field(default=300)  # 5 minutos
    CACHE_TTL_USER: int = Field(default=600)  # 10 minutos

    # Rate limiting
    RATE_LIMIT_REQUESTS: int = Field(default=100)
    RATE_LIMIT_WINDOW: int = Field(default=60)  # segundos

    # Paginacion
    DEFAULT_PAGE_SIZE: int = Field(default=25)
    MAX_PAGE_SIZE: int = Field(default=100)

    # Logs
    LOG_LEVEL: str = Field(default="INFO")
    LOG_FORMAT: str = Field(
        default="%(asctime)s - %(name)s - %(levelname)s - %(message)s")

    # Entorno
    ENVIRONMENT: str = Field(default="development")
    DEBUG: bool = Field(default=True)

    # Compresion
    GZIP_MINIMUM_SIZE: int = Field(default=1000)

    # Metricas
    ENABLE_METRICS: bool = Field(default=True)
    ENABLE_DETAILED_LOGGING: bool = Field(default=True)

    # Backwards compatibility property
    @property
    def SQLALCHEMY_DATABASE_URL(self) -> Optional[str]:
        """Backwards compatibility - returns the same as DATABASE_URL"""
        return self.DATABASE_URL


# Crear instancia
settings = Settings()

# Build database URL from components if not already provided
if not settings.DATABASE_URL:
    # Build from individual components with proper encoding
    driver_encoded = settings.DB_DRIVER.replace(" ", "+")
    settings.DATABASE_URL = (
        f"mssql+pyodbc://{settings.DB_USER}:{settings.DB_PASSWORD}@"
        f"{settings.DB_HOST}/{settings.DB_NAME}?"
        f"driver={driver_encoded}"
    )
    print(settings.DATABASE_URL)


# Configuracion especifica por entorno
if settings.ENVIRONMENT == "production":
    # Configuracion de produccion
    settings.DEBUG = False
    settings.LOG_LEVEL = "WARNING"
    settings.CACHE_TTL_STATIC = 7200  # 2 horas
    settings.RATE_LIMIT_REQUESTS = 50  # Mas restrictivo

elif settings.ENVIRONMENT == "testing":
    # Configuracion de testing
    settings.CACHE_TTL_STATIC = 60  # Cache corto para tests
    settings.CACHE_TTL_DYNAMIC = 30
    settings.ACCESS_TOKEN_EXPIRE_MINUTES = 60

elif settings.ENVIRONMENT == "development":
    # Configuracion de desarrollo
    settings.DEBUG = True
    settings.LOG_LEVEL = "DEBUG"
    settings.ENABLE_DETAILED_LOGGING = True
