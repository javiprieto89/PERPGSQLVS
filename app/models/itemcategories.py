# ========== ItemCategories ===========
# app/models/itemcategories.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .itemsubcategories import ItemSubcategories
    from .items import Items

from typing import List

from sqlalchemy import Integer, String, Identity, PrimaryKeyConstraint, Index
from sqlalchemy.orm import Mapped, relationship, mapped_column
#from .itemsubcategories import ItemSubcategories
#from .items import Items
from app.db import Base

class ItemCategories(Base):
    __tablename__ = 'ItemCategories'
    __table_args__ = (
        PrimaryKeyConstraint('CompanyID','ItemCategoryID', name='PK_ItemCategories'),
        Index('ix_Categories_CategoryID', 'ItemCategoryID')
    )

    CompanyID: Mapped[int] = mapped_column(Integer)
    ItemCategoryID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1))
    CategoryName: Mapped[str] = mapped_column(String(100, 'Modern_Spanish_CI_AS'))

    # Relaciones
    itemSubcategories: Mapped[List['ItemSubcategories']] = relationship('ItemSubcategories', back_populates='itemCategories_')
    items: Mapped[List['Items']] = relationship(
        'Items',
        back_populates='itemCategories_',
        overlaps='items'
    )
    
