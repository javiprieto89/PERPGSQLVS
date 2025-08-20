# app/graphql/schemas/itemstock.py
import strawberry
from typing import Optional
from datetime import datetime

@strawberry.input
class ItemStockCreate:
    ItemID: int
    WarehouseID: int
    CompanyID: Optional[int] = None
    Quantity: Optional[int] = None
    ReservedQuantity: Optional[int] = None
    LastModified: Optional[datetime] = None
    StockStatus: Optional[str] = None
    MinStockLevel: Optional[int] = None
    MaxStockLevel: Optional[int] = None
    StockLocation: Optional[str] = None
    SupplierID: Optional[int] = None
    BatchNumber: Optional[str] = None
    ExpiryDate: Optional[datetime] = None

@strawberry.input
class ItemStockUpdate:
    ItemID: Optional[int] = None
    WarehouseID: Optional[int] = None
    CompanyID: Optional[int] = None
    Quantity: Optional[int] = None
    ReservedQuantity: Optional[int] = None
    LastModified: Optional[datetime] = None
    StockStatus: Optional[str] = None
    MinStockLevel: Optional[int] = None
    MaxStockLevel: Optional[int] = None
    StockLocation: Optional[str] = None
    SupplierID: Optional[int] = None
    BatchNumber: Optional[str] = None
    ExpiryDate: Optional[datetime] = None

@strawberry.type
class ItemStockInDB:
    ItemID: int
    WarehouseID: int
    CompanyID: Optional[int]
    Quantity: Optional[int]
    ReservedQuantity: Optional[int]
    LastModified: Optional[datetime]
    StockStatus: Optional[str]
    MinStockLevel: Optional[int]
    MaxStockLevel: Optional[int]
    StockLocation: Optional[str]
    SupplierID: Optional[int]
    BatchNumber: Optional[str]
    ExpiryDate: Optional[datetime]
