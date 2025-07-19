# app/graphql/resolvers/useraccess.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.useraccess import UserAccessInDB
from app.graphql.crud.useraccess import get_useraccess, get_useraccess_by_id
from app.db import get_db

from strawberry.types import Info


@strawberry.type
class UseraccessQuery:
    @strawberry.field
    def all_useraccess(self, info: Info) -> List[UserAccessInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            records = get_useraccess(db)
            result = []
            for r in records:
                data = {
                    'UserID': r.UserID,
                    'CompanyID': r.CompanyID,
                    'BranchID': r.BranchID,
                    'RoleID': r.RoleID,
                    'UserName': getattr(r.users_, 'FullName', None),
                    'CompanyName': getattr(r.companyData_, 'Name', None),
                    'BranchName': getattr(r.branches_, 'Name', None),
                    'RoleName': getattr(r.roles_, 'RoleName', None),
                }
                result.append(UserAccessInDB(**data))
            return result
        finally:
            db_gen.close()

    @strawberry.field
    def useraccess_by_id(self, info: Info, userID: int, companyID: int, branchID: int, roleID: int) -> Optional[UserAccessInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            record = get_useraccess_by_id(
                db, userID, companyID, branchID, roleID)
            if record:
                data = {
                    'UserID': record.UserID,
                    'CompanyID': record.CompanyID,
                    'BranchID': record.BranchID,
                    'RoleID': record.RoleID,
                    'UserName': getattr(record.users_, 'FullName', None),
                    'CompanyName': getattr(record.companyData_, 'Name', None),
                    'BranchName': getattr(record.branches_, 'Name', None),
                    'RoleName': getattr(record.roles_, 'RoleName', None),
                }
                return UserAccessInDB(**data)
            return None
        finally:
            db_gen.close()


useraccessQuery = UseraccessQuery()
