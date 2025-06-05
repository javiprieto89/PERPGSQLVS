# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class ItemSubcategories(Base):
    __tablename__ = 'ItemSubcategories'
    __table_args__ = (
        ForeignKeyConstraint(['itemCategoryID'], ['ItemCategories.itemCategoryID'], name='FK_ItemSubcategories_ItemCategories'),
        PrimaryKeyConstraint('itemSubcategoryID', name='PK_ItemSubcategories_1'),
        Index('ix_Subcategories_SubcategoryID', 'itemSubcategoryID')
    )

    itemSubcategoryID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    itemCategoryID = Column(Integer)
    subcategoryName = Column(String(100))

    itemCategories_ = relationship('ItemCategories', back_populates='ItemSubcategories')
    items = relationship('Items', back_populates='ItemSubcategories_')


