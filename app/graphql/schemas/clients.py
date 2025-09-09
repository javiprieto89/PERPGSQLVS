# app/graphql/schemas/clients.py
import strawberry
from typing import Optional
from app.graphql.schemas.companydata import CompanyDataInDB
from app.graphql.schemas.branches import BranchesInDB

@strawberry.input
class ClientsCreate:
    """Schema para crear un nuevo cliente"""
    DocTypeID: int
    CompanyID: Optional[int] = None
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
    DocTypeID: Optional[int] = None
    CompanyID: Optional[int] = None
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
    ClientID: int
    DocTypeID: int
    DocNumber: Optional[str]
    FirstName: str
    LastName: Optional[str]
    Phone: Optional[str]
    Email: Optional[str]
    Address: Optional[str]
    City: Optional[str]
    PostalCode: Optional[str]
    IsActive: bool
    CountryID: int
    ProvinceID: int
    PriceListID: int
    VendorID: int
    CompanyID: int | None
    BranchID: int | None
    CompanyData: Optional[CompanyDataInDB] = None
    BranchData: Optional[BranchesInDB] = None
    DocTypeName: Optional[str] = None
    CountryName: Optional[str] = None
    ProvinceName: Optional[str] = None
    PriceListName: Optional[str] = None
    VendorName: Optional[str] = None

@strawberry.type
class ClientsWithRelations:
    """Schema para clientes con relaciones incluidas"""
    ClientID: int
    DocTypeID: int
    DocNumber: Optional[str]
    FirstName: str
    LastName: Optional[str]
    Phone: Optional[str]
    Email: Optional[str]
    Address: Optional[str]
    City: Optional[str]
    PostalCode: Optional[str]
    IsActive: bool
    CountryID: int
    ProvinceID: int
    PriceListID: int
    VendorID: int
    CompanyID: int | None
    BranchID: int | None
    
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
    
    