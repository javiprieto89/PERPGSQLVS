# app/graphql/crud/rmadetails.py
from typing import Optional
from sqlalchemy.orm import Session

from app.models.rmadetails import RMADetails
from app.graphql.schemas.rmadetails import (
    RMADetailCreate,
    RMADetailUpdate,
    RMADetailFilter,
)


def _clean_input(data) -> dict:
    return {k: v for k, v in vars(data).items() if v is not None}


def get_rma_details(db: Session, filter: Optional[RMADetailFilter] = None):
    query = db.query(RMADetails)
    if filter:
        if filter.CompanyID is not None:
            query = query.filter(RMADetails.CompanyID == filter.CompanyID)
        if filter.BranchID is not None:
            query = query.filter(RMADetails.BranchID == filter.BranchID)
        if filter.RmaID is not None:
            query = query.filter(RMADetails.RmaID == filter.RmaID)
        if filter.ItemID is not None:
            query = query.filter(RMADetails.ItemID == filter.ItemID)
    return query.order_by(RMADetails.RmaID, RMADetails.RmaDetailID).all()


def get_rma_detail_by_id(
    db: Session,
    company_id: int,
    branch_id: int,
    rma_id: int,
    rma_detail_id: int,
):
    return (
        db.query(RMADetails)
        .filter(
            RMADetails.CompanyID == company_id,
            RMADetails.BranchID == branch_id,
            RMADetails.RmaID == rma_id,
            RMADetails.RmaDetailID == rma_detail_id,
        )
        .first()
    )


def create_rma_detail(db: Session, data: RMADetailCreate):
    payload = _clean_input(data)
    obj = RMADetails(**payload)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_rma_detail(
    db: Session,
    company_id: int,
    branch_id: int,
    rma_id: int,
    rma_detail_id: int,
    data: RMADetailUpdate,
):
    obj = get_rma_detail_by_id(db, company_id, branch_id, rma_id, rma_detail_id)
    if obj:
        for key, value in _clean_input(data).items():
            setattr(obj, key, value)
        db.commit()
        db.refresh(obj)
    return obj


def delete_rma_detail(
    db: Session,
    company_id: int,
    branch_id: int,
    rma_id: int,
    rma_detail_id: int,
):
    obj = get_rma_detail_by_id(db, company_id, branch_id, rma_id, rma_detail_id)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
