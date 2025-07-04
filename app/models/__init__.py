# app/models/__init__.py

# Importar explícitamente TODOS los modelos para que SQLAlchemy registre todas las clases
from .accountbalances import *
from .branches import *
from .brands import *
from .carbrands import *
from .carmodels import *
from .cars import *
from .clients import *
from .companydata import *
from .countries import *
from .creditcardgroups import *
from .creditcards import *
from .discounts import *
from .doctypes import *
from .documents import *
from .documenttypes import *
from .itemcategories import *
from .itempricehistory import *
from .items import *
from .itemstock import *
from .itemsubcategories import *
from .orderdetails import *
from .orderhistory import *
from .orderhistorydetails import *
from .orders import *
from .orderstatus import *
from .pricelistitems import *
from .pricelists import *
from .provinces import *
from .roles import *
from .saleconditions import *
from .servicetype import *
from .stockhistory import *
from .suppliers import *
from .temporderdetails import *
from .tempstockentries import *
from .transactions import *
from .transactiontypes import *
from .useraccess import *
from .useractions import *
from .useractivitylog import *
from .users import *
from .vendors import *
from .warehouses import *

# Opcional: para poder usar "from app.models import *"
__all__ = [
    "accountbalances",
    "branches",
    "brands",
    "carbrands",
    "carmodels",
    "cars",
    "clients",
    "companydata",
    "countries",
    "creditcardgroups",
    "creditcards",
    "discounts",
    "doctypes",
    "documents",
    "documenttypes",
    "itemcategories",
    "itempricehistory",
    "items",
    "itemstock",
    "itemsubcategories",
    "orderdetails",
    "orderhistory",
    "orderhistorydetails",
    "orders",
    "orderstatus",
    "pricelistitems",
    "pricelists",
    "provinces",
    "roles",
    "saleconditions",
    "servicetype",
    "stockhistory",
    "suppliers",
    "temporderdetails",
    "tempstockentries",
    "transactions",
    "transactiontypes",
    "useraccess",
    "useractions",
    "useractivitylog",
    "users",
    "vendors",
    "warehouses",
]
