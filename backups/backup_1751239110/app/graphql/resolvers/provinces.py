# app/graphql/resolvers/provinces.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.provinces import ProvincesInDB
from app.graphql.crud.provinces import get_provinces, get_provinces_by_id
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class ProvincesQuery:
    @strawberry.field
    def all_provinces(self, info: Info) -> List[ProvincesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            provinces = get_provinces(db)
            return [ProvincesInDB(**prov.__dict__) for prov in provinces]
        finally:
            db_gen.close()

    @strawberry.field
    def provinces_by_id(self, info: Info, id: int) -> Optional[ProvincesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            province = get_provinces_by_id(db, id)
            return ProvincesInDB(**province.__dict__) if province else None
        finally:
            db_gen.close()


provincesQuery = ProvincesQuery()
