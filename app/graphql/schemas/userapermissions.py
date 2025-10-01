# app/graphql/schemas/userpermissions.py

import strawberry
from app.graphql.schemas.company import CompanyInDB
from app.graphql.schemas.branches import BranchesInDB
from app.graphql.schemas.roles import RolesInDB
from app.graphql.schemas.users import UsersInDB


@strawberry.input
class UserPermissionsCreate:
    UserID: int
    CompanyID: int
    BranchID: int
    RoleID: int


@strawberry.input
class UserPermissionsUpdate:
    UserID: int
    CompanyID: int
    BranchID: int
    RoleID: int


@strawberry.type
class UserPermissionsInDB:
    UserID: int
    CompanyID: int
    BranchID: int
    RoleID: int
    UserData: UsersInDB | None = None
    BranchData: BranchesInDB | None = None
    RoleData: RolesInDB | None = None
    CompanyData: CompanyInDB | None = None
