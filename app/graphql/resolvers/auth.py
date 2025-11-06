# app/graphql/resolvers/auth.py
import strawberry
from typing import Optional
from app.graphql.schemas.auth import (
    LoginInput,
    LoginResponse,
    UserCreateInput,
    PasswordChangeInput,
    PasswordUpgradeInput,
    AuthResponse,
    UserInfo,
)
from app.auth import (
    authenticate_user,
    create_user_token,
    get_userinfo_from_token,
    create_user,
    update_user_password,
    get_user_by_id,
    get_user_by_nickname,
    generate_refresh_token,
    calculate_refresh_expiration,
    create_session_record,
    get_primary_permission_ids,
    decode_token,
    password_requires_change,
    classify_user_password,
    AuthenticationError,
)
from app.db import get_db
from strawberry.types import Info
from app.config import settings


import logging

from app.utils import list_to_schema, obj_to_schema

logger = logging.getLogger(__name__)
logger.info("Loading AuthMutation from %s", __file__)

@strawberry.type
class AuthMutation:
    """Mutaciones de autenticación"""
    
    @strawberry.mutation
    def login(self, info: Info, input: LoginInput) -> LoginResponse:
        """Login de usuario"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            auth_result = authenticate_user(db, input.nickname, input.password)

            if not auth_result:
                return LoginResponse(
                    success=False,
                    message="Credenciales inválidas",
                    requiresPasswordChange=False,
                    passwordChangeReason=None,
                    token=None,
                    refreshToken=None,
                    refreshExpiresAt=None,
                    sessionId=None,
                    user=None,
                )

            user = auth_result.user
            requires_password_change = auth_result.requires_password_change
            password_change_reason = None

            if requires_password_change:
                password_change_reason = (
                    "La contraseña está guardada en texto plano. Debe actualizarse inmediatamente."
                )
                logger.warning(
                    "Usuario %s con contraseña en texto plano: requiere actualización inmediata",
                    getattr(user, "Nickname", "<desconocido>"),
                )

            if auth_result.should_rehash and not requires_password_change:
                rehash_success = update_user_password(db, user.UserID, input.password)
                if not rehash_success:
                    logger.warning(
                        "No se pudo actualizar el hash legacy para el usuario %s",
                        getattr(user, "Nickname", "<desconocido>"),
                    )

            refresh_token = generate_refresh_token()
            refresh_expires_at = calculate_refresh_expiration()

            request = getattr(info.context, "request", None)
            client_ip = None
            client_host = None
            request_host = None
            user_agent = None

            if request is not None:
                client_ip = getattr(request.client, "host", None)
                client_host = request.headers.get("x-forwarded-for") or client_ip
                request_host = getattr(request.url, "hostname", None)
                user_agent = request.headers.get("user-agent")

            company_id, branch_id, role_id = get_primary_permission_ids(user)

            session = create_session_record(
                db,
                user,
                refresh_token,
                refresh_expires_at,
                algorithm=settings.ALGORITHM,
                client_ip=client_ip,
                client_host=client_host,
                request_host=request_host,
                user_agent=user_agent,
            )

            token = create_user_token(
                user,
                company_id=company_id,
                branch_id=branch_id,
                role_id=role_id,
                session_id=session.SessionID,
            )
            user_info = get_userinfo_from_token(token)

            logger.info(
                "Login session created: session_id=%s refresh_prefix=%s ua=%s",
                session.SessionID,
                refresh_token[:8],
                session.UserAgent,
            )
            return LoginResponse(
                success=True,
                message="Actualiza la contraseña" if requires_password_change else "Login exitoso",
                requiresPasswordChange=requires_password_change,
                passwordChangeReason=password_change_reason,
                token=token,
                refreshToken=refresh_token,
                refreshExpiresAt=session.ExpiresAt,
                sessionId=session.SessionID,
                user=user_info,
            )

        except Exception as e:
            db.rollback()
            return LoginResponse(
                success=False,
                message=f"Error interno: {str(e)}",
                requiresPasswordChange=False,
                passwordChangeReason=None,
                token=None,
                refreshToken=None,
                refreshExpiresAt=None,
                sessionId=None,
                user=None,
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
            auth_result = authenticate_user(db, user_dict['Nickname'], input.current_password)
            if not auth_result:
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

    @strawberry.mutation
    def upgrade_password(self, input: PasswordUpgradeInput) -> AuthResponse:
        """Actualiza la contraseña usando un token válido cuando está en texto plano."""
        db_gen = get_db()
        db = next(db_gen)
        try:
            if not input.new_password or not input.new_password.strip():
                return AuthResponse(
                    success=False,
                    message="La nueva contraseña no puede estar vacía",
                )

            try:
                claims = decode_token(input.token)
            except AuthenticationError as exc:
                return AuthResponse(
                    success=False,
                    message=f"Token inválido: {exc}",
                )

            nickname_from_token = claims.get("sub")
            if not isinstance(nickname_from_token, str):
                return AuthResponse(
                    success=False,
                    message="Token inválido: sujeto ausente",
                )

            if nickname_from_token != input.nickname:
                return AuthResponse(
                    success=False,
                    message="El token no pertenece al usuario indicado",
                )

            user = get_user_by_nickname(db, input.nickname)
            if not user:
                return AuthResponse(
                    success=False,
                    message="Usuario no encontrado",
                )

            if not getattr(user, "IsActive", False):
                return AuthResponse(
                    success=False,
                    message="El usuario está inactivo",
                )

            if not password_requires_change(user):
                estado = classify_user_password(user)
                if estado == "argon2":
                    return AuthResponse(
                        success=False,
                        message="La contraseña ya está protegida. Usa changePassword.",
                    )
                if estado == "bcrypt":
                    return AuthResponse(
                        success=False,
                        message="El usuario tiene un hash legacy. Inicia sesión nuevamente para actualizarlo.",
                    )

            success = update_user_password(db, user.UserID, input.new_password)
            if success:
                return AuthResponse(
                    success=True,
                    message="Contraseña actualizada y cifrada correctamente",
                )

            return AuthResponse(
                success=False,
                message="No se pudo actualizar la contraseña",
            )
        except Exception as exc:
            logger.exception("Error en upgrade_password para %s", input.nickname)
            return AuthResponse(
                success=False,
                message=f"Error actualizando contraseña: {exc}",
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
