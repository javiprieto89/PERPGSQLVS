# app/graphql/crud/cashboxmovements.py
from sqlalchemy.orm import Session
from app.models.cashboxmovements import CashBoxMovements
from app.graphql.schemas.cashboxmovements import CashBoxMovementsCreate, CashBoxMovementsUpdate


def get_cashboxmovements(db: Session):
    return db.query(CashBoxMovements).all()


def get_cashboxmovements_by_id(db: Session, movement_id: int):
    return db.query(CashBoxMovements).filter(CashBoxMovements.CashBoxMovementID == movement_id).first()


def create_cashboxmovements(db: Session, data: CashBoxMovementsCreate):
    obj = CashBoxMovements(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_cashboxmovements(db: Session, movement_id: int, data: CashBoxMovementsUpdate):
    obj = get_cashboxmovements_by_id(db, movement_id)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_cashboxmovements(db: Session, movement_id: int):
    obj = get_cashboxmovements_by_id(db, movement_id)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
