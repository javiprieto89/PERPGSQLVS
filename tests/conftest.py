import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.db import Base


@pytest.fixture(scope="session")
def engine():
    # Conexión a SQL Server de pruebas
    TEST_DB_URL = (
        "mssql+pyodbc://sa:Ladeda78@127.0.0.1/LubricentroDB2-Test?driver=ODBC+Driver+17+for+SQL+Server&TrustServerCertificate=yes&Encrypt=no"
    )
    engine = create_engine(TEST_DB_URL)
    Base.metadata.create_all(engine)
    return engine


@pytest.fixture(scope="function")
def db_session(engine):
    connection = engine.connect()
    transaction = connection.begin()
    Session = sessionmaker(bind=connection)
    session = Session()
    yield session
    session.close()
    transaction.rollback()
    connection.close()
