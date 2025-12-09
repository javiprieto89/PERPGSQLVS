# app/graphql/schemas/checks.py
import strawberry
from typing import Optional
from datetime import date, datetime

from app.graphql.schemas.company import CompanyInDB
from app.graphql.schemas.banks import BanksInDB
from app.graphql.schemas.syscurrencies import SysCurrenciesInDB
from app.graphql.schemas.checkstatuses import CheckStatusesInDB


@strawberry.input
class ChecksCreate:
    CompanyID: int
    Number: str
    CurrencyID: int
    Amount: float
    IssueDate: date
    StatusAt: Optional[datetime] = None
    CreatedAt: Optional[datetime] = None
    BankID: Optional[int] = None
    DueDate: Optional[date] = None
    DrawerName: Optional[str] = None
    HolderName: Optional[str] = None
    CheckStatusID: Optional[int] = None


@strawberry.input
class ChecksUpdate:
    CompanyID: Optional[int] = None
    Number: Optional[str] = None
    CurrencyID: Optional[int] = None
    Amount: Optional[float] = None
    IssueDate: Optional[date] = None
    StatusAt: Optional[datetime] = None
    CreatedAt: Optional[datetime] = None
    BankID: Optional[int] = None
    DueDate: Optional[date] = None
    DrawerName: Optional[str] = None
    HolderName: Optional[str] = None
    CheckStatusID: Optional[int] = None


@strawberry.type
class ChecksInDB:
    CheckID: int
    CompanyID: int
    Number: str
    CurrencyID: int
    Amount: float
    IssueDate: date
    StatusAt: Optional[datetime]
    CreatedAt: Optional[datetime]
    BankID: Optional[int]
    DueDate: Optional[date]
    DrawerName: Optional[str]
    HolderName: Optional[str]
    CheckStatusID: Optional[int]

    CompanyData: Optional[CompanyInDB] = None
    BankData: Optional[BanksInDB] = None
    CurrencyData: Optional[SysCurrenciesInDB] = None
    CheckStatusData: Optional[CheckStatusesInDB] = None
