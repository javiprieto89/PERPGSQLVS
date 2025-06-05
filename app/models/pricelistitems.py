# Auto-generado. Revisar imports si faltan.
from typing import List, Optional
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class PriceListItems(Base):
    __tablename__ = 'PriceListItems'
    __table_args__ = (
        ForeignKeyConstraint(['itemID'], ['Items.itemID'], name='FK__PriceList__ItemI__76969D2E'),
        ForeignKeyConstraint(['priceListID'], ['PriceLists.priceListID'], name='FK__PriceList__Price__75A278F5'),
        PrimaryKeyConstraint('PriceListItemID', name='PK__PriceLis__BEEAD0334524605B')
    )

    priceListItemID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    priceListID = Column(Integer)
    itemID = Column(Integer)
    price = Column(DECIMAL(10, 2))
    effectiveDate = Column(DateTime, server_default=text('(getdate())'))

    items_ = relationship('Items', back_populates='PriceListItems')
    priceLists_ = relationship('PriceLists', back_populates='PriceListItems')


