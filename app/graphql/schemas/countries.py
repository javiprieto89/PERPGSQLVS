# app/graphql/schemas/countries.py
import strawberry
from typing import Optional, List

# Asegurate de que esto exista
#from app.graphql.schemas.provinces import ProvincesInDB


@strawberry.input
class CountriesCreate:
    Name: str


@strawberry.input
class CountriesUpdate:
    Name: Optional[str] = None


@strawberry.type
class CountriesInDB:
    CountryID: int
    CountryName: str

    # Relaciones
    #provinces: Optional[List[ProvincesInDB]] = None
