# app/graphql/resolvers/sys/__init__.py
from .documenttypes import SysdocumenttypesQuery
from .doctypes import SysdoctypesQuery
from .orderstatus import SysorderstatusQuery
from .transactiontypes import SystransactiontypesQuery
from .useractions import SysuseractionsQuery

__all__ = [
    "SysdocumenttypesQuery",
    "SysdoctypesQuery",
    "SysorderstatusQuery",
    "SystransactiontypesQuery",
    "SysuseractionsQuery",
]
