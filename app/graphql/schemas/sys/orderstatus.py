# app/graphql/schemas/sys/orderstatus.py
import strawberry


@strawberry.type
class SysOrderStatusInDB:
    """Catálogo inmutable de estados posibles para las órdenes."""
    OrderStatusID: int
    Status: str
