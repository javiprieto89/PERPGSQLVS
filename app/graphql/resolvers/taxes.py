# app/graphql/resolvers/taxes.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.taxes import TaxesInDB
from app.graphql.crud.taxes import get_taxes, get_taxes_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class TaxesQuery:
    @strawberry.field
    def all_taxes(self, info: Info) -> List[TaxesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_taxes(db)
            return list_to_schema(TaxesInDB, items)
        finally:
            db_gen.close()

    @strawberry.field
    def taxes_by_id(self, info: Info, id: int) -> Optional[TaxesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_taxes_by_id(db, id)
            return obj_to_schema(TaxesInDB, item) if item else None
        finally:
            db_gen.close()


taxesQuery = TaxesQuery()
