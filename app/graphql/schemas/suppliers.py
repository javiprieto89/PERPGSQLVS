# app/graphql/schemas/suppliers.py
import strawberry
from typing import Optional
from app.graphql.schemas.companydata import CompanyDataInDB
from app.graphql.schemas.branches import BranchesInDB
from app.graphql.schemas.sys.doctypes import SysDocTypesInDB
from app.graphql.schemas.countries import CountriesInDB
from app.graphql.schemas.provinces import ProvincesInDB

@strawberry.input
class SuppliersCreate:
    DocTypeID: Optional[int] = None
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
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
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
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
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    BranchData: Optional[BranchesInDB] = None
    CompanyData: Optional[CompanyDataInDB] = None
    DocTypeData: Optional[SysDocTypesInDB] = None
    CountryData: Optional[CountriesInDB] = None
    ProvinceData: Optional[ProvincesInDB] = None
