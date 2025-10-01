# app/graphql/crud/sysidentitydoctypes.py
from sqlalchemy.orm import Session
from app.models.sysidentitydoctypes import SysIdentityDocTypes
from app.graphql.schemas.sysidentitydoctypes import (
    SysIdentityDocTypesCreate,
    SysIdentityDocTypesUpdate,
)


def get_sysidentitydoctypes(db: Session, only_active: bool | None = None):
    query = db.query(SysIdentityDocTypes)
    if only_active is not None:
        query = query.filter(SysIdentityDocTypes.IsActive == only_active)
    return query.order_by(SysIdentityDocTypes.DocTypeName).all()


def get_sysidentitydoctypes_by_id(db: Session, doctype_id: int):
    return (
        db.query(SysIdentityDocTypes)
        .filter(SysIdentityDocTypes.DocTypeID == doctype_id)
        .first()
    )


def create_sysidentitydoctypes(db: Session, data: SysIdentityDocTypesCreate):
    obj = SysIdentityDocTypes(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_sysidentitydoctypes(
    db: Session, doctype_id: int, data: SysIdentityDocTypesUpdate
):
    obj = get_sysidentitydoctypes_by_id(db, doctype_id)
    if obj:
        for key, value in vars(data).items():
            if value is not None:
                setattr(obj, key, value)
        db.commit()
        db.refresh(obj)
    return obj


def delete_sysidentitydoctypes(db: Session, doctype_id: int):
    obj = get_sysidentitydoctypes_by_id(db, doctype_id)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
