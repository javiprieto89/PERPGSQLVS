# app/graphql/resolvers/orders.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.orders import OrdersInDB
from app.graphql.crud.orders import get_orders, get_orders_by_id
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class OrdersQuery:
    @strawberry.field
    def all_orders(self, info: Info) -> List[OrdersInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            orders = get_orders(db)
            return [OrdersInDB(**order.__dict__) for order in orders]
        finally:
            db_gen.close()

    @strawberry.field
    def orders_by_id(self, info: Info, id: int) -> Optional[OrdersInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            order = get_orders_by_id(db, id)
            return OrdersInDB(**order.__dict__) if order else None
        finally:
            db_gen.close()


ordersQuery = OrdersQuery()
