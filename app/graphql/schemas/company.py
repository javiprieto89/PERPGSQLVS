# app/graphql/schemas/company.py
import strawberry
from typing import Optional
from datetime import datetime


@strawberry.input
class CompanyCreate:
    CompanyName: Optional[str] = None
    Address: Optional[str] = None
    CUIT: Optional[str] = None
    Grossincome: Optional[str] = None
    Startdate: Optional[datetime] = None
    Logo: Optional[str] = None  # Cambiar de bytes a str (base64)


@strawberry.input
class CompanyUpdate:
    CompanyName: Optional[str] = None
    Address: Optional[str] = None
    CUIT: Optional[str] = None
    Grossincome: Optional[str] = None
    Startdate: Optional[datetime] = None
    Logo: Optional[str] = None  # Cambiar de bytes a str (base64)


@strawberry.type
class CompanyInDB:
    CompanyID: int
    CompanyName: Optional[str] = None
    Address: Optional[str] = None
    CUIT: Optional[str] = None
    Grossincome: Optional[str] = None
    Startdate: Optional[datetime] = None
    Logo: Optional[str] = None  # Cambiar de bytes a str (base64)
