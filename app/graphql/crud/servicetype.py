# app/graphql/crud/servicetype.py
from sqlalchemy.orm import Session
from dataclasses import asdict
from app.models.servicetype import ServiceTypes
from app.models.orders import Orders
from app.models.orderhistory import OrderHistory
from app.graphql.schemas import servicetype as schema


def get_servicetypes(db: Session):
    return db.query(ServiceTypes).all()


def get_servicetypes_by_id(db: Session, company_id: int, id: int):
    return (
        db.query(ServiceTypes)
        .filter(ServiceTypes.CompanyID == company_id, ServiceTypes.ServiceTypeID == id)
        .first()
    )


def create(db: Session, record: schema.ServiceTypeCreate):
    db_record = ServiceTypes(**asdict(record))
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record


def update(db: Session, company_id: int, id: int, record: schema.ServiceTypeUpdate):
    db_record = get_servicetypes_by_id(db, company_id, id)
    if db_record:
        for k, v in asdict(record).items():
            if v is not None:
                setattr(db_record, k, v)
        db.commit()
        db.refresh(db_record)
    return db_record


def delete(db: Session, company_id: int, id: int):
    db_record = get_servicetypes_by_id(db, company_id, id)
    if db_record:
        # Ensure no orders or history records depend on this service type
        has_orders = db.query(Orders).filter(Orders.CompanyID == company_id, Orders.ServiceTypeID == id).first() is not None
        has_history = (
            db.query(OrderHistory)
            .filter(OrderHistory.CompanyID == company_id, OrderHistory.ServiceTypeID == id)
            .first()
            is not None
        )
        if has_orders or has_history:
            raise ValueError(
                "Cannot delete service type because it is referenced by existing orders"
            )
        db.delete(db_record)
        db.commit()
    return db_record

