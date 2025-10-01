# crud/company.py
from sqlalchemy.orm import Session
from app.models.company import Company
from app.graphql.schemas.company import CompanyCreate, CompanyUpdate
import base64


def _decode_logo(logo_str: str | None) -> bytes | None:
    if logo_str is None:
        return None
    try:
        return base64.b64decode(logo_str)
    except Exception:
        return None


def get_company(db: Session):
    return db.query(Company).all()


def get_company_by_id(db: Session, companyID: int):
    return db.query(Company).filter(Company.CompanyID == companyID).first()


def create_company(db: Session, data: CompanyCreate):
    data_dict = vars(data).copy()
    if data_dict.get("Logo"):
        data_dict["Logo"] = _decode_logo(data_dict["Logo"])

    # Map GraphQL field names to SQLAlchemy attribute names
    field_map = {"Grossincome": "GrossIncome", "Startdate": "StartDate"}
    for src, dest in field_map.items():
        if src in data_dict:
            data_dict[dest] = data_dict.pop(src)

    obj = Company(**data_dict)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_company(db: Session, companyID: int, data: CompanyUpdate):
    obj = get_company_by_id(db, companyID)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                if k == "Logo":
                    v = _decode_logo(v)

                field_map = {"Grossincome": "GrossIncome",
                             "Startdate": "StartDate"}
                attr = field_map.get(k, k)
                setattr(obj, attr, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_company(db: Session, companyID: int):
    obj = get_company_by_id(db, companyID)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
