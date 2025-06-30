# app/auth.py
from datetime import datetime, timedelta
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.db import get_db
from app.models.users import Users
from app.graphql.schemas.auth import UserInfo, UserAccessInfo  # Asegurate que UserAccess también sea strawberry.type

from app.config import settings

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
            raise ValueError("Token inválido: campo 'sub' no válido")
    except JWTError:
        raise ValueError("Token inválido: error en la decodificación")

    user = db.query(Users).filter(Users.nickname == username).first()
    if user is None:
        raise ValueError("Usuario no encontrado")

    return user

def get_userinfo_from_token(token: str) -> UserInfo | None:
    db = next(get_db())
    try:
        user_model = get_user_model(token, db)
        
        return UserInfo(
            UserID=user_model.UserID,
            Nickname=user_model.Nickname,
            Fullname=user_model.FullName,
            IsActive=user_model.IsActive,
            UserAccess=[
                UserAccessInfo(
                    UserID=access.UserID,
                    CompanyID=access.CompanyID,
                    Company=getattr(access.companyData_, 'Name', '') if hasattr(access, 'companyData_') and access.companyData_ else "",
                    BranchID=access.BranchID,
                    Branch=getattr(access.branches_, 'Name', '') if hasattr(access, 'branches_') and access.branches_ else "",
                    RoleID=access.RoleID,
                    Role=getattr(access.roles_, 'RoleName', '') if hasattr(access, 'roles_') and access.roles_ else ""
                )
                for access in user_model.userAccess
            ]
        )
    except Exception:
        return None
    finally:
        db.close()