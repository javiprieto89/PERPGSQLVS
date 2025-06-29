# ========== PriceLists ===========
# app/models/pricelists.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .clients import Clients
    from .itempricehistory import ItemPriceHistory
    from .orders import Orders
    from .pricelistitems import PriceListItems
    from .temporderdetails import TempOrderDetails

from typing import List

from sqlalchemy import Column, Integer, Unicode, Boolean, Identity, PrimaryKeyConstraint, Index, Date, text
from sqlalchemy.orm import Mapped, relationship

from app.db import Base


class PriceLists(Base):
    __tablename__ = 'PriceLists'
    __table_args__ = (
        PrimaryKeyConstraint('PriceListID', name='PK__PriceLis__1E30F34C58783DD3'),
    )

    PriceListID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    Name = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    IsActive = Column(Boolean, server_default=text('((1))'))
    Description = Column(Unicode(250, 'Modern_Spanish_CI_AS'))
    CreatedDate = Column(Date, server_default=text('(CONVERT([date],getdate()))'))

    # Relaciones
    clients: Mapped[List['Clients']] = relationship('Clients', back_populates='pricelists_')
    itemPriceHistory: Mapped[List['ItemPriceHistory']] = relationship('ItemPriceHistory', back_populates='priceLists_')
    orders: Mapped[List['Orders']] = relationship('Orders', back_populates='priceLists_')
    priceListItems: Mapped[List['PriceListItems']] = relationship('PriceListItems', back_populates='priceLists_')
    tempOrderDetails: Mapped[List['TempOrderDetails']] = relationship('TempOrderDetails', back_populates='priceLists_')