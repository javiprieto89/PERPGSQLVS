# app/graphql/mutations/vendors.py
import strawberry
from typing import Optional
from app.graphql.schemas.vendors import VendorsCreate, VendorsUpdate, VendorsInDB
from app.graphql.crud.vendors import (
    create_vendors,
    update_vendors,
    delete_vendors,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info

@strawberry.type
class VendorsMutations:
    @strawberry.mutation
    def create_vendor(self, info: Info, data: VendorsCreate) -> VendorsInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            new_vendor = create_vendors(db, data)
            return obj_to_schema(VendorsInDB, new_vendor)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_vendor(
        self, info: Info, vendorID: int, data: VendorsUpdate
    ) -> Optional[VendorsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated_vendor = update_vendors(db, vendorID, data)
            if not updated_vendor:
                return None
            return obj_to_schema(VendorsInDB, updated_vendor)
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_vendor(self, info: Info, vendorID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted_vendor = delete_vendors(db, vendorID)
            return deleted_vendor is not None
        finally:
            db_gen.close()

    @strawberry.mutation
    def toggle_vendor_status(
        self, info: Info, vendorID: int, isActive: bool
    ) -> Optional[VendorsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            update_data = VendorsUpdate(IsActive=isActive)
            updated_vendor = update_vendors(db, vendorID, update_data)
            if not updated_vendor:
                return None
            return obj_to_schema(VendorsInDB, updated_vendor)
        finally:
            db_gen.close()
