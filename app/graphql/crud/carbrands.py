﻿# carbrands.py
from sqlalchemy.orm import Session
from app.models.carmodels import CarModels
from app.models.carbrands import CarBrands
from app.graphql.schemas.carbrands import CarBrandsCreate, CarBrandsUpdate


def get_carbrands(db: Session):
    return db.query(CarBrands).all()


def get_carbrands_by_company(db: Session, company_id: int):
    """Retrieve car brands filtered by CompanyID"""
    return db.query(CarBrands).filter(CarBrands.CompanyID == company_id).all()


def get_carbrands_by_id(db: Session, carbrandid: int):
    return db.query(CarBrands).filter(CarBrands.CarBrandID == carbrandid).first()


def create_carbrands(db: Session, data: CarBrandsCreate):
    obj = CarBrands(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_carbrands(db: Session, carbrandid: int, data: CarBrandsUpdate):
    obj = get_carbrands_by_id(db, carbrandid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_carbrands(db: Session, carbrandid: int):
    obj = get_carbrands_by_id(db, carbrandid)
    if obj:
        linked_models = (
            db.query(CarModels)
            .filter(CarModels.CarBrandID == carbrandid)
            .first()
            is not None
        )
        if linked_models:
            raise ValueError(
                "Cannot delete car brand because it is referenced by car models"
            )
        db.delete(obj)
        db.commit()
    return obj
