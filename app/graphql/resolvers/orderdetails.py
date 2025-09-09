# app/graphql/resolvers/orderdetails.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.orderdetails import OrderDetailsInDB
from app.graphql.crud.orderdetails import get_orderdetails, get_orderdetails_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class OrderdetailsQuery:
    @strawberry.field
    def all_orderdetails(self, info: Info) -> List[OrderDetailsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            orderdetails = get_orderdetails(db)
            return list_to_schema(OrderDetailsInDB, orderdetails)
        finally:
            db_gen.close()

    @strawberry.field
    def orderdetails_by_id(self, info: Info, id: int) -> Optional[OrderDetailsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            od = get_orderdetails_by_id(db, id)
            return obj_to_schema(OrderDetailsInDB, od) if od else None
        finally:
            db_gen.close()


orderdetailsQuery = OrderdetailsQuery()

