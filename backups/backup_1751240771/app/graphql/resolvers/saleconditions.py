# app/graphql/resolvers/saleconditions.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.saleconditions import SaleConditionsInDB
from app.graphql.crud.saleconditions import get_saleconditions, get_saleconditions_by_id
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class SaleconditionsQuery:
    @strawberry.field
    def all_saleconditions(self, info: Info) -> List[SaleConditionsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            saleconditions = get_saleconditions(db)
            return [SaleConditionsInDB(**condition.__dict__) for condition in saleconditions]
        finally:
            db_gen.close()

    @strawberry.field
    def saleconditions_by_id(self, info: Info, id: int) -> Optional[SaleConditionsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            record = get_saleconditions_by_id(db, id)
            return SaleConditionsInDB(**record.__dict__) if record else None
        finally:
            db_gen.close()


saleconditionsQuery = SaleconditionsQuery()
