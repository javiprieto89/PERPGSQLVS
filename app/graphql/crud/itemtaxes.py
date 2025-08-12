# app/graphql/crud/itemtaxes.py
from sqlalchemy.orm import Session
from app.models.itemtaxes import ItemTaxes
from app.graphql.schemas.itemtaxes import ItemTaxesCreate, ItemTaxesUpdate


def get_itemtaxes(db: Session):
    return db.query(ItemTaxes).all()


def get_itemtaxes_by_id(db: Session, itemtaxid: int):
    return db.query(ItemTaxes).filter(ItemTaxes.ItemTaxID == itemtaxid).first()


def create_itemtaxes(db: Session, data: ItemTaxesCreate):
    obj = ItemTaxes(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_itemtaxes(db: Session, itemtaxid: int, data: ItemTaxesUpdate):
    obj = get_itemtaxes_by_id(db, itemtaxid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_itemtaxes(db: Session, itemtaxid: int):
    obj = get_itemtaxes_by_id(db, itemtaxid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
