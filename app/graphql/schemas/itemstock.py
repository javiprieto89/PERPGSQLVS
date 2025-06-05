# app/graphql/schemas/itemstock.py
import strawberry
from typing import Optional
from datetime import datetime

@strawberry.input
class ItemStockCreate:
    itemID: int
    warehouseID: int
    companyID: Optional[int] = None
    quantity: Optional[int] = None
    reservedQuantity: Optional[int] = None
    lastModified: Optional[datetime] = None
    stockStatus: Optional[str] = None
    minStockLevel: Optional[int] = None
    maxStockLevel: Optional[int] = None
    stockLocation: Optional[str] = None
    supplierID: Optional[int] = None
    batchNumber: Optional[str] = None
    expiryDate: Optional[datetime] = None

@strawberry.input
class ItemStockUpdate:
    itemID: Optional[int] = None
    warehouseID: Optional[int] = None
    companyID: Optional[int] = None
    quantity: Optional[int] = None
    reservedQuantity: Optional[int] = None
    lastModified: Optional[datetime] = None
    stockStatus: Optional[str] = None
    minStockLevel: Optional[int] = None
    maxStockLevel: Optional[int] = None
    stockLocation: Optional[str] = None
    supplierID: Optional[int] = None
    batchNumber: Optional[str] = None
    expiryDate: Optional[datetime] = None

@strawberry.type
class ItemStockInDB:
    itemID: int
    warehouseID: int
    companyID: Optional[int]
    quantity: Optional[int]
    reservedQuantity: Optional[int]
    lastModified: Optional[datetime]
    stockStatus: Optional[str]
    minStockLevel: Optional[int]
    maxStockLevel: Optional[int]
    stockLocation: Optional[str]
    supplierID: Optional[int]
    batchNumber: Optional[str]
    expiryDate: Optional[datetime]
