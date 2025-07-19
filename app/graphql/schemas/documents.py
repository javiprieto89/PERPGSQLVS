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
    IsFiscal: Optional[bool] = None
    IsElectronic: Optional[bool] = None
    IsManual: Optional[bool] = None
    IsQuotation: Optional[bool] = None
    IsActive: bool
    Testing: bool
    MaxItems: Optional[int] = None
    ShouldAccount: bool
    MovesStock: bool        


@strawberry.input
class DocumentsUpdate:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    DocumentTypeID: Optional[int] = None
    Description: Optional[str] = None
    DocumentNumber: Optional[int] = None
    PointOfSale: Optional[int] = None
    IsFiscal: Optional[bool] = None
    IsElectronic: Optional[bool] = None
    IsManual: Optional[bool] = None
    IsQuotation: Optional[bool] = None
    IsActive: Optional[bool] = None
    Testing: Optional[bool] = None
    MaxItems: Optional[int] = None
    ShouldAccount: Optional[bool] = None
    MovesStock: Optional[bool] = None     


@strawberry.type
class DocumentsInDB:
    DocumentID: int
    CompanyID: int
    BranchID: int
    DocumentTypeID: int
    Description: str
    DocumentNumber: int
    PointOfSale: int
    IsFiscal: Optional[bool] = None
    IsElectronic: Optional[bool] = None
    IsManual: Optional[bool] = None
    IsQuotation: Optional[bool] = None
    IsActive: bool
    Testing: bool
    MaxItems: Optional[int] = None
    ShouldAccount: bool
    MovesStock: bool
