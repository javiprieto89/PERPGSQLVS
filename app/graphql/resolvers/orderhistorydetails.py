# app/graphql/resolvers/orderhistorydetails.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.orderhistorydetails import OrderHistoryDetailsInDB
from app.graphql.crud.orderhistorydetails import (
    get_orderhistorydetails,
    get_orderhistorydetails_by_id,
)
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class OrderhistorydetailsQuery:
    @strawberry.field
    def all_orderhistorydetails(self, info: Info) -> List[OrderHistoryDetailsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            history_details = get_orderhistorydetails(db)
            return [
                OrderHistoryDetailsInDB(**detail.__dict__) for detail in history_details
            ]
        finally:
            db_gen.close()

    @strawberry.field
    def orderhistorydetails_by_id(
        self, info: Info, id: int
    ) -> Optional[OrderHistoryDetailsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            detail = get_orderhistorydetails_by_id(db, id)
            return OrderHistoryDetailsInDB(**detail.__dict__) if detail else None
        finally:
            db_gen.close()


orderhistorydetailsQuery = OrderhistorydetailsQuery()
