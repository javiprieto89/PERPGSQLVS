# ========== Users ===========
# app/models/users.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .useractivitylog import UserActivityLog
    from .useraccess import UserAccess
    from .orders import Orders
    from .stockhistory import StockHistory
    from .tempstockhistorydetails import TempStockHistoryDetails
    from .orderhistory import OrderHistory
    from .temporderdetails import TempOrderDetails
    from .cashboxes import CashBoxes
    from .cashboxmovements import CashBoxMovements

from typing import List

from sqlalchemy import Column, Integer, Unicode, Boolean, Identity, PrimaryKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship
#from .useractivitylog import UserActivityLog
#from .useraccess import UserAccess
#from .orders import Orders
#from .stockhistory import StockHistory
#from .tempstockentries import TempStockEntries
#from .orderhistory import OrderHistory
#from .temporderdetails import TempOrderDetails
from app.db import Base


class Users(Base):
    __tablename__ = 'Users'
    __table_args__ = (
        PrimaryKeyConstraint('UserID', name='PK__Users__1788CCAC4149E5BC'),
    )

    UserID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    Nickname = Column(Unicode(50, 'Modern_Spanish_CI_AS'))
    FullName = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Password = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    IsActive = Column(Boolean, server_default=text('((1))'))

    # Relaciones
    userActivityLog: Mapped[List['UserActivityLog']] = relationship('UserActivityLog', back_populates='users_')
    userAccess: Mapped[List['UserAccess']] = relationship('UserAccess', back_populates='users_')
    orders: Mapped[List['Orders']] = relationship('Orders', back_populates='users_')
    stockHistory: Mapped[List['StockHistory']] = relationship('StockHistory', back_populates='users_')
    tempStockHistoryDetails: Mapped[List['TempStockHistoryDetails']] = relationship('TempStockHistoryDetails', back_populates='users_')
    orderHistory: Mapped[List['OrderHistory']] = relationship('OrderHistory', back_populates='users_')
    tempOrderDetails: Mapped[List['TempOrderDetails']] = relationship('TempOrderDetails', back_populates='users_')
    cashBoxes: Mapped[List['CashBoxes']] = relationship('CashBoxes', back_populates='users_')
    cashBoxMovements: Mapped[List['CashBoxMovements']] = relationship('CashBoxMovements', back_populates='users_')