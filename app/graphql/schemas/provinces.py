# app/graphql/schemas/provinces.py
import strawberry
from typing import Optional

from app.graphql.schemas.countries import CountriesInDB


@strawberry.input
class ProvincesCreate:
    countryID: int
    name: str


@strawberry.input
class ProvincesUpdate:
    countryID: Optional[int] = None
    name: Optional[str] = None


@strawberry.type
class ProvincesInDB:
    provinceID: int
    countryID: int
    name: str

    # Relaciones
    country: Optional[CountriesInDB] = None
