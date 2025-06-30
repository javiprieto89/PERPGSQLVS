# app/graphql/resolvers/orderhistory.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.orderhistory import OrderHistoryInDB
from app.graphql.crud.orderhistory import get_orderhistory, get_orderhistory_by_id
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class OrderhistoryQuery:
    @strawberry.field
    def all_orderhistory(self, info: Info) -> List[OrderHistoryInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            orderhistory = get_orderhistory(db)
            return [OrderHistoryInDB(**item.__dict__) for item in orderhistory]
        finally:
            db_gen.close()

    @strawberry.field
    def orderhistory_by_id(self, info: Info, id: int) -> Optional[OrderHistoryInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_orderhistory_by_id(db, id)
            return OrderHistoryInDB(**item.__dict__) if item else None
        finally:
            db_gen.close()


orderhistoryQuery = OrderhistoryQuery()
