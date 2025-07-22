# app/graphql/mutations/tempstockhistorydetails.py
import strawberry
from typing import Optional, List
from app.graphql.schemas.tempstockhistorydetails import (
    TempStockHistoryDetailsCreate,
    TempStockHistoryDetailsUpdate,
    TempStockHistoryDetailsInDB,
)
from app.graphql.schemas.stockhistory import StockHistoryInDB
from app.graphql.crud.tempstockhistorydetails import (
    create_tempstockhistorydetails,
    update_tempstockhistorydetails,
    delete_tempstockhistorydetails,
    process_stock_session,
)
from app.utils import obj_to_schema, list_to_schema
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class TempStockHistoryDetailsMutations:
    @strawberry.mutation
    def create_tempstockhistorydetail(
        self, info: Info, data: TempStockHistoryDetailsCreate
    ) -> TempStockHistoryDetailsInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_tempstockhistorydetails(db, data)
            return obj_to_schema(TempStockHistoryDetailsInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_tempstockhistorydetail(
        self, info: Info, entryID: int, data: TempStockHistoryDetailsUpdate
    ) -> Optional[TempStockHistoryDetailsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_tempstockhistorydetails(db, entryID, data)
            return obj_to_schema(TempStockHistoryDetailsInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_tempstockhistorydetail(self, info: Info, entryID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_tempstockhistorydetails(db, entryID)
            return deleted is not None
        finally:
            db_gen.close()

    @strawberry.mutation
    def process_stock_session(
        self, info: Info, sessionID: str
    ) -> List[StockHistoryInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            records = process_stock_session(db, sessionID)
            from app.utils import list_to_schema

            return list_to_schema(StockHistoryInDB, records)
        finally:
            db_gen.close()
