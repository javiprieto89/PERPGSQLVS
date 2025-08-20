# app/graphql/schemas/sys/doctypes.py
import strawberry


@strawberry.type
class SysDocTypesInDB:
    """Catálogo inmutable de tipos de documentos de identificación."""
    DocTypeID: int
    Name: str
    IsActive: bool
