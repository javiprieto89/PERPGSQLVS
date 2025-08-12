# app/graphql/schemas/itemtaxes.py
import strawberry
from typing import Optional


@strawberry.input
class ItemTaxesCreate:
    CompanyID: int
    BranchID: int
    ItemID: int
    TaxID: int


@strawberry.input
class ItemTaxesUpdate:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    ItemID: Optional[int] = None
    TaxID: Optional[int] = None


@strawberry.type
class ItemTaxesInDB:
    ItemTaxID: int
    CompanyID: int
    BranchID: int
    ItemID: int
    TaxID: int
