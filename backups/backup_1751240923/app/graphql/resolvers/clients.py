# app/graphql/resolvers/clients.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.clients import ClientsInDB
from app.graphql.crud.clients import get_clients, get_clients_by_id
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class ClientsQuery:
    @strawberry.field
    def all_clients(self, info: Info) -> List[ClientsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            clients = get_clients(db)
            return [ClientsInDB(**client.__dict__) for client in clients]
        finally:
            db_gen.close()

    @strawberry.field
    def clients_by_id(self, info: Info, id: int) -> Optional[ClientsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            client = get_clients_by_id(db, id)
            return ClientsInDB(**client.__dict__) if client else None
        finally:
            db_gen.close()


clientsQuery = ClientsQuery()
