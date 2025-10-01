# app/graphql/resolvers/carbrands.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.carbrands import CarBrandsInDB
from app.graphql.crud.carbrands import (
    get_carbrands,
    get_carbrands_by_id,
    get_carbrands_by_company,
)
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info

@strawberry.type
class CarbrandsQuery:
    @strawberry.field
    def all_carbrands(self, info: Info) -> List[CarBrandsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_carbrands(db)
            return list_to_schema(CarBrandsInDB, items)
        finally:
            db_gen.close()

    @strawberry.field
    def carbrands_by_id(self, info: Info, companyID: int, id: int) -> Optional[CarBrandsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_carbrands_by_id(db, companyID, id)
            return obj_to_schema(CarBrandsInDB, item) if item else None
        finally:
            db_gen.close()

    @strawberry.field
    def carbrands_by_company(self, info: Info, companyID: int) -> List[CarBrandsInDB]:
        """Obtener marcas filtradas por CompanyID"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_carbrands_by_company(db, companyID)
            return list_to_schema(CarBrandsInDB, items)
        finally:
            db_gen.close()

carbrandsQuery = CarbrandsQuery()

