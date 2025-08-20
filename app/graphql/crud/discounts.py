# app/graphql/crud/discounts.py
from sqlalchemy.orm import Session, joinedload
from app.models.discounts import Discounts
from app.graphql.schemas.discounts import DiscountsCreate, DiscountsUpdate


def get_discounts(db: Session):
    return db.query(Discounts).options(joinedload(Discounts.companyData_)).all()


def get_discounts_by_company(db: Session, company_id: int):
    """Retrieve discounts filtered by CompanyID"""
    return (
        db.query(Discounts)
        .options(joinedload(Discounts.companyData_))
        .filter(Discounts.CompanyID == company_id)
        .all()
    )


def get_discounts_by_id(db: Session, discountid: int):
    return (
        db.query(Discounts)
        .options(joinedload(Discounts.companyData_))
        .filter(Discounts.DiscountID == discountid)
        .first()
    )


def create_discounts(db: Session, data: DiscountsCreate):
    obj = Discounts(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_discounts(db: Session, discountid: int, data: DiscountsUpdate):
    obj = get_discounts_by_id(db, discountid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_discounts(db: Session, discountid: int):
    obj = get_discounts_by_id(db, discountid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
