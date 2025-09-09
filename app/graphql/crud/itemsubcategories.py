# app/graphql/crud/itemsubcategories.py
from sqlalchemy.orm import Session, joinedload
from dataclasses import asdict
from app.models.items import Items

from app.models.itemsubcategories import ItemSubcategories
from app.models.itemcategories import ItemCategories
from app.graphql.schemas.itemsubcategories import ItemSubcategoriesCreate, ItemSubcategoriesUpdate

def get_itemsubcategories(db: Session):
    """Obtener subcategorías con sus relaciones"""
    return db.query(ItemSubcategories).options(joinedload(ItemSubcategories.itemCategories_)).all()

def get_itemsubcategories_by_id(db: Session, subcategoryid: int):
    """Obtener subcategoría por ID con relaciones"""
    return (
        db.query(ItemSubcategories)
        .options(joinedload(ItemSubcategories.itemCategories_))
        .filter(ItemSubcategories.ItemSubcategoryID == subcategoryid)
        .first()
    )

def get_itemsubcategories_by_category_id(db: Session, category_id: int):
    """Obtener subcategorías filtradas por categoría"""
    return (
        db.query(ItemSubcategories)
        .options(joinedload(ItemSubcategories.itemCategories_))
        .filter(ItemSubcategories.ItemCategoryID == category_id)
        .all()
    )

def create_itemsubcategories(db: Session, data: ItemSubcategoriesCreate):
    obj = ItemSubcategories(**asdict(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def update_itemsubcategories(db: Session, subcategoryid: int, data: ItemSubcategoriesUpdate):
    obj = get_itemsubcategories_by_id(db, subcategoryid)
    if obj:
        update_data = asdict(data)
        for k, v in update_data.items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj

def delete_itemsubcategories(db: Session, subcategoryid: int):
    obj = get_itemsubcategories_by_id(db, subcategoryid)
    if obj:
        linked_items = (
            db.query(Items)
            .filter(Items.ItemSubcategoryID == subcategoryid)
            .first()
            is not None
        )
        if linked_items:
            raise ValueError(
                "Cannot delete item subcategory because it is referenced by other records"
            )
        db.delete(obj)
        db.commit()
    return obj

