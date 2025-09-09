# app/graphql/resolvers/tempstockhistorydetails.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.tempstockhistorydetails import TempStockHistoryDetailsInDB
from app.graphql.crud.tempstockhistorydetails import (
    get_tempstockhistorydetails,
    get_tempstockhistorydetails_by_id,
    get_tempstockhistorydetails_by_session,
)
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class TempstockhistorydetailsQuery:
    @strawberry.field
    def all_tempstockhistorydetails(self, info: Info) -> List[TempStockHistoryDetailsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            entries = get_tempstockhistorydetails(db)
            return list_to_schema(TempStockHistoryDetailsInDB, entries)
        finally:
            db_gen.close()

    @strawberry.field
    def tempstockhistorydetails_by_id(
        self, info: Info, id: int
    ) -> Optional[TempStockHistoryDetailsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            entry = get_tempstockhistorydetails_by_id(db, id)
            return obj_to_schema(TempStockHistoryDetailsInDB, entry) if entry else None
        finally:
            db_gen.close()

    @strawberry.field
    def tempstockhistorydetails_by_session(
        self, info: Info, sessionID: str
    ) -> List[TempStockHistoryDetailsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            entries = get_tempstockhistorydetails_by_session(db, sessionID)
            return list_to_schema(TempStockHistoryDetailsInDB, entries)
        finally:
            db_gen.close()


tempstockhistorydetailsQuery = TempstockhistorydetailsQuery()

