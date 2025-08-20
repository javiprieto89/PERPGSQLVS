# app/graphql/schemas/sys/documenttypes.py
import strawberry


@strawberry.type
class SysDocumentTypesInDB:
    """Catálogo inmutable de tipos de comprobantes asignados a órdenes y documentos."""
    DocumentTypeID: int
    Name: str
