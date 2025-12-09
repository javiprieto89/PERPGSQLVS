# app/graphql/schemas/bankreconciliation_schema.py - VERSIÓN COMPLETA
# Resumen: Tipos e inputs GraphQL para conciliaciones bancarias con relaciones anidadas (CompanyData, BankAccountData, UserData)

import strawberry
import datetime
from typing import Optional
from app.graphql.schemas.company import CompanyInDB
from app.graphql.schemas.bankaccounts import BankAccountsInDB
from app.graphql.schemas.users import UsersInDB


@strawberry.type
class BankReconciliationType:
    BankReconciliationID: int
    CompanyID: int
    BankAccountID: int
    StartDate: datetime.date
    EndDate: datetime.date
    OpeningBalance: float
    ClosingBalance: float
    Notes: Optional[str]
    CreatedAt: datetime.datetime
    CreatedBy: Optional[int]
    Confirmed: bool
    ConfirmedAt: Optional[datetime.datetime]

    # Relaciones
    CompanyData: Optional[CompanyInDB] = None
    BankAccountData: Optional[BankAccountsInDB] = None
    UserData: Optional[UsersInDB] = None


@strawberry.input
class BankReconciliationInput:
    CompanyID: int
    BankAccountID: int
    StartDate: datetime.date
    EndDate: datetime.date
    OpeningBalance: float
    ClosingBalance: float
    Notes: Optional[str] = None
    CreatedBy: Optional[int] = None
    Confirmed: bool = False
    ConfirmedAt: Optional[datetime.datetime] = None


@strawberry.type
class BankReconciliationInDB:
    BankReconciliationID: int
    CompanyID: int
    BankAccountID: int
    StartDate: datetime.date
    EndDate: datetime.date
    OpeningBalance: float
    ClosingBalance: float
    Notes: Optional[str]
    CreatedAt: datetime.datetime
    CreatedBy: Optional[int]
    Confirmed: bool
    ConfirmedAt: Optional[datetime.datetime]

    # Relaciones anidadas
    CompanyData: Optional[CompanyInDB] = None
    BankAccountData: Optional[BankAccountsInDB] = None
    UserData: Optional[UsersInDB] = None
