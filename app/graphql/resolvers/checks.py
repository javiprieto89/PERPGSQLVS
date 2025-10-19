# app/graphql/resolvers/checks.py
import strawberry
from typing import List, Optional

from strawberry.types import Info

from app.db import get_db
from app.graphql.schemas.checks import ChecksInDB
from app.graphql.crud.checks import (
    get_checks,
    get_check_by_id,
    get_checks_by_company,
)
from app.utils import list_to_schema, obj_to_schema


@strawberry.type
class ChecksQuery:
    @strawberry.field
    def all_checks(self, info: Info) -> List[ChecksInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_checks(db)
            return list_to_schema(ChecksInDB, items)
        finally:
            db_gen.close()

    @strawberry.field
    def checks_by_company(self, info: Info, companyID: int) -> List[ChecksInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_checks_by_company(db, companyID)
            return list_to_schema(ChecksInDB, items)
        finally:
            db_gen.close()

    @strawberry.field
    def check_by_id(
        self, info: Info, checkID: int, companyID: Optional[int] = None
    ) -> Optional[ChecksInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_check_by_id(db, check_id=checkID, company_id=companyID)
            return obj_to_schema(ChecksInDB, item) if item else None
        finally:
            db_gen.close()


checksQuery = ChecksQuery()
