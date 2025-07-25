# app/graphql/schemas/carmodels.py
import strawberry
from typing import Optional

@strawberry.input
class CarModelsCreate:
    CarBrandID: int
    Model: str

@strawberry.input
class CarModelsUpdate:
    CarBrandID: Optional[int] = None
    Model: Optional[str] = None

@strawberry.type
class CarModelsInDB:
    CarModelID: int
    CarBrandID: int
    Model: str
    CarBrandName: Optional[str] = None
