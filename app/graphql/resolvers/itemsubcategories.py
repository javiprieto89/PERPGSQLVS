# app/graphql/resolvers/itemsubcategories.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.itemsubcategories import ItemSubcategoriesInDB
from app.graphql.crud.itemsubcategories import (
    get_itemsubcategories,
    get_itemsubcategories_by_id,
)
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class ItemsubcategoriesQuery:
    @strawberry.field
    def all_itemsubcategories(self, info: Info) -> List[ItemSubcategoriesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            records = get_itemsubcategories(db)
            return list_to_schema(ItemSubcategoriesInDB, records)
        finally:
            db_gen.close()

    @strawberry.field
    def itemsubcategories_by_id(self, info: Info, id: int) -> Optional[ItemSubcategoriesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            record = get_itemsubcategories_by_id(db, id)
            return obj_to_schema(ItemSubcategoriesInDB, record) if record else None
        finally:
            db_gen.close()


itemsubcategoriesQuery = ItemsubcategoriesQuery()
