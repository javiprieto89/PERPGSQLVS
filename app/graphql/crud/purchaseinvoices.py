# app/crud/purchaseinvoices.py - VERSIÓN COMPLETA
# Resumen: CRUD para facturas de compra (PurchaseInvoices).

from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from app.models.purchaseinvoices import PurchaseInvoices
from app.models.purchaseinvoicedetails import PurchaseInvoiceDetails
import datetime


def get_purchaseinvoices(db: Session) -> List[PurchaseInvoices]:
    return (
        db.query(PurchaseInvoices)
        .options(
            joinedload(PurchaseInvoices.PurchaseInvoiceDetails).joinedload(
                PurchaseInvoiceDetails.Items_),
            joinedload(PurchaseInvoices.PurchaseInvoiceDetails).joinedload(
                PurchaseInvoiceDetails.Warehouses_),
            joinedload(PurchaseInvoices.PurchaseInvoiceDetails).joinedload(
                PurchaseInvoiceDetails.Branches_),
            joinedload(PurchaseInvoices.Company_),
            joinedload(PurchaseInvoices.Branches_),
            joinedload(PurchaseInvoices.Suppliers_),
            joinedload(PurchaseInvoices.Users_),
        )
        .all()
    )


def get_purchaseinvoice_by_id(db: Session, company_id: int, branch_id: int, id: int) -> Optional[PurchaseInvoices]:
    return (
        db.query(PurchaseInvoices)
        .options(
            joinedload(PurchaseInvoices.PurchaseInvoiceDetails).joinedload(
                PurchaseInvoiceDetails.Items_),
            joinedload(PurchaseInvoices.PurchaseInvoiceDetails).joinedload(
                PurchaseInvoiceDetails.Warehouses_),
            joinedload(PurchaseInvoices.PurchaseInvoiceDetails).joinedload(
                PurchaseInvoiceDetails.Branches_),
            joinedload(PurchaseInvoices.Company_),
            joinedload(PurchaseInvoices.Branches_),
            joinedload(PurchaseInvoices.Suppliers_),
            joinedload(PurchaseInvoices.Users_),
        )
        .filter(
            PurchaseInvoices.CompanyID == company_id,
            PurchaseInvoices.BranchID == branch_id,
            PurchaseInvoices.PurchaseInvoiceID == id
        )
        .first()
    )


def create_purchaseinvoice(db: Session, data) -> PurchaseInvoices:
    new_item = PurchaseInvoices(
        CompanyID=data.CompanyID,
        BranchID=data.BranchID,
        SupplierID=data.SupplierID,
        InvoiceNumber=data.InvoiceNumber,
        InvoiceDate=data.InvoiceDate,
        TotalAmount=data.TotalAmount,
        Notes=data.Notes,
        CreatedAt=datetime.datetime.utcnow()
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


def update_purchaseinvoice(db: Session, company_id: int, branch_id: int, id: int, data) -> Optional[PurchaseInvoices]:
    item = (
        db.query(PurchaseInvoices)
        .filter(
            PurchaseInvoices.CompanyID == company_id,
            PurchaseInvoices.BranchID == branch_id,
            PurchaseInvoices.PurchaseInvoiceID == id
        )
        .first()
    )
    if not item:
        return None

    for field, value in data.__dict__.items():
        if hasattr(item, field) and value is not None:
            setattr(item, field, value)

    db.commit()
    db.refresh(item)
    return item


def delete_purchaseinvoice(db: Session, company_id: int, branch_id: int, id: int) -> bool:
    item = (
        db.query(PurchaseInvoices)
        .filter(
            PurchaseInvoices.CompanyID == company_id,
            PurchaseInvoices.BranchID == branch_id,
            PurchaseInvoices.PurchaseInvoiceID == id
        )
        .first()
    )
    if not item:
        return False

    db.delete(item)
    db.commit()
    return True
