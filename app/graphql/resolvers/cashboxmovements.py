# app/graphql/resolvers/cashboxmovements.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.cashboxmovements import CashBoxMovementsInDB
from app.graphql.crud.cashboxmovements import (
    get_cashboxmovements,
    get_cashboxmovements_by_id,
)
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class CashboxmovementsQuery:
    @strawberry.field
    def all_cashboxmovements(self, info: Info) -> List[CashBoxMovementsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_cashboxmovements(db)
            return list_to_schema(CashBoxMovementsInDB, items)
        finally:
            db_gen.close()

    @strawberry.field
    def cashboxmovements_by_id(self, info: Info, id: int) -> Optional[CashBoxMovementsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_cashboxmovements_by_id(db, id)
            return obj_to_schema(CashBoxMovementsInDB, item) if item else None
        finally:
            db_gen.close()

cashboxmovementsQuery = CashboxmovementsQuery()
