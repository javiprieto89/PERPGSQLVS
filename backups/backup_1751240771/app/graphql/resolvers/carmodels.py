# app/graphql/resolvers/carmodels.py
import strawberry
from typing import List, Optional
from dataclasses import asdict
from app.graphql.schemas.carmodels import CarModelsInDB
from app.graphql.crud.carmodels import get_carmodels, get_carmodels_by_id
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class CarmodelsQuery:
    @strawberry.field
    def all_carmodels(self, info: Info) -> List[CarModelsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            carmodels = get_carmodels(db)
            return [CarModelsInDB(**asdict(carmodel)) for carmodel in carmodels]
        finally:
            db_gen.close()

    @strawberry.field
    def carmodels_by_id(self, info: Info, id: int) -> Optional[CarModelsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            carmodel = get_carmodels_by_id(db, id)
            return CarModelsInDB(**asdict(carmodel)) if carmodel else None
        finally:
            db_gen.close()


carmodelsQuery = CarmodelsQuery()
