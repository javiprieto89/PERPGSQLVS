# ========== Transactions ===========
# app/graphql/schemas/transactions.py
import strawberry
from typing import Optional
from datetime import datetime
from app.graphql.schemas.company import CompanyInDB
from app.graphql.schemas.branches import BranchesInDB
from app.graphql.schemas.clients import ClientsInDB
from app.graphql.schemas.suppliers import SuppliersInDB
from app.graphql.schemas.saleconditions import SaleConditionsInDB
from app.graphql.schemas.syscurrencies import SysCurrenciesInDB


@strawberry.input
class TransactionsCreate:
    CompanyID: int
    BranchID: int
    TransactionDate: datetime
    TransacTypeID: int
    ClientID: Optional[int] = None
    SupplierID: Optional[int] = None
    OrderID: Optional[int] = None
    Subtotal: Optional[float] = None
    Taxes: Optional[float] = None
    Total: Optional[float] = None
    Notes: Optional[str] = None


@strawberry.input
class TransactionsUpdate:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    TransactionDate: Optional[datetime] = None
    TransacTypeID: Optional[int] = None
    ClientID: Optional[int] = None
    SupplierID: Optional[int] = None
    OrderID: Optional[int] = None
    Subtotal: Optional[float] = None
    Taxes: Optional[float] = None
    Total: Optional[float] = None
    Notes: Optional[str] = None


@strawberry.type
class TransactionsInDB:
    TransactionID: int
    CompanyID: Optional[int]
    BranchID: Optional[int]
    TransactionDate: Optional[datetime]
    TransacTypeID: Optional[int]
    ClientID: Optional[int]
    SupplierID: Optional[int]
    OrderID: Optional[int]
    Subtotal: Optional[float]
    Taxes: Optional[float]
    Total: Optional[float]
    Notes: Optional[str]

    CompanyData: Optional[CompanyInDB] = None
    BranchData: Optional[BranchesInDB] = None
    ClientData: Optional[ClientsInDB] = None
    SupplierData: Optional[SuppliersInDB] = None
    SaleConditionData: Optional[SaleConditionsInDB] = None
    CurrencyData: Optional[SysCurrenciesInDB] = None
