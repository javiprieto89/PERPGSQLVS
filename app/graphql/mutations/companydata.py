# app/graphql/mutations/companydata.py
import strawberry
from typing import Optional
from app.graphql.schemas.companydata import CompanyDataCreate, CompanyDataUpdate, CompanyDataInDB
from app.graphql.crud.companydata import create_companydata, update_companydata, delete_companydata
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info

@strawberry.type
class CompanydataMutations:
    @strawberry.mutation
    def create_company(self, info: Info, data: CompanyDataCreate) -> CompanyDataInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_companydata(db, data)
            return obj_to_schema(CompanyDataInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_company(self, info: Info, companyID: int, data: CompanyDataUpdate) -> Optional[CompanyDataInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_companydata(db, companyID, data)
            return obj_to_schema(CompanyDataInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_company(self, info: Info, companyID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_companydata(db, companyID)
            return deleted is not None
        finally:
            db_gen.close()

