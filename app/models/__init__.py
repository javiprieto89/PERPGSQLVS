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
from .sysdoctypes import *
from .documents import *
from .sysdocumenttypes import *
from .itemcategories import *
from .itempricehistory import *
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
from .provinces import *
from .roles import *
from .saleconditions import *
from .servicetype import *
from .stockhistory import *
from .suppliers import *
from .temporderdetails import *
from .tempstockhistorydetails import *
from .cashboxes import *
from .cashboxmovements import *
from .transactions import *
from .systransactiontypes import *
from .useraccess import *
from .sysuseractions import *
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
    "sysdoctypes",
    "documents",
    "sysdocumenttypes",
    "itemcategories",
    "itempricehistory",
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
    "provinces",
    "roles",
    "saleconditions",
    "servicetype",
    "stockhistory",
    "suppliers",
    "temporderdetails",
    "tempstockhistorydetails",
    "cashboxes",
    "cashboxmovements",
    "transactions",
    "systransactiontypes",
    "useraccess",
    "sysuseractions",
    "useractivitylog",
    "users",
    "vendors",
    "warehouses",
]
