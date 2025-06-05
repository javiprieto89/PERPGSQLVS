# app/graphql/schemas/itemsubcategories.py
import strawberry
from typing import Optional

@strawberry.input
class ItemSubcategoriesCreate:
    itemCategoryID: int
    subcategoryName: str

@strawberry.input
class ItemSubcategoriesUpdate:
    itemCategoryID: Optional[int] = None
    subcategoryName: Optional[str] = None

@strawberry.type
class ItemSubcategoriesInDB:
    itemSubcategoryID: int
    itemCategoryID: int
    subcategoryName: str
