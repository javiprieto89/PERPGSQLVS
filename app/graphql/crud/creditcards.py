# app/graphql/crud/creditcards.py

from unittest import result
from sqlalchemy.orm import Session
from app.models.creditcards import CreditCards
from app.models.creditcardgroups import CreditCardGroups
from app.graphql.schemas.creditcards import CreditCardsCreate, CreditCardsUpdate


def get_creditcards(db: Session):
    result = db.query(
        CreditCards,
        CreditCardGroups.GroupName.label("GroupName"),
    ).join(CreditCardGroups, CreditCardGroups.CreditCardGroupID == CreditCards.CreditCardGroupID).all()
    records = []
    for credit_card, group_name in result:
        setattr(credit_card, "GroupName", group_name)
        records.append(credit_card)
    return records

def get_creditcard_by_id(db: Session, id: int):
    result = db.query(
        CreditCards,
        CreditCardGroups.GroupName.label("GroupName"),
    ).join(CreditCardGroups, CreditCardGroups.CreditCardGroupID == CreditCards.CreditCardGroupID)
    result = result.filter(CreditCards.CreditCardID == id).first()    
    if result:
        credit_card, group_name = result
        setattr(credit_card, "GroupName", group_name)
        return credit_card
    return None


def get_creditcard_by_name(db: Session, name: str):
    result = db.query(
        CreditCards,
        CreditCardGroups.GroupName.label("GroupName"),
    ).join(CreditCardGroups, CreditCardGroups.CreditCardGroupID == CreditCards.CreditCardGroupID)
    result = result.filter(CreditCards.CardName.ilike(f"%{name}%")).all()
    return result


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
