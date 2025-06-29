# app/graphql/schemas/items.py

import strawberry
from typing import Optional
from datetime import date


@strawberry.input
class ItemsCreate:
    CompanyID: int
    BranchID: int
    BrandID: int
    Code: str
    Description: str
    CategoryID: int
    SubcategoryID: int
    SupplierID: int
    ControlStock: bool
    ReplenishmentStock: int
    IsOffer: bool
    OEM: Optional[str] = None
    LastModified: Optional[date] = None
    WarehouseID: int
    IsActive: bool


@strawberry.input
class ItemsUpdate:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    BrandID: Optional[int] = None
    Code: Optional[str] = None
    Description: Optional[str] = None
    CategoryID: Optional[int] = None
    SubcategoryID: Optional[int] = None
    SupplierID: Optional[int] = None
    ControlStock: Optional[bool] = None
    ReplenishmentStock: Optional[int] = None
    IsOffer: Optional[bool] = None
    OEM: Optional[str] = None
    LastModified: Optional[date] = None
    WarehouseID: Optional[int] = None
    IsActive: Optional[bool] = None


@strawberry.type
class ItemsInDB:
    ItemID: int
    CompanyID: int
    BranchID: int
    BrandID: int
    Code: str
    Description: str
    CategoryID: int
    SubcategoryID: int
    SupplierID: int
    CntrolStock: bool
    ReplenishmentStock: int
    IsOffer: bool
    OEM: Optional[str]
    lastModified: Optional[date]
    WarehouseID: int
    IsActive: bool

@strawberry.type
class ItemSearchResult:
    ItemID: int
    BrandName: Optional[str] = None
    CcategoryName: Optional[str] = None
    SubcategoryName: Optional[str] = None
    SupplierName: Optional[str] = None
    Pprice: Optional[float] = None
# stockQuantity: Optional[int] = None  # Descomentar si lo usás
