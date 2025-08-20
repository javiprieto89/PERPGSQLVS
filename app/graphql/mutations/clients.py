# app/graphql/mutations/clients.py
import strawberry
from typing import Optional, cast
from app.graphql.schemas.clients import ClientsCreate, ClientsUpdate, ClientsInDB
from app.graphql.crud.clients import (
    create_clients,
    update_clients,
    delete_clients,
    get_clients_by_id,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info
from app.graphql.schemas.delete_response import DeleteResponse


@strawberry.type
class ClientsMutations:
    @strawberry.mutation
    def create_client(self, info: Info, data: ClientsCreate) -> ClientsInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            new_client = create_clients(db, data)
            return obj_to_schema(ClientsInDB, new_client)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_client(
        self, info: Info, clientID: int, data: ClientsUpdate
    ) -> Optional[ClientsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated_client = update_clients(db, clientID, data)
            if not updated_client:
                return None
            return obj_to_schema(ClientsInDB, updated_client)
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_client(self, info: Info, clientID: int) -> DeleteResponse:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted_client = delete_clients(db, clientID)
            success = deleted_client is not None
            message = "Client deleted" if success else "Client not found"
            return DeleteResponse(success=success, message=message)
        except ValueError as e:
            db.rollback()
            return DeleteResponse(success=False, message=str(e))
        finally:
            db_gen.close()

    @strawberry.mutation
    def toggle_client_status(
        self, info: Info, clientID: int, isActive: bool
    ) -> Optional[ClientsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            client = get_clients_by_id(db, clientID)
            if not client:
                return None
            first_name = cast(str, client.FirstName)
            update_data = ClientsUpdate(FirstName=first_name, IsActive=isActive)
            updated_client = update_clients(db, clientID, update_data)
            return obj_to_schema(ClientsInDB, updated_client)
        finally:
            db_gen.close()
