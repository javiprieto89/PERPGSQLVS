# app/graphql/schemas/accountbalances.py
import strawberry
from typing import Optional
from datetime import date, datetime

@strawberry.input
class AccountBalancesCreate:
    SupplierID: Optional[int] = None
    ClientID: Optional[int] = None
    Balance: float

@strawberry.input
class AccountBalancesUpdate:
    SupplierID: Optional[int] = None
    BlientID: Optional[int] = None
    Balance: Optional[float] = None

@strawberry.type
class AccountBalancesInDB:
    AccountID: int
    SupplierID: Optional[int] = None
    ClientID: Optional[int] = None
    Balance: float
