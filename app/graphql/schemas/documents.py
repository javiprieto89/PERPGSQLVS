# app/graphql/schemas/documents.py
import strawberry
from typing import Optional


@strawberry.input
class DocumentsCreate:
    CompanyID: int
    BranchID: int
    DocumentTypeID: int
    Description: str
    DocumentNumber: int
    PointOfSale: int
    IsActive: bool
    Testing: bool
    ShouldAccount: bool
    MovesStock: bool
    IsFiscal: Optional[bool] = None
    IsElectronic: Optional[bool] = None
    IsManual: Optional[bool] = None
    IsQuotation: Optional[bool] = None
    MaxItems: Optional[int] = None
    RelatedDocumentID: Optional[int] = None


@strawberry.input
class DocumentsUpdate:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    DocumentTypeID: Optional[int] = None
    Description: Optional[str] = None
    DocumentNumber: Optional[int] = None
    PointOfSale: Optional[int] = None
    IsActive: Optional[bool] = None
    Testing: Optional[bool] = None
    ShouldAccount: Optional[bool] = None
    MovesStock: Optional[bool] = None
    IsFiscal: Optional[bool] = None
    IsElectronic: Optional[bool] = None
    IsManual: Optional[bool] = None
    IsQuotation: Optional[bool] = None
    MaxItems: Optional[int] = None
    RelatedDocumentID: Optional[int] = None


@strawberry.type
class DocumentsInDB:
    DocumentID: int
    CompanyID: int
    BranchID: int
    DocumentTypeID: int
    Description: str
    DocumentNumber: int
    PointOfSale: int
    IsActive: bool
    Testing: bool
    ShouldAccount: bool
    MovesStock: bool
    IsFiscal: Optional[bool] = None
    IsElectronic: Optional[bool] = None
    IsManual: Optional[bool] = None
    IsQuotation: Optional[bool] = None
    MaxItems: Optional[int] = None
    RelatedDocumentID: Optional[int] = None
