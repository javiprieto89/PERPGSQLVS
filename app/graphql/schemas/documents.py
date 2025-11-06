# app/graphql/schemas/documents.py
import strawberry
from typing import Optional
from app.graphql.schemas.company import CompanyInDB
from app.graphql.schemas.branches import BranchesInDB


@strawberry.input
class CommercialDocumentsCreate:
    CompanyID: int
    BranchID: int
    DocumentTypeID: int
    CurrencyID: Optional[int] = None
    DocumentDescription: str
    DocumentNumber: int
    PointOfSale: int
    IsFiscal: Optional[bool] = None
    IsElectronic: Optional[bool] = None
    IsManual: Optional[bool] = None
    IsQuotation: Optional[bool] = None
    IsActive: bool
    IsTest: bool
    MaxItems: Optional[int] = None
    ShouldAccount: bool
    AffectsStock: bool
    FromDate: Optional[str] = None


@strawberry.input
class CommercialDocumentsUpdate:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    DocumentTypeID: Optional[int] = None
    CurrencyID: Optional[int] = None
    DocumentDescription: Optional[str] = None
    DocumentNumber: Optional[int] = None
    PointOfSale: Optional[int] = None
    IsFiscal: Optional[bool] = None
    IsElectronic: Optional[bool] = None
    IsManual: Optional[bool] = None
    IsQuotation: Optional[bool] = None
    IsActive: Optional[bool] = None
    IsTest: Optional[bool] = None
    MaxItems: Optional[int] = None
    ShouldAccount: Optional[bool] = None
    AffectsStock: Optional[bool] = None
    FromDate: Optional[str] = None


@strawberry.type
class CommercialDocumentsInDB:
    DocumentID: int
    CompanyID: int
    BranchID: int
    DocumentTypeID: int
    CurrencyID: Optional[int]
    DocumentDescription: str
    DocumentNumber: int
    PointOfSale: int
    IsFiscal: Optional[bool] = None
    IsElectronic: Optional[bool] = None
    IsManual: Optional[bool] = None
    IsQuotation: Optional[bool] = None
    IsActive: bool
    IsTest: bool
    MaxItems: Optional[int] = None
    ShouldAccount: bool
    AffectsStock: bool
    FromDate: Optional[str] = None
    CompanyData: Optional[CompanyInDB] = None
    BranchData: Optional[BranchesInDB] = None
