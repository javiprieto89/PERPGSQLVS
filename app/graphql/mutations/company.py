# app/graphql/mutations/company.py
import strawberry
from typing import Optional
from app.graphql.schemas.company import CompanyCreate, CompanyUpdate, CompanyInDB
from app.graphql.crud.company import create_company, update_company, delete_company
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class CompanyMutations:
    @strawberry.mutation
    def create_company(self, info: Info, data: CompanyCreate) -> CompanyInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_company(db, data)
            return obj_to_schema(CompanyInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_company(self, info: Info, companyID: int, data: CompanyUpdate) -> Optional[CompanyInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_company(db, companyID, data)
            return obj_to_schema(CompanyInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_company(self, info: Info, companyID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_company(db, companyID)
            return deleted is not None
        finally:
            db_gen.close()
