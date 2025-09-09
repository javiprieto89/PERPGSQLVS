# ========== Warehouses ===========
# app/models/warehouses.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .items import Items
    from .itemstock import Itemstock
    from .orders import Orders
    from .stockhistory import StockHistory
    from .tempstockhistorydetails import TempStockHistoryDetails
    from .orderdetails import OrderDetails
    from .temporderdetails import TempOrderDetails
    from .orderhistorydetails import OrderHistoryDetails

from typing import List

from sqlalchemy import Column, Integer, Unicode, Identity, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, relationship
#from .items import Items
#from .itemstock import Itemstock
#from .orders import Orders
#from .stockhistory import StockHistory
#from .tempstockentries import TempStockEntries
#from .orderdetails import OrderDetails
#from .temporderdetails import TempOrderDetails
#from .orderhistorydetails import OrderHistoryDetails
from app.db import Base


class Warehouses(Base):
    __tablename__ = 'Warehouses'
    __table_args__ = (
        PrimaryKeyConstraint('WarehouseID', name='PK__Warehous__2608AFD9216E9B31'),
    )

    WarehouseID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    Name = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Addres = Column(Unicode(100, 'Modern_Spanish_CI_AS'))

    # Relaciones
    items: Mapped[List['Items']] = relationship('Items', back_populates='warehouses_')
    itemstock: Mapped[List['Itemstock']] = relationship('Itemstock', back_populates='warehouses_')
    orders: Mapped[List['Orders']] = relationship('Orders', back_populates='warehouses_')
    stockHistory: Mapped[List['StockHistory']] = relationship('StockHistory', back_populates='warehouses_')
    tempStockHistoryDetails: Mapped[List['TempStockHistoryDetails']] = relationship('TempStockHistoryDetails', back_populates='warehouses_')
    orderDetails: Mapped[List['OrderDetails']] = relationship('OrderDetails', back_populates='warehouses_')
    tempOrderDetails: Mapped[List['TempOrderDetails']] = relationship('TempOrderDetails', back_populates='warehouses_')
    orderHistoryDetails: Mapped[List['OrderHistoryDetails']] = relationship('OrderHistoryDetails', back_populates='warehouses_')
    