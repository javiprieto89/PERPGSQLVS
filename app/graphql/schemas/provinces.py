# app/graphql/schemas/provinces.py
import strawberry
from typing import Optional

from app.graphql.schemas.countries import CountriesInDB


@strawberry.input
class ProvincesCreate:
    CountryID: int
    Name: str


@strawberry.input
class ProvincesUpdate:
    CountryID: Optional[int] = None
    Name: Optional[str] = None


@strawberry.type
class ProvincesInDB:
    ProvinceID: int
    CountryID: int
    Name: str

    # Relaciones
    country: Optional[CountriesInDB] = None