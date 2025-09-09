# app/graphql/resolvers/clients.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.clients import ClientsInDB
from app.graphql.crud.clients import (
    get_clients,
    get_clients_by_id,
    get_clients_by_company,
    get_clients_by_branch,
)
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class ClientsQuery:
    @strawberry.field
    def all_clients(self, info: Info) -> List[ClientsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            clients = get_clients(db)
            return list_to_schema(ClientsInDB, clients)
        finally:
            db_gen.close()

    @strawberry.field
    def clients_by_id(self, info: Info, id: int) -> Optional[ClientsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            client = get_clients_by_id(db, id)
            return obj_to_schema(ClientsInDB, client) if client else None
        finally:
            db_gen.close()

    @strawberry.field
    def clients_by_company(self, info: Info, companyID: int) -> List[ClientsInDB]:
        """Obtener clientes filtrados por CompanyID"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            clients = get_clients_by_company(db, companyID)
            return list_to_schema(ClientsInDB, clients)
        finally:
            db_gen.close()

    @strawberry.field
    def clients_by_branch(
        self, info: Info, companyID: int, branchID: int
    ) -> List[ClientsInDB]:
        """Obtener clientes filtrados por CompanyID y BranchID"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            clients = get_clients_by_branch(db, companyID, branchID)
            return list_to_schema(ClientsInDB, clients)
        finally:
            db_gen.close()


clientsQuery = ClientsQuery()
