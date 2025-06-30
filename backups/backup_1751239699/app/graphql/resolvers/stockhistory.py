# app/graphql/resolvers/stockhistory.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.stockhistory import StockHistoryInDB
from app.graphql.crud.stockhistory import get_stockhistory, get_stockhistory_by_id
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class StockhistoryQuery:
    @strawberry.field
    def all_stockhistory(self, info: Info) -> List[StockHistoryInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            stockhistory = get_stockhistory(db)
            return [StockHistoryInDB(**item.__dict__) for item in stockhistory]
        finally:
            db_gen.close()

    @strawberry.field
    def stockhistory_by_id(self, info: Info, id: int) -> Optional[StockHistoryInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_stockhistory_by_id(db, id)
            return StockHistoryInDB(**item.__dict__) if item else None
        finally:
            db_gen.close()


stockhistoryQuery = StockhistoryQuery()
