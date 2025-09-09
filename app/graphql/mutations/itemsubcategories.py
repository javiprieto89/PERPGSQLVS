# app/graphql/mutations/itemsubcategories.py
import strawberry
from typing import Optional
from app.graphql.schemas.itemsubcategories import (
    ItemSubcategoriesCreate,
    ItemSubcategoriesUpdate,
    ItemSubcategoriesInDB,
)
from app.graphql.crud.itemsubcategories import (
    create_itemsubcategories,
    update_itemsubcategories,
    delete_itemsubcategories,
    get_itemsubcategories_by_id,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class ItemSubcategoriesMutations:
    @strawberry.mutation
    def create_itemsubcategory(self, info: Info, data: ItemSubcategoriesCreate) -> ItemSubcategoriesInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_itemsubcategories(db, data)          
            return obj_to_schema(ItemSubcategoriesInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_itemsubcategory(self, info: Info, subcategoryID: int, data: ItemSubcategoriesUpdate) -> Optional[ItemSubcategoriesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_itemsubcategories(db, subcategoryID, data)
            if updated:
                full = get_itemsubcategories_by_id(db, subcategoryID)
                return obj_to_schema(ItemSubcategoriesInDB, full)
            return None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_itemsubcategory(self, info: Info, subcategoryID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_itemsubcategories(db, subcategoryID)
            return deleted is not None
        finally:
            db_gen.close()

