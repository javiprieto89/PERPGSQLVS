# app/graphql/schemas/companydata.py
import strawberry
from typing import Optional
from datetime import datetime


@strawberry.input
class CompanyDataCreate:
    name: Optional[str] = None
    address: Optional[str] = None
    cuit: Optional[str] = None
    grossincome: Optional[str] = None
    startdate: Optional[datetime] = None
    logo: Optional[str] = None  # Cambiar de bytes a str (base64)


@strawberry.input
class CompanyDataUpdate:
    name: Optional[str] = None
    address: Optional[str] = None
    cuit: Optional[str] = None
    grossincome: Optional[str] = None
    startdate: Optional[datetime] = None
    logo: Optional[str] = None  # Cambiar de bytes a str (base64)


@strawberry.type
class CompanyDataInDB:
    companyID: int
    name: Optional[str] = None
    address: Optional[str] = None
    cuit: Optional[str] = None
    grossincome: Optional[str] = None
    startdate: Optional[datetime] = None
    logo: Optional[str] = None  # Cambiar de bytes a str (base64)
