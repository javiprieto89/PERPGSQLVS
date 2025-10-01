# app/graphql/resolvers/carmodels.py
import re
import strawberry
from typing import List, Optional
from app.graphql.schemas.carmodels import CarModelsInDB
from app.graphql.schemas.carbrands import CarBrandsInDB
from app.models.carmodels import CarModels
from app.models.carbrands import CarBrands
from app.graphql.crud.carmodels import (
    get_carmodels,
    get_carmodels_by_id,
    get_carmodels_by_brand
)
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class CarmodelsQuery:
    @strawberry.field
    def all_carmodels(self, info: Info) -> List[CarModelsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            carmodels = get_carmodels(db)
            return list_to_schema(CarModelsInDB, carmodels)
        finally:
            db_gen.close()

    @strawberry.field
    def carmodels_by_id(self, info: Info, companyID: int, carBrandID: int, id: int) -> Optional[CarModelsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            carmodel = get_carmodels_by_id(db, companyID, carBrandID, id)
            return obj_to_schema(CarModelsInDB, carmodel) if carmodel else None
        finally:
            db_gen.close()

    @strawberry.field
    def carmodels_by_brand(self, info: Info, companyID: int, carBrandID: int) -> List[CarModelsInDB]:
        """Obtener modelos filtrados por marca"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            carmodel = get_carmodels_by_brand(db, companyID, carBrandID)
            return list_to_schema(CarModelsInDB, carmodel)
        finally:
            db_gen.close()


carmodelsQuery = CarmodelsQuery()
