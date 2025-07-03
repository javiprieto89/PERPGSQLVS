# app/graphql/crud/documenttypes.py
from sqlalchemy.orm import Session
from app.models.documenttypes import DocumentTypes

def get_documenttypes(db: Session):
    return db.query(DocumentTypes).all()

def get_documenttypes_by_id(db: Session, id: int):
    return db.query(DocumentTypes).filter(DocumentTypes.DocumentTypeID == id).first()
