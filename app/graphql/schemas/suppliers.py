# app/graphql/schemas/suppliers.py
import strawberry
from typing import Optional

@strawberry.input
class SuppliersCreate:
    documentTypeID: Optional[int] = None
    documentNumber: Optional[str] = None
    firstName: str
    lastName: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    isActive: Optional[bool] = None
    countryID: Optional[int] = None
    provinceID: Optional[int] = None
    city: Optional[str] = None
    postalCode: Optional[str] = None

@strawberry.input
class SuppliersUpdate:
    documentTypeID: Optional[int] = None
    documentNumber: Optional[str] = None
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    isActive: Optional[bool] = None
    countryID: Optional[int] = None
    provinceID: Optional[int] = None
    city: Optional[str] = None
    postalCode: Optional[str] = None

@strawberry.type
class SuppliersInDB:
    supplierID: int
    documentTypeID: Optional[int]
    documentNumber: Optional[str]
    firstName: str
    lastName: Optional[str]
    phone: Optional[str]
    email: Optional[str]
    address: Optional[str]
    isActive: Optional[bool]
    countryID: Optional[int]
    provinceID: Optional[int]
    city: Optional[str]
    postalCode: Optional[str]
