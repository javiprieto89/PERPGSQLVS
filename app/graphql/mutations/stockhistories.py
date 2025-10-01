# app/graphql/mutations/stockhistory.py
import strawberry
from typing import Optional
from app.graphql.schemas.stockhistories import StockHistoriesCreate, StockHistoriesUpdate, StockHistoriesInDB
from app.graphql.crud.stockhistories import create_stockhistories, update_stockhistories, delete_stockhistories
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class StockHistoriesMutations:
    @strawberry.mutation
    def create_stockhistories(
        self, info: Info, data: StockHistoriesCreate
    ) -> StockHistoriesInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_stockhistories(db, data)
            return obj_to_schema(StockHistoriesInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_stockhistories(
        self, info: Info, historyID: int, data: StockHistoriesUpdate
    ) -> Optional[StockHistoriesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_stockhistories(db, historyID, data)
            return obj_to_schema(StockHistoriesInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_stockhistories(self, info: Info, historyID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_stockhistories(db, historyID)
            return deleted is not None
        finally:
            db_gen.close()

