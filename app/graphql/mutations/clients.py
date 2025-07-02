# app/graphql/mutations/clients.py
import strawberry
from typing import Optional
from app.graphql.schemas.clients import ClientsCreate, ClientsUpdate, ClientsInDB
from app.graphql.crud.clients import (
    create_clients, 
    update_clients, 
    delete_clients,
)
from app.db import get_db
from strawberry.types import Info

@strawberry.type
class ClientsMutations:
    @strawberry.mutation
    def create_client(self, info: Info, data: ClientsCreate) -> ClientsInDB: 
        db_gen = get_db()
        db = next(db_gen)
        try:
            new_client = create_clients(db, data)
            return ClientsInDB(**new_client.__dict__)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_client(self, info: Info, clientID: int, data: ClientsUpdate) -> Optional[ClientsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated_client = update_clients(db, clientID, data)
            if not updated_client:
                return None
            return ClientsInDB(**updated_client.__dict__)
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_client(self, info: Info, clientID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted_client = delete_clients(db, clientID)
            return deleted_client is not None
        finally:
            db_gen.close()

    @strawberry.mutation
    def toggle_client_status(self, info: Info, clientID: int, isActive: bool) -> Optional[ClientsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            update_data = ClientsUpdate(IsActive=isActive)
            updated_client = update_clients(db, clientID, update_data)
            if not updated_client:
                return None
            return ClientsInDB(**updated_client.__dict__)
        finally:
            db_gen.close()
