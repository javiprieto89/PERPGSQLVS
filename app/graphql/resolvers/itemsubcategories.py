# app/graphql/resolvers/itemsubcategories.py
import strawberry
from typing import List, Optional
from sqlalchemy.orm import joinedload
from app.models.itemsubcategories import ItemSubcategories
from app.graphql.schemas.itemsubcategories import ItemSubcategoriesInDB
from app.db import get_db
from app.utils import obj_to_schema
from strawberry.types import Info


@strawberry.type
class ItemsubcategoriesQuery:
    @strawberry.field
    def all_itemsubcategories(self, info: Info) -> List[ItemSubcategoriesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            records = db.query(ItemSubcategories).options(
                joinedload(ItemSubcategories.itemCategories_)
            ).all()

            #for r in records:
             #   setattr(r, "CategoryName", getattr(r.itemCategories_, 'CategoryName', None))

            return [obj_to_schema(ItemSubcategoriesInDB, r) for r in records]
        finally:
            db_gen.close()

    @strawberry.field
    def itemsubcategories_by_id(self, info: Info, id: int) -> Optional[ItemSubcategoriesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            record = db.query(ItemSubcategories).options(
                joinedload(ItemSubcategories.itemCategories_)
            ).filter(ItemSubcategories.ItemSubcategoryID == id).first()
            if not record:
                return None

            #setattr(record, "CategoryName", getattr(record.itemCategories_, 'CategoryName', None))
            return obj_to_schema(ItemSubcategoriesInDB, record)
        finally:
            db_gen.close()

    @strawberry.field
    def itemsubcategories_by_category(self, info: Info, categoryID: int) -> List[ItemSubcategoriesInDB]:
        """Obtener subcategorías filtradas por categoría"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            records = db.query(ItemSubcategories).options(
                joinedload(ItemSubcategories.itemCategories_)
            ).filter(ItemSubcategories.ItemCategoryID == categoryID).all()

            #for r in records:
             #   setattr(r, "CategoryName", getattr(r.itemCategories_, 'CategoryName', None))

            return [obj_to_schema(ItemSubcategoriesInDB, r) for r in records]
        finally:
            db_gen.close()


itemsubcategoriesQuery = ItemsubcategoriesQuery()
