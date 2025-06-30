from sqlalchemy.orm import Session
from app.models.transactions import Transactions
from app.graphql.schemas.transactions import TransactionsCreate, TransactionsUpdate


def get_transactions(db: Session):
    return db.query(Transactions).all()


def get_transactions_by_id(db: Session, transactionid: int):
    return (
        db.query(Transactions)
        .filter(Transactions.TransactionID == transactionid)  # CORREGIDO: PascalCase
        .first()
    )


def create_transactions(db: Session, data: TransactionsCreate):
    obj = Transactions(**vars(data))  # CORREGIDO: usar vars() como patrón consistente
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_transactions(db: Session, transactionid: int, data: TransactionsUpdate):
    obj = get_transactions_by_id(db, transactionid)
    if obj:
        for k, v in vars(data).items():  # CORREGIDO: usar vars() como patrón consistente
            if v is not None:  # AGREGAR: verificación None
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_transactions(db: Session, transactionid: int):
    obj = get_transactions_by_id(db, transactionid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj