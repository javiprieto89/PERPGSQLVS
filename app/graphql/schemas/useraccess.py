# app/graphql/schemas/useraccess.py

import strawberry
from typing import Optional
from app.graphql.schemas.companydata import CompanyDataInDB
from app.graphql.schemas.branches import BranchesInDB
from app.graphql.schemas.roles import RolesInDB
from app.graphql.schemas.users import UsersInDB

@strawberry.input
class UserAccessCreate:
    UserID: int    
    CompanyID: int
    BranchID: int
    RoleID: int


@strawberry.input
class UserAccessUpdate:
    UserID: Optional[int] = None
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    RoleID: Optional[int] = None


@strawberry.type
class UserAccessInDB:
    UserID: int
    CompanyID: int
    BranchID: int
    RoleID: int
    UserData: UsersInDB | None = None
    BranchData: BranchesInDB | None = None
    RoleData: RolesInDB | None = None
    CompanyData: CompanyDataInDB | None = None
