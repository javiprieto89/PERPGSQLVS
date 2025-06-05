# app/graphql/schema.py

import strawberry

# Importar todos los resolvers
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

# ⚠️ Verificar si realmente existe este módulo
# from app.graphql.resolvers.useractivitylog import UseractivitylogQuery


@strawberry.type
class Query(
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
    # UseractivitylogQuery,  # ⚠️ Verificá si este existe o borralo
):
    pass


schema = strawberry.Schema(query=Query)
