# app/config.py
import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()  # Carga variables desde un .env si existe


class Settings(BaseSettings):
    SECRET_KEY: str = os.getenv("SECRET_KEY", "changeme")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 300)
    )


settings = Settings()
