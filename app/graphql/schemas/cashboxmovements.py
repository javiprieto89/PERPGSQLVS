# app/graphql/schemas/cashboxmovements.py
import strawberry
from typing import Optional
from datetime import datetime

@strawberry.input
class CashBoxMovementsCreate:
    CashBoxID: int
    CompanyID: int
    BranchID: int
    Amount: float
    MovementType: str
    Description: Optional[str] = None
    UserID: Optional[int] = None
    Notes: Optional[str] = None

@strawberry.input
class CashBoxMovementsUpdate:
    CashBoxID: Optional[int] = None
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    Amount: Optional[float] = None
    MovementType: Optional[str] = None
    Description: Optional[str] = None
    UserID: Optional[int] = None
    Notes: Optional[str] = None

@strawberry.type
class CashBoxMovementsInDB:
    CashBoxMovementID: int
    CashBoxID: int
    CompanyID: int
    BranchID: int
    MovementDate: datetime
    Amount: float
    MovementType: str
    Description: Optional[str]
    UserID: Optional[int]
    Notes: Optional[str]
