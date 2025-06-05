# app/graphql/schemas/clients.py
import strawberry
from typing import Optional

from app.graphql.schemas.documenttypes import DocumentTypesInDB
from app.graphql.schemas.countries import CountriesInDB
from app.graphql.schemas.provinces import ProvincesInDB
from app.graphql.schemas.pricelists import PriceListsInDB

@strawberry.input
class ClientsCreate:
    documentTypeID: int
    documentNumber: Optional[str] = None
    firstName: str
    lastName: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    isActive: bool
    countryID: int
    provinceID: int
    city: Optional[str] = None
    postalCode: Optional[str] = None
    priceListID: int


@strawberry.input
class ClientsUpdate:
    documentTypeID: int
    documentNumber: Optional[str] = None
    firstName: str
    lastName: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    isActive: bool
    countryID: int
    provinceID: int
    city: Optional[str] = None
    postalCode: Optional[str] = None
    priceListID: int


@strawberry.type
class ClientsInDB:
    clientID: int
    documentTypeID: int
    documentNumber: Optional[str] = None
    firstName: str
    lastName: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    isActive: bool
    countryID: int
    provinceID: int
    city: Optional[str] = None
    postalCode: Optional[str] = None
    priceListID: int

    # Relaciones
    document_type: Optional[DocumentTypesInDB] = None
    country: Optional[CountriesInDB] = None
    province: Optional[ProvincesInDB] = None
    price_list: Optional[PriceListsInDB] = None


@strawberry.type
class ClientsResponse:
    clientID: int
    documentTypeID: int
    documentNumber: Optional[str] = None
    firstName: str
    lastName: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    isActive: bool
    countryID: int
    provinceID: int
    city: Optional[str] = None
    postalCode: Optional[str] = None
    priceListID: int

    # Relaciones
    document_type: Optional[DocumentTypesInDB] = None
    country: Optional[CountriesInDB] = None
    province: Optional[ProvincesInDB] = None
    price_list: Optional[PriceListsInDB] = None
