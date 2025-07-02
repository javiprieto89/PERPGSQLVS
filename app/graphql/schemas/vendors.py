# app/graphql/schemas/vendors.py
import strawberry
from typing import Optional

@strawberry.input
class VendorsCreate:
    VendorName: str
    Commission: Optional[float] = None
    IsActive: bool = True

@strawberry.input
class VendorsUpdate:
    VendorName: Optional[str] = None
    Commission: Optional[float] = None
    IsActive: Optional[bool] = None

@strawberry.type
class VendorsInDB:
    VendorID: int
    VendorName: str
    Commission: Optional[float]
    IsActive: bool