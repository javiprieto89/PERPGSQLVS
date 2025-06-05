# app/graphql/resolvers/countries.py
import strawberry
from typing import Sequence, Optional
from app.graphql.schemas.countries import CountriesInDB
from app.graphql.crud.countries import get_countries, get_countries_by_id
from app.db import get_db
from strawberry.types import Info

@strawberry.type
class CountriesQuery:
    @strawberry.field
    def all_countries(self, info: Info) -> Sequence[CountriesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            countries = get_countries(db)
            return [CountriesInDB(**country.__dict__) for country in countries]
        finally:
            db_gen.close()

    @strawberry.field
    def countries_by_id(self, info: Info, id: int) -> Optional[CountriesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            country = get_countries_by_id(db, id)
            return CountriesInDB(**country.__dict__) if country else None
        finally:
            db_gen.close()

countriesQuery = CountriesQuery()
