# app/graphql/resolvers/auth.py
import strawberry
from typing import Optional
from datetime import datetime, timedelta
import jwt
import hashlib
from app.graphql.schemas.auth import LoginResponse, LoginRequest, UserInfo, UserAccessInfo
from app.graphql.crud.users import get_user_by_nickname
from app.db import get_db
from strawberry.types import Info
from app.models.users import Users
from app.config import settings

def hash_password(password: str) -> str:
    """Hashea la contraseña usando SHA256"""
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(password: str, hashed_password: str) -> bool:
    """Verifica si la contraseña coincide con el hash"""
    return hash_password(password) == hashed_password

@strawberry.type
class AuthMutation:
    @strawberry.mutation
    def login(self, info: Info, credentials: LoginRequest) -> Optional[LoginResponse]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            # Buscar usuario
            user = get_user_by_nickname(db, credentials.Nickname)
            if not user:
                return None

            # Verificar contraseña
            if not verify_password(credentials.Password, user.password):
                return None

            # Verificar que el usuario esté activo
            if not user.isActive:
                return None

            # Obtener accesos del usuario con joins para datos completos
            user_access = []
            for access in user.userAccess:
                user_access.append(UserAccessInfo(
                    UserID=access.userID,
                    CompanyID=access.companyID,
                    Company=access.company.name if access.company else "",
                    BranchID=access.branchID,
                    Branch=access.branch.name if access.branch else "",
                    RoleID=access.roleID,
                    Role=access.role.roleName if access.role else ""
                ))

            # Crear información del usuario
            user_info = UserInfo(
                UserID=user.userID,
                Nickname=user.nickname,
                Fullname=user.fullName,
                IsActive=user.isActive,
                UserAccess=user_access
            )

            # Generar JWT
            expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
            payload = {
                "sub": user.nickname,
                "user_id": user.userID,
                "exp": expire,
                "iat": datetime.utcnow()
            }
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

            return LoginResponse(
                access_token=token,
                token_type="bearer",
                user=user_info,
                expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
            )

        except Exception as e:
            print(f"Error en login: {e}")
            return None
        finally:
            db_gen.close()

    @strawberry.mutation
    def refresh_token(self, info: Info, token: str) -> Optional[LoginResponse]:
        """Renueva un token JWT válido"""
        try:
            # Decodificar token actual
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            nickname = payload.get("sub")
            
            if not nickname:
                return None

            # Re-autenticar usuario
            db_gen = get_db()
            db = next(db_gen)
            try:
                user = get_user_by_nickname(db, nickname)
                if not user or not user.isActive:
                    return None

                # Generar nuevo token
                expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
                new_payload = {
                    "sub": user.nickname,
                    "user_id": user.userID,
                    "exp": expire,
                    "iat": datetime.utcnow()
                }
                new_token = jwt.encode(new_payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

                # Recrear user info
                user_access = []
                for access in user.userAccess:
                    user_access.append(UserAccessInfo(
                        UserID=access.userID,
                        CompanyID=access.companyID,
                        Company=access.company.name if access.company else "",
                        BranchID=access.branchID,
                        Branch=access.branch.name if access.branch else "",
                        RoleID=access.roleID,
                        Role=access.role.roleName if access.role else ""
                    ))

                user_info = UserInfo(
                    UserID=user.userID,
                    Nickname=user.nickname,
                    Fullname=user.fullName,
                    IsActive=user.isActive,
                    UserAccess=user_access
                )

                return LoginResponse(
                    access_token=new_token,
                    token_type="bearer",
                    user=user_info,
                    expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
                )
            finally:
                db_gen.close()

        except jwt.ExpiredSignatureError:
            return None
        except jwt.JWTError:
            return None