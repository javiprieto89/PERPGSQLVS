from sqlalchemy.orm import Session
from app.models.documents import Documents
from app.graphql.schemas.documents import CommercialDocumentsCreate, CommercialDocumentsUpdate


def get_documents(db: Session):
    return db.query(Documents).all()


def get_documents_by_id(db: Session, documentID: int):
    return db.query(Documents).filter(Documents.DocumentID == documentID).first()


def create_documents(db: Session, data: CommercialDocumentsCreate):
    payload = vars(data).copy()
    # Mapear nombres GraphQL -> atributos ORM
    if 'DocumentDescription' in payload:
        payload['Description'] = payload.pop('DocumentDescription')
    if 'AffectsStock' in payload:
        payload['MovesStock'] = payload.pop('AffectsStock')
    obj = Documents(**payload)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_documents(db: Session, documentID: int, data: CommercialDocumentsUpdate):
    obj = get_documents_by_id(db, documentID)
    if obj:
        payload = vars(data).copy()
        if 'DocumentDescription' in payload and payload['DocumentDescription'] is not None:
            payload['Description'] = payload.pop('DocumentDescription')
        if 'AffectsStock' in payload and payload['AffectsStock'] is not None:
            payload['MovesStock'] = payload.pop('AffectsStock')
        for k, v in payload.items():
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

