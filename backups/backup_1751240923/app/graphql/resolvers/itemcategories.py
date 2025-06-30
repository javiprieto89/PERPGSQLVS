# app/graphql/resolvers/itemcategories.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.itemcategories import ItemCategoriesInDB
from app.graphql.crud.itemcategories import get_itemcategories, get_itemcategories_by_id
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class ItemcategoriesQuery:
    @strawberry.field
    def all_itemcategories(self, info: Info) -> List[ItemCategoriesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            itemcategories = get_itemcategories(db)
            return [ItemCategoriesInDB(**itemcategory.__dict__) for itemcategory in itemcategories]
        finally:
            db_gen.close()

    @strawberry.field
    def itemcategories_by_id(self, info: Info, id: int) -> Optional[ItemCategoriesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            itemcategory = get_itemcategories_by_id(db, id)
            return ItemCategoriesInDB(**itemcategory.__dict__) if itemcategory else None
        finally:
            db_gen.close()


itemcategoriesQuery = ItemcategoriesQuery()
