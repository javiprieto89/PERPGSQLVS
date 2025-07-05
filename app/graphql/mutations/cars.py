import strawberry
from typing import Optional
from app.graphql.schemas.cars import CarsCreate, CarsUpdate, CarsInDB
from app.graphql.crud.cars import (
    create_cars,
    update_cars,
    delete_cars,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info

@strawberry.type
class CarsMutations:
    @strawberry.mutation
    def create_car(self, info: Info, data: CarsCreate) -> CarsInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            new_obj = create_cars(db, data)
            return obj_to_schema(CarsInDB, new_obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_car(self, info: Info, carID: int, data: CarsUpdate) -> Optional[CarsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_cars(db, carID, data)
            if not updated:
                return None
            return obj_to_schema(CarsInDB, updated)
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_car(self, info: Info, carID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_cars(db, carID)
            return deleted is not None
        finally:
            db_gen.close()
