# app/graphql/schemas/clients.py
import strawberry
from typing import Optional
from app.graphql.schemas.company import CompanyInDB
from app.graphql.schemas.branches import BranchesInDB
from app.graphql.schemas.vendors import VendorsInDB
from app.graphql.schemas.provinces import ProvincesInDB
from app.graphql.schemas.countries import CountriesInDB


@strawberry.input
class ClientsCreate:
    """Schema para crear un nuevo cliente"""
    CompanyID: Optional[int] = None
    DocTypeID: int
    BranchID: Optional[int] = None
    DocNumber: Optional[str] = None
    FirstName: str
    LastName: Optional[str] = None
    Phone: Optional[str] = None
    Email: Optional[str] = None
    Address: Optional[str] = None
    City: Optional[str] = None
    PostalCode: Optional[str] = None
    IsActive: bool = True
    CountryID: int
    ProvinceID: int
    PriceListID: int
    VendorID: int = 1  # Valor por defecto según la DB


@strawberry.input
class ClientsUpdate:
    """Schema para actualizar un cliente existente"""
    CompanyID: Optional[int] = None
    DocTypeID: Optional[int] = None
    BranchID: Optional[int] = None
    DocNumber: Optional[str] = None
    FirstName: Optional[str] = None
    LastName: Optional[str] = None
    Phone: Optional[str] = None
    Email: Optional[str] = None
    Address: Optional[str] = None
    City: Optional[str] = None
    PostalCode: Optional[str] = None
    IsActive: Optional[bool] = None
    CountryID: Optional[int] = None
    ProvinceID: Optional[int] = None
    PriceListID: Optional[int] = None
    VendorID: Optional[int] = None


@strawberry.type
class ClientsInDB:
    """Schema para la respuesta de clientes desde la DB"""
    CompanyID: int | None
    ClientID: int
    BranchID: int | None
    DocTypeID: int
    DocNumber: Optional[str]
    FirstName: str
    LastName: Optional[str]
    Phone: Optional[str]
    Email: Optional[str]
    Address: Optional[str]
    IsActive: bool
    CountryID: int
    ProvinceID: int
    City: Optional[str]
    PostalCode: Optional[str]
    PriceListID: int
    VendorID: int

    # Relaciones solicitadas
    CompanyData: Optional[CompanyInDB] = None
    BranchData: Optional[BranchesInDB] = None
    VendorData: Optional[VendorsInDB] = None
    ProvinceData: Optional[ProvincesInDB] = None
    CountryData: Optional[CountriesInDB] = None
    DocTypeName: Optional[str] = None
    CountryName: Optional[str] = None
    ProvinceName: Optional[str] = None
    PriceListName: Optional[str] = None
    VendorName: Optional[str] = None


@strawberry.type
class ClientsWithRelations:
    """Schema para clientes con relaciones incluidas"""
    CompanyID: int | None
    ClientID: int
    BranchID: int | None
    DocTypeID: int
    DocNumber: Optional[str]
    FirstName: str
    LastName: Optional[str]
    Phone: Optional[str]
    Email: Optional[str]
    Address: Optional[str]
    IsActive: bool
    CountryID: int
    ProvinceID: int
    City: Optional[str]
    PostalCode: Optional[str]
    PriceListID: int
    VendorID: int

    # Campos calculados
    FullName: Optional[str] = None
    ContactInfo: Optional[str] = None
    StatusText: Optional[str] = None


@strawberry.type
class ClientSummary:
    """Schema resumido para listas y búsquedas"""
    ClientID: int
    FullName: str
    DocNumber: Optional[str]
    Phone: Optional[str]
    Email: Optional[str]
    City: Optional[str]
    IsActive: bool
