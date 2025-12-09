# app/graphql/mutations/purchaseinvoices.py - VERSIÓN COMPLETA
# Resumen: Mutations GraphQL para facturas de compra (PurchaseInvoices).

import strawberry
from strawberry.types import Info
from typing import Optional
from app.db import get_db
from app.graphql.schemas.purchaseinvoices import PurchaseInvoiceCreate, PurchaseInvoiceUpdate, PurchaseInvoicesInDB
from app.graphql.crud.purchaseinvoices import (
    create_purchaseinvoice,
    update_purchaseinvoice,
    delete_purchaseinvoice,
)
from app.utils import obj_to_schema, list_to_schema


@strawberry.type
class PurchaseInvoicesMutation:
    @strawberry.mutation
    def create_purchaseinvoice(self, info: Info, data: PurchaseInvoiceCreate) -> PurchaseInvoicesInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            new_item = create_purchaseinvoice(db, data)
            return obj_to_schema(PurchaseInvoicesInDB, new_item)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_purchaseinvoice(
        self, info: Info, company_id: int, branch_id: int, id: int, data: PurchaseInvoiceUpdate
    ) -> Optional[PurchaseInvoicesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated_item = update_purchaseinvoice(
                db, company_id, branch_id, id, data)
            return obj_to_schema(PurchaseInvoicesInDB, updated_item)
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_purchaseinvoice(self, info: Info, company_id: int, branch_id: int, id: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            return delete_purchaseinvoice(db, company_id, branch_id, id)
        finally:
            db_gen.close()
