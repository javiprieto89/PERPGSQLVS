# crud/companydata.py
from sqlalchemy.orm import Session
from app.models.companydata import CompanyData
from app.graphql.schemas.companydata import CompanyDataCreate, CompanyDataUpdate
import base64


def _decode_logo(logo_str: str | None) -> bytes | None:
    if logo_str is None:
        return None
    try:
        return base64.b64decode(logo_str)
    except Exception:
        return None


def get_companydata(db: Session):
    return db.query(CompanyData).all()


def get_companydata_by_id(db: Session, companyID: int):
    return db.query(CompanyData).filter(CompanyData.CompanyID == companyID).first()


def create_companydata(db: Session, data: CompanyDataCreate):
    data_dict = vars(data).copy()
    if data_dict.get("Logo"):
        data_dict["Logo"] = _decode_logo(data_dict["Logo"])

    # Map GraphQL field names to SQLAlchemy attribute names
    field_map = {"Grossincome": "GrossIncome", "Startdate": "StartDate"}
    for src, dest in field_map.items():
        if src in data_dict:
            data_dict[dest] = data_dict.pop(src)

    obj = CompanyData(**data_dict)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_companydata(db: Session, companyID: int, data: CompanyDataUpdate):
    obj = get_companydata_by_id(db, companyID)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                if k == "Logo":
                    v = _decode_logo(v)

                field_map = {"Grossincome": "GrossIncome", "Startdate": "StartDate"}
                attr = field_map.get(k, k)
                setattr(obj, attr, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_companydata(db: Session, companyID: int):
    obj = get_companydata_by_id(db, companyID)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
