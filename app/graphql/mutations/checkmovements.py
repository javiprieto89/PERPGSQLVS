# app/graphql/mutations/checkmovements.py - VERSIÓN COMPLETA
# Resumen: Mutations GraphQL independientes para CheckMovements.

import strawberry
from strawberry.types import Info
from typing import Optional
from app.db import get_db
from app.graphql.schemas.checkmovements import CheckMovementInput, CheckMovementInDB
from app.graphql.crud.checkmovements import (
    create_checkmovement,
    update_checkmovement,
    delete_checkmovement
)
from app.utils import obj_to_schema


@strawberry.type
class CheckMovementsMutation:
    @strawberry.mutation
    def create_checkmovement(self, info: Info, data: CheckMovementInput) -> CheckMovementInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            new_item = create_checkmovement(db, data)
            return obj_to_schema(CheckMovementInDB, new_item)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_checkmovement(self, info: Info, id: int, data: CheckMovementInput) -> Optional[CheckMovementInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated_item = update_checkmovement(db, id, data)
            return obj_to_schema(CheckMovementInDB, updated_item)
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_checkmovement(self, info: Info, id: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            return delete_checkmovement(db, id)
        finally:
            db_gen.close()
