# app/graphql/schemas/itemsubcategories.py
import strawberry
from typing import Optional
from app.graphql.schemas.itemcategories import ItemCategoriesInDB

@strawberry.input
class ItemSubcategoriesCreate:
    CompanyID: int
    ItemCategoryID: int
    SubcategoryName: str

@strawberry.input
class ItemSubcategoriesUpdate:
    CompanyID: Optional[int] = None
    ItemCategoryID: Optional[int] = None
    SubcategoryName: Optional[str] = None

@strawberry.type
class ItemSubcategoriesInDB:
    CompanyID: int
    ItemSubcategoryID: int
    ItemCategoryID: int
    SubcategoryName: str
    CategoryData: Optional[ItemCategoriesInDB] = None
