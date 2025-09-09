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
            carmodels = db.query(CarModels).join(
                CarBrands,
                CarModels.CarBrandID == CarBrands.CarBrandID
            ).all()
            result = []
            for cm in carmodels:
                cm_data = obj_to_schema(CarModelsInDB, cm)
                # Cambiar de carBrands_ a carBrand (como está definido en el modelo)
                if cm.carBrand:  # ← CAMBIO AQUÍ
                    brand_data = obj_to_schema(CarBrandsInDB, cm.carBrand)
                    setattr(cm_data, 'CarBrandData', brand_data)
                else:
                    setattr(cm_data, 'CarBrandData', None)
                
                result.append(cm_data)
            return result
        finally:
            db_gen.close()

    @strawberry.field
    def carmodels_by_id(self, info: Info, id: int) -> Optional[CarModelsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            carmodel = db.query(CarModels).join(
                CarBrands,
                CarModels.CarBrandID == CarBrands.CarBrandID
            ).filter(CarModels.CarModelID == id).first()

            if carmodel:
                cm_data = obj_to_schema(CarModelsInDB, carmodel)
                if carmodel.carBrand:  # ← CAMBIO AQUÍ
                    brand_data = obj_to_schema(CarBrandsInDB, carmodel.carBrand)
                    setattr(cm_data, 'CarBrandData', brand_data)
                else:
                    setattr(cm_data, 'CarBrandData', None)
                return cm_data
            return None
        finally:
            db_gen.close()

    @strawberry.field
    def carmodels_by_brand(self, info: Info, carBrandID: int) -> List[CarModelsInDB]:
        """Obtener modelos filtrados por marca"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            carmodel = db.query(CarModels).join(
                CarBrands,
                CarModels.CarBrandID == CarBrands.CarBrandID
            ).filter(CarModels.CarBrandID == carBrandID).all()
            result = []
            for cm in carmodel:
                cm_data = obj_to_schema(CarModelsInDB, cm)
                # Cambiar de carBrands_ a carBrand
                if cm.carBrand:  # ← CAMBIO AQUÍ
                    brand_data = obj_to_schema(CarBrandsInDB, cm.carBrand)
                    setattr(cm_data, 'CarBrandData', brand_data)
                else:
                    setattr(cm_data, 'CarBrandData', None)
                
                result.append(cm_data)
            return result
        finally:
            db_gen.close()


carmodelsQuery = CarmodelsQuery()
