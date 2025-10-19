# app/models/__init__.py

# Importar explícitamente TODOS los modelos para que SQLAlchemy registre todas las clases
from .accountbalances import *
from .banks import *
from .bankaccounts import *
from .bankreconciliations import *
from .banktransactions import *
from .branches import *
from .brands import *
from .carbrands import *
from .carmodels import *
from .cars import *
from .clients import *
from .company import *
from .countries import *
from .creditcardgroups import *
from .creditcards import *
from .discounts import *
from .sysidentitydoctypes import *
from .sysfiscaldoctypes import *
from .documents import *
from .itemcategories import *
from .itempricehistories import *
from .items import *
from .itemstock import *
from .itemsubcategories import *
from .orderdetails import *
from .orderhistory import *
from .orderhistorydetails import *
from .orders import *
from .sysorderstatus import *
from .pricelistitems import *
from .pricelists import *
from .purchaseinvoices import *
from .provinces import *
from .roles import *
from .saleconditions import *
from .servicetype import *
from .stockhistorydetails import *
from .stockhistories import *
from .suppliers import *
from .temporderdetails import *
from .tempstockhistorydetails import *
from .cashboxes import *
from .cashboxmovements import *
from .checks import *
from .checkstatuses import *
from .checkmovements import *
from .transactions import *
from .systransactiontypes import *
from .taxes import *
from .userapermissions import *
from .syscurrencies import *
from .sysrmatypes import *
from .branchtaxes import *
from .rmas import *
from .rmadetails import *
from .sysuseractions import *
from .useractivitylog import *
from .users import *
from .vendors import *
from .warehouses import *
from .sessions import *

# Opcional: para poder usar "from app.models import *"
__all__ = [
    "accountbalances",
    "banks",
    "bankaccounts",
    "bankreconciliations",
    "banktransactions",
    "branches",
    "brands",
    "carbrands",
    "carmodels",
    "cars",
    "clients",
    "company",
    "countries",
    "creditcardgroups",
    "creditcards",
    "discounts",
    "sysidentitydoctypes",
    "sysfiscaldoctypes",
    "documents",
    "itemcategories",
    "itempricehistories",
    "items",
    "itemstock",
    "itemsubcategories",
    "orderdetails",
    "orderhistory",
    "orderhistorydetails",
    "orders",
    "sysorderstatus",
    "pricelistitems",
    "pricelists",
    "purchaseinvoices",
    "provinces",
    "roles",
    "saleconditions",
    "servicetype",
    "stockhistorydetails",
    "stockhistories",
    "suppliers",
    "temporderdetails",
    "tempstockhistorydetails",
    "cashboxes",
    "cashboxmovements",
    "checks",
    "checkstatuses",
    "checkmovements",
    "transactions",
    "systransactiontypes",
    "taxes",
    "userapermissions",
    "syscurrencies",
    "sysrmatypes",
    "branchtaxes",
    "rmas",
    "rmadetails",
    "sysuseractions",
    "useractivitylog",
    "users",
    "vendors",
    "warehouses",
    "sessions",
]
