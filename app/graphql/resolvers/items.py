# app/graphql/resolvers/items.py
import strawberry
from typing import List, Optional, cast, Any
from sqlalchemy.orm import Session, joinedload, selectinload
from sqlalchemy import and_, or_, func
from app.graphql.schemas.items import ItemsInDB, ItemSearchResult
from app.models.items import Items
from app.models.itemstock import Itemstock
from app.db import get_db
from strawberry.types import Info

@strawberry.input
class ItemFilters:
    companyID: Optional[int] = None
    branchID: Optional[int] = None
    brandID: Optional[int] = None
    categoryID: Optional[int] = None
    subcategoryID: Optional[int] = None
    supplierID: Optional[int] = None
    warehouseID: Optional[int] = None
    isActive: Optional[bool] = None
    isOffer: Optional[bool] = None
    controlStock: Optional[bool] = None
    code: Optional[str] = None
    description: Optional[str] = None
    search: Optional[str] = None

@strawberry.input
class ItemPagination:
    page: int = 1
    limit: int = 50
    offset: Optional[int] = None

@strawberry.type
class ItemsResponse:
    items: List[ItemSearchResult]
    total: int
    page: int
    limit: int
    has_next: bool
    has_prev: bool

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
    except:
        return default

def safe_bool(value: Any, default: bool = False) -> bool:
    """Convierte de forma segura cualquier valor a bool"""
    try:
        return bool(value)
    except:
        return default

def safe_float(value: Any, default: float = 0.0) -> float:
    """Convierte de forma segura cualquier valor a float"""
    try:
        return float(value)
    except (TypeError, ValueError):
        return default

@strawberry.type
class ItemsQuery:
    
    @strawberry.field
    def all_items(self, info: Info) -> List[ItemsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = db.query(Items).all()
            result = []
            for item in items:
                # Convertir manualmente con funciones seguras
                item_data = {
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
                    'OEM': safe_str(getattr(item, 'OEM', None)),
                    'LastModified': getattr(item, 'LastModified', None),
                    'WarehouseID': safe_int(getattr(item, 'WarehouseID', 0)),
                    'IsActive': safe_bool(getattr(item, 'IsActive', False))
                }
                result.append(ItemsInDB(**item_data))
            return result
        finally:
            db_gen.close()

    @strawberry.field
    def items_by_id(self, info: Info, id: int) -> Optional[ItemsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = db.query(Items).filter(Items.ItemID == id).first()
            if not item:
                return None
            
            # Convertir manualmente con funciones seguras
            item_data = {
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
                'OEM': safe_str(getattr(item, 'OEM', None)),
                'LastModified': getattr(item, 'LastModified', None),
                'WarehouseID': safe_int(getattr(item, 'WarehouseID', 0)),
                'IsActive': safe_bool(getattr(item, 'IsActive', False))
            }
            return ItemsInDB(**item_data)
        finally:
            db_gen.close()
    
    @strawberry.field
    def search_items(
        self, 
        info: Info, 
        filters: Optional[ItemFilters] = None,
        pagination: Optional[ItemPagination] = None
    ) -> ItemsResponse:
        """
        Búsqueda optimizada de items con filtros y paginación
        """
        db_gen = get_db()
        db = next(db_gen)
        try:
            # Configurar paginación
            page = pagination.page if pagination else 1
            limit = min(pagination.limit if pagination else 50, 100)
            offset = pagination.offset if pagination and pagination.offset else (page - 1) * limit
            
            # Query base con joins optimizados
            query = db.query(Items).options(
                joinedload(Items.brands_),
                joinedload(Items.itemCategories_),
                joinedload(Items.itemSubcategories_),
                joinedload(Items.suppliers_),
                selectinload(Items.priceListItems),
                selectinload(Items.itemstock)
            )
            
            # Aplicar filtros
            if filters:
                if filters.companyID is not None:
                    query = query.filter(Items.CompanyID == filters.companyID)
                if filters.branchID is not None:
                    query = query.filter(Items.BranchID == filters.branchID)
                if filters.brandID is not None:
                    query = query.filter(Items.BrandID == filters.brandID)
                if filters.categoryID is not None:
                    query = query.filter(Items.ItemCategoryID == filters.categoryID)
                if filters.subcategoryID is not None:
                    query = query.filter(Items.ItemSubcategoryID == filters.subcategoryID)
                if filters.supplierID is not None:
                    query = query.filter(Items.SupplierID == filters.supplierID)
                if filters.warehouseID is not None:
                    query = query.filter(Items.WarehouseID == filters.warehouseID)
                if filters.isActive is not None:
                    query = query.filter(Items.IsActive == filters.isActive)
                if filters.isOffer is not None:
                    query = query.filter(Items.IsOffer == filters.isOffer)
                if filters.controlStock is not None:
                    query = query.filter(Items.ControlStock == filters.controlStock)
                if filters.code:
                    query = query.filter(Items.Code.ilike(f"%{filters.code}%"))
                if filters.description:
                    query = query.filter(Items.Description.ilike(f"%{filters.description}%"))
                if filters.search:
                    search_term = f"%{filters.search}%"
                    query = query.filter(or_(
                        Items.Code.ilike(search_term),
                        Items.Description.ilike(search_term),
                        Items.OEM.ilike(search_term)
                    ))
            
            # Contar total antes de aplicar paginación
            total = query.count()
            
            # Aplicar paginación y orden
            items = query.order_by(Items.Code).offset(offset).limit(limit).all()
            
            # Convertir a formato de respuesta
            items_result = []
            for item in items:
                # Obtener precio más reciente de forma segura
                latest_price = None
                if hasattr(item, 'priceListItems') and item.priceListItems:
                    try:
                        prices = []
                        for pli in item.priceListItems:
                            price_val = getattr(pli, 'Price', None)
                            if price_val is not None:
                                prices.append(safe_float(price_val))
                        if prices:
                            latest_price = max(prices)
                    except:
                        latest_price = None
                
                # Obtener cantidad en stock de forma segura
                total_stock = 0
                if hasattr(item, 'itemstock') and item.itemstock:
                    try:
                        for stock in item.itemstock:
                            qty = getattr(stock, 'Quantity', None)
                            if qty is not None:
                                total_stock += safe_int(qty)
                    except:
                        total_stock = 0
                
                # Obtener nombres relacionados de forma segura
                brand_name = None
                if hasattr(item, 'brands_') and item.brands_:
                    brand_name = safe_str(getattr(item.brands_, 'Name', None))
                
                category_name = None
                if hasattr(item, 'itemCategories_') and item.itemCategories_:
                    category_name = safe_str(getattr(item.itemCategories_, 'CategoryName', None))
                
                subcategory_name = None
                if hasattr(item, 'itemSubcategories_') and item.itemSubcategories_:
                    subcategory_name = safe_str(getattr(item.itemSubcategories_, 'SubcategoryName', None))
                
                supplier_name = None
                if hasattr(item, 'suppliers_') and item.suppliers_:
                    supplier_name = safe_str(getattr(item.suppliers_, 'FirstName', None))
                
                items_result.append(ItemSearchResult(
                    ItemID=safe_int(getattr(item, 'ItemID', 0)),
                    Code=safe_str(getattr(item, 'Code', '')),
                    Description=safe_str(getattr(item, 'Description', '')),
                    BrandName=brand_name,
                    CategoryName=category_name,
                    SubcategoryName=subcategory_name,
                    SupplierName=supplier_name,
                    Price=latest_price,
                    StockQuantity=total_stock
                ))
            
            return ItemsResponse(
                items=items_result,
                total=total,
                page=page,
                limit=limit,
                has_next=offset + limit < total,
                has_prev=page > 1
            )
            
        finally:
            db_gen.close()

    @strawberry.field
    def get_low_stock_items(
        self, 
        info: Info, 
        company_id: int,
        warehouse_id: Optional[int] = None,
        limit: int = 50
    ) -> List[ItemSearchResult]:
        """
        Obtiene items con stock bajo
        """
        db_gen = get_db()
        db = next(db_gen)
        try:
            query = db.query(Items).join(Itemstock).options(
                joinedload(Items.brands_),
                joinedload(Items.itemCategories_),
                selectinload(Items.itemstock)
            ).filter(
                Items.CompanyID == company_id,
                Items.IsActive == True,
                Items.ControlStock == True,
                Itemstock.Quantity <= Items.ReplenishmentStock,
                Itemstock.Quantity > 0
            )
            
            if warehouse_id:
                query = query.filter(Itemstock.WarehouseID == warehouse_id)
            
            items = query.limit(limit).all()
            
            result = []
            for item in items:
                # Buscar info de stock de forma segura
                stock_quantity = 0
                if hasattr(item, 'itemstock') and item.itemstock:
                    for stock in item.itemstock:
                        stock_wh_id = getattr(stock, 'WarehouseID', None)
                        if not warehouse_id or (stock_wh_id is not None and safe_int(stock_wh_id) == warehouse_id):
                            qty = getattr(stock, 'Quantity', None)
                            if qty is not None:
                                stock_quantity = safe_int(qty)
                                break
                
                # Obtener nombres relacionados de forma segura
                brand_name = None
                if hasattr(item, 'brands_') and item.brands_:
                    brand_name = safe_str(getattr(item.brands_, 'Name', None))
                
                category_name = None
                if hasattr(item, 'itemCategories_') and item.itemCategories_:
                    category_name = safe_str(getattr(item.itemCategories_, 'CategoryName', None))
                
                result.append(ItemSearchResult(
                    ItemID=safe_int(getattr(item, 'ItemID', 0)),
                    Code=safe_str(getattr(item, 'Code', '')),
                    Description=safe_str(getattr(item, 'Description', '')),
                    BrandName=brand_name,
                    CategoryName=category_name,
                    SubcategoryName=None,
                    SupplierName=None,
                    Price=None,
                    StockQuantity=stock_quantity
                ))
            
            return result
            
        finally:
            db_gen.close()

# Instancia para usar en el schema principal
itemsQuery = ItemsQuery()