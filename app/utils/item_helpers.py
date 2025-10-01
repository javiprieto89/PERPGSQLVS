# app/utils/item_helpers.py

from typing import Any, Optional, overload
from typing_extensions import Literal
from app.graphql.schemas.items import ItemsInDB
from app.graphql.schemas.brands import BrandsInDB
from app.graphql.schemas.itemcategories import ItemCategoriesInDB
from app.graphql.schemas.itemsubcategories import ItemSubcategoriesInDB
from app.graphql.schemas.suppliers import SuppliersInDB
from app.graphql.schemas.branches import BranchesInDB
from app.graphql.schemas.company import CompanyInDB
from app.graphql.schemas.warehouses import WarehousesInDB
from app.utils import obj_to_schema


def safe_int(value: Any, default: int = 0) -> int:
    """Convierte de forma segura cualquier valor a int"""
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def _safe_str_required(value: Any, default: str = "") -> str:
    try:
        result = str(value) if value is not None else default
    except Exception:
        result = default
    return result if result is not None else ""


def _safe_str_optional(value: Any, default: Optional[str] = None) -> Optional[str]:
    try:
        return str(value) if value is not None else default
    except Exception:
        return default


@overload
def safe_str(
    value: Any,
    default: str = "",
    allow_none: Literal[False] = False,
) -> str: ...


@overload
def safe_str(
    value: Any,
    default: Optional[str],
    allow_none: Literal[False] = False,
) -> Optional[str]: ...


@overload
def safe_str(
    value: Any,
    default: Optional[str],
    allow_none: Literal[True],
) -> Optional[str]: ...


def safe_str(
    value: Any,
    default: Optional[str] = "",
    allow_none: bool = False,
) -> str | None:
    if allow_none or default is None:
        return _safe_str_optional(value, default)
    return _safe_str_required(value, default or "")


def safe_bool(value: Any, default: bool = False) -> bool:
    """Convierte de forma segura cualquier valor a bool"""
    try:
        return bool(value)
    except Exception:
        return default


def safe_float(value: Any, default: float = 0.0) -> float:
    """Convierte de forma segura cualquier valor a float"""
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def item_to_in_db(item) -> ItemsInDB:
    """Convierte un modelo Items a ItemsInDB incluyendo datos relacionados"""

    data = {
        'ItemID': safe_int(getattr(item, 'ItemID', 0)),
        'CompanyID': safe_int(getattr(item, 'CompanyID', 0)),
        'BranchID': safe_int(getattr(item, 'BranchID', 0)),
        'BrandID': safe_int(getattr(item, 'BrandID', 0)),
        'ItemCode': safe_str(getattr(item, 'ItemCode', getattr(item, 'Code', ''))),
        'ItemDescription': safe_str(getattr(item, 'ItemDescription', getattr(item, 'Description', ''))),
        'ItemCategoryID': safe_int(getattr(item, 'ItemCategoryID', 0)),
        'ItemSubcategoryID': safe_int(getattr(item, 'ItemSubcategoryID', 0)),
        'SupplierID': safe_int(getattr(item, 'SupplierID', 0)),
        'ControlStock': safe_bool(getattr(item, 'ControlStock', False)),
        'ReplenishmentStock': safe_int(getattr(item, 'ReplenishmentStock', 0)),
        'IsOffer': safe_bool(getattr(item, 'IsOffer', False)),
        'OEM': safe_str(getattr(item, 'OEM', None), None),
        'LastModified': getattr(item, 'LastModified', None),
        'WarehouseID': safe_int(getattr(item, 'WarehouseID', 0)),
        'IsActive': safe_bool(getattr(item, 'IsActive', False)),
        'Company': obj_to_schema(CompanyInDB, getattr(item, 'company_', None)) if hasattr(item, 'company_') else None,
        'BranchData': obj_to_schema(BranchesInDB, getattr(item, 'branches_', None)) if hasattr(item, 'branches_') else None,
        'BrandData': obj_to_schema(BrandsInDB, getattr(item, 'brands_', None)) if hasattr(item, 'brands_') else None,
        'CategoryData': obj_to_schema(ItemCategoriesInDB, getattr(item, 'itemCategories_', None)) if hasattr(item, 'itemCategories_') else None,
        'SubcategoryData': obj_to_schema(ItemSubcategoriesInDB, getattr(item, 'itemSubcategories_', None)) if hasattr(item, 'itemSubcategories_') else None,
        'SupplierData': obj_to_schema(SuppliersInDB, getattr(item, 'suppliers_', None)) if hasattr(item, 'suppliers_') else None,
        'WarehouseData': obj_to_schema(WarehousesInDB, getattr(item, 'warehouses_', None)) if hasattr(item, 'warehouses_') else None,
    }

    return ItemsInDB(**data)
