# ========== ItemSubcategories ===========
# app/models/itemsubcategories.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .itemcategories import ItemCategories
    from .items import Items

from typing import List

from sqlalchemy import Integer, String, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, Index
from sqlalchemy.orm import Mapped, relationship, mapped_column
#from .itemcategories import ItemCategories
#from .items import Items
from app.db import Base

class ItemSubcategories(Base):
    __tablename__ = 'ItemSubcategories'
    __table_args__ = (
        ForeignKeyConstraint(['CompanyID','ItemCategoryID'], ['ItemCategories.CompanyID','ItemCategories.ItemCategoryID'], name='FK_ItemSubcategories_ItemCategories'),
        PrimaryKeyConstraint('CompanyID','ItemCategoryID','ItemSubcategoryID', name='PK_ItemSubcategories'),
        Index('ix_Subcategories_SubcategoryID', 'ItemSubcategoryID')
    )

    CompanyID: Mapped[int] = mapped_column(Integer)
    ItemSubcategoryID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1))
    ItemCategoryID: Mapped[int] = mapped_column(Integer)
    SubcategoryName: Mapped[str] = mapped_column(String(100, 'Modern_Spanish_CI_AS'))

    # Relaciones
    itemCategories_: Mapped['ItemCategories'] = relationship('ItemCategories', back_populates='itemSubcategories')
    items: Mapped[List['Items']] = relationship(
        'Items',
        back_populates='itemSubcategories_',
        overlaps='items'
    )
