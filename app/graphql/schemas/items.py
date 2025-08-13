import strawberry
from typing import Optional
from app.graphql.schemas.warehouses import WarehousesInDB
from app.graphql.schemas.companydata import CompanyDataInDB
from app.graphql.schemas.branches import BranchesInDB
from app.graphql.schemas.suppliers import SuppliersInDB
from app.graphql.schemas.itemsubcategories import ItemSubcategoriesInDB
from app.graphql.schemas.itemcategories import ItemCategoriesInDB
from app.graphql.schemas.brands import BrandsInDB
from datetime import date


# ...existing code...


# ...existing code...


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
    # Corregido nombre del campo (era CcontrolStock en el modelo)
    ControlStock: bool
    ReplenishmentStock: int
    IsOffer: bool
    OEM: Optional[str]
    # Corregido nombre del campo (era lastModified)
    LastModified: Optional[date]
    WarehouseID: int
    IsActive: bool
    CompanyData: Optional[CompanyDataInDB] = None
    BranchData: Optional[BranchesInDB] = None
    BrandData: Optional[BrandsInDB] = None
    CategoryData: Optional[ItemCategoriesInDB] = None
    SubcategoryData: Optional[ItemSubcategoriesInDB] = None
    SupplierData: Optional[SuppliersInDB] = None
    WarehouseData: Optional[WarehousesInDB] = None


@strawberry.type
class ItemSearchResult:
    ItemID: int
    Code: str
    Description: str
    Brand: Optional[BrandsInDB] = None
    Category: Optional[ItemCategoriesInDB] = None
    Subcategory: Optional[ItemSubcategoriesInDB] = None
    Supplier: Optional[SuppliersInDB] = None
    Warehouse: Optional[WarehousesInDB] = None
    Price: Optional[float] = None
    StockQuantity: Optional[int] = None
