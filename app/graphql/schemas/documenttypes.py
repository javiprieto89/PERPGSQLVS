# app/graphql/schemas/documenttypes.py
import strawberry
from typing import Optional, List

#from app.graphql.schemas.clients import ClientsInDB

@strawberry.input
class DocumentTypesCreate:
    Name: str


@strawberry.input
class DocumentTypesUpdate:
    Name: Optional[str] = None


@strawberry.type
class DocumentTypesInDB:
    DocTypeID: int
    Name: str

    # Relaciones
    #clients: Optional[List[ClientsInDB]] = None
