# app/graphql/crud/servicetype.py
from sqlalchemy.orm import Session
from dataclasses import asdict
# si tu modelo se llama así, está bien
from app.models.servicetype import ServiceType
from app.graphql.schemas import servicetype as schema


def get_servicetypes(db: Session):
    return db.query(ServiceType).all()


def get_servicetypes_by_id(db: Session, id: int):
    return db.query(ServiceType).filter(ServiceType.serviceTypeID == id).first()


def create(db: Session, record: schema.ServiceTypeCreate):
    db_record = ServiceType(**asdict(record))
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record


def update(db: Session, id: int, record: schema.ServiceTypeUpdate):
    db_record = get_servicetypes_by_id(db, id)
    if db_record:
        for k, v in asdict(record).items():
            if v is not None:
                setattr(db_record, k, v)
        db.commit()
        db.refresh(db_record)
    return db_record


def delete(db: Session, id: int):
    db_record = get_servicetypes_by_id(db, id)
    if db_record:
        db.delete(db_record)
        db.commit()
    return db_record
