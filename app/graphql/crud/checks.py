# app/graphql/crud/checks.py
from dataclasses import asdict
from typing import Optional

from sqlalchemy.orm import Session, joinedload

from app.models.checks import Checks
from app.models.checkmovements import CheckMovements
from app.graphql.schemas.checks import ChecksCreate, ChecksUpdate


def _base_query(db: Session):
    return db.query(Checks).options(
        joinedload(Checks.Banks_),
        joinedload(Checks.CheckStatuses_),
        joinedload(Checks.sysCurrencies),
        joinedload(Checks.company_),
    )


def get_checks(db: Session):
    return _base_query(db).all()


def get_checks_by_company(db: Session, company_id: int):
    return _base_query(db).filter(Checks.CompanyID == company_id).all()


def get_check_by_id(db: Session, check_id: int, company_id: Optional[int] = None):
    query = _base_query(db).filter(Checks.CheckID == check_id)
    if company_id is not None:
        query = query.filter(Checks.CompanyID == company_id)
    return query.first()


def create_check(db: Session, data: ChecksCreate):
    payload = {k: v for k, v in asdict(data).items() if v is not None}
    obj = Checks(**payload)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_check(db: Session, check_id: int, data: ChecksUpdate, company_id: Optional[int] = None):
    obj = get_check_by_id(db, check_id=check_id, company_id=company_id)
    if obj:
        for key, value in asdict(data).items():
            if value is not None:
                setattr(obj, key, value)
        db.commit()
        db.refresh(obj)
    return obj


def delete_check(db: Session, check_id: int, company_id: Optional[int] = None):
    obj = get_check_by_id(db, check_id=check_id, company_id=company_id)
    if obj:
        has_movements = (
            db.query(CheckMovements)
            .filter(CheckMovements.CheckID == obj.CheckID)
            .first()
            is not None
        )
        if has_movements:
            raise ValueError(
                "Cannot delete check because it has associated movements")

        db.delete(obj)
        db.commit()
    return obj
