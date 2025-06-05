# app/graphql/schemas/useractions.py
import strawberry
from typing import Optional

@strawberry.input
class UserActionsCreate:
    actionName: Optional[str] = None

@strawberry.input
class UserActionsUpdate:
    actionName: Optional[str] = None

@strawberry.type
class UserActionsInDB:
    actionID: int
    actionName: Optional[str] = None
