# app/auth.py - VERSIÓN COMPLETA
from datetime import datetime, timezone, timedelta
from jose import JWTError, jwt
from sqlalchemy.orm import Session
import bcrypt

from app.db import get_db
from app.models.users import Users
from app.graphql.schemas.auth import UserInfo, UserPermissionsInfo

from app.config import settings
import logging

logger = logging.getLogger(__name__)


class AuthenticationError(Exception):
    """Error específico para fallos de autenticación."""
    pass


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """Crear token JWT de acceso"""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def verify_password(plain_password: str | bytes, hashed_password: str | bytes) -> bool:
    """Verificar contraseña usando bcrypt

    Args:
        plain_password: Contraseña en texto plano (str o bytes)
        hashed_password: Contraseña hasheada (str o bytes)

    Returns:
        bool: True si la contraseña es válida, False en caso contrario
    """
    try:
        # Convertir a bytes si son strings
        if isinstance(plain_password, str):
            plain_password = plain_password.encode('utf-8')
        if isinstance(hashed_password, str):
            hashed_password = hashed_password.encode('utf-8')

        return bcrypt.checkpw(plain_password, hashed_password)
    except Exception:
        return False


def hash_password(password: str) -> str:
    """Hash de contraseña usando bcrypt"""
    password_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_bytes, salt)
    return hashed.decode('utf-8')


def authenticate_user(db: Session, nickname: str, password: str) -> Users | None:
    """
    Autenticar usuario con nickname y contraseña
    Retorna el usuario si las credenciales son válidas, None si no
    """
    try:
        # Buscar usuario por nickname
        user = db.query(Users).filter(Users.Nickname == nickname).first()

        if not user:
            return None

        user_dict = user.__dict__

        # Verificar que el usuario esté activo
        if not user_dict['IsActive']:
            return None

        # Verificar contraseña
        stored_password = user_dict['Password']
        if not stored_password:
            return None

        # Para desarrollo: permitir contraseñas en texto plano temporalmente
        # En producción, todas las contraseñas deben estar hasheadas
        if stored_password.startswith("$2b"):
            # Contraseña hasheada con bcrypt
            if verify_password(password, stored_password):
                return user
        else:
            # Contraseña en texto plano (para desarrollo)
            if password == stored_password:
                return user

        return None

    except Exception:
        logger.exception("Error autentificando usuario %s", nickname)
        return None


def get_user_model(token: str, db: Session) -> Users:
    """Obtener modelo de usuario desde token JWT"""
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        username = payload.get("sub")
        if not isinstance(username, str):
            raise AuthenticationError(
                "Token inválido: campo 'sub' no es un string")
    except JWTError as exc:
        raise AuthenticationError(
            "Token inválido: error en la decodificación") from exc

    # Buscar usuario por nickname
    user = db.query(Users).filter(Users.Nickname == username).first()
    if user is None:
        raise AuthenticationError("Usuario no encontrado")

    return user


def get_userinfo_from_token(token: str) -> UserInfo | None:
    """Convertir token JWT a información del usuario para GraphQL"""
    db_gen = get_db()
    db = next(db_gen)
    try:
        user_model = get_user_model(token, db)
        user_dict = user_model.__dict__

        # Construir la lista de UserPermissions usando __dict__
        user_permissions_list = []
        for access in user_model.userPermissions:
            access_dict = access.__dict__
            company_name = access.company_.__dict__[
                'CompanyName'] if access.company_ else ""
            branch_name = access.branches_.__dict__[
                'BranchName'] if access.branches_ else ""

            role_name = access.roles_.__dict__[
                'RoleName'] if access.roles_ else ""

            user_permissions_info = UserPermissionsInfo(
                UserID=access_dict['UserID'],
                CompanyID=access_dict['CompanyID'],
                CompanyName=company_name,
                BranchID=access_dict['BranchID'],
                BranchName=branch_name,
                RoleID=access_dict['RoleID'],
                RoleName=role_name
            )
            user_permissions_list.append(user_permissions_info)

        return UserInfo(
            UserID=user_dict['UserID'],
            Nickname=user_dict['Nickname'],
            FullName=user_dict['FullName'],
            IsActive=user_dict['IsActive'],
            UserPermissions=user_permissions_list
        )
    except AuthenticationError as exc:
        logger.info("Token inválido al obtener información de usuario: %s", exc)
        return None
    except Exception:
        logger.exception("Error inesperado obteniendo información de usuario")
        return None
    finally:
        db_gen.close()


def create_user_token(user: Users, company_id: int | None = None, branch_id: int | None = None) -> str:
    """Crear token JWT; company/branch son opcionales y se agregan si se proveen"""
    user_dict = user.__dict__
    token_data = {"sub": user_dict['Nickname']}

    if company_id is None:
        company_id = 1
    token_data["company_id"] = company_id
    if branch_id is None:
        branch_id = 1
    token_data["branch_id"] = branch_id
    return create_access_token(token_data)

# Funciones de utilidad para manejo de usuarios


def get_user_by_nickname(db: Session, nickname: str) -> Users | None:
    """Obtener usuario por nickname"""
    return db.query(Users).filter(Users.Nickname == nickname).first()


def get_user_by_id(db: Session, user_id: int) -> Users | None:
    """Obtener usuario por ID (Company-aware si se pasa company_id)"""
    q = db.query(Users).filter(Users.UserID == user_id)
    return q.first()


def create_user(db: Session, nickname: str, fullname: str, password: str, is_active: bool = True) -> Users:
    """Crear nuevo usuario"""
    # Hash de la contraseña
    hashed_password = hash_password(password)

    # Crear usuario
    user = Users(
        Nickname=nickname,
        FullName=fullname,
        Password=hashed_password,
        IsActive=is_active,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def update_user_password(db: Session, user_id: int, new_password: str) -> bool:
    """Actualizar contraseña de usuario"""
    try:
        user = get_user_by_id(db, user_id)
        if not user:
            return False

        # Hash de la nueva contraseña
        hashed_password = hash_password(new_password)
        # Use setattr for SQLAlchemy model attributes
        setattr(user, 'Password', hashed_password)

        db.commit()
        return True
    except Exception:
        db.rollback()
        return False
