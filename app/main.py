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

import os
from dotenv import load_dotenv
from strawberry.asgi import GraphQL
from app.graphql.schema import schema
from app.db import Base, engine
import app.models

load_dotenv()
# Base.metadata.create_all(bind=engine)
app = GraphQL(schema)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="127.0.0.1",
        port=8000,  # o el que quieras
        reload=True
    )

#====================== NUEVO ======================
