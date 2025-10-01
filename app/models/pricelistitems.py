# ========== PriceListItems ===========
# app/models/pricelistitems.py
from __future__ import annotations
import datetime
import decimal
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .items import Items
    from .pricelists import PriceLists

from sqlalchemy import Integer, DECIMAL, DateTime, PrimaryKeyConstraint, ForeignKeyConstraint, Identity, text
from sqlalchemy.orm import Mapped, relationship, mapped_column

from app.db import Base

class PriceListItems(Base):
    __tablename__ = 'PriceListItems'
    __table_args__ = (
        ForeignKeyConstraint(['ItemID'], ['Items.ItemID'], name='FK_PriceListItems_Items'),
        ForeignKeyConstraint(['PriceListID'], ['PriceLists.PriceListID'], name='FK_PriceListItems_PriceLists'),
        PrimaryKeyConstraint('PriceListID', 'ItemID', name='PK_PriceListItems')
    )

    PriceListID: Mapped[int] = mapped_column(Integer, primary_key=True)
    ItemID: Mapped[int] = mapped_column(Integer, primary_key=True)
    Price: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 2))
    EffectiveDate: Mapped[datetime.datetime] = mapped_column(DateTime, server_default=text('(getdate())'))

    # Relaciones
    items_: Mapped['Items'] = relationship(
        'Items',
        back_populates='priceListItems',
        primaryjoin='foreign(PriceListItems.ItemID) == Items.ItemID',
        foreign_keys='PriceListItems.ItemID'
    )
    priceLists_: Mapped['PriceLists'] = relationship(
        'PriceLists',
        back_populates='priceListItems',
        primaryjoin='foreign(PriceListItems.PriceListID) == PriceLists.PriceListID',
        foreign_keys='PriceListItems.PriceListID',
        overlaps='items_,priceListItems'
    )
