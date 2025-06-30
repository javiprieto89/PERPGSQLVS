# app/crud/useractions.py
from sqlalchemy.orm import Session
from dataclasses import asdict
from app.models.useractions import UserActions
from app.graphql.schemas import useractions as schema

def get_useractions(db: Session):
    return db.query(UserActions).all()

def get_useractions_by_id(db: Session, id: int):
    return db.query(UserActions).filter(UserActions.actionID == id).first()

def get_useractions_by_name(db: Session, name: str):
    return db.query(UserActions).filter(UserActions.actionName.ilike(f"%{name}%")).all()

def create(db: Session, record: schema.UserActionsCreate):
    db_record = UserActions(**asdict(record))
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record

def update(db: Session, id: int, record: schema.UserActionsUpdate):
    db_record = get_useractions_by_id(db, id)
    if db_record:
        for k, v in asdict(record).items():
            if v is not None:
                setattr(db_record, k, v)
        db.commit()
        db.refresh(db_record)
    return db_record

def delete(db: Session, id: int):
    db_record = get_useractions_by_id(db, id)
    if db_record:
        db.delete(db_record)
        db.commit()
    return db_record
