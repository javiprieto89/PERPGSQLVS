# app/graphql/schemas/sysdoctypes.py
import strawberry
from typing import Optional

@strawberry.input
class SysDocTypesCreate:
    Name: str
    IsActive: bool

@strawberry.input
class SysDocTypesUpdate:
    Name: Optional[str] = None
    IsActive: Optional[bool] = None

@strawberry.type
class SysDocTypesInDB:
    DocTypeID: int
    Name: str
    IsActive: bool