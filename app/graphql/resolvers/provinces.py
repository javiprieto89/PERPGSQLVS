# app/graphql/resolvers/provinces.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.provinces import ProvincesInDB
from app.graphql.crud.provinces import (
    get_provinces,
    get_provinces_by_id,
    get_provinces_by_country,
)
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class ProvincesQuery:
    @strawberry.field
    def all_provinces(self, info: Info) -> List[ProvincesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            provinces = get_provinces(db)
            return list_to_schema(ProvincesInDB, provinces)
        finally:
            db_gen.close()

    @strawberry.field
    def provinces_by_id(
        self, info: Info, countryID: int, provinceID: int
    ) -> Optional[ProvincesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            province = get_provinces_by_id(db, countryID, provinceID)
            return obj_to_schema(ProvincesInDB, province) if province else None
        finally:
            db_gen.close()

    @strawberry.field
    def provinces_by_country(self, info: Info, countryID: int) -> List[ProvincesInDB]:
        """Obtener provincias filtradas por país"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            provinces = get_provinces_by_country(db, countryID)
            return list_to_schema(ProvincesInDB, provinces)
        finally:
            db_gen.close()

provincesQuery = ProvincesQuery()
