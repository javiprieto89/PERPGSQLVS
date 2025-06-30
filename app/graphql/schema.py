# app/graphql/schema.py

import strawberry
from typing import List, Optional
from sqlalchemy import func, and_
from datetime import datetime

# Importar todos los resolvers existentes
from app.graphql.resolvers.accountbalances import AccountbalancesQuery
from app.graphql.resolvers.branches import BranchesQuery
from app.graphql.resolvers.brands import BrandsQuery
from app.graphql.resolvers.carbrands import CarbrandsQuery
from app.graphql.resolvers.carmodels import CarmodelsQuery
from app.graphql.resolvers.cars import CarsQuery
from app.graphql.resolvers.clients import ClientsQuery
from app.graphql.resolvers.companydata import CompanydataQuery
from app.graphql.resolvers.countries import CountriesQuery
from app.graphql.resolvers.creditcardgroups import CreditcardgroupsQuery
from app.graphql.resolvers.creditcards import CreditcardsQuery
from app.graphql.resolvers.discounts import DiscountsQuery
from app.graphql.resolvers.doctypes import DoctypesQuery
from app.graphql.resolvers.documents import DocumentsQuery
from app.graphql.resolvers.documenttypes import DocumenttypesQuery
from app.graphql.resolvers.itemcategories import ItemcategoriesQuery
from app.graphql.resolvers.itempricehistory import ItempricehistoryQuery
from app.graphql.resolvers.items import ItemsQuery
from app.graphql.resolvers.itemstock import ItemstockQuery
from app.graphql.resolvers.itemsubcategories import ItemsubcategoriesQuery
from app.graphql.resolvers.orderdetails import OrderdetailsQuery
from app.graphql.resolvers.orderhistory import OrderhistoryQuery
from app.graphql.resolvers.orderhistorydetails import OrderhistorydetailsQuery
from app.graphql.resolvers.orders import OrdersQuery
from app.graphql.resolvers.orderstatus import OrderstatusQuery
from app.graphql.resolvers.pricelistitems import PricelistitemsQuery
from app.graphql.resolvers.pricelists import PricelistsQuery
from app.graphql.resolvers.provinces import ProvincesQuery
from app.graphql.resolvers.roles import RolesQuery
from app.graphql.resolvers.saleconditions import SaleconditionsQuery
from app.graphql.resolvers.servicetype import ServicetypeQuery
from app.graphql.resolvers.stockhistory import StockhistoryQuery
from app.graphql.resolvers.suppliers import SuppliersQuery
from app.graphql.resolvers.temporderdetails import TemporderdetailsQuery
from app.graphql.resolvers.tempstockentries import TempstockentriesQuery
from app.graphql.resolvers.transactions import TransactionsQuery
from app.graphql.resolvers.transactiontypes import TransactiontypesQuery
from app.graphql.resolvers.useraccess import UseraccessQuery
from app.graphql.resolvers.useractions import UseractionsQuery
from app.graphql.resolvers.users import UsersQuery
from app.graphql.resolvers.warehouses import WarehousesQuery
from app.graphql.resolvers.auth import AuthMutation

# Importar schemas para los tipos de datos
from app.graphql.schemas.items import ItemsInDB, ItemSearchResult
from app.graphql.schemas.clients import ClientsInDB
from app.graphql.schemas.orders import OrdersInDB
from app.graphql.schemas.auth import UserInfo

# Tipos adicionales para funcionalidades avanzadas
@strawberry.type
class DashboardStats:
    """Estadísticas del dashboard"""
    total_items: int
    active_items: int
    low_stock_items: int
    total_clients: int
    active_clients: int
    pending_orders: int
    monthly_sales: float
    total_orders: int
    completed_orders: int

@strawberry.type
class SearchStats:
    """Estadísticas de búsqueda"""
    total_results: int
    search_time_ms: float
    filters_applied: List[str]

@strawberry.input
class DashboardFilters:
    """Filtros para dashboard"""
    company_id: int
    branch_id: Optional[int] = None
    date_from: Optional[datetime] = None
    date_to: Optional[datetime] = None

# Resolver para funcionalidades avanzadas
class AdvancedResolver:
    """Resolver para consultas avanzadas y dashboard"""
    
    def get_dashboard_stats(self, info, filters: DashboardFilters) -> DashboardStats:
        """Obtiene estadísticas completas del dashboard"""
        from app.db import get_db
        from app.models.items import Items
        from app.models.clients import Clients
        from app.models.orders import Orders
        from app.models.itemstock import Itemstock
        
        db_gen = get_db()
        db = next(db_gen)
        try:
            # Filtros base
            company_filter = Items.CompanyID == filters.company_id
            orders_company_filter = Orders.CompanyID == filters.company_id
            
            # Items
            total_items = db.query(Items).filter(company_filter).count()
            active_items = db.query(Items).filter(
                company_filter,
                Items.IsActive == True
            ).count()
            
            # Items con stock bajo
            low_stock_items = db.query(Items).join(Itemstock).filter(
                company_filter,
                Items.IsActive == True,
                Items.ControlStock == True,
                Itemstock.Quantity <= Items.ReplenishmentStock
            ).count()
            
            # Clientes
            total_clients = db.query(Clients).count()
            active_clients = db.query(Clients).filter(Clients.IsActive == True).count()
            
            # Órdenes
            orders_query = db.query(Orders).filter(orders_company_filter)
            
            if filters.date_from:
                orders_query = orders_query.filter(Orders.Date_ >= filters.date_from)
            if filters.date_to:
                orders_query = orders_query.filter(Orders.Date_ <= filters.date_to)
            
            total_orders = orders_query.count()
            pending_orders = orders_query.filter(Orders.StatusID.in_([1, 2])).count()
            completed_orders = orders_query.filter(Orders.StatusID == 3).count()
            
            # Ventas del período
            sales_query = orders_query.filter(Orders.Total.isnot(None))
            monthly_sales = sales_query.with_entities(func.sum(Orders.Total)).scalar() or 0.0
            
            return DashboardStats(
                total_items=total_items,
                active_items=active_items,
                low_stock_items=low_stock_items,
                total_clients=total_clients,
                active_clients=active_clients,
                pending_orders=pending_orders,
                monthly_sales=float(monthly_sales),
                total_orders=total_orders,
                completed_orders=completed_orders
            )
            
        finally:
            db_gen.close()
    
    def search_global(self, info, query: str, company_id: int, limit: int = 50) -> 'GlobalSearchResult':
        """Búsqueda global en items, clientes y órdenes"""
        import time
        start_time = time.time()
        
        from app.db import get_db
        from app.models.items import Items
        from app.models.clients import Clients
        from app.models.orders import Orders
        
        db_gen = get_db()
        db = next(db_gen)
        try:
            search_term = f"%{query}%"
            
            # Buscar items
            items = db.query(Items).filter(
                Items.CompanyID == company_id,
                (Items.Code.ilike(search_term) | Items.Description.ilike(search_term))
            ).limit(limit // 3).all()
            
            # Buscar clientes
            clients = db.query(Clients).filter(
                (Clients.FirstName.ilike(search_term) | 
                 Clients.LastName.ilike(search_term) |
                 Clients.Email.ilike(search_term))
            ).limit(limit // 3).all()
            
            # Buscar órdenes
            orders = db.query(Orders).filter(
                Orders.CompanyID == company_id,
                Orders.Notes.ilike(search_term)
            ).limit(limit // 3).all()
            
            search_time = (time.time() - start_time) * 1000
            total_results = len(items) + len(clients) + len(orders)
            
            return GlobalSearchResult(
                items=[ItemsInDB(**item.__dict__) for item in items],
                clients=[ClientsInDB(**client.__dict__) for client in clients],
                orders=[OrdersInDB(**order.__dict__) for order in orders],
                stats=SearchStats(
                    total_results=total_results,
                    search_time_ms=search_time,
                    filters_applied=[f"company_id:{company_id}", f"query:{query}"]
                )
            )
            
        finally:
            db_gen.close()

@strawberry.type
class GlobalSearchResult:
    """Resultado de búsqueda global"""
    items: List[ItemsInDB]
    clients: List[ClientsInDB]
    orders: List[OrdersInDB]
    stats: SearchStats

# Mutations para operaciones avanzadas
@strawberry.type
class AdvancedMutation:
    """Mutaciones avanzadas"""
    
    @strawberry.mutation
    def bulk_activate_items(self, info, item_ids: List[int]) -> bool:
        """Activar múltiples items"""
        from app.db import get_db
        from app.models.items import Items
        
        db_gen = get_db()
        db = next(db_gen)
        try:
            db.query(Items).filter(
                Items.ItemID.in_(item_ids)
            ).update(
                {"IsActive": True, "LastModified": datetime.now().date()},
                synchronize_session=False
            )
            db.commit()
            return True
        except:
            db.rollback()
            return False
        finally:
            db_gen.close()
    
    @strawberry.mutation
    def bulk_deactivate_items(self, info, item_ids: List[int]) -> bool:
        """Desactivar múltiples items"""
        from app.db import get_db
        from app.models.items import Items
        
        db_gen = get_db()
        db = next(db_gen)
        try:
            db.query(Items).filter(
                Items.ItemID.in_(item_ids)
            ).update(
                {"IsActive": False, "LastModified": datetime.now().date()},
                synchronize_session=False
            )
            db.commit()
            return True
        except:
            db.rollback()
            return False
        finally:
            db_gen.close()

@strawberry.type
class Query(
    # Todos los resolvers existentes
    AccountbalancesQuery,
    BranchesQuery,
    BrandsQuery,
    CarbrandsQuery,
    CarmodelsQuery,
    CarsQuery,
    ClientsQuery,
    CompanydataQuery,
    CountriesQuery,
    CreditcardgroupsQuery,
    CreditcardsQuery,
    DiscountsQuery,
    DoctypesQuery,
    DocumentsQuery,
    DocumenttypesQuery,
    ItemcategoriesQuery,
    ItempricehistoryQuery,
    ItemsQuery,
    ItemstockQuery,
    ItemsubcategoriesQuery,
    OrderdetailsQuery,
    OrderhistoryQuery,
    OrderhistorydetailsQuery,
    OrdersQuery,
    OrderstatusQuery,
    PricelistitemsQuery,
    PricelistsQuery,
    ProvincesQuery,
    RolesQuery,
    SaleconditionsQuery,
    ServicetypeQuery,
    StockhistoryQuery,
    SuppliersQuery,
    TemporderdetailsQuery,
    TempstockentriesQuery,
    TransactionsQuery,
    TransactiontypesQuery,
    UseraccessQuery,
    UseractionsQuery,
    UsersQuery,
    WarehousesQuery,
):
    """Query principal con todas las consultas disponibles"""
    
    # ========== FUNCIONALIDADES AVANZADAS ==========
    
    @strawberry.field
    def dashboard_stats(self, info, filters: DashboardFilters) -> DashboardStats:
        """Estadísticas completas del dashboard"""
        resolver = AdvancedResolver()
        return resolver.get_dashboard_stats(info, filters)
    
    @strawberry.field
    def search_global(
        self, 
        info, 
        query: str, 
        company_id: int, 
        limit: int = 50
    ) -> GlobalSearchResult:
        """Búsqueda global en toda la aplicación"""
        resolver = AdvancedResolver()
        return resolver.search_global(info, query, company_id, limit)
    
    @strawberry.field
    def health_check(self, info) -> str:
        """Health check del GraphQL endpoint"""
        return "GraphQL endpoint is healthy"
    
    @strawberry.field
    def server_info(self, info) -> 'ServerInfo':
        """Información del servidor"""
        import time
        return ServerInfo(
            version="1.0.0",
            timestamp=int(time.time()),
            environment="production"
        )

@strawberry.type
class ServerInfo:
    """Información del servidor"""
    version: str
    timestamp: int
    environment: str

@strawberry.type
class Mutation:
    """Mutaciones principales"""

    @strawberry.field
    def auth(self) -> AuthMutation:
        return AuthMutation()
    
    @strawberry.field
    def advanced(self) -> AdvancedMutation:
        """Mutaciones avanzadas"""
        return AdvancedMutation()

# Schema principal con Query y Mutation
schema = strawberry.Schema(
    query=Query,
    mutation=Mutation
)