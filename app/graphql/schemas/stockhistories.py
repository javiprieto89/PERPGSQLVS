# app/graphql/schemas/stockhistories.py
from datetime import datetime
import strawberry
from typing import Optional

@strawberry.input
class StockHistoriesCreate:
    CompanyID: int
    BranchID: int
    UserID: int
    TransactionDate: datetime
    Reason: str
    Notes: str

@strawberry.input
class StockHistoriesUpdate:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    UserID: Optional[int] = None
    TransactionDate: Optional[datetime] = None
    Reason: Optional[str] = None    
    Notes: Optional[str] = None

@strawberry.type
class StockHistoriesInDB:
    CompanyID: int
    BranchID: int
    StockHistoryID: int
    UserID: int
    TransactionDate: datetime
    Reason: str
    Notes: str
