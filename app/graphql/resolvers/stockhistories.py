# app/graphql/resolvers/stockhistory.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.stockhistories import StockHistoriesInDB
from app.graphql.crud.stockhistories import get_stockhistories, get_stockhistories_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class StockhistoriesQuery:
    @strawberry.field
    def all_stockhistories(self, info: Info) -> List[StockHistoriesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            records = get_stockhistories(db)
            return list_to_schema(StockHistoriesInDB, records)
        finally:
            db_gen.close()

    @strawberry.field
    def stockhistory_by_id(self, info: Info, id: int) -> Optional[StockHistoriesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = get_stockhistories_by_id(db, id)
            return obj_to_schema(StockHistoriesInDB, obj) if obj else None
        finally:
            db_gen.close()


stockhistoriesQuery = StockhistoriesQuery()

