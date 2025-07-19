import strawberry
from typing import Optional
from app.graphql.schemas.itemcategories import (
    ItemCategoriesCreate,
    ItemCategoriesUpdate,
    ItemCategoriesInDB,
)
from app.graphql.crud.itemcategories import (
    create_itemcategories,
    update_itemcategories,
    delete_itemcategories,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info

@strawberry.type
class ItemCategoriesMutations:
    @strawberry.mutation
    def create_itemcategory(self, info: Info, data: ItemCategoriesCreate) -> ItemCategoriesInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_itemcategories(db, data)
            return obj_to_schema(ItemCategoriesInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_itemcategory(self, info: Info, categoryID: int, data: ItemCategoriesUpdate) -> Optional[ItemCategoriesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_itemcategories(db, categoryID, data)
            return obj_to_schema(ItemCategoriesInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_itemcategory(self, info: Info, categoryID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_itemcategories(db, categoryID)
            return deleted is not None
        finally:
            db_gen.close()
