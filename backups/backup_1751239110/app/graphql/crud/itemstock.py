from sqlalchemy.orm import Session
from app.models.itemstock import Itemstock
from app.graphql.schemas.itemstock import ItemStockCreate, ItemStockUpdate


def get_itemstock(db: Session):
    return db.query(Itemstock).all()


def get_itemstock_by_id(db: Session, itemid: int):
    return db.query(Itemstock).filter(Itemstock.itemID == itemid).first()


def create_itemstock(db: Session, data: ItemStockCreate):
    obj = Itemstock(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_itemstock(db: Session, itemid: int, data: ItemStockUpdate):
    obj = get_itemstock_by_id(db, itemid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_itemstock(db: Session, itemid: int):
    obj = get_itemstock_by_id(db, itemid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
