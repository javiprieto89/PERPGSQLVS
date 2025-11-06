# app/auth.py - VERSIÓN COMPLETA
from datetime import datetime, timezone, timedelta
import secrets
from dataclasses import dataclass
from typing import Literal
from jose import JWTError, jwt
from sqlalchemy.orm import Session
import bcrypt
from argon2 import PasswordHasher, exceptions as argon2_exceptions

from app.db import get_db
from app.models.users import Users
from app.models.sessions import Sessions
from app.graphql.schemas.auth import UserInfo, UserPermissionsInfo

from app.config import settings
import logging

logger = logging.getLogger(__name__)

argon2_hasher = PasswordHasher()
ARGON2_PREFIX = "$argon2"
BCRYPT_PREFIXES = ("$2a$", "$2b$", "$2y$")


@dataclass
class AuthenticationResult:
    """Resultado detallado de autenticación."""

    user: Users
    password_state: Literal["argon2", "bcrypt", "plaintext"]
    requires_password_change: bool = False
    should_rehash: bool = False


def _is_argon2_hash(value: str | bytes) -> bool:
    """Detecta si el valor corresponde a un hash Argon2."""
    if isinstance(value, bytes):
        try:
            value = value.decode("utf-8")
        except UnicodeDecodeError:
            return False
    return value.startswith(ARGON2_PREFIX)


def _is_bcrypt_hash(value: str | bytes) -> bool:
    """Detecta si el valor corresponde a un hash bcrypt."""
    if isinstance(value, bytes):
        try:
            value = value.decode("utf-8")
        except UnicodeDecodeError:
            return False
    return value.startswith(BCRYPT_PREFIXES)


def classify_user_password(user: Users) -> Literal["argon2", "bcrypt", "plaintext", "unknown"]:
    """Clasifica cómo está almacenada la contraseña del usuario."""
    stored_password = getattr(user, "Password", None)
    if stored_password is None:
        return "unknown"
    if isinstance(stored_password, bytes):
        try:
            stored_password = stored_password.decode("utf-8")
        except UnicodeDecodeError:
            return "unknown"
    stored_password = str(stored_password)
    if not stored_password:
        return "unknown"
    if _is_argon2_hash(stored_password):
        return "argon2"
    if _is_bcrypt_hash(stored_password):
        return "bcrypt"
    return "plaintext"


def password_requires_change(user: Users) -> bool:
    """Indica si el usuario necesita actualizar su contraseña."""
    return classify_user_password(user) == "plaintext"


class AuthenticationError(Exception):
    """Error específico para fallos de autenticación."""
    pass


def _now_utc() -> datetime:
    """Obtener timestamp actual en UTC."""
    return datetime.now(timezone.utc)


def generate_refresh_token(length: int | None = None) -> str:
    """Genera un token de refresh aleatorio y seguro."""
    size = max(32, length or settings.REFRESH_TOKEN_BYTES)
    return secrets.token_urlsafe(size)


def calculate_refresh_expiration(reference: datetime | None = None) -> datetime:
    """Calcula el próximo sábado a las 00:00 (UTC) relativo al timestamp dado."""
    now = (reference or _now_utc()).astimezone(timezone.utc)
    midnight_today = now.replace(hour=0, minute=0, second=0, microsecond=0)
    days_until_saturday = (5 - now.weekday()) % 7
    expiration = midnight_today + timedelta(days=days_until_saturday)
    if expiration <= now:
        expiration += timedelta(days=7)
    return expiration


def get_primary_permission_ids(user: Users) -> tuple[int, int, int]:
    """Obtiene CompanyID/BranchID/RoleID principal para el usuario."""
    try:
        permissions = getattr(user, "userPermissions", None) or []
        if permissions:
            primary = permissions[0]
            return (primary.CompanyID, primary.BranchID, primary.RoleID)
    except Exception:
        logger.debug("No se pudieron obtener userPermissions para %s", getattr(user, "Nickname", "unknown"))
    return (1, 1, 1)


def _ensure_utc(dt: datetime | None) -> datetime | None:
    if dt is None:
        return None
    if dt.tzinfo is None:
        return dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(timezone.utc)


def create_session_record(
    db: Session,
    user: Users,
    refresh_token: str,
    expires_at: datetime,
    *,
    algorithm: str | None = None,
    client_ip: str | None = None,
    client_host: str | None = None,
    request_host: str | None = None,
    user_agent: str | None = None,
) -> Sessions:
    """Crea un registro de sesión persistente (refresh token)."""
    normalized_ua = (user_agent or "").strip()
    if not normalized_ua:
        identifier = client_host or client_ip or "unknown"
        normalized_ua = f"unknown::{identifier}"

    normalized_ip = (client_ip or "").strip() or None

    filters = [
        Sessions.UserID == user.UserID,
        Sessions.IsRevoked == False,  # BIT column; use = 0
        Sessions.UserAgent == normalized_ua,
    ]
    if normalized_ip is None:
        filters.append(Sessions.ClientIP.is_(None))
    else:
        filters.append(Sessions.ClientIP == normalized_ip)

    existing_session = (
        db.query(Sessions)
        .filter(*filters)
        .order_by(Sessions.SessionID.desc())
        .first()
    )

    if existing_session:
        now_utc = _now_utc()
        existing_session.Token = refresh_token
        existing_session.Algorithm = algorithm
        existing_session.ExpiresAt = expires_at
        existing_session.LastSeenAt = now_utc
        existing_session.ClientIP = normalized_ip
        existing_session.ClientHost = client_host
        existing_session.RequestHost = request_host
        existing_session.UserAgent = normalized_ua
        session = existing_session
    else:
        session = Sessions(
            UserID=user.UserID,
            Token=refresh_token,
            Algorithm=algorithm,
            ExpiresAt=expires_at,
            ClientIP=normalized_ip,
            ClientHost=client_host,
            RequestHost=request_host,
            UserAgent=normalized_ua,
        )
        db.add(session)

    db.commit()
    db.refresh(session)
    return session


def get_active_session_by_token(db: Session, token: str) -> Sessions | None:
    """Obtiene una sesión activa a partir del refresh token bruto."""
    now = _now_utc()
    return (
        db.query(Sessions)
        .filter(
            Sessions.Token == token,
            Sessions.IsRevoked == False,
            Sessions.ExpiresAt > now,
        )
        .first()
    )


def list_sessions_for_user(
    db: Session,
    current_user: Users,
    include_all: bool = False,
) -> list[Sessions]:
    """Lista sesiones activas e históricas para el usuario actual o todos si es admin total."""
    query = db.query(Sessions)
    if not include_all:
        query = query.filter(Sessions.UserID == current_user.UserID)
    return query.order_by(Sessions.CreatedAt.desc()).all()


def revoke_session(
    db: Session,
    session: Sessions,
    *,
    revoked_by_user_id: int | None = None,
    reason: str | None = None,
) -> Sessions:
    """Revoca una sesión (soft delete)."""
    if session.IsRevoked:
        return session

    now = _now_utc()
    session.IsRevoked = True
    created_at = _ensure_utc(session.CreatedAt) or now
    effective_revoked_at = now if now > created_at else created_at
    session.RevokedAt = effective_revoked_at
    session.RevokeReason = reason
    session.RevokedByUserID = revoked_by_user_id
    db.add(session)
    db.commit()
    db.refresh(session)
    return session


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """Crear token JWT de acceso"""
    to_encode = data.copy()
    expire = _now_utc() + (
        expires_delta or timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def _verify_bcrypt_password(plain_password: str | bytes, hashed_password: str | bytes) -> bool:
    """Verifica contraseñas legacy generadas con bcrypt."""
    try:
        if isinstance(plain_password, str):
            plain_password = plain_password.encode("utf-8")
        if isinstance(hashed_password, str):
            hashed_password = hashed_password.encode("utf-8")
        return bcrypt.checkpw(plain_password, hashed_password)
    except Exception:
        logger.exception("Error verificando contraseña legacy con bcrypt")
        return False


def hash_password(password: str) -> str:
    """Genera un hash Argon2id a partir de la contraseña dada."""
    return argon2_hasher.hash(password)


def authenticate_user(db: Session, nickname: str, password: str) -> AuthenticationResult | None:
    """
    Autentica un usuario y clasifica cómo está almacenada la contraseña.

    Retorna AuthenticationResult si las credenciales son válidas; None en caso contrario.
    """
    try:
        user = db.query(Users).filter(Users.Nickname == nickname).first()
        if not user:
            return None

        user_dict = user.__dict__
        if not user_dict["IsActive"]:
            return None

        stored_password = user_dict.get("Password")
        if stored_password is None:
            return None
        if isinstance(stored_password, bytes):
            try:
                stored_password = stored_password.decode("utf-8")
            except UnicodeDecodeError:
                logger.warning("Password almacenada no es UTF-8 para %s", nickname)
                return None

        stored_password = str(stored_password)
        if not stored_password:
            return None

        # Contraseñas hasheadas con Argon2id (nuevo esquema)
        if _is_argon2_hash(stored_password):
            try:
                argon2_hasher.verify(stored_password, password)
            except argon2_exceptions.VerifyMismatchError:
                return None
            except argon2_exceptions.VerificationError:
                logger.exception("Error verificando hash Argon2 para %s", nickname)
                return None

            needs_rehash = argon2_hasher.check_needs_rehash(stored_password)
            return AuthenticationResult(
                user=user,
                password_state="argon2",
                requires_password_change=False,
                should_rehash=needs_rehash,
            )

        # Contraseñas legacy con bcrypt
        if _is_bcrypt_hash(stored_password):
            if _verify_bcrypt_password(password, stored_password):
                return AuthenticationResult(
                    user=user,
                    password_state="bcrypt",
                    requires_password_change=False,
                    should_rehash=True,
                )
            return None

        # Fallback: contraseña almacenada en texto plano
        if password == stored_password:
            return AuthenticationResult(
                user=user,
                password_state="plaintext",
                requires_password_change=True,
                should_rehash=False,
            )

        return None

    except Exception:
        logger.exception("Error autentificando usuario %s", nickname)
        return None


def decode_token(token: str) -> dict:
    """Decodificar un token JWT y retornar sus claims"""
    try:
        return jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
    except JWTError as exc:
        raise AuthenticationError(
            "Token inválido: error en la decodificación"
        ) from exc


def get_user_model(token: str, db: Session) -> Users:
    """Obtener modelo de usuario desde token JWT"""
    try:
        payload = decode_token(token)
        username = payload.get("sub")
        if not isinstance(username, str):
            raise AuthenticationError(
                "Token inválido: campo 'sub' no es un string")
    except AuthenticationError:
        raise

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
            IsFullAdmin=user_dict.get('IsFullAdmin', False),
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


def create_user_token(
    user: Users,
    company_id: int | None = None,
    branch_id: int | None = None,
    role_id: int | None = None,
    session_id: int | None = None,
) -> str:
    """Crear token JWT; company/branch son opcionales y se agregan si se proveen"""
    nickname = getattr(user, "Nickname")
    token_data = {"sub": nickname}

    perm_company, perm_branch, perm_role = get_primary_permission_ids(user)

    if company_id is None:
        company_id = perm_company
    token_data["CompanyID"] = company_id
    if branch_id is None:
        branch_id = perm_branch
    token_data["BranchID"] = branch_id
    if role_id is None:
        role_id = perm_role
    token_data["RoleID"] = role_id
    if session_id is not None:
        token_data["SessionID"] = session_id
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
