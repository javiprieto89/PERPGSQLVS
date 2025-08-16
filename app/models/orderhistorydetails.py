# ========== OrderHistoryDetails ===========
# app/models/orderhistorydetails.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .items import Items
    from .orderhistory import OrderHistory
    from .warehouses import Warehouses

from sqlalchemy import Column, Integer, Unicode, DECIMAL, DateTime, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship

from app.db import Base


class OrderHistoryDetails(Base):
    __tablename__ = 'OrderHistoryDetails'
    __table_args__ = (
        ForeignKeyConstraint(['ItemID'], ['Items.ItemID'],
                             name='FK__OrderHist__ItemI__32AB8735'),
        ForeignKeyConstraint(['OrderHistoryID'], [
                             'OrderHistory.OrderHistoryID'], name='FK__OrderHist__Histo__31B762FC'),
        ForeignKeyConstraint(['WarehouseID'], [
                             'Warehouses.WarehouseID'], name='FK_OrderHistoryDetails_Warehouses'),
        PrimaryKeyConstraint('OrderHistoryDetailID',
                             name='PK__OrderHis__D6D0F42ABBC4939A')
    )

    OrderHistoryDetailID = Column(Integer, Identity(
        start=1, increment=1), primary_key=True)
    OrderHistoryID = Column(Integer)
    ItemID = Column(Integer)
    WarehouseID = Column(Integer)
    Quantity = Column(Integer)
    UnitPrice = Column(DECIMAL(10, 2))
    Description = Column(Unicode(200, 'Modern_Spanish_CI_AS'))
    LastModified = Column(DateTime, server_default=text('(getdate())'))

    # Relaciones
    items_: Mapped['Items'] = relationship(
        'Items', back_populates='orderHistoryDetails_')
    orderHistory_: Mapped['OrderHistory'] = relationship(
        'OrderHistory', back_populates='orderHistoryDetails_')
    warehouses_: Mapped['Warehouses'] = relationship(
        'Warehouses', back_populates='orderHistoryDetails')
