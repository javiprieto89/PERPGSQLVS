# app/graphql/resolvers/cars.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.cars import CarsInDB
from app.graphql.crud.cars import (
    get_cars,
    get_cars_by_id,
    get_cars_by_company,
)
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info

@strawberry.type
class CarsQuery:
    @strawberry.field
    def all_cars(self, info: Info) -> List[CarsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            cars = get_cars(db)
            return list_to_schema(CarsInDB, cars)
        finally:
            db_gen.close()

    @strawberry.field
    def cars_by_id(self, info: Info, id: int) -> Optional[CarsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            car = get_cars_by_id(db, id)
            return obj_to_schema(CarsInDB, car) if car else None
        finally:
            db_gen.close()

    @strawberry.field
    def cars_by_company(self, info: Info, companyID: int) -> List[CarsInDB]:
        """Obtener autos filtrados por CompanyID"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            cars = get_cars_by_company(db, companyID)
            return list_to_schema(CarsInDB, cars)
        finally:
            db_gen.close()

carsQuery = CarsQuery()

