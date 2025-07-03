# graphql/crud/saleconditions.py
from sqlalchemy.orm import Session
from app.models.saleconditions import SaleConditions
from app.graphql.schemas.saleconditions import (
    SaleConditionsCreate,
    SaleConditionsUpdate,
)


def get_saleconditions(db: Session):
    return db.query(SaleConditions).all()


def get_saleconditions_by_id(db: Session, saleconditionid: int):
    return (
        db.query(SaleConditions)
        .filter(SaleConditions.SaleConditionID == saleconditionid)
        .first()
    )


def create_saleconditions(db: Session, data: SaleConditionsCreate):
    obj = SaleConditions(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_saleconditions(
    db: Session, saleconditionid: int, data: SaleConditionsUpdate
):
    obj = get_saleconditions_by_id(db, saleconditionid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_saleconditions(db: Session, saleconditionid: int):
    obj = get_saleconditions_by_id(db, saleconditionid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
