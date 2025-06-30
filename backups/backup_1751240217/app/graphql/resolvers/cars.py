# app/graphql/resolvers/cars.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.cars import CarsInDB
from app.graphql.crud.cars import get_cars, get_cars_by_id
from app.db import get_db
from strawberry.types import Info

@strawberry.type
class CarsQuery:
    @strawberry.field
    def all_cars(self, info: Info) -> List[CarsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            cars = get_cars(db)
            return [CarsInDB(**car.__dict__) for car in cars]
        finally:
            db_gen.close()

    @strawberry.field
    def cars_by_id(self, info: Info, id: int) -> Optional[CarsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            car = get_cars_by_id(db, id)
            return CarsInDB(**car.__dict__) if car else None
        finally:
            db_gen.close()

carsQuery = CarsQuery()
