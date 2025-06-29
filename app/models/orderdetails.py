# ========== OrderDetails ===========
# app/models/orderdetails.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .items import Items
    from .orders import Orders
    from .warehouses import Warehouses

from sqlalchemy import Column, Integer, Unicode, DECIMAL, DateTime, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship
#from .items import Items
#from .orders import Orders
#from .warehouses import Warehouses
from app.db import Base


class OrderDetails(Base):
    __tablename__ = 'OrderDetails'
    __table_args__ = (
        ForeignKeyConstraint(['ItemID'], ['Items.ItemID'], name='FK__OrderDeta__ItemI__2DE6D218'),
        ForeignKeyConstraint(['OrderID'], ['Orders.OrderID'], name='FK__OrderDeta__Order__2CF2ADDF'),
        ForeignKeyConstraint(['WarehouseID'], ['Warehouses.WarehouseID'], name='FK_OrderDetails_Warehouses'),
        PrimaryKeyConstraint('OrderDetailID', name='PK__OrderDet__9DD74D9DF5D37EDA')
    )

    OrderDetailID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    OrderID = Column(Integer)
    ItemID = Column(Integer)
    WarehouseID = Column(Integer)
    Quantity = Column(Integer)
    UnitPrice = Column(DECIMAL(10, 2))
    Description = Column(Unicode(200, 'Modern_Spanish_CI_AS'))
    LastModified = Column(DateTime, server_default=text('(getdate())'))

    # Relaciones
    items_: Mapped['Items'] = relationship('Items', back_populates='orderDetails')
    orders_: Mapped['Orders'] = relationship('Orders', back_populates='orderDetails')
    warehouses_: Mapped['Warehouses'] = relationship('Warehouses', back_populates='orderDetails')