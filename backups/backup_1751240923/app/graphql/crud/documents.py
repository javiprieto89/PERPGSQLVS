from sqlalchemy.orm import Session
from app.models.documents import Documents
from app.graphql.schemas.documents import DocumentsCreate, DocumentsUpdate


def get_documents(db: Session):
    return db.query(Documents).all()


def get_documents_by_id(db: Session, documentID: int):
    return db.query(Documents).filter(Documents.documentID == documentID).first()


def create_documents(db: Session, data: DocumentsCreate):
    obj = Documents(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_documents(db: Session, documentID: int, data: DocumentsUpdate):
    obj = get_documents_by_id(db, documentID)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_documents(db: Session, documentID: int):
    obj = get_documents_by_id(db, documentID)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
