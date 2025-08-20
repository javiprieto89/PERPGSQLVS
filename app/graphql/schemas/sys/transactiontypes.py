# app/graphql/schemas/sys/transactiontypes.py
import strawberry


@strawberry.type
class SysTransactionTypesInDB:
    """Catálogo inmutable de tipos de transacción."""
    TransactTypeID: int
    TypeName: str
