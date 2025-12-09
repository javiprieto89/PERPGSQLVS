# app/graphql/schemas/accountbalances.py
import strawberry
from typing import Optional
from datetime import date, datetime
from app.graphql.schemas.clients import ClientsInDB
from app.graphql.schemas.suppliers import SuppliersInDB
from app.graphql.schemas.company import CompanyInDB
from app.graphql.schemas.branches import BranchesInDB


@strawberry.input
class AccountBalancesCreate:
    SupplierID: Optional[int] = None
    ClientID: Optional[int] = None
    Balance: float


@strawberry.input
class AccountBalancesUpdate:
    SupplierID: Optional[int] = None
    ClientID: Optional[int] = None
    Balance: Optional[float] = None


@strawberry.type
class AccountBalancesInDB:
    AccountID: int
    SupplierID: Optional[int] = None
    ClientID: Optional[int] = None
    Balance: float
    ClientData: Optional[ClientsInDB] = None
    SupplierData: Optional[SuppliersInDB] = None
    CompanyData: Optional[CompanyInDB] = None
    BranchData: Optional[BranchesInDB] = None
