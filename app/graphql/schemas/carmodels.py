# app/graphql/schemas/carmodels.py
import strawberry
from typing import Optional

@strawberry.input
class CarModelsCreate:
    carBrandID: int
    model: str

@strawberry.input
class CarModelsUpdate:
    carBrandID: Optional[int] = None
    model: Optional[str] = None

@strawberry.type
class CarModelsInDB:
    carModelID: int
    carBrandID: int
    model: str
