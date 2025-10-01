import strawberry
from typing import Optional


@strawberry.type
class ItemStocksInDB:
    CompanyID: int
    ItemID: int
    WarehouseID: int
    BranchID: int
    Quantity: int
    ReservedQuantity: Optional[int] = None
    StockStatus: Optional[str] = None
    MinStockLevel: Optional[int] = None
    MaxStockLevel: Optional[int] = None
    SupplierID: Optional[int] = None
    StockLocation: Optional[str] = None
    BatchNumber: Optional[str] = None
    ExpiryDate: Optional[str] = None

