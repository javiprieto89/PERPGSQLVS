# app/graphql/schemas/useraccess.py

import strawberry


@strawberry.input
class UserAccessCreate:
    UserID: int    
    CompanyID: int
    BranchID: int
    RoleID: int


@strawberry.input
class UserAccessUpdate:
    UserID: int
    CompanyID: int
    BranchID: int
    RoleID: int


@strawberry.type
class UserAccessInDB:
    UserID: int
    CompanyID: int
    BranchID: int
    RoleID: int
    UserName: str | None = None
    CompanyName: str | None = None
    BranchName: str | None = None
    RoleName: str | None = None
