# app/graphql/crud/cashboxes.py
from sqlalchemy.orm import Session
from app.models.cashboxes import CashBoxes
from app.graphql.schemas.cashboxes import CashBoxesCreate, CashBoxesUpdate


def get_cashboxes(db: Session):
    return db.query(CashBoxes).all()


def get_cashboxes_by_id(db: Session, cashbox_id: int):
    return db.query(CashBoxes).filter(CashBoxes.CashBoxID == cashbox_id).first()


def create_cashboxes(db: Session, data: CashBoxesCreate):
    obj = CashBoxes(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_cashboxes(db: Session, cashbox_id: int, data: CashBoxesUpdate):
    obj = get_cashboxes_by_id(db, cashbox_id)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_cashboxes(db: Session, cashbox_id: int):
    obj = get_cashboxes_by_id(db, cashbox_id)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
