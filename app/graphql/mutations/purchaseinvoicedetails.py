# app/graphql/mutations/purchaseinvoicedetails.py - VERSIÓN COMPLETA
# Resumen: Mutations GraphQL para detalles de facturas de compra (PurchaseInvoiceDetails), con PK compuesta.

import strawberry
from strawberry.types import Info
from sqlalchemy.orm import Session
from typing import Optional
from app.db import get_db
from app.graphql.schemas.purchaseinvoicedetails import (
    PurchaseInvoiceDetailCreate, PurchaseInvoiceDetailUpdate, PurchaseInvoiceDetailsInDB)
from app.graphql.crud.purchaseinvoicedetails import (
    create_purchaseinvoicedetail,
    update_purchaseinvoicedetail,
    delete_purchaseinvoicedetail,
)
from app.utils import obj_to_schema, list_to_schema
from strawberry.types import Info


@strawberry.type
class PurchaseInvoiceDetailsMutation:
    @strawberry.mutation
    def create_purchaseinvoicedetail(self, info: Info, data: PurchaseInvoiceDetailCreate) -> PurchaseInvoiceDetailsInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            new_purchaseinvoicedetail = create_purchaseinvoicedetail(db, data)
            return obj_to_schema(PurchaseInvoiceDetailsInDB, new_purchaseinvoicedetail)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_purchaseinvoicedetail(self, info: Info, purchaseinvoice_id: int, purchaseinvoicedetailid: int, data: PurchaseInvoiceDetailUpdate) -> Optional[PurchaseInvoiceDetailsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated_purchaseinvoicedetail = update_purchaseinvoicedetail(
                db, purchaseinvoice_id, purchaseinvoicedetailid, data)
            if not updated_purchaseinvoicedetail:
                return None
            return obj_to_schema(PurchaseInvoiceDetailsInDB, updated_purchaseinvoicedetail)
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_purchaseinvoicedetail(self, info: Info, purchaseinvoice_id: int, purchaseinvoicedetail_id: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            return delete_purchaseinvoicedetail(db, purchaseinvoice_id, purchaseinvoicedetail_id)
        finally:
            db_gen.close()
