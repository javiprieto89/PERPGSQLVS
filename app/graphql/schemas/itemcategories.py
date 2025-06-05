# app/graphql/schemas/itemcategories.py
import strawberry
from typing import Optional

@strawberry.input
class ItemCategoriesCreate:
    name: str

@strawberry.input
class ItemCategoriesUpdate:
    name: Optional[str] = None

@strawberry.type
class ItemCategoriesInDB:
    categoryID: int
    name: str
