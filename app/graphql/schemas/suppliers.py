# app/graphql/schemas/suppliers.py
import strawberry
from typing import Optional

@strawberry.input
class SuppliersCreate:
    DocTypeID: Optional[int] = None
    DocNumber: Optional[str] = None
    FirstName: str
    LastName: Optional[str] = None
    Phone: Optional[str] = None
    Email: Optional[str] = None
    Address: Optional[str] = None
    IsActive: Optional[bool] = None
    CountryID: Optional[int] = None
    ProvinceID: Optional[int] = None
    City: Optional[str] = None
    PostalCode: Optional[str] = None

@strawberry.input
class SuppliersUpdate:
    DocTypeID: Optional[int] = None
    DocNumber: Optional[str] = None
    FirstName: Optional[str] = None
    LastName: Optional[str] = None
    Phone: Optional[str] = None
    Email: Optional[str] = None
    Address: Optional[str] = None
    IsActive: Optional[bool] = None
    CountryID: Optional[int] = None
    ProvinceID: Optional[int] = None
    City: Optional[str] = None
    PostalCode: Optional[str] = None

@strawberry.type
class SuppliersInDB:
    SupplierID: int
    DocTypeID: Optional[int] = None
    DocNumber: Optional[str] = None
    FirstName: str
    LastName: Optional[str] = None
    Phone: Optional[str] = None
    Email: Optional[str] = None
    Address: Optional[str] = None
    IsActive: Optional[bool] = None
    CountryID: Optional[int] = None
    ProvinceID: Optional[int] = None
    City: Optional[str] = None
    PostalCode: Optional[str] = None
