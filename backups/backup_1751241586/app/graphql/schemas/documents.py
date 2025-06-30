# app/graphql/schemas/documents.py
import strawberry
from typing import Optional


@strawberry.input
class DocumentsCreate:
    Description: str
    DocTypeID: int
    DocumentNumber: int
    PointOfSale: int
    IsFiscal: Optional[bool] = None
    IsElectronic: Optional[bool] = None
    IsManual: Optional[bool] = None
    IsQuotation: Optional[bool] = None
    Active: bool
    Testing: bool
    MaxItems: Optional[int] = None
    RelatedDocumentID: Optional[int] = None
    ShouldAccount: bool
    MovesStock: bool


@strawberry.input
class DocumentsUpdate:
    Description: str
    DocTypeID: int
    DocumentNumber: int
    PointOfSale: int
    IsFiscal: Optional[bool] = None
    IsElectronic: Optional[bool] = None
    IsManual: Optional[bool] = None
    IsQuotation: Optional[bool] = None
    Active: bool
    Testing: bool
    MaxItems: Optional[int] = None
    RelatedDocumentID: Optional[int] = None
    ShouldAccount: bool
    MovesStock: bool


@strawberry.type
class DocumentsInDB:
    DocumentID: int
    Description: str
    DocTypeID: int
    DocumentNumber: int
    PointOfSale: int
    IsFiscal: Optional[bool] = None
    IsElectronic: Optional[bool] = None
    IsManual: Optional[bool] = None
    IsQuotation: Optional[bool] = None
    Active: bool
    Testing: bool
    MaxItems: Optional[int] = None
    RelatedDocumentID: Optional[int] = None
    ShouldAccount: bool
    MovesStock: bool