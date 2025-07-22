# app/graphql/mutations/cashboxes.py
import strawberry
from typing import Optional
from app.graphql.schemas.cashboxes import CashBoxesCreate, CashBoxesUpdate, CashBoxesInDB
from app.graphql.crud.cashboxes import (
    create_cashboxes,
    update_cashboxes,
    delete_cashboxes,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class CashBoxesMutations:
    @strawberry.mutation
    def create_cashbox(self, info: Info, data: CashBoxesCreate) -> CashBoxesInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_cashboxes(db, data)
            return obj_to_schema(CashBoxesInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_cashbox(self, info: Info, cashBoxID: int, data: CashBoxesUpdate) -> Optional[CashBoxesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_cashboxes(db, cashBoxID, data)
            return obj_to_schema(CashBoxesInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_cashbox(self, info: Info, cashBoxID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_cashboxes(db, cashBoxID)
            return deleted is not None
        finally:
            db_gen.close()
