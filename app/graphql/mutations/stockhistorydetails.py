# app/graphql/mutations/stockhistory.py
import strawberry
from typing import Optional
from app.graphql.schemas.stockhistorydetails import (
    StockHistoryDetailsCreate,
    StockHistoryDetailsUpdate,
    StockHistoryDetailsInDB,
)
from app.graphql.crud.stockhistorydetails import (
    create_stockhistorydetails,
    update_stockhistorydetails,
    delete_stockhistorydetails,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class StockHistoryDetailsMutations:
    @strawberry.mutation
    def create_stockhistorydetail(
        self, info: Info, data: StockHistoryDetailsCreate
    ) -> StockHistoryDetailsInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_stockhistorydetails(db, data)
            return obj_to_schema(StockHistoryDetailsInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_stockhistorydetail(
        self, info: Info, historyID: int, data: StockHistoryDetailsUpdate
    ) -> Optional[StockHistoryDetailsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_stockhistorydetails(db, historyID, data)
            return obj_to_schema(StockHistoryDetailsInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_stockhistorydetail(self, info: Info, historyID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_stockhistorydetails(db, historyID)
            return deleted is not None
        finally:
            db_gen.close()

