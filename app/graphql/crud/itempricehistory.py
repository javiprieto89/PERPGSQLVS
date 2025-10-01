"""Compatibility wrapper for legacy item price history module name."""

from .itempricehistories import (
    create_itempricehistory,
    delete_itempricehistory,
    get_itempricehistory,
    get_itempricehistory_by_id,
    update_itempricehistory,
)

__all__ = [
    "create_itempricehistory",
    "delete_itempricehistory",
    "get_itempricehistory",
    "get_itempricehistory_by_id",
    "update_itempricehistory",
]
