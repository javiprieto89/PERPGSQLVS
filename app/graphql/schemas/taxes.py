# app/graphql/schemas/taxes.py
import strawberry
from typing import Optional


@strawberry.input
class TaxesCreate:
    CountryID: Optional[int] = None
    ProvinceID: Optional[int] = None
    TaxName: str
    TaxPercent: float
    IsActive: Optional[bool] = True
    CompanyID: Optional[int] = None


@strawberry.input
class TaxesUpdate:
    CountryID: Optional[int] = None
    ProvinceID: Optional[int] = None
    TaxName: Optional[str] = None
    TaxPercent: Optional[float] = None
    IsActive: Optional[bool] = None
    CompanyID: Optional[int] = None


@strawberry.type
class TaxesInDB:
    TaxID: int
    CountryID: Optional[int]
    ProvinceID: Optional[int]
    TaxName: str
    TaxPercent: float
    IsActive: bool
    CompanyID: Optional[int]
