# brands.py
from sqlalchemy.orm import Session, joinedload
from app.models.items import Items
from app.models.brands import Brands
from app.graphql.schemas.brands import BrandsCreate, BrandsUpdate


def get_brands(db: Session):
    return db.query(Brands).options(joinedload(Brands.company_)).all()


def get_brands_by_company(db: Session, company_id: int):
    """Retrieve brands filtered by CompanyID"""
    return (
        db.query(Brands)
        .filter(Brands.CompanyID == company_id)
        .all()
    )


def get_brands_by_id(db: Session, company_id: int, brandid: int):
    return (
        db.query(Brands)
        .filter(Brands.CompanyID == company_id, Brands.BrandID == brandid)
        .first()
    )


def create_brands(db: Session, data: BrandsCreate):
    obj = Brands(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_brands(db: Session, company_id: int, brandid: int, data: BrandsUpdate):
    obj = get_brands_by_id(db, company_id, brandid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_brands(db: Session, company_id: int, brandid: int):
    obj = get_brands_by_id(db, company_id, brandid)
    if obj:
        linked_items = (
            db.query(Items)
            .filter(Items.CompanyID == company_id, Items.BrandID == brandid)
            .first()
            is not None
        )
        if linked_items:
            raise ValueError(
                "Cannot delete brand because it is referenced by existing items"
            )
        db.delete(obj)
        db.commit()
    return obj
