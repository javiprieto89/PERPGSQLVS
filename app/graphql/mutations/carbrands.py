import strawberry
from typing import Optional
from app.graphql.schemas.carbrands import CarBrandsCreate, CarBrandsUpdate, CarBrandsInDB
from app.graphql.crud.carbrands import (
    create_carbrands,
    update_carbrands,
    delete_carbrands,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info

@strawberry.type
class CarBrandsMutations:
    @strawberry.mutation
    def create_carbrand(self, info: Info, data: CarBrandsCreate) -> CarBrandsInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            new_carbrand = create_carbrands(db, data)
            return obj_to_schema(CarBrandsInDB, new_carbrand)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_carbrand(self, info: Info, companyID: int, carBrandID: int, data: CarBrandsUpdate) -> Optional[CarBrandsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated_carbrand = update_carbrands(db, companyID, carBrandID, data)
            if not updated_carbrand:
                return None
            return obj_to_schema(CarBrandsInDB, updated_carbrand)
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_carbrand(self, info: Info, companyID: int, carBrandID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_carbrands(db, companyID, carBrandID)
            return deleted is not None
        finally:
            db_gen.close()

