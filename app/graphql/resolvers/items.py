# app/graphql/resolvers/items.py
import strawberry
from typing import List, Optional, Any
from sqlalchemy.orm import joinedload, selectinload
from sqlalchemy import and_, or_
from app.graphql.schemas.items import ItemsInDB, ItemSearchResult
from app.graphql.schemas.brands import BrandsInDB
from app.graphql.schemas.itemcategories import ItemCategoriesInDB
from app.graphql.schemas.itemsubcategories import ItemSubcategoriesInDB
from app.graphql.schemas.suppliers import SuppliersInDB
from app.graphql.schemas.warehouses import WarehousesInDB
from app.models.items import Items
from app.models.itemstock import Itemstock
from app.db import get_db
from app.graphql.crud.items import get_items, get_items_by_id
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info
from app.utils.item_helpers import safe_int, safe_str, safe_bool, safe_float, _safe_str_required, _safe_str_optional

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
    itemCode: Optional[str] = None
    itemDescription: Optional[str] = None
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

# def safe_int(value: Any, default: int = 0) -> int:
#     """Convierte de forma segura cualquier valor a int"""
#     try:
#         return int(value)
#     except (TypeError, ValueError):
#         return default

# def safe_str(value: Any, default: str = "") -> str:
#     """Convierte de forma segura cualquier valor a str"""
#     try:
#         return str(value) if value is not None else default
#     except:
#         return default

# def safe_bool(value: Any, default: bool = False) -> bool:
#     """Convierte de forma segura cualquier valor a bool"""
#     try:
#         return bool(value)
#     except:
#         return default

# def safe_float(value: Any, default: float = 0.0) -> float:
#     """Convierte de forma segura cualquier valor a float"""
#     try:
#         return float(value)
#     except (TypeError, ValueError):
#         return default

@strawberry.type
class ItemsQuery:
    
    @strawberry.field
    def all_items(self, info: Info) -> List[ItemsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_items(db)
            return list_to_schema(ItemsInDB, items)
        finally:
            db_gen.close()

    @strawberry.field
    def items_by_id(self, info: Info, companyID: int, id: int) -> Optional[ItemsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_items_by_id(db, companyID, id)
            return obj_to_schema(ItemsInDB, item) if item else None
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
                    if filters.companyID is not None:
                        query = query.filter(
                            and_(
                                Items.CompanyID == filters.companyID,
                                Items.BranchID == filters.branchID,
                            )
                        )
                    else:
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
                if filters.itemCode:
                    query = query.filter(Items.ItemCode.ilike(f"%{filters.itemCode}%"))
                if filters.itemDescription:
                    query = query.filter(Items.ItemDescription.ilike(f"%{filters.itemDescription}%"))
                if filters.search:
                    search_term = f"%{filters.search}%"
                    query = query.filter(or_(
                        Items.ItemCode.ilike(search_term),
                        Items.ItemDescription.ilike(search_term),
                        Items.OEM.ilike(search_term)
                    ))
            
            # Contar total antes de aplicar paginación
            total = query.count()
            
            # Aplicar paginación y orden
            items = query.order_by(Items.ItemCode).offset(offset).limit(limit).all()
            
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
                
                # Obtener datos relacionados de forma segura
                brand_data = None
                if hasattr(item, 'brands_') and item.brands_:
                    brand_data = obj_to_schema(BrandsInDB, item.brands_)

                category_data = None
                if hasattr(item, 'itemCategories_') and item.itemCategories_:
                    category_data = obj_to_schema(ItemCategoriesInDB, item.itemCategories_)

                subcategory_data = None
                if hasattr(item, 'itemSubcategories_') and item.itemSubcategories_:
                    subcategory_data = obj_to_schema(ItemSubcategoriesInDB, item.itemSubcategories_)

                supplier_data = None
                if hasattr(item, 'suppliers_') and item.suppliers_:
                    supplier_data = obj_to_schema(SuppliersInDB, item.suppliers_)

                warehouse_data = None
                if hasattr(item, 'warehouses_') and item.warehouses_:
                    warehouse_data = obj_to_schema(WarehousesInDB, item.warehouses_)
                
                items_result.append(ItemSearchResult(
                    ItemID=safe_int(getattr(item, 'ItemID', 0)),
                    ItemCode=safe_str(getattr(item, 'ItemCode', getattr(item, 'Code', ''))),
                    ItemDescription=safe_str(getattr(item, 'ItemDescription', getattr(item, 'Description', ''))),
                    Brand=brand_data,
                    Category=category_data,
                    Subcategory=subcategory_data,
                    Supplier=supplier_data,
                    Warehouse=warehouse_data,
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
                
                # Obtener datos relacionados de forma segura
                brand_data = None
                if hasattr(item, 'brands_') and item.brands_:
                    brand_data = obj_to_schema(BrandsInDB, item.brands_)

                category_data = None
                if hasattr(item, 'itemCategories_') and item.itemCategories_:
                    category_data = obj_to_schema(ItemCategoriesInDB, item.itemCategories_)
          
          
                result.append(ItemSearchResult(
                    ItemID=safe_int(getattr(item, 'ItemID', 0)),
                    ItemCode=safe_str(getattr(item, 'Code', '')),
                    ItemDescription=safe_str(getattr(item, 'Description', '')),
                    Brand=brand_data,
                    Category=category_data,
                    Subcategory=None,
                    Supplier=None,
                    Warehouse=None,
                    Price=None,
                    StockQuantity=stock_quantity
                ))
            
            return result
            
        finally:
            db_gen.close()

# Instancia para usar en el schema principal
itemsQuery = ItemsQuery()

