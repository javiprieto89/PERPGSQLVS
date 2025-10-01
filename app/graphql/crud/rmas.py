# app/graphql/crud/rmas.py
from typing import Optional
from sqlalchemy.orm import Session

from app.models.rmas import RMAs
from app.graphql.schemas.rmas import RMACreate, RMAUpdate, RMAFilter


def _clean_input(data) -> dict:
    return {k: v for k, v in vars(data).items() if v is not None}


def get_rmas(db: Session, filter: Optional[RMAFilter] = None):
    query = db.query(RMAs)
    if filter:
        if filter.CompanyID is not None:
            query = query.filter(RMAs.CompanyID == filter.CompanyID)
        if filter.BranchID is not None:
            query = query.filter(RMAs.BranchID == filter.BranchID)
        if filter.RmaTypeID is not None:
            query = query.filter(RMAs.RmaTypeID == filter.RmaTypeID)
        if filter.StatusID is not None:
            query = query.filter(RMAs.StatusID == filter.StatusID)
        if filter.UserID is not None:
            query = query.filter(RMAs.UserID == filter.UserID)
        if filter.ClientID is not None:
            query = query.filter(RMAs.ClientID == filter.ClientID)
        if filter.SupplierID is not None:
            query = query.filter(RMAs.SupplierID == filter.SupplierID)
    return query.order_by(RMAs.RmaDate.desc(), RMAs.RmaID.desc()).all()


def get_rma_by_id(db: Session, company_id: int, branch_id: int, rma_id: int):
    return (
        db.query(RMAs)
        .filter(
            RMAs.CompanyID == company_id,
            RMAs.BranchID == branch_id,
            RMAs.RmaID == rma_id,
        )
        .first()
    )


def create_rma(db: Session, data: RMACreate):
    payload = _clean_input(data)
    obj = RMAs(**payload)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_rma(
    db: Session,
    company_id: int,
    branch_id: int,
    rma_id: int,
    data: RMAUpdate,
):
    obj = get_rma_by_id(db, company_id, branch_id, rma_id)
    if obj:
        for key, value in _clean_input(data).items():
            setattr(obj, key, value)
        db.commit()
        db.refresh(obj)
    return obj


def delete_rma(db: Session, company_id: int, branch_id: int, rma_id: int):
    obj = get_rma_by_id(db, company_id, branch_id, rma_id)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
