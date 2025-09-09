# app/graphql/mutations/brands.py
import strawberry
from typing import Optional
from app.graphql.schemas.brands import BrandsCreate, BrandsUpdate, BrandsInDB
from app.graphql.crud.brands import (
    create_brands,
    update_brands,
    delete_brands,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info

@strawberry.type
class BrandsMutations:
    @strawberry.mutation
    def create_brand(self, info: Info, data: BrandsCreate) -> BrandsInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            new_brand = create_brands(db, data)
            return obj_to_schema(BrandsInDB, new_brand)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_brand(self, info: Info, brandID: int, data: BrandsUpdate) -> Optional[BrandsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated_brand = update_brands(db, brandID, data)
            if not updated_brand:
                return None
            return obj_to_schema(BrandsInDB, updated_brand)
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_brand(self, info: Info, brandID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted_brand = delete_brands(db, brandID)
            return deleted_brand is not None
        finally:
            db_gen.close()

