# app/graphql/crud/users.py
from sqlalchemy.orm import Session
from app.models.users import Users
from app.graphql.schemas.users import UsersCreate, UsersUpdate


def get_users(db: Session):
    return db.query(Users).all()


def get_user_by_nickname(db: Session, nickname: str):
    # CORRECCIÓN: Usar PascalCase como en toda la base de datos
    return db.query(Users).filter(Users.Nickname == nickname).first()


def get_user_by_id(db: Session, userID: int):
    return db.query(Users).filter(Users.UserID == userID).first()


def create_users(db: Session, data: UsersCreate):
    obj = Users(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_users(db: Session, userID: int, data: UsersUpdate):
    obj = get_user_by_id(db, userID)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_users(db: Session, userID: int):
    obj = get_user_by_id(db, userID)
    if obj:
        db.delete(obj)
        db.commit()
    return obj