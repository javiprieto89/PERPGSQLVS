# app/graphql/schemas/itemcategories.py
import strawberry
from typing import Optional

@strawberry.input
class ItemCategoriesCreate:
    CategoryName: str

@strawberry.input
class ItemCategoriesUpdate:
    CategoryName: Optional[str] = None

@strawberry.type
class ItemCategoriesInDB:
    ItemCategoryID: int
    CategoryName: str
