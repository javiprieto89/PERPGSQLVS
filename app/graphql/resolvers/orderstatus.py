# app/graphql/resolvers/orderstatus.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.orderstatus import OrderStatusInDB
from app.graphql.crud.orderstatus import get_orderstatus, get_orderstatus_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class OrderstatusQuery:
    @strawberry.field
    def all_orderstatus(self, info: Info) -> List[OrderStatusInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            statuses = get_orderstatus(db)
            return list_to_schema(OrderStatusInDB, statuses)
        finally:
            db_gen.close()

    @strawberry.field
    def orderstatus_by_id(self, info: Info, id: int) -> Optional[OrderStatusInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            status = get_orderstatus_by_id(db, id)
            return obj_to_schema(OrderStatusInDB, status) if status else None
        finally:
            db_gen.close()


orderstatusQuery = OrderstatusQuery()
