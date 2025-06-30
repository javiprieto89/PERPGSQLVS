# app/graphql/resolvers/tempstockentries.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.tempstockentries import TempStockEntriesInDB
from app.models.tempstockentries import TempStockEntries
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class TempstockentriesQuery:
    @strawberry.field
    def all_tempstockentries(self, info: Info) -> List[TempStockEntriesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = db.query(TempStockEntries).all()
            return [TempStockEntriesInDB(**item.__dict__) for item in items]
        finally:
            db_gen.close()

    @strawberry.field
    def tempstockentries_by_id(self, info: Info, id: int) -> Optional[TempStockEntriesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = db.query(TempStockEntries).filter(
                TempStockEntries.tempStockEntryID == id).first()
            return TempStockEntriesInDB(**item.__dict__) if item else None
        finally:
            db_gen.close()


tempstockentriesQuery = TempstockentriesQuery()
