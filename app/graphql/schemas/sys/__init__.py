# app/graphql/schemas/sys/__init__.py
from .documenttypes import SysDocumentTypesInDB
from .doctypes import SysDocTypesInDB
from .orderstatus import SysOrderStatusInDB
from .transactiontypes import SysTransactionTypesInDB
from .useractions import SysUserActionsInDB

__all__ = [
    "SysDocumentTypesInDB",
    "SysDocTypesInDB",
    "SysOrderStatusInDB",
    "SysTransactionTypesInDB",
    "SysUserActionsInDB",
]
