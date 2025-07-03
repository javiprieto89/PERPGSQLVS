# app/graphql/crud/creditcards.py

from sqlalchemy.orm import Session
from app.models.creditcards import CreditCards
from app.graphql.schemas.creditcards import CreditCardsCreate, CreditCardsUpdate


def get_creditcards(db: Session):
    return db.query(CreditCards).all()


def get_creditcard_by_id(db: Session, id: int):
    return db.query(CreditCards).filter(CreditCards.CreditCardID == id).first()


def get_creditcard_by_name(db: Session, name: str):
    return db.query(CreditCards).filter(CreditCards.CardName.ilike(f"%{name}%")).all()


def create_creditcard(db: Session, data: CreditCardsCreate):
    obj = CreditCards(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_creditcard(db: Session, id: int, data: CreditCardsUpdate):
    obj = get_creditcard_by_id(db, id)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_creditcard(db: Session, id: int):
    obj = get_creditcard_by_id(db, id)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
