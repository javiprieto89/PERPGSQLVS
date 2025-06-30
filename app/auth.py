# app/auth.py
import re
from datetime import datetime, timedelta
from typing import Optional

from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app.db import get_db
from app.models.users import Users
from app.graphql.schemas.auth import UserInfo, UserAccessInfo
from app.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Genera un JWT con el payload `data` y expiración `expires_delta`.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

def get_user_model(token: str, db: Session) -> Users:
    """
    Decodifica el token y retorna el Users correspondiente.
    Lanza ValueError si el token es inválido o el usuario no existe.
    """
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username = payload.get("sub")
        if not isinstance(username, str):
            raise ValueError("Token inválido: campo 'sub' no válido")
    except JWTError as e:
        raise ValueError(f"Token inválido: {e}")

    user = db.query(Users).filter(Users.Nickname == username).first()
    if user is None:
        raise ValueError("Usuario no encontrado")
    return user

def get_userinfo_from_token(token: str) -> Optional[UserInfo]:
    """
    Obtiene UserInfo (con sus accesos) desde un JWT.
    Retorna None si hay cualquier error de validación.
    """
    db_gen = get_db()
    db = next(db_gen)
    try:
        user_model = get_user_model(token, db)
        user_dict = user_model.__dict__

        # Construir lista de accesos usando __dict__ para evitar errores de Column
        user_access_list = []
        for access in user_model.userAccess:
            access_dict = access.__dict__
            company_name = access.companyData_.__dict__['Name'] if access.companyData_ else ""
            branch_name = access.branches_.__dict__['Name'] if access.branches_ else ""
            role_name = access.roles_.__dict__['RoleName'] if access.roles_ else ""
            
            ua = UserAccessInfo(
                UserID=access_dict['UserID'],
                CompanyID=access_dict['CompanyID'],
                Company=company_name,
                BranchID=access_dict['BranchID'],
                Branch=branch_name,
                RoleID=access_dict['RoleID'],
                Role=role_name
            )
            user_access_list.append(ua)

        # Construir UserInfo usando __dict__
        return UserInfo(
            UserID=user_dict['UserID'],
            Nickname=user_dict['Nickname'],
            FullName=user_dict['FullName'],
            IsActive=user_dict['IsActive'],
            UserAccess=user_access_list
        )
    except Exception as e:
        # DEBUG: print(f"Error en get_userinfo_from_token: {e}")
        return None
    finally:
        db.close()

def authenticate_user(nickname: str, password: str) -> Optional[Users]:
    """
    Verifica credenciales:
    - Si Users.Password comienza con '$2b', usa bcrypt.
    - En modo testing (texto plano), compara directamente.
    """
    db_gen = get_db()
    db = next(db_gen)
    try:
        user = db.query(Users).filter(Users.Nickname == nickname).first()
        if not user:
            return None

        user_dict = user.__dict__
        stored = user_dict['Password'] or ""
        if stored.startswith("$2b"):
            # bcrypt
            if not pwd_context.verify(password, stored):
                return None
        else:
            # texto plano en testing
            if password != stored:
                return None

        return user
    finally:
        db.close()