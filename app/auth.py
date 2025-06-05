from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.db import get_db
from app.models.users import Users
from app.schemas.auth import UserInfo

# Asegurate de tener `settings.SECRET_KEY`, etc.
from app.config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def get_user_model(token: str, db: Session) -> Users:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        username = payload.get("sub")
        if not isinstance(username, str):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido"
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido"
        )

    user = db.query(Users).filter(Users.nickname == username).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado"
        )

    return user


def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
) -> UserInfo:
    user_model = get_user_model(token, db)

    return UserInfo.model_validate(
        {
            "userID": int(getattr(user_model, "userID")),
            "nickname": str(getattr(user_model, "nickname")),
            "fullname": (
                str(user_model.fullname) if getattr(user_model, "fullname") else None
            ),
            "userAccesses": [
                {
                    "userID": int(getattr(a, "userID")),
                    "company": getattr(a.company, "name") if a.company else "",
                    "branch": getattr(a.branch, "name") if a.branch else "",
                    "Role": getattr(a.Role, "roleName") if a.Role else "",
                    "branchID": int(a.branchID) if a.branchID is not None else None,
                }
                for a in user_model.userAccesses
            ],
        }
    )
