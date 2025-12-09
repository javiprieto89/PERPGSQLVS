# app/graphql/resolvers/checkmovements.py - VERSIÓN COMPLETA
# Resumen: Resolvers GraphQL para movimientos de cheques (CheckMovements).

import strawberry
from typing import List, Optional
from strawberry.types import Info
from app.db import get_db
from app.graphql.schemas.checkmovements import CheckMovementInDB
from app.graphql.crud.checkmovements import (
    get_checkmovements,
    get_checkmovement_by_id,
    get_checkmovements_by_check,
    get_checkmovements_by_company,
)
from app.utils import list_to_schema, obj_to_schema


@strawberry.type
class CheckMovementsQuery:
    @strawberry.field
    def all_checkmovements(self, info: Info) -> List[CheckMovementInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_checkmovements(db)
            return list_to_schema(CheckMovementInDB, items)
        finally:
            db_gen.close()

    @strawberry.field
    def get_checkmovement_by_id(self, info: Info, id: int) -> Optional[CheckMovementInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_checkmovement_by_id(db, id)
            return obj_to_schema(CheckMovementInDB, item)
        finally:
            db_gen.close()

    @strawberry.field
    def checkmovements_by_check(
        self, info: Info, check_id: int
    ) -> List[CheckMovementInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_checkmovements_by_check(db, check_id)
            return list_to_schema(CheckMovementInDB, items)
        finally:
            db_gen.close()

    @strawberry.field
    def checkmovements_by_company(
        self, info: Info, company_id: int
    ) -> List[CheckMovementInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_checkmovements_by_company(db, company_id)
            return list_to_schema(CheckMovementInDB, items)
        finally:
            db_gen.close()


checkmovementsQuery = CheckMovementsQuery()
