# app/graphql/schemas/banks.py
# Schema GraphQL para Banks

from __future__ import annotations

import strawberry
from typing import Optional
from app.graphql.schemas.company import CompanyInDB


@strawberry.input
class BanksCreate:
    CompanyID: Optional[int] = None
    Name: str
    IsActive: Optional[bool] = True


@strawberry.input
class BanksUpdate:
    CompanyID: Optional[int] = None
    Name: Optional[str] = None
    IsActive: Optional[bool] = None


@strawberry.type
class BanksInDB:
    CompanyID: int
    BankID: int
    Name: str
    IsActive: bool

    CompanyData: Optional[CompanyInDB] = None


@strawberry.type
class BanksWithRelations:
    CompanyID: int
    BankID: int
    Name: str
    IsActive: bool
    CompanyData: Optional[CompanyInDB] = None
    StatusText: Optional[str] = None


@strawberry.type
class BankSummary:
    BankID: int
    Name: str
    IsActive: bool


# Import al final para evitar circular import
