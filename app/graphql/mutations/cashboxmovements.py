# app/graphql/mutations/cashboxmovements.py
import strawberry
from typing import Optional
from app.graphql.schemas.cashboxmovements import CashBoxMovementsCreate, CashBoxMovementsUpdate, CashBoxMovementsInDB
from app.graphql.crud.cashboxmovements import (
    create_cashboxmovements,
    update_cashboxmovements,
    delete_cashboxmovements,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class CashBoxMovementsMutations:
    @strawberry.mutation
    def create_cashboxmovement(self, info: Info, data: CashBoxMovementsCreate) -> CashBoxMovementsInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_cashboxmovements(db, data)
            return obj_to_schema(CashBoxMovementsInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_cashboxmovement(self, info: Info, movementID: int, data: CashBoxMovementsUpdate) -> Optional[CashBoxMovementsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_cashboxmovements(db, movementID, data)
            return obj_to_schema(CashBoxMovementsInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_cashboxmovement(self, info: Info, movementID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_cashboxmovements(db, movementID)
            return deleted is not None
        finally:
            db_gen.close()

