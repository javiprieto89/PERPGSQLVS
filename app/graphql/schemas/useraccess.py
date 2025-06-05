# app/graphql/schemas/useraccess.py

import strawberry


@strawberry.input
class UserAccessCreate:
    userID: int
    companyID: int
    branchID: int
    roleID: int


@strawberry.input
class UserAccessUpdate:
    userID: int
    companyID: int
    branchID: int
    roleID: int


@strawberry.type
class UserAccessInDB:
    userID: int
    companyID: int
    branchID: int
    roleID: int
