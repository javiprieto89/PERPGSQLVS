# app/graphql/schemas/cars.py
import strawberry
from typing import Optional


@strawberry.input
class CarsCreate:
    licensePlate: str
    year: Optional[int] = None
    carModelID: int
    clientID: int
    lastServiceMileage: Optional[int] = None
    isDebtor: Optional[bool] = None
    discountID: int


@strawberry.input
class CarsUpdate:
    licensePlate: str
    year: Optional[int] = None
    carModelID: int
    clientID: int
    lastServiceMileage: Optional[int] = None
    isDebtor: Optional[bool] = None
    discountID: int


@strawberry.type
class CarsInDB:
    carID: int
    licensePlate: str
    year: Optional[int] = None
    carModelID: int
    clientID: int
    lastServiceMileage: Optional[int] = None
    isDebtor: Optional[bool] = None
    discountID: int
