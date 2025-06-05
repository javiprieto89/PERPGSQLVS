# app/graphql/schemas/documents.py
import strawberry
from typing import Optional


@strawberry.input
class DocumentsCreate:
    description: str
    docTypeID: int
    documentNumber: int
    pointOfSale: int
    isFiscal: Optional[bool] = None
    isElectronic: Optional[bool] = None
    isManual: Optional[bool] = None
    isQuotation: Optional[bool] = None
    Active: bool
    testing: bool
    maxItems: Optional[int] = None
    relatedDocumentID: Optional[int] = None
    shouldAccount: bool
    movesStock: bool


@strawberry.input
class DocumentsUpdate:
    description: str
    docTypeID: int
    documentNumber: int
    pointOfSale: int
    isFiscal: Optional[bool] = None
    isElectronic: Optional[bool] = None
    isManual: Optional[bool] = None
    isQuotation: Optional[bool] = None
    Active: bool
    testing: bool
    maxItems: Optional[int] = None
    relatedDocumentID: Optional[int] = None
    shouldAccount: bool
    movesStock: bool


@strawberry.type
class DocumentsInDB:
    documentID: int
    description: str
    docTypeID: int
    documentNumber: int
    pointOfSale: int
    isFiscal: Optional[bool] = None
    isElectronic: Optional[bool] = None
    isManual: Optional[bool] = None
    isQuotation: Optional[bool] = None
    Active: bool
    testing: bool
    maxItems: Optional[int] = None
    relatedDocumentID: Optional[int] = None
    shouldAccount: bool
    movesStock: bool
