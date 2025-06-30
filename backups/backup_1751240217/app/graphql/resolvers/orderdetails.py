# app/graphql/resolvers/orderdetails.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.orderdetails import OrderDetailsInDB
from app.graphql.crud.orderdetails import get_orderdetails, get_orderdetails_by_id
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class OrderdetailsQuery:
    @strawberry.field
    def all_orderdetails(self, info: Info) -> List[OrderDetailsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            orderdetails = get_orderdetails(db)
            return [OrderDetailsInDB(**od.__dict__) for od in orderdetails]
        finally:
            db_gen.close()

    @strawberry.field
    def orderdetails_by_id(self, info: Info, id: int) -> Optional[OrderDetailsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            od = get_orderdetails_by_id(db, id)
            return OrderDetailsInDB(**od.__dict__) if od else None
        finally:
            db_gen.close()


orderdetailsQuery = OrderdetailsQuery()
