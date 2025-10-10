# app/graphql/schema.py - VERSIÓN FINAL SIN ERRORES

import strawberry
from typing import List, Optional
from sqlalchemy import func, and_
from sqlalchemy.orm import joinedload
from datetime import datetime

from app.graphql.middlewares.auth_claims import (
    AuthClaimsExtension,
    relax_auth_arguments,
)

# Importar todos los resolvers existentes
from app.graphql.resolvers.accountbalances import AccountbalancesQuery
from app.graphql.resolvers.branches import BranchesQuery
from app.graphql.resolvers.brands import BrandsQuery
from app.graphql.resolvers.carbrands import CarbrandsQuery
from app.graphql.resolvers.carmodels import CarmodelsQuery
from app.graphql.resolvers.sysidentitydoctypes import SysIdentityDocTypesQuery
from app.graphql.resolvers.sysfiscaldoctypes import SysFiscalDocTypesQuery
from app.graphql.resolvers.cars import CarsQuery
from app.graphql.resolvers.clients import ClientsQuery
from app.graphql.resolvers.company import CompanyQuery
from app.graphql.resolvers.countries import CountriesQuery
from app.graphql.resolvers.creditcardgroups import CreditcardgroupsQuery
from app.graphql.resolvers.creditcards import CreditcardsQuery
from app.graphql.resolvers.discounts import DiscountsQuery
from app.graphql.resolvers.documents import CommercialdocumentsQuery
from app.graphql.resolvers.cashboxes import CashboxesQuery
from app.graphql.resolvers.cashboxmovements import CashboxmovementsQuery
from app.graphql.resolvers.itemcategories import ItemcategoriesQuery
from app.graphql.resolvers.itempricehistories import ItempricehistoriesQuery
from app.graphql.resolvers.items import ItemsQuery
from app.graphql.resolvers.itemstock import ItemstockQuery
from app.graphql.resolvers.itemstocks import ItemstocksQuery
from app.graphql.resolvers.itemsubcategories import ItemsubcategoriesQuery
from app.graphql.resolvers.orderdetails import OrderdetailsQuery
from app.graphql.resolvers.orderhistory import OrderhistoryQuery
from app.graphql.resolvers.orderhistorydetails import OrderhistorydetailsQuery
from app.graphql.resolvers.orders import OrdersQuery
from app.graphql.resolvers.pricelistitems import PricelistitemsQuery
from app.graphql.resolvers.pricelists import PricelistsQuery
from app.graphql.resolvers.provinces import ProvincesQuery
from app.graphql.resolvers.roles import RolesQuery
from app.graphql.resolvers.saleconditions import SaleconditionsQuery
from app.graphql.resolvers.servicetype import ServicetypeQuery
from app.graphql.resolvers.stockhistories import StockhistoriesQuery
from app.graphql.resolvers.stockhistorydetails import StockHistoryDetailsQuery
from app.graphql.resolvers.suppliers import SuppliersQuery
from app.graphql.resolvers.transactions import TransactionsQuery
from app.graphql.resolvers.userpermissions import UserPermissionsQuery
from app.graphql.resolvers.users import UsersQuery
from app.graphql.resolvers.warehouses import WarehousesQuery
from app.graphql.resolvers.vendors import VendorsQuery
from app.graphql.resolvers.afip import AfipQuery
from app.graphql.resolvers.rmas import RMAQuery
from app.graphql.resolvers.rmadetails import RMADetailQuery
from app.graphql.mutations.clients import ClientsMutations
from app.graphql.mutations.suppliers import SuppliersMutations
from app.graphql.mutations.brands import BrandsMutations
from app.graphql.mutations.carbrands import CarBrandsMutations
from app.graphql.mutations.itemcategories import ItemCategoriesMutations
from app.graphql.mutations.itemsubcategories import ItemSubcategoriesMutations
from app.graphql.mutations.items import ItemsMutations
from app.graphql.mutations.saleconditions import SaleConditionsMutations
from app.graphql.mutations.creditcardgroups import CreditCardGroupsMutations
from app.graphql.mutations.creditcards import CreditCardsMutations
from app.graphql.mutations.discounts import DiscountsMutations
from app.graphql.mutations.carmodels import CarModelsMutations
from app.graphql.mutations.cars import CarsMutations
from app.graphql.mutations.branches import BranchesMutations
from app.graphql.mutations.company import CompanyMutations
from app.graphql.mutations.warehouses import WarehousesMutations
from app.graphql.mutations.pricelists import PricelistsMutations
from app.graphql.mutations.pricelistitems import PricelistitemsMutations
from app.graphql.mutations.itempricehistories import ItemPriceHistoriesMutations
from app.graphql.mutations.orders import OrdersMutations
from app.graphql.mutations.cashboxes import CashBoxesMutations
from app.graphql.mutations.cashboxmovements import CashBoxMovementsMutations
from app.graphql.mutations.stockhistories import StockHistoriesMutations
from app.graphql.mutations.rmas import RMAMutations
from app.graphql.mutations.rmadetails import RMADetailMutations
from app.graphql.mutations.stockhistorydetails import StockHistoryDetailsMutations
from app.graphql.mutations.servicetype import ServiceTypeMutations
from app.graphql.mutations.documents import DocumentsMutations
from app.graphql.mutations.roles import RolesMutations
from app.graphql.mutations.users import UsersMutations
from app.graphql.mutations.vendors import VendorsMutations
from app.graphql.mutations.userpermissions import UserPermissionsMutation

# IMPORTANTE: Importar las clases de autenticación correctamente
from app.graphql.resolvers.auth import AuthQuery

# Importar schemas para los tipos de datos
from app.graphql.schemas.items import ItemsInDB, ItemSearchResult
from app.utils.item_helpers import item_to_in_db
from app.graphql.schemas.clients import ClientsInDB
from app.graphql.schemas.orders import OrdersInDB
from app.graphql.schemas.auth import (
    UserInfo,
    LoginInput,
    LoginResponse,
    UserCreateInput,
    PasswordChangeInput,
    AuthResponse,
)

# Importar funciones de autenticación
from app.auth import (
    authenticate_user,
    create_user_token,
    get_userinfo_from_token,
    create_user,
    update_user_password,
    get_user_by_id,
)

# Intentar importar utilidades de filtros
try:
    from app.utils.filter_schemas import FILTER_SCHEMAS
except ImportError:
    FILTER_SCHEMAS = {}


# Tipos adicionales para funcionalidades avanzadas
@strawberry.type
class DashboardStats:
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
    total_results: int
    search_time_ms: float
    filters_applied: List[str]


@strawberry.input
class DashboardFilters:
    company_id: int
    branch_id: Optional[int] = None
    date_from: Optional[datetime] = None
    date_to: Optional[datetime] = None


@strawberry.type
class GlobalSearchResult:
    items: List[ItemsInDB]
    clients: List[ClientsInDB]
    orders: List[OrdersInDB]
    stats: SearchStats


@strawberry.type
class FilterField:
    field: str
    label: str
    type: str
    relationModel: Optional[str] = None
    dependsOn: Optional[str] = None


@strawberry.type
class ServerInfo:
    version: str
    timestamp: int
    environment: str


# Resolver para funcionalidades avanzadas
class AdvancedResolver:
    def get_dashboard_stats(self, info, filters: DashboardFilters) -> DashboardStats:
        from app.db import get_db
        from app.models.items import Items
        from app.models.clients import Clients
        from app.models.orders import Orders
        from app.models.itemstock import Itemstock

        db_gen = get_db()
        db = next(db_gen)
        try:
            company_filter = Items.CompanyID == filters.company_id
            orders_company_filter = Orders.CompanyID == filters.company_id

            total_items = db.query(Items).filter(company_filter).count()
            active_items = (
                db.query(Items).filter(company_filter,
                                       Items.IsActive == True).count()
            )

            low_stock_items = (
                db.query(Items)
                .join(Itemstock)
                .filter(
                    company_filter,
                    Items.IsActive == True,
                    Items.ControlStock == True,
                    Itemstock.Quantity <= Items.ReplenishmentStock,
                )
                .count()
            )

            total_clients = db.query(Clients).count()
            active_clients = db.query(Clients).filter(
                Clients.IsActive == True).count()

            orders_query = db.query(Orders).filter(orders_company_filter)
            if filters.date_from:
                orders_query = orders_query.filter(
                    Orders.OrderDate >= filters.date_from)
            if filters.date_to:
                orders_query = orders_query.filter(
                    Orders.OrderDate <= filters.date_to)

            total_orders = orders_query.count()
            pending_orders = orders_query.filter(
                Orders.OrderStatusID.in_([1, 2])
            ).count()
            completed_orders = orders_query.filter(
                Orders.OrderStatusID == 3).count()

            sales_query = orders_query.filter(Orders.Total.isnot(None))
            monthly_sales = (
                sales_query.with_entities(
                    func.sum(Orders.Total)).scalar() or 0.0
            )

            return DashboardStats(
                total_items=total_items,
                active_items=active_items,
                low_stock_items=low_stock_items,
                total_clients=total_clients,
                active_clients=active_clients,
                pending_orders=pending_orders,
                monthly_sales=float(monthly_sales),
                total_orders=total_orders,
                completed_orders=completed_orders,
            )
        finally:
            db_gen.close()

    def search_global(
        self, info, query: str, company_id: int, limit: int = 50
    ) -> GlobalSearchResult:
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
            items = (
                db.query(Items)
                .options(
                    joinedload(Items.brands_),
                    joinedload(Items.itemCategories_),
                    joinedload(Items.itemSubcategories_),
                )
                .filter(
                    Items.CompanyID == company_id,
                    (
                        Items.ItemCode.ilike(search_term)
                        | Items.ItemDescription.ilike(search_term)
                    ),
                )
                .limit(limit // 3)
                .all()
            )

            clients = (
                db.query(Clients)
                .filter(
                    (
                        Clients.FirstName.ilike(search_term)
                        | Clients.LastName.ilike(search_term)
                        | Clients.Email.ilike(search_term)
                    )
                )
                .limit(limit // 3)
                .all()
            )

            orders = (
                db.query(Orders)
                .filter(Orders.CompanyID == company_id, Orders.Notes.ilike(search_term))
                .limit(limit // 3)
                .all()
            )

            search_time = (time.time() - start_time) * 1000
            total_results = len(items) + len(clients) + len(orders)

            return GlobalSearchResult(
                items=[item_to_in_db(item) for item in items],
                clients=[ClientsInDB(**client.__dict__) for client in clients],
                orders=[OrdersInDB(**order.__dict__) for order in orders],
                stats=SearchStats(
                    total_results=total_results,
                    search_time_ms=search_time,
                    filters_applied=[
                        f"company_id:{company_id}", f"query:{query}"],
                ),
            )
        finally:
            db_gen.close()


# QUERY PRINCIPAL - Agregar AuthQuery aquí
@strawberry.type
class Query(
    AccountbalancesQuery,
    BranchesQuery,
    BrandsQuery,
    CarbrandsQuery,
    CarmodelsQuery,
    CarsQuery,
    ClientsQuery,
    CompanyQuery,
    CountriesQuery,
    SysIdentityDocTypesQuery,
    SysFiscalDocTypesQuery,
    CreditcardgroupsQuery,
    CreditcardsQuery,
    DiscountsQuery,
    CommercialdocumentsQuery,

    ItemcategoriesQuery,
    ItempricehistoriesQuery,
    ItemsQuery,
    ItemstockQuery,
    ItemstocksQuery,
    ItemsubcategoriesQuery,
    OrderdetailsQuery,
    OrderhistoryQuery,
    OrderhistorydetailsQuery,
    OrdersQuery,

    PricelistitemsQuery,
    PricelistsQuery,
    ProvincesQuery,
    RolesQuery,
    SaleconditionsQuery,
    ServicetypeQuery,
    StockhistoriesQuery,
    StockHistoryDetailsQuery,
    SuppliersQuery,

    CashboxesQuery,
    CashboxmovementsQuery,
    TransactionsQuery,

    UserPermissionsQuery,

    UsersQuery,
    WarehousesQuery,
    VendorsQuery,
    RMAQuery,
    RMADetailQuery,
    AfipQuery,
    AuthQuery,  # AGREGADO: Queries de autenticación
):
    """Query principal con todas las consultas disponibles"""

    # ========== FUNCIONALIDADES AVANZADAS ==========

    @strawberry.field
    def filter_fields(self, model: str) -> List[FilterField]:
        """Obtener campos de filtro para un modelo"""
        filtros = FILTER_SCHEMAS.get(model, [])
        return [
            FilterField(
                field=f["field"],
                label=f["label"],
                type=f["type"],
                relationModel=f.get("relationModel"),
                dependsOn=f.get("dependsOn"),
            )
            for f in filtros
        ]

    @strawberry.field
    def dashboard_stats(self, info, filters: DashboardFilters) -> DashboardStats:
        """Estadísticas completas del dashboard"""
        resolver = AdvancedResolver()
        return resolver.get_dashboard_stats(info, filters)

    @strawberry.field
    def search_global(
        self, info, query: str, company_id: int, limit: int = 50
    ) -> GlobalSearchResult:
        """Búsqueda global en toda la aplicación"""
        resolver = AdvancedResolver()
        return resolver.search_global(info, query, company_id, limit)

    @strawberry.field
    def health_check(self, info) -> str:
        """Health check del GraphQL endpoint"""
        return "GraphQL endpoint is healthy"

    @strawberry.field
    def server_info(self, info) -> ServerInfo:
        """Información del servidor"""
        import time

        return ServerInfo(
            version="1.0.0", timestamp=int(time.time()), environment="development"
        )


# MUTATION PRINCIPAL - COMPLETAMENTE CORREGIDO
@strawberry.type
class Mutation(
    ClientsMutations,
    SuppliersMutations,
    BrandsMutations,
    CarBrandsMutations,
    CarModelsMutations,
    CarsMutations,
    ItemCategoriesMutations,
    ItemSubcategoriesMutations,
    ItemsMutations,
    SaleConditionsMutations,
    CreditCardGroupsMutations,
    CreditCardsMutations,
    DiscountsMutations,

    VendorsMutations,
    BranchesMutations,
    CompanyMutations,
    WarehousesMutations,
    PricelistsMutations,
    PricelistitemsMutations,
    ItemPriceHistoriesMutations,
    RMAMutations,
    RMADetailMutations,

    CashBoxesMutations,
    CashBoxMovementsMutations,
    StockHistoriesMutations,
    StockHistoryDetailsMutations,
    OrdersMutations,
    ServiceTypeMutations,
    DocumentsMutations,

    RolesMutations,
    UsersMutations,
    UserPermissionsMutation,
):
    """Mutaciones principales"""

    # ========== MUTACIONES DE AUTENTICACIÓN ==========
    @strawberry.mutation
    def login(self, input: LoginInput) -> LoginResponse:
        """Login de usuario"""
        from app.db import get_db

        db_gen = get_db()
        db = next(db_gen)
        try:
            # Autenticar usuario
            user = authenticate_user(db, input.nickname, input.password)

            if not user:
                return LoginResponse(
                    success=False,
                    message="Credenciales inválidas",
                    token=None,
                    user=None,
                )

            token = create_user_token(user)

            # Obtener información del usuario
            user_info = get_userinfo_from_token(token)

            return LoginResponse(
                success=True, message="Login exitoso", token=token, user=user_info
            )

        except Exception as e:
            return LoginResponse(
                success=False, message=f"Error interno: {str(e)}", token=None, user=None
            )
        finally:
            db_gen.close()

    @strawberry.mutation
    def create_user(self, input: UserCreateInput) -> AuthResponse:
        """Crear nuevo usuario"""
        from app.db import get_db
        from app.auth import get_user_by_nickname

        db_gen = get_db()
        db = next(db_gen)
        try:
            # Verificar si el usuario ya existe
            existing_user = get_user_by_nickname(db, input.nickname)

            if existing_user:
                return AuthResponse(success=False, message="El usuario ya existe")

            # Crear usuario
            new_user = create_user(
                db=db,
                nickname=input.nickname,
                fullname=input.fullname,
                password=input.password,
                is_active=input.is_active,
            )

            new_user_dict = new_user.__dict__
            return AuthResponse(
                success=True,
                message=f"Usuario {new_user_dict['Nickname']} creado exitosamente",
            )

        except Exception as e:
            return AuthResponse(
                success=False, message=f"Error creando usuario: {str(e)}"
            )
        finally:
            db_gen.close()

    @strawberry.mutation
    def change_password(self, input: PasswordChangeInput) -> AuthResponse:
        """Cambiar contraseña de usuario"""
        from app.db import get_db

        db_gen = get_db()
        db = next(db_gen)
        try:
            # Verificar usuario actual
            user = get_user_by_id(db, input.user_id)
            if not user:
                return AuthResponse(success=False, message="Usuario no encontrado")

            user_dict = user.__dict__
            # Verificar contraseña actual
            authenticated_user = authenticate_user(
                db, user_dict["Nickname"], input.current_password
            )
            if not authenticated_user:
                return AuthResponse(
                    success=False, message="Contraseña actual incorrecta"
                )

            # Actualizar contraseña
            success = update_user_password(
                db, input.user_id, input.new_password)

            if success:
                return AuthResponse(
                    success=True, message="Contraseña actualizada exitosamente"
                )
            else:
                return AuthResponse(
                    success=False, message="Error actualizando contraseña"
                )

        except Exception as e:
            return AuthResponse(
                success=False, message=f"Error cambiando contraseña: {str(e)}"
            )
        finally:
            db_gen.close()

    # ========== MUTACIONES AVANZADAS ==========
    @strawberry.mutation
    def bulk_activate_items(self, info, item_ids: List[int]) -> bool:
        """Activar múltiples items"""
        from app.db import get_db
        from app.models.items import Items

        db_gen = get_db()
        db = next(db_gen)
        try:
            db.query(Items).filter(Items.ItemID.in_(item_ids)).update(
                {"IsActive": True, "LastModified": datetime.now().date()},
                synchronize_session=False,
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
            db.query(Items).filter(Items.ItemID.in_(item_ids)).update(
                {"IsActive": False, "LastModified": datetime.now().date()},
                synchronize_session=False,
            )
            db.commit()
            return True
        except:
            db.rollback()
            return False
        finally:
            db_gen.close()


# Schema principal con Query y Mutation
schema = strawberry.Schema(
    query=Query,
    mutation=Mutation,
    extensions=[AuthClaimsExtension],
)

relax_auth_arguments(schema)
