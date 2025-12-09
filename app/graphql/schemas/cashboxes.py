# app/graphql/schemas/cashboxes.py
import strawberry
from typing import Optional
from datetime import datetime
from app.graphql.schemas.company import CompanyInDB
from app.graphql.schemas.branches import BranchesInDB
from app.graphql.schemas.users import UsersInDB


@strawberry.input
class CashBoxesCreate:
    CompanyID: int
    BranchID: int
    Name: str
    Description: Optional[str] = None
    UserID: Optional[int] = None
    Notes: Optional[str] = None


@strawberry.input
class CashBoxesUpdate:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    Name: Optional[str] = None
    Description: Optional[str] = None
    UserID: Optional[int] = None
    Notes: Optional[str] = None
    IsActive: Optional[bool] = None
    CloseDate: Optional[datetime] = None
    CurrentBalance: Optional[float] = None


@strawberry.type
class CashBoxesInDB:
    CashBoxID: int
    CompanyID: int
    BranchID: int
    Name: str
    Description: Optional[str]
    IsActive: bool
    OpenDate: Optional[datetime]
    CloseDate: Optional[datetime]
    InitialBalance: float
    CurrentBalance: float
    UserID: Optional[int]
    Notes: Optional[str]

    CompanyData: Optional[CompanyInDB] = None
    BranchData: Optional[BranchesInDB] = None
    UserData: Optional[UsersInDB] = None
