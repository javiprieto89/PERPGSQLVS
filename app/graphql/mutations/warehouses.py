# app/graphql/mutations/warehouses.py
import strawberry
from typing import Optional
from app.graphql.schemas.warehouses import WarehousesCreate, WarehousesUpdate, WarehousesInDB
from app.graphql.crud.warehouses import create_warehouses, update_warehouses, delete_warehouses
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info

@strawberry.type
class WarehousesMutations:
    @strawberry.mutation
    def create_warehouse(self, info: Info, data: WarehousesCreate) -> WarehousesInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_warehouses(db, data)
            return obj_to_schema(WarehousesInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_warehouse(self, info: Info, warehouseID: int, data: WarehousesUpdate) -> Optional[WarehousesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_warehouses(db, warehouseID, data)
            return obj_to_schema(WarehousesInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_warehouse(self, info: Info, warehouseID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_warehouses(db, warehouseID)
            return deleted is not None
        finally:
            db_gen.close()

