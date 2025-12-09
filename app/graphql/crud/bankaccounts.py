# app/crud/bankaccounts.py
from sqlalchemy.orm import Session
from app.models.bankaccounts import BankAccounts
from app.graphql.schemas.bankaccounts import BankAccountsCreate, BankAccountsUpdate


def get_bankaccounts(db: Session):
    return db.query(BankAccounts).all()


def get_bankaccounts_by_company(db: Session, company_id: int):
    return db.query(BankAccounts).filter(BankAccounts.CompanyID == company_id).all()

def get_bankaccounts_by_alias(db: Session, alias: str):
    return db.query(BankAccounts).filter(BankAccounts.Alias == alias).all()

def get_bankaccounts_by_id(db: Session,  bankaccountid: int):
    return (
        db.query(BankAccounts)
        .filter(BankAccounts.BankAccountID == bankaccountid)
        .first()
    )


def create_bankaccounts(db: Session, data: BankAccountsCreate):
    obj = BankAccounts(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_bankaccounts(db: Session, bankaccountid: int, data: BankAccountsUpdate):
    obj = get_bankaccounts_by_id(db, bankaccountid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_bankaccounts(db: Session, bankaccountid: int):
    obj = get_bankaccounts_by_id(db, bankaccountid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj