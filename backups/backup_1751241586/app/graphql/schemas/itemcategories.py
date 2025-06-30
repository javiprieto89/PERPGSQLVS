# app/graphql/schemas/itemcategories.py
import strawberry
from typing import Optional

@strawberry.input
class ItemCategoriesCreate:
    Name: str

@strawberry.input
class ItemCategoriesUpdate:
    Name: Optional[str] = None

@strawberry.type
class ItemCategoriesInDB:
    CategoryID: int
    Name: str
