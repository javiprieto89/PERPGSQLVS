from sqlalchemy.orm import Session
from sqlalchemy import exists
from app.models.items import Items
from app.models.itemsubcategories import ItemSubcategories
from app.models.itemcategories import ItemCategories
from app.graphql.schemas.itemcategories import (
    ItemCategoriesCreate,
    ItemCategoriesUpdate,
)


def get_itemcategories(db: Session):
    return db.query(ItemCategories).all()


def get_itemcategories_by_id(db: Session, categoryid: int):
    return (
        db.query(ItemCategories).filter(
            ItemCategories.ItemCategoryID == categoryid).first()
    )


def create_itemcategories(db: Session, data: ItemCategoriesCreate):
    obj = ItemCategories(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_itemcategories(db: Session, categoryid: int, data: ItemCategoriesUpdate):
    obj = get_itemcategories_by_id(db, categoryid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_itemcategories(db: Session, categoryid: int):
    obj = get_itemcategories_by_id(db, categoryid)
    if obj:
        linked_sub = db.query(
            exists().where(ItemSubcategories.ItemCategoryID == categoryid)
        ).scalar()
        linked_items = db.query(
            exists().where(Items.ItemCategoryID == categoryid)
        ).scalar()
        if linked_sub or linked_items:
            raise ValueError(
                "Cannot delete item category because it is referenced by other records"
            )
        db.delete(obj)
        db.commit()
    return obj
