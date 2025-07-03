# crud/companydata.py
from sqlalchemy.orm import Session
from app.models.companydata import CompanyData
from app.graphql.schemas.companydata import CompanyDataCreate, CompanyDataUpdate


def get_companydata(db: Session):
    return db.query(CompanyData).all()


def get_companydata_by_id(db: Session, companyID: int):
    return db.query(CompanyData).filter(CompanyData.CompanyID == companyID).first()


def create_companydata(db: Session, data: CompanyDataCreate):
    obj = CompanyData(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_companydata(db: Session, companyID: int, data: CompanyDataUpdate):
    obj = get_companydata_by_id(db, companyID)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_companydata(db: Session, companyID: int):
    obj = get_companydata_by_id(db, companyID)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
