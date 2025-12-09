# app/crud/purchaseinvoicedetails.py - VERSIÓN COMPLETA
# Resumen: CRUD para detalles de facturas de compra (PurchaseInvoiceDetail).

from sqlalchemy.orm import Session
from typing import List, Optional
from app.graphql.schemas.purchaseinvoicedetails import PurchaseInvoiceDetailCreate, PurchaseInvoiceDetailUpdate
from app.models.purchaseinvoicedetails import PurchaseInvoiceDetails


def get_purchaseinvoicedetails(db: Session,) -> List[PurchaseInvoiceDetails]:
        return db.query(PurchaseInvoiceDetails).all()


def get_purchaseinvoicedetail_by_id(db: Session, purchaseinvoice_id: int, purchaseinvoicedetail_id: int):
    return db.query(PurchaseInvoiceDetails).filter(PurchaseInvoiceDetails.PurchaseInvoiceID == purchaseinvoice_id, PurchaseInvoiceDetails.PurchaseInvoiceDetailID == purchaseinvoicedetail_id).all()


def create_purchaseinvoicedetail(db: Session, data) -> PurchaseInvoiceDetailCreate:
    obj = PurchaseInvoiceDetails(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_purchaseinvoicedetail(db: Session, purchaseinvoice_id: int, purchaseinvoicedetail_id: int, data: PurchaseInvoiceDetailUpdate):
    obj = get_purchaseinvoicedetail_by_id(db, purchaseinvoice_id, purchaseinvoicedetail_id)
    return (db.query(PurchaseInvoiceDetails)
        .filter(
            PurchaseInvoiceDetails.PurchaseInvoiceID == purchaseinvoice_id,
            PurchaseInvoiceDetails.PurchaseInvoiceDetailID == purchaseinvoicedetail_id
        )
        .first()
    )

def delete_purchaseinvoicedetail(db: Session, purchaseinvoice_id: int, purchaseinvoicedetail_id: int) -> bool:
    obj = get_purchaseinvoicedetail_by_id(db, purchaseinvoice_id, purchaseinvoicedetail_id)
    if obj:
        linked_models = (
            db.query(PurchaseInvoiceDetails)
            .filter(PurchaseInvoiceDetails.PurchaseInvoiceID == purchaseinvoice_id)
            .filter(PurchaseInvoiceDetails.PurchaseInvoiceDetailID == purchaseinvoicedetail_id)
            .first()
            is not None
        )
        if linked_models:
            raise ValueError(
                "Cannot delete purchase invoice detail because it is referenced by other records"
            )
        db.delete(obj)
        db.commit()
    return True
