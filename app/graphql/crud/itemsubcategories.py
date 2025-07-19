# app/graphql/crud/itemsubcategories.py
from sqlalchemy.orm import Session
from dataclasses import asdict
from sqlalchemy import exists
from app.models.items import Items

from app.models.itemsubcategories import ItemSubcategories
from app.models.itemcategories import ItemCategories
from app.graphql.schemas.itemsubcategories import ItemSubcategoriesCreate, ItemSubcategoriesUpdate

def get_itemsubcategories(db: Session):
    """Obtener subcategorías con el nombre de categoría"""
    results = db.query(
        ItemSubcategories,
        ItemCategories.CategoryName.label("CategoryName"),
    ).join(ItemCategories, ItemCategories.ItemCategoryID == ItemSubcategories.ItemCategoryID).all()

    records = []
    for subcat, cat_name in results:
        setattr(subcat, "CategoryName", cat_name)
        records.append(subcat)
    return records

def get_itemsubcategories_by_id(db: Session, subcategoryid: int):
    """Obtener subcategoría por ID con nombre de categoría"""
    result = db.query(
        ItemSubcategories,
        ItemCategories.CategoryName.label("CategoryName"),
    ).join(ItemCategories, ItemCategories.ItemCategoryID == ItemSubcategories.ItemCategoryID)
    result = result.filter(ItemSubcategories.ItemSubcategoryID == subcategoryid).first()
    if result:
        subcat, cat_name = result
        setattr(subcat, "CategoryName", cat_name)
        return subcat
    return None

def get_itemsubcategories_by_category_id(db: Session, category_id: int):
    """Obtener subcategorías filtradas por categoría incluyendo su nombre"""
    results = db.query(
        ItemSubcategories,
        ItemCategories.CategoryName.label("CategoryName"),
    ).join(ItemCategories, ItemCategories.ItemCategoryID == ItemSubcategories.ItemCategoryID)
    results = results.filter(ItemSubcategories.ItemCategoryID == category_id).all()

    records = []
    for subcat, cat_name in results:
        setattr(subcat, "CategoryName", cat_name)
        records.append(subcat)
    return records

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
        linked_items = db.query(
            exists().where(Items.ItemSubcategoryID == subcategoryid)
        ).scalar()
        if linked_items:
            raise ValueError(
                "Cannot delete item subcategory because it is referenced by other records"
            )
        db.delete(obj)
        db.commit()
    return obj
