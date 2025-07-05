# app/utils/item_helpers.py

from typing import Any, Optional
from app.graphql.schemas.items import ItemsInDB


def safe_int(value: Any, default: int = 0) -> int:
    """Convierte de forma segura cualquier valor a int"""
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def safe_str(value: Any, default: str = "") -> str:
    """Convierte de forma segura cualquier valor a str"""
    try:
        return str(value) if value is not None else default
    except Exception:
        return default


def safe_bool(value: Any, default: bool = False) -> bool:
    """Convierte de forma segura cualquier valor a bool"""
    try:
        return bool(value)
    except Exception:
        return default


def item_to_in_db(item) -> ItemsInDB:
    """Convierte un modelo Items a ItemsInDB incluyendo nombres relacionados"""
    brand_name = safe_str(getattr(getattr(item, 'brands_', None), 'Name', None), None)
    category_name = safe_str(getattr(getattr(item, 'itemCategories_', None), 'CategoryName', None), None)
    subcategory_name = safe_str(getattr(getattr(item, 'itemSubcategories_', None), 'SubcategoryName', None), None)

    data = {
        'ItemID': safe_int(getattr(item, 'ItemID', 0)),
        'CompanyID': safe_int(getattr(item, 'CompanyID', 0)),
        'BranchID': safe_int(getattr(item, 'BranchID', 0)),
        'BrandID': safe_int(getattr(item, 'BrandID', 0)),
        'Code': safe_str(getattr(item, 'Code', '')),
        'Description': safe_str(getattr(item, 'Description', '')),
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
        'BrandName': brand_name,
        'CategoryName': category_name,
        'SubcategoryName': subcategory_name,
    }
    return ItemsInDB(**data)
