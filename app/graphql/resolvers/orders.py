# app/graphql/resolvers/orders.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.orders import OrdersInDB
from app.graphql.crud.orders import get_orders, get_orders_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class OrdersQuery:
    @strawberry.field
    def all_orders(self, info: Info) -> List[OrdersInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            orders = get_orders(db)
            return list_to_schema(OrdersInDB, orders)
        finally:
            db_gen.close()

    @strawberry.field
    def orders_by_id(self, info: Info, companyID: int, branchID: int, id: int) -> Optional[OrdersInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            order = get_orders_by_id(db, companyID, branchID, id)
            return obj_to_schema(OrdersInDB, order) if order else None
        finally:
            db_gen.close()


ordersQuery = OrdersQuery()
