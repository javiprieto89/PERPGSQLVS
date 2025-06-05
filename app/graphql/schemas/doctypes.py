# app/graphql/schemas/doctypes.py
import strawberry

@strawberry.input
class DocTypesCreate:
    name: str
    Active: bool

@strawberry.input
class DocTypesUpdate:
    name: str
    Active: bool

@strawberry.type
class DocTypesInDB:
    docTypeID: int
    name: str
    Active: bool
