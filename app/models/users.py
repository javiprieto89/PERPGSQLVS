# ========== Users ===========
# app/models/users.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .useractivitylog import UserActivityLog
    from .userapermissions import UserPermissions
    from .orders import Orders
    from .stockhistorydetails import StockHistoryDetails
    from .stockhistories import StockHistories
    from .tempstockhistorydetails import TempStockHistoryDetails
    from .orderhistory import OrderHistory
    from .temporderdetails import TempOrderDetails
    from .cashboxes import CashBoxes
    from .cashboxmovements import CashBoxMovements
    from .rmas import RMAs

from typing import List

from sqlalchemy import Integer, Unicode, Boolean, Identity, PrimaryKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship, mapped_column
# from .useractivitylog import UserActivityLog
# from .userpermissions import UserPermissions
# from .orders import Orders
# from .stockhistory import StockHistory
# from .tempstockentries import TempStockEntries
# from .orderhistory import OrderHistory
# from .temporderdetails import TempOrderDetails
from app.db import Base

class Users(Base):
    __tablename__ = 'Users'
    __table_args__ = (
        PrimaryKeyConstraint('UserID', name='PK_Users'),
    )

    UserID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    Nickname: Mapped[str] = mapped_column(Unicode(50, 'Modern_Spanish_CI_AS'))
    FullName: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Password: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    IsActive: Mapped[bool] = mapped_column(Boolean, server_default=text('((1))'))

    # Relaciones
    userActivityLog: Mapped[List['UserActivityLog']] = relationship(
        'UserActivityLog', back_populates='users_')
    userPermissions: Mapped[List['UserPermissions']] = relationship(
        'UserPermissions', back_populates='users_')
    orders: Mapped[List['Orders']] = relationship(
        'Orders',
        back_populates='users_',
        overlaps='clients_,discounts_,priceLists_,saleConditions_,serviceType_,warehouses_,orders', viewonly=True
    )
    stockHistoryDetails: Mapped[List['StockHistoryDetails']] = relationship(
        'StockHistoryDetails',
        back_populates='users_',
        overlaps='items_,warehouses_,stockHistoryDetails'
    )
    stockHistories: Mapped[List['StockHistories']] = relationship(
        'StockHistories', back_populates='users_')
    tempStockHistoryDetails: Mapped[List['TempStockHistoryDetails']] = relationship(
        'TempStockHistoryDetails',
        back_populates='users_',
        overlaps='items_,warehouses_,tempStockHistoryDetails'
    )
    orderHistory: Mapped[List['OrderHistory']] = relationship(
        'OrderHistory', back_populates='users_')
    tempOrderDetails: Mapped[List['TempOrderDetails']] = relationship(
        'TempOrderDetails',
        back_populates='users_',
        overlaps='items_,orders_,priceLists_,warehouses_,tempOrderDetails'
    )
    cashBoxes: Mapped[List['CashBoxes']] = relationship(
        'CashBoxes', back_populates='users_')
    cashBoxMovements: Mapped[List['CashBoxMovements']] = relationship(
        'CashBoxMovements', back_populates='users_')
    rmas: Mapped[List['RMAs']] = relationship(
        'RMAs',
        back_populates='users_',
        overlaps='branches_,rmas'
    )
