# app/graphql/schemas/useractivitylog.py

import strawberry
from typing import Optional
from datetime import datetime


@strawberry.input
class UserActivityLogCreate:
    userID: int
    actionID: int
    timestamp: datetime


@strawberry.input
class UserActivityLogUpdate:
    userID: Optional[int] = None
    actionID: Optional[int] = None
    timestamp: Optional[datetime] = None


@strawberry.type
class UserActivityLogInDB:
    activityID: int
    userID: int
    actionID: int
    timestamp: datetime
