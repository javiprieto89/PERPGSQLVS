# ========== ItemCategories ===========
# app/models/itemcategories.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .itemsubcategories import ItemSubcategories
    from .items import Items

from typing import List

from sqlalchemy import Column, Integer, String, Identity, PrimaryKeyConstraint, Index
from sqlalchemy.orm import Mapped, relationship
# from .itemsubcategories import ItemSubcategories
# from .items import Items
from app.db import Base


class ItemCategories(Base):
    __tablename__ = 'ItemCategories'
    __table_args__ = (
        PrimaryKeyConstraint('ItemCategoryID', name='PK_ItemCategories'),
        Index('ix_Categories_CategoryID', 'ItemCategoryID')
    )

    ItemCategoryID = Column(Integer, Identity(
        start=1, increment=1), primary_key=True)
    CategoryName = Column(String(100, 'Modern_Spanish_CI_AS'))

    # Relaciones
    itemSubcategories_: Mapped[List['ItemSubcategories']] = relationship(
        'ItemSubcategories', back_populates='itemCategories_')
    items: Mapped[List['Items']] = relationship(
        'Items', back_populates='itemCategories_')
