# app/graphql/crud/doctypes.py
from sqlalchemy.orm import Session
from app.models.doctypes import DocTypes
from app.graphql.schemas.doctypes import DocTypesCreate, DocTypesUpdate


def get_doctypes(db: Session):
    return db.query(DocTypes).all()


def get_doctypes_by_id(db: Session, doctypeid: int):
    return db.query(DocTypes).filter(DocTypes.DocTypeID == doctypeid).first()


def create_doctypes(db: Session, data: DocTypesCreate):
    obj = DocTypes(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_doctypes(db: Session, doctypeid: int, data: DocTypesUpdate):
    obj = get_doctypes_by_id(db, doctypeid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_doctypes(db: Session, doctypeid: int):
    obj = get_doctypes_by_id(db, doctypeid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj