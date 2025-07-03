# app/graphql/resolvers/stockhistory.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.stockhistory import StockHistoryInDB
from app.graphql.crud.stockhistory import get_stockhistory, get_stockhistory_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class StockhistoryQuery:
    @strawberry.field
    def all_stockhistory(self, info: Info) -> List[StockHistoryInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            stockhistory = get_stockhistory(db)
            return list_to_schema(StockHistoryInDB, stockhistory)
        finally:
            db_gen.close()

    @strawberry.field
    def stockhistory_by_id(self, info: Info, id: int) -> Optional[StockHistoryInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_stockhistory_by_id(db, id)
            return obj_to_schema(StockHistoryInDB, item) if item else None
        finally:
            db_gen.close()


stockhistoryQuery = StockhistoryQuery()
