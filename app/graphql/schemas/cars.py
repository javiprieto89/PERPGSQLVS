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
    LicensePlate: Optional[str] = None
    Year: Optional[int] = None
    CarModelID: Optional[int] = None
    ClientID: Optional[int] = None
    LastServiceMileage: Optional[int] = None
    IsDebtor: Optional[bool] = None
    DiscountID: Optional[int] = None


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
    # AGREGADO: Campos del cliente
    ClientFirstName: Optional[str] = None
    ClientLastName: Optional[str] = None
    ClientName: Optional[str] = None  # Nombre completo del cliente
    LastServiceMileage: Optional[int] = None
    IsDebtor: Optional[bool] = None
    DiscountID: int