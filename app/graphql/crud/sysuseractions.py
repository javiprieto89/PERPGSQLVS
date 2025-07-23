# app/graphql/crud/sysuseractions.py
from sqlalchemy.orm import Session
from sqlalchemy import exists
from dataclasses import asdict
from app.models.sysuseractions import SysUserActions
from app.models.useractivitylog import UserActivityLog
from app.graphql.schemas import sysuseractions as schema


def get_sysuseractions(db: Session):
    return db.query(SysUserActions).all()


def get_sysuseractions_by_id(db: Session, id: int):
    return db.query(SysUserActions).filter(SysUserActions.UserActionID == id).first()


def get_sysuseractions_by_name(db: Session, name: str):
    return db.query(SysUserActions).filter(SysUserActions.actionName.ilike(f"%{name}%")).all()


def create(db: Session, record: schema.SysUserActionsCreate):
    db_record = SysUserActions(**asdict(record))
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record


def update(db: Session, id: int, record: schema.SysUserActionsUpdate):
    db_record = get_sysuseractions_by_id(db, id)
    if db_record:
        for k, v in asdict(record).items():
            if v is not None:
                setattr(db_record, k, v)
        db.commit()
        db.refresh(db_record)
    return db_record


def delete(db: Session, id: int):
    db_record = get_sysuseractions_by_id(db, id)
    if db_record:
        # Verify no activity logs depend on this action
        linked = db.query(exists().where(UserActivityLog.UserActionID == id)).scalar()
        if linked:
            raise ValueError(
                "Cannot delete user action because it is referenced in the activity log"
            )
        db.delete(db_record)
        db.commit()
    return db_record
