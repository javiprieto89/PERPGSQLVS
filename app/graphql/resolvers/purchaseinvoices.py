# app/graphql/resolvers/purchaseinvoices.py - VERSIÓN COMPLETA
# Resumen: Resolvers GraphQL para facturas de compra (PurchaseInvoices).

import strawberry
from typing import List, Optional
from strawberry.types import Info
from app.db import get_db
from app.graphql.schemas.purchaseinvoices import PurchaseInvoicesInDB
from app.graphql.crud.purchaseinvoices import (
    get_purchaseinvoices,
    get_purchaseinvoice_by_id,
)
from app.utils import list_to_schema, obj_to_schema


@strawberry.type
class PurchaseInvoicesQuery:
    @strawberry.field
    def all_purchaseinvoices(self, info: Info) -> List[PurchaseInvoicesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_purchaseinvoices(db)
            return list_to_schema(PurchaseInvoicesInDB, items)
        finally:
            db_gen.close()

    @strawberry.field
    def get_purchaseinvoice_by_id(self, info: Info, company_id: int, branch_id: int, id: int) -> Optional[PurchaseInvoicesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_purchaseinvoice_by_id(db, company_id, branch_id, id)
            return obj_to_schema(PurchaseInvoicesInDB, item)
        finally:
            db_gen.close()


purchaseinvoicesQuery = PurchaseInvoicesQuery()
