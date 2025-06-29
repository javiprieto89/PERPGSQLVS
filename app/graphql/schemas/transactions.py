# app/graphql/schemas/transactions.py
import strawberry
from typing import Optional
from datetime import datetime


@strawberry.input
class TransactionsCreate:
    CompanyID: int
    BranchID: int
    TransactionDate: datetime
    ClientID: Optional[int] = None
    SupplierID: Optional[int] = None
    Amount: float
    TransactionType: Optional[str] = None
    OrderID: Optional[int] = None
    Notes: Optional[str] = None


@strawberry.input
class TransactionsUpdate:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    TransactionDate: Optional[datetime] = None
    ClientID: Optional[int] = None
    SupplierID: Optional[int] = None
    Amount: Optional[float] = None
    TransactionType: Optional[str] = None
    OrderID: Optional[int] = None
    Notes: Optional[str] = None


@strawberry.type
class TransactionsInDB:
    TransactionID: int
    CompanyID: Optional[int]
    BranchID: Optional[int]
    TransactionDate: Optional[datetime]
    ClientID: Optional[int]
    SupplierID: Optional[int]
    Amount: float
    TransactionType: Optional[str]
    OrderID: Optional[int]
    Notes: Optional[str]
