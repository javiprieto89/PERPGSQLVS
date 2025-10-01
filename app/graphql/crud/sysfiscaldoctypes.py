# app/graphql/crud/sysfiscaldoctypes.py
from sqlalchemy.orm import Session

from app.models.sysfiscaldoctypes import SysFiscalDocTypes


def get_sysfiscaldoctypes(db: Session):
    return db.query(SysFiscalDocTypes).order_by(SysFiscalDocTypes.DocumentTypeID).all()


def get_sysfiscaldoctypes_by_id(db: Session, document_type_id: int):
    return (
        db.query(SysFiscalDocTypes)
        .filter(SysFiscalDocTypes.DocumentTypeID == document_type_id)
        .first()
    )