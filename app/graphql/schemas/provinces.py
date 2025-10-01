# app/graphql/schemas/provinces.py
import strawberry
from typing import Optional

from app.graphql.schemas.countries import CountriesInDB


@strawberry.input
class ProvincesCreate:
    CountryID: int
    ProvinceName: str


@strawberry.input
class ProvincesUpdate:
    CountryID: Optional[int] = None
    ProvinceName: Optional[str] = None


@strawberry.type
class ProvincesInDB:
    ProvinceID: int
    CountryID: int
    ProvinceName: str

    # Relaciones
    country: Optional[CountriesInDB] = None
