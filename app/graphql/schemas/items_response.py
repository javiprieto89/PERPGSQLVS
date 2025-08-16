import strawberry
from typing import List
from .items import ItemSearchResult


@strawberry.type
class ItemsResponse:
    items: List[ItemSearchResult]
    total: int
    page: int
    limit: int
    has_next: bool
    has_prev: bool
