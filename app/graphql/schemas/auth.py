# app/graphql/schemas/auth.py
import strawberry
from datetime import datetime
from typing import List, Optional


@strawberry.type
class UserPermissionsInfo:
    """Información de acceso del usuario"""
    UserID: int
    CompanyID: int
    CompanyName: str
    BranchID: int
    BranchName: str
    RoleID: int
    RoleName: str


@strawberry.type
class UserInfo:
    """Información completa del usuario"""
    UserID: int
    Nickname: str
    FullName: Optional[str] = None  # Cambiado de Fullname a FullName
    IsActive: bool
    IsFullAdmin: bool
    UserPermissions: List[UserPermissionsInfo]


@strawberry.input
class LoginInput:
    """Input para login"""
    nickname: str
    password: str


@strawberry.type
class LoginResponse:
    """Respuesta del login"""
    success: bool
    message: str
    requiresPasswordChange: bool = False
    passwordChangeReason: Optional[str] = None
    token: Optional[str] = None
    refreshToken: Optional[str] = None
    refreshExpiresAt: Optional[datetime] = None
    sessionId: Optional[int] = None
    user: Optional[UserInfo] = None


@strawberry.input
class UserCreateInput:
    """Input para crear usuario"""
    nickname: str
    fullname: str  # Este se mapea a FullName en la DB
    password: str
    is_active: bool = True


@strawberry.input
class PasswordChangeInput:
    """Input para cambiar contraseña"""
    user_id: int
    current_password: str
    new_password: str


@strawberry.input
class PasswordUpgradeInput:
    """Input para actualizar contraseña con un token ya emitido."""
    nickname: str
    token: str
    new_password: str


@strawberry.type
class AuthResponse:
    """Respuesta genérica de autenticación"""
    success: bool
    message: str
