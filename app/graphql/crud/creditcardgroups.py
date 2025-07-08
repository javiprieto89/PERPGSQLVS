# app/graphql/crud/creditcardgroups.py

from sqlalchemy.orm import Session
from sqlalchemy import exists
from app.models.creditcards import CreditCards
from app.models.creditcardgroups import CreditCardGroups
from app.graphql.schemas.creditcardgroups import CreditCardGroupsCreate, CreditCardGroupsUpdate


def get_creditcardgroups(db: Session):
    return db.query(CreditCardGroups).all()


def get_creditcardgroup_by_id(db: Session, id: int):
    return db.query(CreditCardGroups).filter(CreditCardGroups.CreditCardGroupID == id).first()


def get_creditcardgroup_by_name(db: Session, name: str):
    return db.query(CreditCardGroups).filter(CreditCardGroups.GroupName.ilike(f"%{name}%")).all()


def create_creditcardgroup(db: Session, data: CreditCardGroupsCreate):
    obj = CreditCardGroups(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_creditcardgroup(db: Session, id: int, data: CreditCardGroupsUpdate):
    obj = get_creditcardgroup_by_id(db, id)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_creditcardgroup(db: Session, id: int):
    obj = get_creditcardgroup_by_id(db, id)
    if obj:
        linked_cards = db.query(
            exists().where(CreditCards.CreditCardGroupID == id)
        ).scalar()
        if linked_cards:
            raise ValueError(
                "Cannot delete credit card group because it is referenced by existing credit cards"
            )
        db.delete(obj)
        db.commit()
    return obj
