# app/config.py
import os
from typing import List, Optional, Union
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)
    
    # Base de datos
    DATABASE_URL: str = Field(
        default="mssql+pyodbc://sa:Ladeda78@127.0.0.1/LubricentroDB2?driver=ODBC+Driver+18+for+SQL+Server"
    )
    SQLALCHEMY_DATABASE_URL: str = Field(
        default="mssql+pyodbc://sa:Ladeda78@127.0.0.1/LubricentroDB2?driver=ODBC+Driver+18+for+SQL+Server"
    )
    
    # JWT
    SECRET_KEY: str = Field(default="changeme-in-production")
    ALGORITHM: str = Field(default="HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(default=300)
    
    # CORS - Handle comma-separated string
    ALLOWED_ORIGINS: Union[str, List[str]] = Field(default="http://localhost:5173,http://localhost:3000")
    
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
    LOG_FORMAT: str = Field(default="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
    
    # Entorno
    ENVIRONMENT: str = Field(default="development")
    DEBUG: bool = Field(default=True)
    
    # Compresion
    GZIP_MINIMUM_SIZE: int = Field(default=1000)
    
    # Metricas
    ENABLE_METRICS: bool = Field(default=True)
    ENABLE_DETAILED_LOGGING: bool = Field(default=True)

# Crear instancia
settings = Settings()

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
