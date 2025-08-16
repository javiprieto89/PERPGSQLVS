from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from typing import cast
from app.config import settings

database_url = settings.DATABASE_URL
if database_url is None:
    raise ValueError("DATABASE_URL must be set")

engine = create_engine(cast(str, database_url))
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
