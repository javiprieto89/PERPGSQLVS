# app/graphql/schemas/roles.py
import strawberry
from typing import Optional

@strawberry.input
class RolesCreate:
    roleName: str

@strawberry.input
class RolesUpdate:
    roleName: Optional[str] = None

@strawberry.type
class RolesInDB:
    roleID: int
    roleName: str
