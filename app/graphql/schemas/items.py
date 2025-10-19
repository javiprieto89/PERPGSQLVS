# app/graphql/schemas/items.py
import strawberry
from typing import Optional
from datetime import date
from app.graphql.schemas.brands import BrandsInDB
from app.graphql.schemas.itemcategories import ItemCategoriesInDB
from app.graphql.schemas.itemsubcategories import ItemSubcategoriesInDB
from app.graphql.schemas.suppliers import SuppliersInDB
from app.graphql.schemas.branches import BranchesInDB
from app.graphql.schemas.company import CompanyInDB
from app.graphql.schemas.warehouses import WarehousesInDB


@strawberry.input
class ItemsCreate:
    CompanyID: int
    BranchID: int
    BrandID: int
    ItemCode: str
    ItemDescription: str
    ItemCategoryID: int
    ItemSubcategoryID: int
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
    ItemCode: Optional[str] = None
    ItemDescription: Optional[str] = None
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
    ItemCode: str
    ItemDescription: str
    ItemCategoryID: int
    ItemSubcategoryID: int
    SupplierID: int
    ControlStock: bool
    ReplenishmentStock: int
    IsOffer: bool
    OEM: Optional[str]
    LastModified: Optional[date]
    WarehouseID: int
    IsActive: bool
    CompanyData: Optional[CompanyInDB] = None
    BranchData: Optional[BranchesInDB] = None
    BrandData: Optional[BrandsInDB] = None
    CategoryData: Optional[ItemCategoriesInDB] = None
    SubcategoryData: Optional[ItemSubcategoriesInDB] = None
    SupplierData: Optional[SuppliersInDB] = None
    WarehouseData: Optional[WarehousesInDB] = None


@strawberry.type
class ItemSearchResult:
    ItemID: int
    ItemCode: str
    ItemDescription: str
    Brand: Optional[BrandsInDB] = None
    Category: Optional[ItemCategoriesInDB] = None
    Subcategory: Optional[ItemSubcategoriesInDB] = None
    Supplier: Optional[SuppliersInDB] = None
    Warehouse: Optional[WarehousesInDB] = None
    Price: Optional[float] = None
    StockQuantity: Optional[int] = None
