# app/graphql/crud/sysdoctypes.py
from sqlalchemy.orm import Session
from app.models.sys.doctypes import SysDocTypes


def get_sysdoctypes(db: Session):
    return db.query(SysDocTypes).all()


def get_sysdoctypes_by_id(db: Session, doctypeid: int):
    return db.query(SysDocTypes).filter(SysDocTypes.DocTypeID == doctypeid).first()


def create_sysdoctypes(db: Session, data):
    raise NotImplementedError("SysDocTypes is read-only")


def update_sysdoctypes(db: Session, doctypeid: int, data):
    raise NotImplementedError("SysDocTypes is read-only")


def delete_sysdoctypes(db: Session, doctypeid: int):
    raise NotImplementedError("SysDocTypes is read-only")
