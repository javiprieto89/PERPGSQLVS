# app/graphql/crud/sysdoctypes.py
from sqlalchemy.orm import Session
from app.models.sysdoctypes import SysDocTypes
from app.graphql.schemas.sysdoctypes import SysDocTypesCreate, SysDocTypesUpdate


def get_sysdoctypes(db: Session):
    return db.query(SysDocTypes).all()


def get_sysdoctypes_by_id(db: Session, doctypeid: int):
    return db.query(SysDocTypes).filter(SysDocTypes.DocTypeID == doctypeid).first()


def create_sysdoctypes(db: Session, data: SysDocTypesCreate):
    obj = SysDocTypes(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_sysdoctypes(db: Session, doctypeid: int, data: SysDocTypesUpdate):
    obj = get_sysdoctypes_by_id(db, doctypeid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_sysdoctypes(db: Session, doctypeid: int):
    obj = get_sysdoctypes_by_id(db, doctypeid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
