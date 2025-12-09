# app/graphql/schemas/checkmovement_schema.py - VERSIÓN COMPLETA
# Resumen: Tipos e inputs GraphQL para CheckMovements con relaciones anidadas.

import strawberry
import datetime
from typing import Optional
from app.graphql.schemas.bankaccounts import BankAccountsInDB
from app.graphql.schemas.checks import ChecksInDB
from app.graphql.schemas.branches import BranchesInDB
from app.graphql.schemas.company import CompanyInDB
from app.graphql.schemas.transactions import TransactionsInDB


@strawberry.type
class CheckMovementType:
    CheckMovementID: int
    CompanyID: int
    CheckID: int
    EventDate: datetime.date
    EventType: str
    BankAccountID: Optional[int]
    BranchID: Optional[int]
    TransactionID: Optional[int]
    Notes: Optional[str]
    CreatedAt: datetime.datetime

    CompanyData: Optional[CompanyInDB] = None
    CheckData: Optional[ChecksInDB] = None
    BankAccountData: Optional[BankAccountsInDB] = None
    BranchData: Optional[BranchesInDB] = None
    TransactionData: Optional[TransactionsInDB] = None


@strawberry.input
class CheckMovementInput:
    CompanyID: int
    CheckID: int
    EventDate: datetime.date
    EventType: str
    BankAccountID: Optional[int] = None
    BranchID: Optional[int] = None
    TransactionID: Optional[int] = None
    Notes: Optional[str] = None


@strawberry.type
class CheckMovementInDB:
    CheckMovementID: int
    CompanyID: int
    CheckID: int
    EventDate: datetime.date
    EventType: str
    BankAccountID: Optional[int]
    BranchID: Optional[int]
    TransactionID: Optional[int]
    Notes: Optional[str]
    CreatedAt: datetime.datetime

    CompanyData: Optional[CompanyInDB] = None
    CheckData: Optional[ChecksInDB] = None
    BankAccountData: Optional[BankAccountsInDB] = None
    BranchData: Optional[BranchesInDB] = None
    TransactionData: Optional[TransactionsInDB] = None
