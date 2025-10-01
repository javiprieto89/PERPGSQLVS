# app/graphql/crud/creditcards.py

from unittest import result
from sqlalchemy.orm import Session, joinedload
from app.models.saleconditions import SaleConditions
from app.models.creditcards import CreditCards
from app.models.creditcardgroups import CreditCardGroups
from app.graphql.schemas.creditcards import CreditCardsCreate, CreditCardsUpdate


def get_creditcards(db: Session):
    return db.query(CreditCards).options(joinedload(CreditCards.creditCardGroup_)).all()

def get_creditcard_by_id(db: Session, id: int):
    return (
        db.query(CreditCards)
        .options(joinedload(CreditCards.creditCardGroup_))
        .filter(CreditCards.CreditCardID == id)
        .first()
    )


def get_creditcard_by_name(db: Session, name: str):
    return (
        db.query(CreditCards)
        .options(joinedload(CreditCards.creditCardGroup_))
        .filter(CreditCards.CardName.ilike(f"%{name}%"))
        .all()
    )


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
        linked_conditions = db.query(SaleConditions).filter(
            SaleConditions.CreditCardID == id
        ).first() is not None
        if linked_conditions:
            raise ValueError(
                "Cannot delete credit card because it is referenced by sale conditions"
            )
        db.delete(obj)
        db.commit()
    return obj

