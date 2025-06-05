# app/graphql/schemas/transactions.py
import strawberry
from typing import Optional
from datetime import datetime


@strawberry.input
class TransactionsCreate:
    companyID: int
    branchID: int
    transactionDate: datetime
    clientID: Optional[int] = None
    supplierID: Optional[int] = None
    amount: float
    transactionType: Optional[str] = None
    orderID: Optional[int] = None
    notes: Optional[str] = None


@strawberry.input
class TransactionsUpdate:
    companyID: Optional[int] = None
    branchID: Optional[int] = None
    transactionDate: Optional[datetime] = None
    clientID: Optional[int] = None
    supplierID: Optional[int] = None
    amount: Optional[float] = None
    transactionType: Optional[str] = None
    orderID: Optional[int] = None
    notes: Optional[str] = None


@strawberry.type
class TransactionsInDB:
    transactionID: int
    companyID: Optional[int]
    branchID: Optional[int]
    transactionDate: Optional[datetime]
    clientID: Optional[int]
    supplierID: Optional[int]
    amount: float
    transactionType: Optional[str]
    orderID: Optional[int]
    notes: Optional[str]
