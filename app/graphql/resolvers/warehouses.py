# app/graphql/resolvers/warehouses.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.warehouses import WarehousesInDB
from app.graphql.crud.warehouses import get_warehouses, get_warehouses_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class WarehousesQuery:
    @strawberry.field
    def all_warehouses(self, info: Info) -> List[WarehousesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            warehouses = get_warehouses(db)
            return list_to_schema(WarehousesInDB, warehouses)
        finally:
            db_gen.close()

    @strawberry.field
    def warehouses_by_id(self, info: Info, id: int) -> Optional[WarehousesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            warehouse = get_warehouses_by_id(db, id)
            return obj_to_schema(WarehousesInDB, warehouse) if warehouse else None
        finally:
            db_gen.close()


warehousesQuery = WarehousesQuery()
