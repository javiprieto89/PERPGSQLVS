# app/graphql/resolvers/auth.py
import strawberry
from typing import Optional
from app.graphql.schemas.auth import (
    LoginInput, LoginResponse, UserCreateInput, 
    PasswordChangeInput, AuthResponse, UserInfo
)
from app.auth import (
    authenticate_user, create_user_token, get_userinfo_from_token,
    create_user, update_user_password, get_user_by_id
)
from app.db import get_db
from strawberry.types import Info

@strawberry.type
class AuthMutation:
    """Mutaciones de autenticación"""
    
    @strawberry.mutation
    def login(self, input: LoginInput) -> LoginResponse:
        """Login de usuario"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            # Autenticar usuario
            user = authenticate_user(db, input.nickname, input.password)
            
            if not user:
                return LoginResponse(
                    success=False,
                    message="Credenciales inválidas",
                    token=None,
                    user=None
                )
            
            # Crear token
            token = create_user_token(user)
            
            # Obtener información del usuario
            user_info = get_userinfo_from_token(token)
            
            return LoginResponse(
                success=True,
                message="Login exitoso",
                token=token,
                user=user_info
            )
            
        except Exception as e:
            return LoginResponse(
                success=False,
                message=f"Error interno: {str(e)}",
                token=None,
                user=None
            )
        finally:
            db_gen.close()
    
    @strawberry.mutation
    def create_user(self, input: UserCreateInput) -> AuthResponse:
        """Crear nuevo usuario"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            # Verificar si el usuario ya existe
            from app.auth import get_user_by_nickname
            existing_user = get_user_by_nickname(db, input.nickname)
            
            if existing_user:
                return AuthResponse(
                    success=False,
                    message="El usuario ya existe"
                )
            
            # Crear usuario
            new_user = create_user(
                db=db,
                nickname=input.nickname,
                fullname=input.fullname,
                password=input.password,
                is_active=input.is_active
            )
            
            new_user_dict = new_user.__dict__
            return AuthResponse(
                success=True,
                message=f"Usuario {new_user_dict['Nickname']} creado exitosamente"
            )
            
        except Exception as e:
            return AuthResponse(
                success=False,
                message=f"Error creando usuario: {str(e)}"
            )
        finally:
            db_gen.close()
    
    @strawberry.mutation
    def change_password(self, input: PasswordChangeInput) -> AuthResponse:
        """Cambiar contraseña de usuario"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            # Verificar usuario actual
            user = get_user_by_id(db, input.user_id)
            if not user:
                return AuthResponse(
                    success=False,
                    message="Usuario no encontrado"
                )
            
            user_dict = user.__dict__
            # Verificar contraseña actual
            authenticated_user = authenticate_user(db, user_dict['Nickname'], input.current_password)
            if not authenticated_user:
                return AuthResponse(
                    success=False,
                    message="Contraseña actual incorrecta"
                )
            
            # Actualizar contraseña
            success = update_user_password(db, input.user_id, input.new_password)
            
            if success:
                return AuthResponse(
                    success=True,
                    message="Contraseña actualizada exitosamente"
                )
            else:
                return AuthResponse(
                    success=False,
                    message="Error actualizando contraseña"
                )
                
        except Exception as e:
            return AuthResponse(
                success=False,
                message=f"Error cambiando contraseña: {str(e)}"
            )
        finally:
            db_gen.close()

@strawberry.type
class AuthQuery:
    """Consultas de autenticación"""
    
    @strawberry.field
    def verify_token(self, info: Info, token: str) -> Optional[UserInfo]:
        """Verificar si un token es válido y obtener información del usuario"""
        try:
            user_info = get_userinfo_from_token(token)
            return user_info
        except Exception:
            return None
    
    @strawberry.field
    def current_user(self, info: Info) -> Optional[UserInfo]:
        """Obtener información del usuario actual (desde el contexto)"""
        # Esto requiere que el middleware configure el contexto del usuario
        if hasattr(info.context, 'user') and info.context.user:
            return info.context.user
        return None

# Instancias para usar en el schema principal
authMutation = AuthMutation()
authQuery = AuthQuery()