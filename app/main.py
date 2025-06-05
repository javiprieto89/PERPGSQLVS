# app/main.py

# Ruta: app/main.py

import os
from dotenv import load_dotenv
from strawberry.asgi import GraphQL
from app.graphql.schema import schema
from app.db import Base, engine

# --- Cargar variables de entorno ---
load_dotenv()

# --- Crear tablas en la base de datos ---
#Base.metadata.create_all(bind=engine)

# --- Instanciar la app de GraphQL ---
app = GraphQL(schema)
