# app/graphql/schemas/roles.py
import strawberry
from typing import Optional

@strawberry.input
class RolesCreate:
    RoleName: str

@strawberry.input
class RolesUpdate:
    RoleName: Optional[str] = None

@strawberry.type
class RolesInDB:
    RoleID: int
    RoleName: str
