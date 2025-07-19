# app/graphql/resolvers/tempstockentries.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.tempstockentries import TempStockEntriesInDB
from app.graphql.crud.tempstockentries import (
    get_tempstockentries,
    get_tempstockentries_by_id,
)
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class TempstockentriesQuery:
    @strawberry.field
    def all_tempstockentries(self, info: Info) -> List[TempStockEntriesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            entries = get_tempstockentries(db)
            return list_to_schema(TempStockEntriesInDB, entries)
        finally:
            db_gen.close()

    @strawberry.field
    def tempstockentries_by_id(
        self, info: Info, id: int
    ) -> Optional[TempStockEntriesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            entry = get_tempstockentries_by_id(db, id)
            return obj_to_schema(TempStockEntriesInDB, entry) if entry else None
        finally:
            db_gen.close()


tempstockentriesQuery = TempstockentriesQuery()
