# app/graphql/crud/itemsubcategories.py
from sqlalchemy.orm import Session
from dataclasses import asdict

from app.models.itemsubcategories import  ItemSubcategories
from app.graphql.schemas.itemsubcategories import ItemSubcategoriesCreate, ItemSubcategoriesUpdate

def get_itemsubcategories(db: Session):
    return db.query(ItemSubcategories).all()

def get_itemsubcategories_by_id(db: Session, subcategoryid: int):
    return db.query(ItemSubcategories).filter(
        ItemSubcategories.itemSubcategoryID == subcategoryid
    ).first()

def get_itemsubcategories_by_category_id(db: Session, category_id: int):
    return db.query(ItemSubcategories).filter(
        ItemSubcategories.itemCategoryID == category_id
    ).all()

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
        db.delete(obj)
        db.commit()
    return obj
