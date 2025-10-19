# app/graphql/mutations/checks.py
import strawberry
from typing import Optional

from strawberry.types import Info

from app.db import get_db
from app.graphql.schemas.checks import ChecksCreate, ChecksUpdate, ChecksInDB
from app.graphql.crud.checks import (
    create_check,
    update_check,
    delete_check,
)
from app.utils import obj_to_schema


@strawberry.type
class ChecksMutations:
    @strawberry.mutation
    def create_check(self, info: Info, data: ChecksCreate) -> ChecksInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            new_obj = create_check(db, data)
            return obj_to_schema(ChecksInDB, new_obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_check(
        self, info: Info, checkID: int, data: ChecksUpdate, companyID: Optional[int] = None
    ) -> Optional[ChecksInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_check(db, check_id=checkID, data=data, company_id=companyID)
            return obj_to_schema(ChecksInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_check(self, info: Info, checkID: int, companyID: Optional[int] = None) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_check(db, check_id=checkID, company_id=companyID)
            return deleted is not None
        finally:
            db_gen.close()
