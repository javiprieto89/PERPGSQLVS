# app/graphql/mutations/suppliers.py
import strawberry
from typing import Optional
from app.graphql.schemas.suppliers import SuppliersCreate, SuppliersUpdate, SuppliersInDB
from app.graphql.crud.suppliers import (
    create_suppliers,
    update_suppliers,
    delete_suppliers,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info

@strawberry.type
class SuppliersMutations:
    @strawberry.mutation
    def create_supplier(self, info: Info, data: SuppliersCreate) -> SuppliersInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            new_supplier = create_suppliers(db, data)
            return obj_to_schema(SuppliersInDB, new_supplier)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_supplier(self, info: Info, supplierID: int, data: SuppliersUpdate) -> Optional[SuppliersInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated_supplier = update_suppliers(db, supplierID, data)
            if not updated_supplier:
                return None
            return obj_to_schema(SuppliersInDB, updated_supplier)
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_supplier(self, info: Info, supplierID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted_supplier = delete_suppliers(db, supplierID)
            return deleted_supplier is not None
        finally:
            db_gen.close()

    @strawberry.mutation
    def toggle_supplier_status(self, info: Info, supplierID: int, isActive: bool) -> Optional[SuppliersInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            update_data = SuppliersUpdate(IsActive=isActive)
            updated_supplier = update_suppliers(db, supplierID, update_data)
            if not updated_supplier:
                return None
            return obj_to_schema(SuppliersInDB, updated_supplier)
        finally:
            db_gen.close()
