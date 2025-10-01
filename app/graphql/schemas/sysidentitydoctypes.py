# app/graphql/schemas/sysidentitydoctypes.py
import strawberry
from typing import Optional


@strawberry.input
class SysIdentityDocTypesCreate:
    DocTypeName: str
    IsActive: bool = True


@strawberry.input
class SysIdentityDocTypesUpdate:
    DocTypeName: Optional[str] = None
    IsActive: Optional[bool] = None


@strawberry.type
class SysIdentityDocTypesInDB:
    DocTypeID: int
    DocTypeName: str
    IsActive: bool
