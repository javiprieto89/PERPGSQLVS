# app/graphql/schemas/doctypes.py
import strawberry

@strawberry.input
class DocTypesCreate:
    Name: str
    Active: bool

@strawberry.input
class DocTypesUpdate:
    Name: str
    Active: bool

@strawberry.type
class DocTypesInDB:
    DocTypeID: int
    Name: str
    Active: bool
