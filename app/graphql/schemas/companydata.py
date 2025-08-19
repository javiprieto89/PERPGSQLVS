# app/graphql/schemas/companydata.py
import strawberry
from typing import Optional
from datetime import datetime


@strawberry.input
class CompanyDataCreate:
    Name: Optional[str] = None
    Address: Optional[str] = None
    CUIT: Optional[str] = None
    GrossIncome: Optional[str] = None
    StartDate: Optional[datetime] = None
    Logo: Optional[str] = None  # Cambiar de bytes a str (base64)


@strawberry.input
class CompanyDataUpdate:
    Name: Optional[str] = None
    Address: Optional[str] = None
    CUIT: Optional[str] = None
    GrossIncome: Optional[str] = None
    StartDate: Optional[datetime] = None
    Logo: Optional[str] = None  # Cambiar de bytes a str (base64)


@strawberry.type
class CompanyDataInDB:
    CompanyID: int
    Name: Optional[str] = None
    Address: Optional[str] = None
    CUIT: Optional[str] = None
    GrossIncome: Optional[str] = None
    StartDate: Optional[datetime] = None
    Logo: Optional[str] = None  # Cambiar de bytes a str (base64)
