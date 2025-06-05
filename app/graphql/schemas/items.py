# app/graphql/schemas/items.py

import strawberry
from typing import Optional
from datetime import date


@strawberry.input
class ItemsCreate:
    companyID: int
    branchID: int
    brandID: int
    code: str
    description: str
    categoryID: int
    subcategoryID: int
    supplierID: int
    controlStock: bool
    replenishmentStock: int
    isOffer: bool
    oem: Optional[str] = None
    lastModified: Optional[date] = None
    warehouseID: int
    isActive: bool


@strawberry.input
class ItemsUpdate:
    companyID: Optional[int] = None
    branchID: Optional[int] = None
    brandID: Optional[int] = None
    code: Optional[str] = None
    description: Optional[str] = None
    categoryID: Optional[int] = None
    subcategoryID: Optional[int] = None
    supplierID: Optional[int] = None
    controlStock: Optional[bool] = None
    replenishmentStock: Optional[int] = None
    isOffer: Optional[bool] = None
    oem: Optional[str] = None
    lastModified: Optional[date] = None
    warehouseID: Optional[int] = None
    isActive: Optional[bool] = None


@strawberry.type
class ItemsInDB:
    itemID: int
    companyID: int
    branchID: int
    brandID: int
    code: str
    description: str
    categoryID: int
    subcategoryID: int
    supplierID: int
    controlStock: bool
    replenishmentStock: int
    isOffer: bool
    oem: Optional[str]
    lastModified: Optional[date]
    warehouseID: int
    isActive: bool

@strawberry.type
class ItemSearchResult:
    itemID: int
    brandName: Optional[str] = None
    categoryName: Optional[str] = None
    subcategoryName: Optional[str] = None
    supplierName: Optional[str] = None
    price: Optional[float] = None
    # stockQuantity: Optional[int] = None  # Descomentar si lo usás
