# app/graphql/resolvers/auth.py
import strawberry
from typing import Optional, List
from datetime import datetime, timedelta
import re
from jose import jwt
from jwt import ExpiredSignatureError, InvalidTokenError
import hashlib
from app.graphql.schemas.auth import LoginResponse, LoginRequest, UserInfo, UserAccessInfo
from app.graphql.crud.users import get_user_by_nickname
from app.db import get_db
from strawberry.types import Info
from app.config import settings

def hash_password(password: str) -> str:
    """Hashea la contraseña usando SHA256"""
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(password: str, stored: str) -> bool:
    """
    Si 'stored' tiene forma de SHA256 (64 dígitos hex), compara hashes;
    si no, compara directamente como texto plano (modo testing).
    """
    if re.fullmatch(r"[0-9a-fA-F]{64}", stored):
        return hash_password(password) == stored
    return password == stored

@strawberry.type
class AuthMutation:

    @strawberry.mutation
    def login(self, info: Info, credentials: LoginRequest) -> Optional[LoginResponse]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            user = get_user_by_nickname(db, credentials.Nickname)
            
            if not user:
                return None
                
            user_dict = user.__dict__
            if not verify_password(credentials.Password, user_dict['Password']) or not user_dict['IsActive']:
                return None

            # SOLUCIÓN SIMPLE: Por ahora, crear UserInfo básico SIN UserAccess complejos
            # para evitar el problema de relaciones
            user_info = UserInfo(
                UserID=user_dict['UserID'],
                Nickname=user_dict['Nickname'],
                FullName=user_dict.get('FullName'),  # Usar .get() por si es None
                IsActive=user_dict['IsActive'],
                UserAccess=[]  # Lista vacía por ahora para evitar errores de relaciones
            )

            # Generar JWT
            expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
            payload = {
                "sub": user_dict['Nickname'],
                "user_id": user_dict['UserID'],
                "exp": expire,
                "iat": datetime.utcnow()
            }
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

            # Retornar usando PascalCase
            return LoginResponse(
                AccessToken=token,
                TokenType="bearer",
                User=user_info,
                ExpiresIn=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
            )

        except Exception as e:
            print(f"Error en login: {e}")
            return None
        finally:
            db_gen.close()

    @strawberry.mutation
    def refresh_token(self, info: Info, token: str) -> Optional[LoginResponse]:
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            nickname = payload.get("sub")
            if not nickname:
                return None

            db_gen = get_db()
            db = next(db_gen)
            try:
                user = get_user_by_nickname(db, nickname)
                
                if not user:
                    return None
                    
                user_dict = user.__dict__
                if not user_dict['IsActive']:
                    return None

                # Generar nuevo JWT
                expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
                new_payload = {
                    "sub": user_dict['Nickname'],
                    "user_id": user_dict['UserID'],
                    "exp": expire,
                    "iat": datetime.utcnow()
                }
                new_token = jwt.encode(new_payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

                # UserInfo simple sin relaciones complejas
                user_info = UserInfo(
                    UserID=user_dict['UserID'],
                    Nickname=user_dict['Nickname'],
                    FullName=user_dict.get('FullName'),
                    IsActive=user_dict['IsActive'],
                    UserAccess=[]  # Lista vacía por ahora
                )

                return LoginResponse(
                    AccessToken=new_token,
                    TokenType="bearer",
                    User=user_info,
                    ExpiresIn=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
                )
            finally:
                db_gen.close()

        except ExpiredSignatureError:
            return None
        except InvalidTokenError:
            return None