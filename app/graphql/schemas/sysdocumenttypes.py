# app/graphql/schemas/sysdocumenttypes.py
import strawberry
from typing import Optional, List

#from app.graphql.schemas.clients import ClientsInDB

@strawberry.input
class SysDocumentTypesCreate:
    Name: str


@strawberry.input
class SysDocumentTypesUpdate:
    Name: Optional[str] = None


@strawberry.type
class SysDocumentTypesInDB:
    DocumentTypeID: int
    Name: str

    # Relaciones
    #clients: Optional[List[ClientsInDB]] = None
