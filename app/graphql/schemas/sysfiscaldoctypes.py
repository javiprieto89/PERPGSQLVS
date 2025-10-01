# app/graphql/schemas/sysfiscaldoctypes.py
import strawberry


@strawberry.type
class SysFiscalDocTypesInDB:
    DocumentTypeID: int
    Name: str