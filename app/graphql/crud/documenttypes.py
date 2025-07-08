# app/graphql/crud/documenttypes.py
from sqlalchemy.orm import Session
from sqlalchemy import exists
from app.models.documenttypes import DocumentTypes
from app.models.orders import Orders
from app.graphql.schemas.documenttypes import (
    DocumentTypesCreate,
    DocumentTypesUpdate,
)


def get_documenttypes(db: Session):
    return db.query(DocumentTypes).all()


def get_documenttypes_by_id(db: Session, id: int):
    return db.query(DocumentTypes).filter(DocumentTypes.DocumentTypeID == id).first()


def create_documenttypes(db: Session, data: DocumentTypesCreate):
    obj = DocumentTypes(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_documenttypes(db: Session, id: int, data: DocumentTypesUpdate):
    obj = get_documenttypes_by_id(db, id)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_documenttypes(db: Session, id: int):
    obj = get_documenttypes_by_id(db, id)
    if obj:
        # Prevent deletion if there are orders linked to this document type
        linked = db.query(exists().where(Orders.DocumentID == id)).scalar()
        if linked:
            raise ValueError(
                "Cannot delete document type because there are orders referencing it"
            )
        db.delete(obj)
        db.commit()
    return obj
