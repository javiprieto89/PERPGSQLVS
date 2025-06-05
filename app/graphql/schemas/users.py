# app/graphql/schemas/users.py
import strawberry
from typing import Optional


@strawberry.type
@strawberry.type
class UsersInDB:
    userID: int
    nickname: Optional[str] = None
    fullname: Optional[str] = None
    roleID: Optional[int] = None


@strawberry.input
@strawberry.type
class UserCreate:
    userID: int
    nickname: Optional[str] = None
    fullname: Optional[str] = None
    roleID: Optional[int] = None


@strawberry.input
@strawberry.type
class UserUpdate:
    userID: int
    nickname: Optional[str] = None
    fullname: Optional[str] = None
    roleID: Optional[int] = None
