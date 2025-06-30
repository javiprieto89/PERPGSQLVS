# app/graphql/schemas/auth.py
# app/schemas/auth.py - VERSIÓN MEJORADA
from dataclasses import dataclass
from typing import List, Optional
import strawberry

@strawberry.type
class UserAccessInfo:
    UserID: int
    CompanyID: int
    Company: str
    BranchID: int
    Branch: str
    RoleID: int
    Role: str

@strawberry.type
class UserInfo:
    UserID: int
    Nickname: str
    Fullname: Optional[str] = None
    IsActive: bool = True
    UserAccess: List[UserAccessInfo] = strawberry.field(default_factory=list)

@strawberry.type
class LoginResponse:
    access_token: str
    token_type: str
    user: UserInfo
    expires_in: int = 18000  # 5 horas por defecto

@strawberry.input
class LoginRequest:
    Nickname: str
    Password: str