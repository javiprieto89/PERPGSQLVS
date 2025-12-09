# app/graphql/schemas/purchaseinvoice_schema.py - VERSIÓN COMPLETA
# Resumen: Tipos e inputs GraphQL para facturas de compra (PurchaseInvoices).

import strawberry
import datetime
from typing import Optional, List
from app.graphql.schemas.company import CompanyInDB
from app.graphql.schemas.branches import BranchesInDB
from app.graphql.schemas.suppliers import SuppliersInDB
from app.graphql.schemas.users import UsersInDB
from app.graphql.schemas.purchaseinvoicedetails import PurchaseInvoiceDetailsInDB


@strawberry.input
class PurchaseInvoiceCreate:
    CompanyID: int
    BranchID: int
    SupplierID: int
    InvoiceNumber: str
    InvoiceDate: datetime.date
    TotalAmount: float
    Notes: Optional[str] = None


@strawberry.input
class PurchaseInvoiceUpdate:
    CompanyID: int
    BranchID: int
    SupplierID: int
    InvoiceNumber: str
    InvoiceDate: datetime.date
    TotalAmount: float
    Notes: Optional[str] = None


@strawberry.type
class PurchaseInvoicesInDB:
    CompanyID: int
    BranchID: int
    PurchaseInvoiceID: int
    SupplierID: int
    UserId: int
    InvoiceNumber: str
    InvoiceDate: datetime.date
    TotalAmount: float
    Notes: Optional[str]

    CompanyData: Optional[CompanyInDB] = None
    BranchData: Optional[BranchesInDB] = None
    SupplierData: Optional[SuppliersInDB] = None
    UserData: Optional[UsersInDB] = None
    PurchaseInvoiceDetailsData: Optional[List[PurchaseInvoiceDetailsInDB]] = None
