# app/graphql/resolvers/countries.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.countries import CountriesInDB
from app.graphql.crud.countries import get_countries, get_countries_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class CountriesQuery:
    @strawberry.field
    def all_countries(self, info: Info) -> List[CountriesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            countries = get_countries(db)
            return list_to_schema(CountriesInDB, countries)
        finally:
            db_gen.close()

    @strawberry.field
    def countries_by_id(self, info: Info, id: int) -> Optional[CountriesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            country = get_countries_by_id(db, id)
            return obj_to_schema(CountriesInDB, country) if country else None
        finally:
            db_gen.close()


countriesQuery = CountriesQuery()
