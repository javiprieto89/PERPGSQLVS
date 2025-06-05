# app/graphql/schemas/accountbalances.py
import strawberry
from typing import Optional
from datetime import date, datetime

@strawberry.input
class AccountBalancesCreate:
    supplierID: Optional[int] = None
    clientID: Optional[int] = None
    balance: float

@strawberry.input
class AccountBalancesUpdate:
    supplierID: Optional[int] = None
    clientID: Optional[int] = None
    balance: Optional[float] = None

@strawberry.type
class AccountBalancesInDB:
    accountID: int
    supplierID: Optional[int] = None
    clientID: Optional[int] = None
    balance: float
