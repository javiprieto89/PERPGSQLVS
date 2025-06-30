# app/graphql/resolvers/carbrands.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.carbrands import CarBrandsInDB
from app.graphql.crud.carbrands import get_carbrands, get_carbrands_by_id
from app.db import get_db
from strawberry.types import Info

@strawberry.type
class CarbrandsQuery:
    @strawberry.field
    def all_carbrands(self, info: Info) -> List[CarBrandsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_carbrands(db)
            return [CarBrandsInDB(**item.__dict__) for item in items]
        finally:
            db_gen.close()

    @strawberry.field
    def carbrands_by_id(self, info: Info, id: int) -> Optional[CarBrandsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_carbrands_by_id(db, id)
            return CarBrandsInDB(**item.__dict__) if item else None
        finally:
            db_gen.close()

carbrandsQuery = CarbrandsQuery()
