# app/graphql/mutations/stockhistory.py
import strawberry
from typing import Optional
from app.graphql.schemas.stockhistory import (
    StockHistoryCreate,
    StockHistoryUpdate,
    StockHistoryInDB,
)
from app.graphql.crud.stockhistory import (
    create_stockhistory,
    update_stockhistory,
    delete_stockhistory,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class StockHistoryMutations:
    @strawberry.mutation
    def create_stockhistory(
        self, info: Info, data: StockHistoryCreate
    ) -> StockHistoryInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_stockhistory(db, data)
            return obj_to_schema(StockHistoryInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_stockhistory(
        self, info: Info, historyID: int, data: StockHistoryUpdate
    ) -> Optional[StockHistoryInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_stockhistory(db, historyID, data)
            return obj_to_schema(StockHistoryInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_stockhistory(self, info: Info, historyID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_stockhistory(db, historyID)
            return deleted is not None
        finally:
            db_gen.close()

