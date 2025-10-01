# app/graphql/crud/userpermissions.py

from sqlalchemy.orm import Session, joinedload
from app.models.userapermissions import UserPermissions
from app.graphql.schemas.userapermissions import UserPermissionsCreate, UserPermissionsUpdate


def get_userpermissions(db: Session):
    return (
        db.query(UserPermissions)
        .options(
            joinedload(UserPermissions.users_),
            joinedload(UserPermissions.branches_),
            joinedload(UserPermissions.roles_),
            joinedload(UserPermissions.company_),
        )
        .all()
    )


def get_userpermissions_by_userid(db: Session, userID: int):
    """Obtiene TODOS los accesos de un usuario para que pueda elegir"""
    return (
        db.query(UserPermissions)
        .options(
            joinedload(UserPermissions.users_),
            joinedload(UserPermissions.branches_),
            joinedload(UserPermissions.roles_),
            joinedload(UserPermissions.company_),
        )
        .filter(UserPermissions.UserID == userID)
        .all()
    )


def get_userpermissions_by_id(db: Session, userID: int, companyID: int, branchID: int, roleID: int):
    return (
        db.query(UserPermissions)
        .options(
            joinedload(UserPermissions.users_),
            joinedload(UserPermissions.branches_),
            joinedload(UserPermissions.roles_),
            joinedload(UserPermissions.company_),
        )
        .filter_by(
            userID=userID,
            companyID=companyID,
            branchID=branchID,
            roleID=roleID,
        )
        .first()
    )


def create_userpermissions(db: Session, data: UserPermissionsCreate):
    obj = UserPermissions(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def delete_userpermissions(db: Session, userID: int, companyID: int, branchID: int, roleID: int):
    obj = get_userpermissions_by_id(db, userID, companyID, branchID, roleID)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
