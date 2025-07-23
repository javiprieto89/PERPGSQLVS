# app/graphql/crud/sysdocumenttypes.py
from sqlalchemy.orm import Session
from sqlalchemy import exists
from app.models.sysdocumenttypes import SysDocumentTypes
from app.models.orders import Orders
from app.graphql.schemas.sysdocumenttypes import (
    SysDocumentTypesCreate,
    SysDocumentTypesUpdate,
)


def get_sysdocumenttypes(db: Session):
    return db.query(SysDocumentTypes).all()


def get_sysdocumenttypes_by_id(db: Session, id: int):
    return db.query(SysDocumentTypes).filter(SysDocumentTypes.DocumentTypeID == id).first()


def create_sysdocumenttypes(db: Session, data: SysDocumentTypesCreate):
    obj = SysDocumentTypes(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_sysdocumenttypes(db: Session, id: int, data: SysDocumentTypesUpdate):
    obj = get_sysdocumenttypes_by_id(db, id)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_sysdocumenttypes(db: Session, id: int):
    obj = get_sysdocumenttypes_by_id(db, id)
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
