# app/graphql/crud/taxes.py
from sqlalchemy.orm import Session
from app.models.taxes import Taxes
from app.graphql.schemas.taxes import TaxesCreate, TaxesUpdate


def get_taxes(db: Session):
    return db.query(Taxes).all()


def get_taxes_by_id(db: Session, taxid: int):
    return db.query(Taxes).filter(Taxes.TaxID == taxid).first()


def create_taxes(db: Session, data: TaxesCreate):
    obj = Taxes(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_taxes(db: Session, taxid: int, data: TaxesUpdate):
    obj = get_taxes_by_id(db, taxid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_taxes(db: Session, taxid: int):
    obj = get_taxes_by_id(db, taxid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
