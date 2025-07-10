# app/graphql/schemas/users.py
import strawberry
from typing import Optional


@strawberry.type
@strawberry.type
class UsersInDB:
    UserID: int
    Nickname: Optional[str] = None
    FullName: Optional[str] = None
    Password: Optional[str] = None
    RoleID: Optional[int] = None
    IsActive: Optional[bool] = None


@strawberry.input
@strawberry.type
class UserCreate:
    UserID: int
    Nickname: Optional[str] = None
    FullName: Optional[str] = None
    Password: Optional[str] = None
    IsActive: Optional[bool] = None
    RoleID: Optional[int] = None


@strawberry.input
@strawberry.type
class UserUpdate:
    UserID: int
    Nickname: Optional[str] = None
    FullName: Optional[str] = None
    Password: Optional[str] = None
    IsActive: Optional[bool] = None
    RoleID: Optional[int] = None
