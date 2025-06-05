# app/graphql/schemas/documenttypes.py
import strawberry
from typing import Optional, List

#from app.graphql.schemas.clients import ClientsInDB

@strawberry.input
class DocumentTypesCreate:
    name: str


@strawberry.input
class DocumentTypesUpdate:
    name: Optional[str] = None


@strawberry.type
class DocumentTypesInDB:
    documentTypeID: int
    name: str

    # Relaciones
    #clients: Optional[List[ClientsInDB]] = None
