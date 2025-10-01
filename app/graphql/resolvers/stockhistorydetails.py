# app\graphql\resolvers\stockhistorydetails.py
import strawberry
from typing import List, Optional
from strawberry.types import Info
from app.graphql.schemas.stockhistorydetails import StockHistoryDetailsInDB
from app.graphql.crud.stockhistorydetails import get_stockhistorydetails, get_stockhistorydetails_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema


@strawberry.type
class StockHistoryDetailsQuery:
    @strawberry.field
    def all_stockhistorydetails(self, info: Info) -> List[StockHistoryDetailsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            records = get_stockhistorydetails(db)
            return list_to_schema(StockHistoryDetailsInDB, records)
        finally:
            db_gen.close()

    @strawberry.field
    def stockhistorydetail_by_id(
        self, info: Info, id: int
    ) -> Optional[StockHistoryDetailsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = get_stockhistorydetails_by_id(db, id)
            return obj_to_schema(StockHistoryDetailsInDB, obj) if obj else None
        finally:
            db_gen.close()


stockhistorydetailsQuery = StockHistoryDetailsQuery()
