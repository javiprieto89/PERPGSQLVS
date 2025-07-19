# app/graphql/schemas/users.py
import strawberry
from typing import Optional


@strawberry.input
class UserCreate:
    Nickname: Optional[str] = None
    FullName: Optional[str] = None
    Password: Optional[str] = None
    IsActive: Optional[bool] = None    


@strawberry.input
class UserUpdate:
    UserID: int
    Nickname: Optional[str] = None
    FullName: Optional[str] = None
    Password: Optional[str] = None
    IsActive: Optional[bool] = None    

@strawberry.type
class UsersInDB:
    UserID: int
    Nickname: Optional[str] = None
    FullName: Optional[str] = None
    Password: Optional[str] = None    
    IsActive: Optional[bool] = None
