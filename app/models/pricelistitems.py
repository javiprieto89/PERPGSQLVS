# ========== PriceListItems ===========
# app/models/pricelistitems.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .items import Items
    from .pricelists import PriceLists

from sqlalchemy import Column, Integer, DECIMAL, DateTime, PrimaryKeyConstraint, ForeignKeyConstraint, Identity, text
from sqlalchemy.orm import Mapped, relationship

from app.db import Base


class PriceListItems(Base):
    __tablename__ = 'PriceListItems'
    __table_args__ = (
        ForeignKeyConstraint(['ItemID'], ['Items.ItemID'],
                             name='FK__PriceList__ItemI__76969D2E'),
        ForeignKeyConstraint(['PriceListID'], [
                             'PriceLists.PriceListID'], name='FK__PriceList__Price__75A278F5'),
        PrimaryKeyConstraint('PriceListID', 'ItemID', name='PK_PriceListItems')
    )

    PriceListID = Column(Integer, primary_key=True)
    ItemID = Column(Integer, primary_key=True)
    Price = Column(DECIMAL(10, 2))
    EffectiveDate = Column(DateTime, server_default=text('(getdate())'))

    # Relaciones
    items_: Mapped['Items'] = relationship(
        'Items', back_populates='priceListItems_')
    priceLists_: Mapped['PriceLists'] = relationship(
        'PriceLists', back_populates='priceListItems')
