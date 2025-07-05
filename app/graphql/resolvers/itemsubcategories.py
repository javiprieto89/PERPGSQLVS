# app/graphql/resolvers/itemsubcategories.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.itemsubcategories import ItemSubcategoriesInDB
from app.models.itemsubcategories import ItemSubcategories
from app.db import get_db
from sqlalchemy.orm import joinedload
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
            result = []
            for r in records:
                result.append(ItemSubcategoriesInDB(
                    ItemSubcategoryID=r.ItemSubcategoryID,
                    ItemCategoryID=r.ItemCategoryID,
                    SubcategoryName=r.SubcategoryName,
                    CategoryName=getattr(r.itemCategories_, 'CategoryName', None)
                ))
            return result
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
            return ItemSubcategoriesInDB(
                ItemSubcategoryID=record.ItemSubcategoryID,
                ItemCategoryID=record.ItemCategoryID,
                SubcategoryName=record.SubcategoryName,
                CategoryName=getattr(record.itemCategories_, 'CategoryName', None)
            )
        finally:
            db_gen.close()

    # NUEVA FUNCIÓN AGREGADA
    @strawberry.field
    def itemsubcategories_by_category(self, info: Info, categoryID: int) -> List[ItemSubcategoriesInDB]:
        """Obtener subcategorías filtradas por categoría"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            records = db.query(ItemSubcategories).options(
                joinedload(ItemSubcategories.itemCategories_)
            ).filter(ItemSubcategories.ItemCategoryID == categoryID).all()
            result = []
            for r in records:
                result.append(ItemSubcategoriesInDB(
                    ItemSubcategoryID=r.ItemSubcategoryID,
                    ItemCategoryID=r.ItemCategoryID,
                    SubcategoryName=r.SubcategoryName,
                    CategoryName=getattr(r.itemCategories_, 'CategoryName', None)
                ))
            return result
        finally:
            db_gen.close()


itemsubcategoriesQuery = ItemsubcategoriesQuery()