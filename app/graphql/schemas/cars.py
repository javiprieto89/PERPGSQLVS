# app/graphql/schemas/cars.py
import strawberry
from typing import Optional
from app.graphql.schemas.carmodels import CarModelsInDB
from app.graphql.schemas.carbrands import CarBrandsInDB
from app.graphql.schemas.clients import ClientsInDB
from app.graphql.schemas.discounts import DiscountsInDB
from app.graphql.schemas.companydata import CompanyDataInDB


@strawberry.input
class CarsCreate:
    LicensePlate: str
    Year: Optional[int] = None
    CarModelID: int
    ClientID: int
    CompanyID: Optional[int] = None
    LastServiceMileage: Optional[int] = None
    IsDebtor: Optional[bool] = None
    DiscountID: int


@strawberry.input
class CarsUpdate:
    LicensePlate: Optional[str] = None
    Year: Optional[int] = None
    CarModelID: Optional[int] = None
    ClientID: Optional[int] = None
    CompanyID: Optional[int] = None
    LastServiceMileage: Optional[int] = None
    IsDebtor: Optional[bool] = None
    DiscountID: Optional[int] = None


@strawberry.type
class CarsInDB:
    CarID: int
    LicensePlate: str
    Year: Optional[int] = None
    CarModelID: int
    ClientID: int
    CompanyID: Optional[int] = None
    LastServiceMileage: Optional[int] = None
    IsDebtor: Optional[bool] = None
    DiscountID: int
    CarModelData: Optional[CarModelsInDB] = None
    CarBrandData: Optional[CarBrandsInDB] = None
    ClientData: Optional[ClientsInDB] = None
    DiscountData: Optional[DiscountsInDB] = None
    CompanyData: Optional[CompanyDataInDB] = None