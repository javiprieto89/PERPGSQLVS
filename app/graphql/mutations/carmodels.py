import strawberry
from typing import Optional
from app.graphql.schemas.carmodels import CarModelsCreate, CarModelsUpdate, CarModelsInDB
from app.graphql.crud.carmodels import (
    create_carmodels,
    update_carmodels,
    delete_carmodels,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info

@strawberry.type
class CarModelsMutations:
    @strawberry.mutation
    def create_carmodel(self, info: Info, data: CarModelsCreate) -> CarModelsInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            new_obj = create_carmodels(db, data)
            return obj_to_schema(CarModelsInDB, new_obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_carmodel(self, info: Info, carModelID: int, data: CarModelsUpdate) -> Optional[CarModelsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_carmodels(db, carModelID, data)
            if not updated:
                return None
            return obj_to_schema(CarModelsInDB, updated)
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_carmodel(self, info: Info, carModelID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_carmodels(db, carModelID)
            return deleted is not None
        finally:
            db_gen.close()

