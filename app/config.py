from __future__ import annotations

import os
from typing import List

from dotenv import load_dotenv

load_dotenv()

TRUE_VALUES = {"1", "true", "yes", "on"}


def _require_env(name: str) -> str:
    value = os.getenv(name)
    if value is None:
        raise RuntimeError(f"Environment variable '{name}' is required")
    return value


def _env_int(name: str) -> int:
    return int(_require_env(name))


def _env_bool(name: str) -> bool:
    return _require_env(name).strip().lower() in TRUE_VALUES


def _env_list(name: str) -> List[str]:
    raw = _require_env(name)
    if raw.strip() == "*":
        return ["*"]
    return [item.strip() for item in raw.split(",") if item.strip()]


class Settings:
    def __init__(self) -> None:
        # Base de datos
        self.DATABASE_URL: str = _require_env("DATABASE_URL")
        self.SQLALCHEMY_DATABASE_URL: str = os.getenv(
            "SQLALCHEMY_DATABASE_URL", self.DATABASE_URL
        )

        # JWT
        self.SECRET_KEY: str = _require_env("SECRET_KEY")
        self.ALGORITHM: str = _require_env("ALGORITHM")
        self.ACCESS_TOKEN_EXPIRE_MINUTES: int = _env_int("ACCESS_TOKEN_EXPIRE_MINUTES")
        self.REFRESH_TOKEN_BYTES: int = _env_int("REFRESH_TOKEN_BYTES")

        # CORS
        self.ALLOWED_ORIGINS: List[str] = _env_list("ALLOWED_ORIGINS")

        # Cache
        self.CACHE_TTL_STATIC: int = _env_int("CACHE_TTL_STATIC")
        self.CACHE_TTL_DYNAMIC: int = _env_int("CACHE_TTL_DYNAMIC")
        self.CACHE_TTL_USER: int = _env_int("CACHE_TTL_USER")

        # Rate limiting
        self.RATE_LIMIT_REQUESTS: int = _env_int("RATE_LIMIT_REQUESTS")
        self.RATE_LIMIT_WINDOW: int = _env_int("RATE_LIMIT_WINDOW")

        # Paginación
        self.DEFAULT_PAGE_SIZE: int = _env_int("DEFAULT_PAGE_SIZE")
        self.MAX_PAGE_SIZE: int = _env_int("MAX_PAGE_SIZE")

        # Logs
        self.LOG_LEVEL: str = _require_env("LOG_LEVEL")
        self.LOG_FORMAT: str = _require_env("LOG_FORMAT")

        # Entorno
        self.ENVIRONMENT: str = _require_env("ENVIRONMENT")
        self.DEBUG: bool = _env_bool("DEBUG")

        # Compresión
        self.GZIP_MINIMUM_SIZE: int = _env_int("GZIP_MINIMUM_SIZE")

        # Métricas
        self.ENABLE_METRICS: bool = _env_bool("ENABLE_METRICS")
        self.ENABLE_DETAILED_LOGGING: bool = _env_bool("ENABLE_DETAILED_LOGGING")

        self._apply_environment_overrides()

    def _apply_environment_overrides(self) -> None:
        if self.ENVIRONMENT.lower() in {"prod", "production"}:
            self.DEBUG = False
            self.LOG_LEVEL = "WARNING"
            self.CACHE_TTL_STATIC = 7200
            self.RATE_LIMIT_REQUESTS = 50
        elif self.ENVIRONMENT.lower() in {"test", "testing"}:
            self.CACHE_TTL_STATIC = 60
            self.CACHE_TTL_DYNAMIC = 30
            self.ACCESS_TOKEN_EXPIRE_MINUTES = 60
        elif self.ENVIRONMENT.lower() in {"dev", "development"}:
            self.DEBUG = True
            self.LOG_LEVEL = "DEBUG"
            self.ENABLE_DETAILED_LOGGING = True


settings = Settings()
