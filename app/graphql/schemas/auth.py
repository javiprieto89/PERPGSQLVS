# app/graphql/schemas/auth.py
import strawberry
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
    token: Optional[str] = None
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


@strawberry.type
class AuthResponse:
    """Respuesta genérica de autenticación"""
    success: bool
    message: str
