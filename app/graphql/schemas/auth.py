# app/graphql/schemas/auth.py
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
    FullName: Optional[str] = None
    IsActive: bool = True
    UserAccess: List[UserAccessInfo] = strawberry.field(default_factory=list)

@strawberry.type
class LoginResponse:
    AccessToken: str      # PascalCase como el resto del código
    TokenType: str        # PascalCase como el resto del código
    ExpiresIn: int        # PascalCase como el resto del código
    User: UserInfo        # PascalCase como el resto del código

@strawberry.input
class LoginRequest:
    Nickname: str
    Password: str