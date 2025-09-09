# app/graphql/crud/vendors.py
from sqlalchemy.orm import Session
from app.models.vendors import Vendors
from app.graphql.schemas.vendors import VendorsCreate, VendorsUpdate


def get_vendors(db: Session):
    return db.query(Vendors).all()


def get_vendors_by_id(db: Session, vendor_id: int):
    return db.query(Vendors).filter(Vendors.VendorID == vendor_id).first()


def create_vendors(db: Session, data: VendorsCreate):
    obj = Vendors(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_vendors(db: Session, vendor_id: int, data: VendorsUpdate):
    obj = get_vendors_by_id(db, vendor_id)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_vendors(db: Session, vendor_id: int):
    obj = get_vendors_by_id(db, vendor_id)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
