# app/models/__init__.py
from app.db import Base

# Import all models to ensure they are registered with SQLAlchemy
from .accountbalances import AccountBalances
from .branches import Branches
from .brands import Brands
from .carbrands import CarBrands
from .carmodels import CarModels
from .cars import Cars
from .clients import Clients
from .companydata import CompanyData
from .countries import Countries
from .creditcardgroups import CreditCardGroups
from .creditcards import CreditCards
from .discounts import Discounts
from .doctypes import DocTypes
from .documents import Documents
from .documenttypes import DocumentTypes
from .itemcategories import ItemCategories
from .itempricehistory import ItemPriceHistory
from .items import Items
from .itemstock import Itemstock
from .itemsubcategories import ItemSubcategories
from .orderdetails import OrderDetails
from .orderhistory import OrderHistory
from .orderhistorydetails import OrderHistoryDetails
from .orders import Orders
from .orderstatus import OrderStatus
from .pricelistitems import PriceListItems
from .pricelists import PriceLists
from .provinces import Provinces
from .roles import Roles
from .saleconditions import SaleConditions
from .servicetype import ServiceType
from .stockhistory import StockHistory
from .suppliers import Suppliers
from .sysdiagrams import Sysdiagrams
from .temporderdetails import TempOrderDetails
from .tempstockentries import TempStockEntries
from .transactions import Transactions
from .transactiontypes import TransactionTypes
from .useraccess import UserAccess
from .useractions import UserActions
from .useractivitylog import UserActivityLog
from .users import Users
from .vendors import Vendors
from .warehouses import Warehouses

__all__ = [
    'Base',
    'AccountBalances',
    'Branches',
    'Brands',
    'CarBrands',
    'CarModels',
    'Cars',
    'Clients',
    'CompanyData',
    'Countries',
    'CreditCardGroups',
    'CreditCards',
    'Discounts',
    'DocTypes',
    'Documents',
    'DocumentTypes',
    'ItemCategories',
    'ItemPriceHistory',
    'Items',
    'Itemstock',
    'ItemSubcategories',
    'OrderDetails',
    'OrderHistory',
    'OrderHistoryDetails',
    'Orders',
    'OrderStatus',
    'PriceListItems',
    'PriceLists',
    'Provinces',
    'Roles',
    'SaleConditions',
    'ServiceType',
    'StockHistory',
    'Suppliers',
    'Sysdiagrams',
    'TempOrderDetails',
    'TempStockEntries',
    'Transactions',
    'TransactionTypes',
    'UserAccess',
    'UserActions',
    'UserActivityLog',
    'Users',
    'Vendors',
    'Warehouses'
]

