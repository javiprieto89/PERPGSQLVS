# app/graphql/crud/useraccess.py

from sqlalchemy.orm import Session
from app.models.useraccess import UserAccess
from app.graphql.schemas.useraccess import UserAccessCreate, UserAccessUpdate


def get_useraccess(db: Session):
    return db.query(UserAccess).all()

def get_useraccess_by_userid(db: Session, userID: int):
    """Obtiene TODOS los accesos de un usuario para que pueda elegir"""
    return db.query(UserAccess).filter(UserAccess.UserID == userID).all()

def get_useraccess_by_id(db: Session, userID: int, companyID: int, branchID: int, roleID: int):
    return db.query(UserAccess).filter_by(
        userID=userID,
        companyID=companyID,
        branchID=branchID,
        roleID=roleID
    ).first()


def create_useraccess(db: Session, data: UserAccessCreate):
    obj = UserAccess(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def delete_useraccess(db: Session, userID: int, companyID: int, branchID: int, roleID: int):
    obj = get_useraccess_by_id(db, userID, companyID, branchID, roleID)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
