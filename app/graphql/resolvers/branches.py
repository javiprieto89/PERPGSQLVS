# app/graphql/resolvers/branches.py
import base64
import strawberry
from typing import List, Optional
from app.graphql.schemas.branches import BranchesInDB
from app.graphql.schemas.companydata import CompanyDataInDB
from app.graphql.crud.branches import (
    get_branches,
    get_branches_by_id,
    get_branches_by_company,
)
from app.db import get_db
from app.utils import obj_to_schema
from strawberry.types import Info


def encode_logo(logo_bytes: Optional[bytes]) -> Optional[str]:
    if logo_bytes is None:
        return None
    return base64.b64encode(logo_bytes).decode("utf-8")


@strawberry.type
class BranchesQuery:
    @strawberry.field
    def all_branches(self, info: Info) -> List[BranchesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_branches(db)
            result = []
            for item in items:
                obj = obj_to_schema(BranchesInDB, item)
                obj.Logo = encode_logo(getattr(item, "Logo", None))
                company_data = getattr(item, "companyData_", None)
                obj.CompanyData = (
                    obj_to_schema(CompanyDataInDB, company_data)
                    if company_data
                    else None
                )
                result.append(obj)
            return result
        finally:
            db_gen.close()

    @strawberry.field
    def branches_by_id(self, info: Info, companyID: int, id: int) -> Optional[BranchesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_branches_by_id(db, companyID, id)
            if not item:
                return None
            obj = obj_to_schema(BranchesInDB, item)
            obj.Logo = encode_logo(getattr(item, "Logo", None))
            company_data = getattr(item, "companyData_", None)
            obj.CompanyData = (
                obj_to_schema(CompanyDataInDB, company_data)
                if company_data
                else None
            )
            return obj
        finally:
            db_gen.close()

    @strawberry.field
    def branches_by_company(self, info: Info, companyID: int) -> List[BranchesInDB]:
        """Obtener sucursales filtradas por CompanyID"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            branches = get_branches_by_company(db, companyID)
            result = []
            for item in branches:
                obj = obj_to_schema(BranchesInDB, item)
                obj.Logo = encode_logo(getattr(item, "Logo", None))
                company_data = getattr(item, "companyData_", None)
                obj.CompanyData = (
                    obj_to_schema(CompanyDataInDB, company_data)
                    if company_data
                    else None
                )
                result.append(obj)
            return result
        finally:
            db_gen.close()


branchesQuery = BranchesQuery()
