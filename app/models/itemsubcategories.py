# ========== ItemSubcategories ===========
# app/models/itemsubcategories.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .itemcategories import ItemCategories
    from .items import Items

from typing import List

from sqlalchemy import Column, Integer, String, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, Index
from sqlalchemy.orm import Mapped, relationship
#from .itemcategories import ItemCategories
#from .items import Items
from app.db import Base


class ItemSubcategories(Base):
    __tablename__ = 'ItemSubcategories'
    __table_args__ = (
        ForeignKeyConstraint(['ItemCategoryID'], ['ItemCategories.ItemCategoryID'], name='FK_ItemSubcategories_ItemCategories'),
        PrimaryKeyConstraint('ItemSubcategoryID', name='PK_ItemSubcategories_1'),
        Index('ix_Subcategories_SubcategoryID', 'ItemSubcategoryID')
    )

    ItemSubcategoryID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    ItemCategoryID = Column(Integer)
    SubcategoryName = Column(String(100, 'Modern_Spanish_CI_AS'))

    # Relaciones
    itemCategories_: Mapped['ItemCategories'] = relationship('ItemCategories', back_populates='itemSubcategories')
    items: Mapped[List['Items']] = relationship('Items', back_populates='itemSubcategories_')

