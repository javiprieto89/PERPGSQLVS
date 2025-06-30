# app/graphql/schemas/orderstatus.py
import strawberry
from typing import Optional

@strawberry.input
class OrderStatusCreate:
    Status: str

@strawberry.input
class OrderStatusUpdate:
    Status: Optional[str] = None

@strawberry.type
class OrderStatusInDB:
    OrderStatusID: int
    Status: str
