# app/graphql/schemas/sysorderstatus.py
import strawberry
from typing import Optional

@strawberry.input
class SysOrderStatusCreate:
    Status: str

@strawberry.input
class SysOrderStatusUpdate:
    Status: Optional[str] = None

@strawberry.type
class SysOrderStatusInDB:
    OrderStatusID: int
    Status: str
