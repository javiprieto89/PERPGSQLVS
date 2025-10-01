# ========== OrderHistoryDetails ===========
# app/models/orderhistorydetails.py
from __future__ import annotations
import datetime
import decimal
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .items import Items
    from .orderhistory import OrderHistory
    from .warehouses import Warehouses      

from sqlalchemy import Integer, Unicode, DECIMAL, DateTime, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship, mapped_column

from app.db import Base

class OrderHistoryDetails(Base):
    __tablename__ = 'OrderHistoryDetails'
    __table_args__ = (
        ForeignKeyConstraint(['CompanyID','ItemID'], ['Items.CompanyID','Items.ItemID'], name='FK_OrderHistoryDetails_Items'),
        ForeignKeyConstraint(['CompanyID','BranchID','OrderHistoryID'], ['OrderHistories.CompanyID','OrderHistories.BranchID','OrderHistories.OrderHistoryID'], name='FK_OrderHistoryDetails_OrderHistories'),
        ForeignKeyConstraint(['CompanyID','WarehouseID'], ['Warehouses.CompanyID','Warehouses.WarehouseID'], name='FK_OrderHistoryDetails_Warehouses'),
        PrimaryKeyConstraint('CompanyID','BranchID','OrderHistoryID','OrderHistoryDetailID', name='PK_OrderHistoryDetails')
    )

    CompanyID: Mapped[int] = mapped_column(Integer)
    BranchID: Mapped[int] = mapped_column(Integer)
    OrderHistoryID: Mapped[int] = mapped_column(Integer)
    OrderHistoryDetailID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1))
    ItemID: Mapped[int] = mapped_column(Integer)
    WarehouseID: Mapped[int] = mapped_column(Integer)
    Quantity: Mapped[int] = mapped_column(Integer)
    UnitPrice: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 2))
    Description: Mapped[str] = mapped_column(Unicode(200, 'Modern_Spanish_CI_AS'))
    LastModified: Mapped[datetime.datetime] = mapped_column(DateTime, server_default=text('(getdate())'))

    # Relaciones
    items_: Mapped['Items'] = relationship(
        'Items',
        back_populates='orderHistoryDetails',
        overlaps='orderHistoryDetails'
    )
    orderHistory_: Mapped['OrderHistory'] = relationship(
        'OrderHistory',
        back_populates='orderHistoryDetails',
        overlaps='items_,orderHistoryDetails'
    )
    warehouses_: Mapped['Warehouses'] = relationship(
        'Warehouses',
        back_populates='orderHistoryDetails',
        overlaps='items_,orderHistoryDetails,orderHistory_'
    )
    
