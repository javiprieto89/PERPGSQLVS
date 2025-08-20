# app/graphql/crud/sysuseractions.py
from sqlalchemy.orm import Session
from app.models.sys.useractions import SysUserActions


def get_sysuseractions(db: Session):
    return db.query(SysUserActions).all()


def get_sysuseractions_by_id(db: Session, id: int):
    return db.query(SysUserActions).filter(SysUserActions.UserActionID == id).first()


def get_sysuseractions_by_name(db: Session, name: str):
    return db.query(SysUserActions).filter(SysUserActions.ActionName.ilike(f"%{name}%")).all()


def create_sysuseractions(db: Session, record):
    raise NotImplementedError("SysUserActions is read-only")


def update_sysuseractions(db: Session, id: int, record):
    raise NotImplementedError("SysUserActions is read-only")


def delete_sysuseractions(db: Session, id: int):
    raise NotImplementedError("SysUserActions is read-only")
