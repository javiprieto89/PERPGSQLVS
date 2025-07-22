# app/graphql/resolvers/cashboxes.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.cashboxes import CashBoxesInDB
from app.graphql.crud.cashboxes import (
    get_cashboxes,
    get_cashboxes_by_id,
)
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class CashboxesQuery:
    @strawberry.field
    def all_cashboxes(self, info: Info) -> List[CashBoxesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_cashboxes(db)
            return list_to_schema(CashBoxesInDB, items)
        finally:
            db_gen.close()

    @strawberry.field
    def cashboxes_by_id(self, info: Info, id: int) -> Optional[CashBoxesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_cashboxes_by_id(db, id)
            return obj_to_schema(CashBoxesInDB, item) if item else None
        finally:
            db_gen.close()

cashboxesQuery = CashboxesQuery()
