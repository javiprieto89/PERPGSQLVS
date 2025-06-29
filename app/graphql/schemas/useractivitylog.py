# app/graphql/schemas/useractivitylog.py

import strawberry
from typing import Optional
from datetime import datetime


@strawberry.input
class UserActivityLogCreate:
    UserID: int
    ActionID: int
    Timestamp: datetime


@strawberry.input
class UserActivityLogUpdate:
    UserID: Optional[int] = None
    ActionID: Optional[int] = None
    Timestamp: Optional[datetime] = None


@strawberry.type
class UserActivityLogInDB:
    ActivityID: int
    UserID: int
    ActionID: int
    Timestamp: datetime
