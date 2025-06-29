# app/graphql/schemas/users.py
import strawberry
from typing import Optional


@strawberry.type
@strawberry.type
class UsersInDB:
    UserID: int
    Nickname: Optional[str] = None
    Fullname: Optional[str] = None
    RoleID: Optional[int] = None


@strawberry.input
@strawberry.type
class UserCreate:
    UserID: int
    Nickname: Optional[str] = None
    Fullname: Optional[str] = None
    RoleID: Optional[int] = None


@strawberry.input
@strawberry.type
class UserUpdate:
    UserID: int
    Nickname: Optional[str] = None
    Fullname: Optional[str] = None
    RoleID: Optional[int] = None
