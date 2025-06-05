# app/graphql/schemas/countries.py
import strawberry
from typing import Optional, List

# Asegurate de que esto exista
#from app.graphql.schemas.provinces import ProvincesInDB


@strawberry.input
class CountriesCreate:
    name: str


@strawberry.input
class CountriesUpdate:
    name: Optional[str] = None


@strawberry.type
class CountriesInDB:
    countryID: int
    name: str

    # Relaciones
    #provinces: Optional[List[ProvincesInDB]] = None

