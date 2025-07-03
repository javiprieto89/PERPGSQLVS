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
            result = []
            for prov in provinces:
                prov_dict = prov.__dict__
                filtered = {
                    'ProvinceID': int(prov_dict['ProvinceID']),
                    'CountryID': int(prov_dict['CountryID']),
                    'Name': str(prov_dict['Name'])
                }
                result.append(ProvincesInDB(**filtered))
            return result
        finally:
            db_gen.close()

    @strawberry.field
    def provinces_by_id(self, info: Info, id: int) -> Optional[ProvincesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            province = get_provinces_by_id(db, id)
            if province:
                prov_dict = province.__dict__
                filtered = {
                    'ProvinceID': int(prov_dict['ProvinceID']),
                    'CountryID': int(prov_dict['CountryID']),
                    'Name': str(prov_dict['Name'])
                }
                return ProvincesInDB(**filtered)
            return None
        finally:
            db_gen.close()

    @strawberry.field
    def provinces_by_country(self, info: Info, countryID: int) -> List[ProvincesInDB]:
        """Obtener provincias filtradas por país"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            provinces = get_provinces_by_country(db, countryID)
            return [
                ProvincesInDB(
                    ProvinceID=int(p.ProvinceID),
                    CountryID=int(p.CountryID),
                    Name=str(p.Name)
                )
                for p in provinces
            ]
        finally:
            db_gen.close()


provincesQuery = ProvincesQuery()
