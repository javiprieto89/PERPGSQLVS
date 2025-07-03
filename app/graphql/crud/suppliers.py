from sqlalchemy.orm import Session
from app.models.suppliers import Suppliers
from app.graphql.schemas.suppliers import SuppliersCreate, SuppliersUpdate


def get_suppliers(db: Session):
    return db.query(Suppliers).all()


def get_suppliers_by_id(db: Session, supplierid: int):
    return db.query(Suppliers).filter(Suppliers.SupplierID == supplierid).first()


def create_suppliers(db: Session, data: SuppliersCreate):
    obj = Suppliers(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_suppliers(db: Session, supplierid: int, data: SuppliersUpdate):
    obj = get_suppliers_by_id(db, supplierid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_suppliers(db: Session, supplierid: int):
    obj = get_suppliers_by_id(db, supplierid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
