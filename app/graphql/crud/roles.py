# graphql/crud/roles.py
from sqlalchemy.orm import Session
from app.models.roles import Roles
from app.graphql.schemas.roles import RolesCreate, RolesUpdate


def get_roles(db: Session):
    return db.query(Roles).all()


def get_roles_by_id(db: Session, roleID: int):
    return db.query(Roles).filter(Roles.RoleID == roleID).first()


def create_roles(db: Session, data: RolesCreate):
    obj = Roles(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_roles(db: Session, roleID: int, data: RolesUpdate):
    obj = get_roles_by_id(db, roleID)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_roles(db: Session, roleID: int):
    obj = get_roles_by_id(db, roleID)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
