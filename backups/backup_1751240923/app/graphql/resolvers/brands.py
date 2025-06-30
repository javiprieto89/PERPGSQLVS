# app/graphql/resolvers/brands.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.brands import BrandsInDB
from app.graphql.crud.brands import get_brands, get_brands_by_id
from app.db import get_db
from strawberry.types import Info

@strawberry.type
class BrandsQuery:
    @strawberry.field
    def all_brands(self, info: Info) -> List[BrandsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_brands(db)
            return [BrandsInDB(**item.__dict__) for item in items]
        finally:
            db_gen.close()

    @strawberry.field
    def brands_by_id(self, info: Info, id: int) -> Optional[BrandsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_brands_by_id(db, id)
            return BrandsInDB(**item.__dict__) if item else None
        finally:
            db_gen.close()

brandsQuery = BrandsQuery()
