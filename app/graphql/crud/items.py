# app/graphql/crud/items.py
from sqlalchemy.orm import Session
from app.models.items import Items
from app.graphql.schemas.items import ItemsCreate, ItemsUpdate
from dataclasses import asdict

def get_items(db: Session):
    return db.query(Items).all()

def get_items_by_id(db: Session, item_id: int):
    return db.query(Items).filter(Items.ItemID == item_id).first()

def create_items(db: Session, item: ItemsCreate):
    db_item = Items(**asdict(item))
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_items(db: Session, item_id: int, item: ItemsUpdate):
    db_item = get_items_by_id(db, item_id)
    if db_item:
        for key, value in asdict(item).items():
            if value is not None:
                setattr(db_item, key, value)
        db.commit()
        db.refresh(db_item)
    return db_item

def delete_items(db: Session, item_id: int):
    db_item = get_items_by_id(db, item_id)
    if db_item:
        db.delete(db_item)
        db.commit()
    return db_item
