# app/graphql/resolvers/items.py
# app/graphql/resolvers/items_optimized.py
import strawberry
from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session, joinedload, selectinload
from sqlalchemy import and_, or_, func
from app.graphql.schemas.items import ItemsInDB, ItemSearchResult
from app.models.items import Items
from app.models.brands import Brands
from app.models.itemcategories import ItemCategories
from app.models.itemsubcategories import ItemSubcategories
from app.models.suppliers import Suppliers
from app.models.pricelistitems import PriceListItems
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
    search: Optional[str] = None  # Búsqueda general

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

@strawberry.type
class ItemsQueryOptimized:
    
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
            limit = min(pagination.limit if pagination else 50, 100)  # Max 100
            offset = pagination.offset if pagination and pagination.offset else (page - 1) * limit
            
            # Query base con joins optimizados - USAR NOMBRES EXACTOS DE BD
            query = db.query(Items).options(
                joinedload(Items.brands_),
                joinedload(Items.itemCategories_),
                joinedload(Items.itemSubcategories_),
                joinedload(Items.suppliers_),
                selectinload(Items.priceListItems),
                selectinload(Items.itemstock)
            )
            
            # Aplicar filtros - USAR NOMBRES EXACTOS DE BD
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
                    # Búsqueda general en código y descripción
                    search_term = f"%{filters.search}%"
                    query = query.filter(or_(
                        Items.Code.ilike(search_term),
                        Items.Description.ilike(search_term),
                        Items.OEM.ilike(search_term)
                    ))
            
            # Contar total antes de aplicar paginación
            total = query.count()
            
            # Aplicar paginación y orden - USAR NOMBRES EXACTOS DE BD
            items = query.order_by(Items.Code).offset(offset).limit(limit).all()
            
            # Convertir a formato de respuesta
            items_result = []
            for item in items:
                # Obtener precio más reciente
                latest_price = None
                if item.priceListItems:
                    latest_price = max(
                        (pli.Price for pli in item.priceListItems),
                        default=None
                    )
                
                # Obtener cantidad en stock
                total_stock = sum(stock.Quantity for stock in item.itemstock) if item.itemstock else 0
                
                items_result.append(ItemSearchResult(
                    itemID=item.ItemID,  # USAR NOMBRES EXACTOS DE BD
                    code=item.Code,
                    description=item.Description,
                    brandName=item.brands_.Name if item.brands_ else None,
                    categoryName=item.itemCategories_.CategoryName if item.itemCategories_ else None,
                    subcategoryName=item.itemSubcategories_.SubcategoryName if item.itemSubcategories_ else None,
                    supplierName=item.suppliers_.FirstName if item.suppliers_ else None,
                    price=latest_price,
                    stockQuantity=total_stock
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
    def get_item_with_details(self, info: Info, item_id: int) -> Optional[ItemsInDB]:
        """
        Obtiene un item específico con todos sus detalles
        """
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = db.query(Items).options(
                joinedload(Items.brands_),
                joinedload(Items.itemCategories_),
                joinedload(Items.itemSubcategories_),
                joinedload(Items.suppliers_),
                joinedload(Items.companyData_),
                joinedload(Items.branches_),
                joinedload(Items.warehouses_),
                selectinload(Items.priceListItems),
                selectinload(Items.itemstock),
                selectinload(Items.itemPriceHistory)
            ).filter(Items.ItemID == item_id).first()  # BD: ItemID
            
            if not item:
                return None
                
            return ItemsInDB(**item.__dict__)
            
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
                Items.CompanyID == company_id,  # BD: CompanyID
                Items.IsActive == True,         # BD: IsActive
                Items.ControlStock == True,     # BD: ControlStock
                and_(
                    Itemstock.Quantity <= Items.ReplenishmentStock,  # BD: Quantity, ReplenishmentStock
                    Itemstock.Quantity > 0
                )
            )
            
            if warehouse_id:
                query = query.filter(Itemstock.WarehouseID == warehouse_id)  # BD: WarehouseID
            
            items = query.order_by(
                func.cast(Itemstock.Quantity, func.Float) / func.greatest(Items.ReplenishmentStock, 1)
            ).limit(limit).all()
            
            result = []
            for item in items:
                stock_info = next((s for s in item.itemstock if not warehouse_id or s.warehouseID == warehouse_id), None)
                
                result.append(ItemSearchResult(
                    ItemID=item.itemID,
                    code=item.code,
                    description=item.description,
                    brandName=item.brands_.name if item.brands_ else None,
                    categoryName=item.itemCategories_.categoryName if item.itemCategories_ else None,
                    stockQuantity=stock_info.quantity if stock_info else 0,
                    minStockLevel=item.replenishmentStock
                ))
            
            return result
            
        finally:
            db_gen.close()

# Instancia para usar en el schema principal
itemsQueryOptimized = ItemsQueryOptimized()