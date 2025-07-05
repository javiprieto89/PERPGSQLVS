# app/graphql/schemas/cars.py
import strawberry
from typing import Optional


@strawberry.input
class CarsCreate:
    LicensePlate: str
    Year: Optional[int] = None
    CarModelID: int
    ClientID: int
    LastServiceMileage: Optional[int] = None
    IsDebtor: Optional[bool] = None
    DiscountID: int


@strawberry.input
class CarsUpdate:
    LicensePlate: str
    Year: Optional[int] = None
    CarModelID: int
    ClientID: int
    LastServiceMileage: Optional[int] = None
    IsDebtor: Optional[bool] = None
    DiscountID: int


@strawberry.type
class CarsInDB:
    CarID: int
    LicensePlate: str
    Year: Optional[int] = None
    CarModelID: int
    CarModelName: Optional[str] = None
    CarBrandID: Optional[int] = None
    CarBrandName: Optional[str] = None
    ClientID: int
    LastServiceMileage: Optional[int] = None
    IsDebtor: Optional[bool] = None
    DiscountID: int
