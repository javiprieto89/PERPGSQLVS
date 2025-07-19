# app/graphql/resolvers/discounts.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.discounts import DiscountsInDB
from app.graphql.crud.discounts import get_discounts, get_discounts_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class DiscountsQuery:
    @strawberry.field
    def all_discounts(self, info: Info) -> List[DiscountsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            discounts = get_discounts(db)
            return list_to_schema(DiscountsInDB, discounts)
        finally:
            db_gen.close()

    @strawberry.field
    def discounts_by_id(self, info: Info, id: int) -> Optional[DiscountsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            discount = get_discounts_by_id(db, id)
            return obj_to_schema(DiscountsInDB, discount) if discount else None
        finally:
            db_gen.close()


discountsQuery = DiscountsQuery()
