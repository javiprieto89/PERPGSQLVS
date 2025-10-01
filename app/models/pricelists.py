# ========== PriceLists ===========
# app/models/pricelists.py
from __future__ import annotations
import datetime
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .clients import Clients
    from .itempricehistories import ItemPriceHistories
    from .orders import Orders
    from .pricelistitems import PriceListItems
    from .temporderdetails import TempOrderDetails

from typing import List

from sqlalchemy import Integer, Unicode, Boolean, Identity, PrimaryKeyConstraint, Index, Date, text
from sqlalchemy.orm import Mapped, relationship, mapped_column

from app.db import Base

class PriceLists(Base):
    __tablename__ = 'PriceLists'
    __table_args__ = (
        PrimaryKeyConstraint('CompanyID','PriceListID', name='PK_PriceLists'),
    )

    CompanyID: Mapped[int] = mapped_column(Integer)
    PriceListID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1))
    PriceListName: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    IsActive: Mapped[bool] = mapped_column(Boolean, server_default=text('((1))'))
    PriceListDescription: Mapped[str] = mapped_column(Unicode(250, 'Modern_Spanish_CI_AS'))
    CreatedDate: Mapped[datetime.date] = mapped_column(Date, server_default=text('(CONVERT([date],getdate()))'))

    # Relaciones
    clients: Mapped[List['Clients']] = relationship(
        'Clients',
        back_populates='pricelists_',
        overlaps='clients,branches_'
    )
    ItemPriceHistories: Mapped[List['ItemPriceHistories']] = relationship(
        'ItemPriceHistories',
        back_populates='priceLists_',
        overlaps='itemPriceHistory,items_,branches_'
    )
    orders: Mapped[List['Orders']] = relationship(
        'Orders',
        back_populates='priceLists_',
        overlaps='orders,clients_,discounts_,saleConditions_,serviceType_,users_,warehouses_', viewonly=True
    )
    priceListItems: Mapped[List['PriceListItems']] = relationship(
        'PriceListItems',
        back_populates='priceLists_',
        primaryjoin='PriceLists.PriceListID == foreign(PriceListItems.PriceListID)',
        overlaps='items_,priceListItems'
    )
    tempOrderDetails: Mapped[List['TempOrderDetails']] = relationship(
        'TempOrderDetails',
        back_populates='priceLists_',
        overlaps='tempOrderDetails,tempOrderDetails'
    )
    
