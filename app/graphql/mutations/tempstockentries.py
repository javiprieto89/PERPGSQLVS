# app/graphql/mutations/tempstockentries.py
import strawberry
from typing import Optional, List
from app.graphql.schemas.tempstockentries import (
    TempStockEntriesCreate,
    TempStockEntriesUpdate,
    TempStockEntriesInDB,
)
from app.graphql.schemas.stockhistory import StockHistoryInDB
from app.graphql.crud.tempstockentries import (
    create_tempstockentries,
    update_tempstockentries,
    delete_tempstockentries,
    process_stock_session,
)
from app.utils import obj_to_schema, list_to_schema
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class TempStockEntriesMutations:
    @strawberry.mutation
    def create_tempstockentry(
        self, info: Info, data: TempStockEntriesCreate
    ) -> TempStockEntriesInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_tempstockentries(db, data)
            return obj_to_schema(TempStockEntriesInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_tempstockentry(
        self, info: Info, entryID: int, data: TempStockEntriesUpdate
    ) -> Optional[TempStockEntriesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_tempstockentries(db, entryID, data)
            return obj_to_schema(TempStockEntriesInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_tempstockentry(self, info: Info, entryID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_tempstockentries(db, entryID)
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
