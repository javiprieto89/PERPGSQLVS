# app/graphql/mutations/orders.py
import strawberry
from typing import Optional
from app.graphql.schemas.orders import OrdersCreate, OrdersUpdate, OrdersInDB
from app.graphql.crud.orders import create_orders, update_orders, delete_orders
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info

@strawberry.type
class OrdersMutations:
    @strawberry.mutation
    def create_order(self, info: Info, data: OrdersCreate) -> OrdersInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_orders(db, data)
            return obj_to_schema(OrdersInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_order(self, info: Info, orderID: int, data: OrdersUpdate) -> Optional[OrdersInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_orders(db, orderID, data)
            return obj_to_schema(OrdersInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_order(self, info: Info, orderID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_orders(db, orderID)
            return deleted is not None
        finally:
            db_gen.close()