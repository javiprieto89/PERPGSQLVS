# app/graphql/resolvers/purchaseinvoicedetails.py - VERSIÓN COMPLETA
# Resumen: Resolvers GraphQL para detalles de facturas de compra (PurchaseInvoiceDetails), con PK compuesta.

import strawberry
from typing import List, Optional
from strawberry.types import Info
from app.db import get_db
from app.graphql.schemas.purchaseinvoicedetails import PurchaseInvoiceDetailsInDB
from app.graphql.schemas.purchaseinvoices import PurchaseInvoicesInDB
from app.graphql.crud.purchaseinvoicedetails import (
    get_purchaseinvoicedetails,
    get_purchaseinvoicedetail_by_id,
)
from app.graphql.crud.purchaseinvoices import get_purchaseinvoice_by_id
from app.utils import list_to_schema, obj_to_schema


@strawberry.type
class PurchaseInvoiceDetailsQuery:
    @strawberry.field
    def all_purchaseinvoicedetails(self, info: Info, purchaseinvoice_id: int, purchaseinvoicedetail_id: int) -> List[PurchaseInvoiceDetailsInDB]:
        """
        Devuelve todos los registros de detalles de facturas de compra.
        """
        db_gen = get_db()
        db = next(db_gen)
        try:
            purchasesinvoicedetails = get_purchaseinvoicedetails(db)
            return list_to_schema(PurchaseInvoiceDetailsInDB, purchasesinvoicedetails)
        finally:
            db_gen.close()

    @strawberry.field
    def get_purchaseinvoicedetail_by_id(self, info: Info, purchaseinvoice_id: int, purchaseinvoicedetail_id: int) -> Optional[PurchaseInvoiceDetailsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            purchaseinvoicedetails = get_purchaseinvoicedetail_by_id(
                db, purchaseinvoice_id, purchaseinvoicedetail_id)
            return obj_to_schema(PurchaseInvoiceDetailsInDB, purchaseinvoicedetails) if purchaseinvoicedetails else None
        finally:
            db_gen.close()

    @strawberry.field
    def get_purchaseinvoice_from_detail(
        self, info: Info, company_id: int, branch_id: int, purchaseinvoice_id: int
    ) -> Optional[PurchaseInvoicesInDB]:
        """
        Obtiene la factura de compra asociada a un detalle específico
        """
        db_gen = get_db()
        db = next(db_gen)
        try:
            invoice = get_purchaseinvoice_by_id(
                db, company_id, branch_id, purchaseinvoice_id)
            return obj_to_schema(PurchaseInvoicesInDB, invoice) if invoice else None
        finally:
            db_gen.close()


purchaseinvoicedetaulsQuery = PurchaseInvoiceDetailsQuery()
