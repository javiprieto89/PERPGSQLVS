# app/graphql/schemas/useractions.py
import strawberry
from typing import Optional

@strawberry.input
class UserActionsCreate:
    ActionName: Optional[str] = None

@strawberry.input
class UserActionsUpdate:
    ActionName: Optional[str] = None

@strawberry.type
class UserActionsInDB:
    ActionID: int
    ActionName: Optional[str] = None
