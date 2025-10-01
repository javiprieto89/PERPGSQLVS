# app/graphql/schemas/itemcategories.py
import strawberry
from typing import Optional

@strawberry.input
class ItemCategoriesCreate:
    CompanyID: int
    CategoryName: str

@strawberry.input
class ItemCategoriesUpdate:
    CompanyID: Optional[int] = None
    CategoryName: Optional[str] = None

@strawberry.type
class ItemCategoriesInDB:
    CompanyID: int
    ItemCategoryID: int
    CategoryName: str
