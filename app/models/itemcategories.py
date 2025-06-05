# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class ItemCategories(Base):
    __tablename__ = 'ItemCategories'
    __table_args__ = (
        PrimaryKeyConstraint('itemCategoryID', name='PK_ItemCategories'),
        Index('ix_Categories_CategoryID', 'itemCategoryID')
    )

    itemCategoryID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    categoryName = Column(String(100))

    itemSubcategories = relationship('ItemSubcategories', back_populates='ItemCategories_')
    items = relationship('Items', back_populates='ItemCategories_')


