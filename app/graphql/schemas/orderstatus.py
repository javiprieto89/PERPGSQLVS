# app/graphql/schemas/orderstatus.py
import strawberry
from typing import Optional

@strawberry.input
class OrderStatusCreate:
    status: str

@strawberry.input
class OrderStatusUpdate:
    status: Optional[str] = None

@strawberry.type
class OrderStatusInDB:
    orderStatusID: int
    status: str
