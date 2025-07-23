# accountbalances.py
from sqlalchemy.orm import Session
from app.models.accountbalances import AccountBalances
from app.graphql.schemas.accountbalances import (
    AccountBalancesCreate,
    AccountBalancesUpdate,
)


def get_accountbalances(db: Session):
    return db.query(AccountBalances).all()


def get_accountbalances_by_id(db: Session, accountid: int):
    return (
        db.query(AccountBalances).filter(AccountBalances.AccountID == accountid).first()
    )


def create_accountbalances(db: Session, data: AccountBalancesCreate):
    obj = AccountBalances(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_accountbalances(db: Session, accountid: int, data: AccountBalancesUpdate):
    obj = get_accountbalances_by_id(db, accountid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_accountbalances(db: Session, accountid: int):
    obj = get_accountbalances_by_id(db, accountid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
