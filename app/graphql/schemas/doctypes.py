# app/graphql/schemas/doctypes.py
import strawberry
from typing import Optional

@strawberry.input
class DocTypesCreate:
    Name: str  # Obligatorio - NOT NULL en BD
    IsActive: bool  # Obligatorio - NOT NULL en BD

@strawberry.input
class DocTypesUpdate:
    Name: Optional[str] = None  # Opcional para updates
    IsActive: Optional[bool] = None  # Opcional para updates

@strawberry.type
class DocTypesInDB:
    DocTypeID: int  # PK, siempre presente
    Name: str  # NOT NULL en BD
    IsActive: bool  # NOT NULL en BD