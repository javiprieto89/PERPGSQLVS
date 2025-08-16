# app/graphql/schemas/sysuseractions.py
import strawberry
from typing import Optional

@strawberry.input
class SysUserActionsCreate:
    ActionName: Optional[str] = None

@strawberry.input
class SysUserActionsUpdate:
    ActionName: Optional[str] = None

@strawberry.type
class SysUserActionsInDB:
    UserActionID: int
    ActionName: Optional[str] = None
