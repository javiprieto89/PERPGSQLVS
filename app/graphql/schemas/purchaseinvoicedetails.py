# app/graphql/schemas/purchaseinvoicedetail_schema.py - VERSIÓN COMPLETA
# Resumen: Tipos e inputs GraphQL para PurchaseInvoiceDetail.

from __future__ import annotations
import strawberry
from typing import Optional
from sqlalchemy.orm import Session
from app.graphql.schemas.company import CompanyInDB
from app.graphql.schemas.items import ItemsInDB
from app.graphql.schemas.branches import BranchesInDB
from app.graphql.schemas.warehouses import WarehousesInDB


@strawberry.input
class PurchaseInvoiceDetailCreate:
    CompanyID: int
    BranchID: int
    PurchaseInvoiceID: int
    ItemID: int
    WarehouseID: int
    Quantity: float
    UnitPrice: float
    Notes: Optional[str] = None


@strawberry.input
class PurchaseInvoiceDetailUpdate:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    PurchaseInvoiceID: Optional[int] = None
    PurchaseInvoiceDetailID: Optional[int] = None
    ItemID: Optional[int] = None
    WarehouseID: Optional[int] = None
    Quantity: Optional[float] = None
    UnitPrice: Optional[float] = None
    Notes: Optional[str] = None


@strawberry.type
class PurchaseInvoiceDetailsInDB:
    CompanyID: int
    BranchID: int
    PurchaseInvoiceID: int
    PurchaseInvoiceDetailID: int
    ItemID: int
    WarehouseID: int
    Quantity: float
    UnitPrice: float
    Notes: Optional[str]

    CompanyData: Optional[CompanyInDB] = None
    BranchData: Optional[BranchesInDB] = None
    ItemData: Optional[ItemsInDB] = None
    WarehouseData: Optional[WarehousesInDB] = None
