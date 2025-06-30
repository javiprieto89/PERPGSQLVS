# app/graphql/schemas/auth.py
# app/schemas/auth.py - VERSIÓN MEJORADA
from dataclasses import dataclass
from typing import List, Optional
import strawberry

@strawberry.type
class UserAccessInfo:
    userID: int
    companyID: int
    company: str
    branchID: int
    branch: str
    roleID: int
    role: str

@strawberry.type
class UserInfo:
    userID: int
    nickname: str
    fullname: Optional[str] = None
    isActive: bool = True
    userAccesses: List[UserAccessInfo] = strawberry.field(default_factory=list)

@strawberry.type
class LoginResponse:
    access_token: str
    token_type: str
    user: UserInfo
    expires_in: int = 18000  # 5 horas por defecto

@strawberry.input
class LoginRequest:
    nickname: str
    password: str