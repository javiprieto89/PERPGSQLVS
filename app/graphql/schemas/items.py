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
    ItemCategoryID: int  # Corregido nombre del campo
    ItemSubcategoryID: int  # Corregido nombre del campo
    SupplierID: int
    ControlStock: bool  # Corregido nombre del campo
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
    ItemCategoryID: Optional[int] = None  # Corregido nombre del campo
    ItemSubcategoryID: Optional[int] = None  # Corregido nombre del campo
    SupplierID: Optional[int] = None
    ControlStock: Optional[bool] = None  # Corregido nombre del campo
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
    ItemCategoryID: int  # Corregido nombre del campo
    ItemSubcategoryID: int  # Corregido nombre del campo
    SupplierID: int
    ControlStock: bool  # Corregido nombre del campo (era CcontrolStock en el modelo)
    ReplenishmentStock: int
    IsOffer: bool
    OEM: Optional[str]
    LastModified: Optional[date]  # Corregido nombre del campo (era lastModified)
    WarehouseID: int
    IsActive: bool
    BrandName: Optional[str] = None
    CategoryName: Optional[str] = None
    SubcategoryName: Optional[str] = None



@strawberry.type
class ItemSearchResult:
    ItemID: int
    Code: str
    Description: str
    BrandName: Optional[str] = None
    CategoryName: Optional[str] = None
    SubcategoryName: Optional[str] = None
    SupplierName: Optional[str] = None
    Price: Optional[float] = None
    StockQuantity: Optional[int] = None
