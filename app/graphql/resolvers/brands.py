# app/graphql/resolvers/brands.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.brands import BrandsInDB
from app.graphql.crud.brands import (
    get_brands,
    get_brands_by_id,
    get_brands_by_company,
)
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info

@strawberry.type
class BrandsQuery:
    @strawberry.field
    def all_brands(self, info: Info) -> List[BrandsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_brands(db)
            return list_to_schema(BrandsInDB, items)
        finally:
            db_gen.close()

    @strawberry.field
    def brands_by_id(self, info: Info, id: int) -> Optional[BrandsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_brands_by_id(db, id)
            return obj_to_schema(BrandsInDB, item) if item else None
        finally:
            db_gen.close()

    @strawberry.field
    def brands_by_company(self, info: Info, companyID: int) -> List[BrandsInDB]:
        """Obtener marcas filtradas por CompanyID"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_brands_by_company(db, companyID)
            return list_to_schema(BrandsInDB, items)
        finally:
            db_gen.close()

brandsQuery = BrandsQuery()
