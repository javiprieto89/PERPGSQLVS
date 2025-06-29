# app/graphql/schemas/clients.py
import strawberry
from typing import Optional

from app.graphql.schemas.documenttypes import DocumentTypesInDB
from app.graphql.schemas.countries import CountriesInDB
from app.graphql.schemas.provinces import ProvincesInDB
from app.graphql.schemas.pricelists import PriceListsInDB

@strawberry.input
class ClientsCreate:
    DocumentTypeID: int
    DocumentNumber: Optional[str] = None
    FirstName: str
    LastName: Optional[str] = None
    Phone: Optional[str] = None
    Email: Optional[str] = None
    Address: Optional[str] = None
    IsActive: bool
    CountryID: int
    ProvinceID: int
    City: Optional[str] = None
    PostalCode: Optional[str] = None
    PriceListID: int


@strawberry.input
class ClientsUpdate:
    DocumentTypeID: int
    DocumentNumber: Optional[str] = None
    FirstName: str
    LastName: Optional[str] = None
    Phone: Optional[str] = None
    Email: Optional[str] = None
    Address: Optional[str] = None
    IsActive: bool
    CountryID: int
    ProvinceID: int
    City: Optional[str] = None
    PostalCode: Optional[str] = None
    PriceListID: int


@strawberry.type
class ClientsInDB:
    ClientID: int
    DocumentTypeID: int
    DocumentNumber: Optional[str] = None
    FirstName: str
    LastName: Optional[str] = None
    Phone: Optional[str] = None
    Email: Optional[str] = None
    Address: Optional[str] = None
    IsActive: bool
    CountryID: int
    ProvinceID: int
    City: Optional[str] = None
    PostalCode: Optional[str] = None
    PriceListID: int

    # Relaciones
    document_type: Optional[DocumentTypesInDB] = None
    country: Optional[CountriesInDB] = None
    province: Optional[ProvincesInDB] = None
    price_list: Optional[PriceListsInDB] = None


@strawberry.type
class ClientsResponse:
    ClientID: int
    DocumentTypeID: int
    DocumentNumber: Optional[str] = None
    FirstName: str
    LastName: Optional[str] = None
    Phone: Optional[str] = None
    Email: Optional[str] = None
    Address: Optional[str] = None
    IsActive: bool
    CountryID: int
    ProvinceID: int
    City: Optional[str] = None
    PostalCode: Optional[str] = None
    PriceListID: int

    # Relaciones
    document_type: Optional[DocumentTypesInDB] = None
    country: Optional[CountriesInDB] = None
    province: Optional[ProvincesInDB] = None
    price_list: Optional[PriceListsInDB] = None
