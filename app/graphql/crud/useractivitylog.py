from sqlalchemy.orm import Session
from app.models.useractivitylog import UserActivityLog
from app.graphql.schemas.useractivitylog import (
    UserActivityLogCreate,
    UserActivityLogUpdate,
)


def get_useractivitylog(db: Session):
    return db.query(UserActivityLog).all()


def get_useractivitylog_by_id(db: Session, activityid: int):
    return (
        db.query(UserActivityLog)
        .filter(UserActivityLog.ActivityID == activityid)
        .first()
    )


def create_useractivitylog(db: Session, data: UserActivityLogCreate):
    obj = UserActivityLog(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_useractivitylog(db: Session, activityid: int, data: UserActivityLogUpdate):
    obj = get_useractivitylog_by_id(db, activityid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_useractivitylog(db: Session, activityid: int):
    obj = get_useractivitylog_by_id(db, activityid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj

