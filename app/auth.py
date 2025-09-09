# app/auth.py - VERSIÓN COMPLETA
from datetime import datetime, timedelta
from jose import JWTError, jwt
from sqlalchemy.orm import Session
import bcrypt

from app.db import get_db
from app.models.users import Users
from app.graphql.schemas.auth import UserInfo, UserAccessInfo

from app.config import settings

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """Crear token JWT de acceso"""
    to_encode = data.copy()
    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
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
            
    except Exception as e:
        print(f"Error en authenticate_user: {e}")
        return None

def get_user_model(token: str, db: Session) -> Users:
    """Obtener modelo de usuario desde token JWT"""
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        username = payload.get("sub")
        if not isinstance(username, str):
            raise ValueError("Token inválido: campo 'sub' no válido")
    except JWTError:
        raise ValueError("Token inválido: error en la decodificación")

    # Buscar usuario por nickname
    user = db.query(Users).filter(Users.Nickname == username).first()
    if user is None:
        raise ValueError("Usuario no encontrado")

    return user

def get_userinfo_from_token(token: str) -> UserInfo | None:
    """Convertir token JWT a información del usuario para GraphQL"""
    db_gen = get_db()
    db = next(db_gen)
    try:
        user_model = get_user_model(token, db)
        user_dict = user_model.__dict__
        
        # Construir la lista de UserAccess usando __dict__
        user_access_list = []
        for access in user_model.userAccess:
            access_dict = access.__dict__
            company_name = access.companyData_.__dict__['Name'] if access.companyData_ else ""
            branch_name = access.branches_.__dict__['Name'] if access.branches_ else ""
            role_name = access.roles_.__dict__['RoleName'] if access.roles_ else ""
            
            user_access_info = UserAccessInfo(
                UserID=access_dict['UserID'],
                CompanyID=access_dict['CompanyID'],
                Company=company_name,
                BranchID=access_dict['BranchID'],
                Branch=branch_name,
                RoleID=access_dict['RoleID'],
                Role=role_name
            )
            user_access_list.append(user_access_info)
        
        return UserInfo(
            UserID=user_dict['UserID'],
            Nickname=user_dict['Nickname'],
            FullName=user_dict['FullName'],
            IsActive=user_dict['IsActive'],
            UserAccess=user_access_list
        )
    except Exception:
        return None
    finally:
        db.close()

def create_user_token(user: Users) -> str:
    """Crear token para un usuario autenticado"""
    user_dict = user.__dict__
    token_data = {"sub": user_dict['Nickname']}
    return create_access_token(token_data)

# Funciones de utilidad para manejo de usuarios

def get_user_by_nickname(db: Session, nickname: str) -> Users | None:
    """Obtener usuario por nickname"""
    return db.query(Users).filter(Users.Nickname == nickname).first()

def get_user_by_id(db: Session, user_id: int) -> Users | None:
    """Obtener usuario por ID"""
    return db.query(Users).filter(Users.UserID == user_id).first()

def create_user(db: Session, nickname: str, fullname: str, password: str, is_active: bool = True) -> Users:
    """Crear nuevo usuario"""
    # Hash de la contraseña
    hashed_password = hash_password(password)
    
    # Crear usuario
    user = Users(
        Nickname=nickname,
        FullName=fullname,
        Password=hashed_password,
        IsActive=is_active
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
        setattr(user, 'Password', hashed_password)  # Use setattr for SQLAlchemy model attributes
        
        db.commit()
        return True
    except Exception:
        db.rollback()
        return False
    