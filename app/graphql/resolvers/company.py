# app/graphql/resolvers/company.py
import base64
from datetime import date, datetime
from typing import Sequence, Optional, List

import strawberry
from strawberry.types import Info

from app.graphql.schemas.company import CompanyInDB
from app.graphql.crud.company import get_company, get_company_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema


def encode_logo(logo_bytes: Optional[bytes]) -> Optional[str]:
    if logo_bytes is None:
        return None
    return base64.b64encode(logo_bytes).decode("utf-8")


@strawberry.type
class CompanyQuery:
    @strawberry.field
    def all_company(self, info: Info) -> List[CompanyInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            company = get_company(db)
            return list_to_schema(CompanyInDB, company)
        finally:
            db_gen.close()

    @strawberry.field
    def company_by_id(self, info: Info, id: int) -> Optional[CompanyInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            company = get_company_by_id(db, id)
            return obj_to_schema(CompanyInDB, company) if company else None
        finally:
            db_gen.close()


companyQuery = CompanyQuery()
