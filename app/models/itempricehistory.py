# ========== ItemPriceHistory ===========
# app/models/itempricehistory.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .items import Items
    from .price import PriceLists

from sqlalchemy import Column, Integer, DateTime, DECIMAL, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship
from app.db import Base


class ItemPriceHistory(Base):
    __tablename__ = 'ItemPriceHistory'
    __table_args__ = (
        ForeignKeyConstraint(['ItemID'], ['Items.ItemID'],
                             name='FK__ItemPrice__ItemI__367C1819'),
        ForeignKeyConstraint(['PriceListID'], [
                             'PriceLists.PriceListID'], name='FK_ItemPriceHistory_PriceLists'),
        PrimaryKeyConstraint(
            'PriceHistoryID', name='PK__ItemPric__A927CB2BB60ACD35')
    )

    PriceHistoryID = Column(Integer, Identity(
        start=1, increment=1), primary_key=True)
    ItemID = Column(Integer)
    PriceListID = Column(Integer)
    EffectiveDate = Column(DateTime, server_default=text('(getdate())'))
    Price = Column(DECIMAL(10, 2))

    # Relaciones
    items_: Mapped['Items'] = relationship(
        'Items', back_populates='itemPriceHistory_')
    priceLists_: Mapped['PriceLists'] = relationship(
        'PriceLists', back_populates='itemPriceHistory')
