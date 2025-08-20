# app/graphql/crud/sysdocumenttypes.py
from sqlalchemy.orm import Session
from app.models.sys.documenttypes import SysDocumentTypes


def get_sysdocumenttypes(db: Session):
    return db.query(SysDocumentTypes).all()


def get_sysdocumenttypes_by_id(db: Session, id: int):
    return db.query(SysDocumentTypes).filter(SysDocumentTypes.DocumentTypeID == id).first()


def create_sysdocumenttypes(db: Session, data):
    raise NotImplementedError("SysDocumentTypes is read-only")


def update_sysdocumenttypes(db: Session, id: int, data):
    raise NotImplementedError("SysDocumentTypes is read-only")


def delete_sysdocumenttypes(db: Session, id: int):
    raise NotImplementedError("SysDocumentTypes is read-only")
