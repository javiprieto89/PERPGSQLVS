# app/graphql/schemas/itemsubcategories.py
import strawberry
from typing import Optional

@strawberry.input
class ItemSubcategoriesCreate:
    ItemCategoryID: int
    SubcategoryName: str

@strawberry.input
class ItemSubcategoriesUpdate:
    ItemCategoryID: Optional[int] = None
    SubcategoryName: Optional[str] = None

@strawberry.type
class ItemSubcategoriesInDB:
    ItemSubcategoryID: int
    ItemCategoryID: int
    SubcategoryName: str
    CategoryName: Optional[str] = None
