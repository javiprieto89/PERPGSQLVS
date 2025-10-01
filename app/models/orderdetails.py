# ========== OrderDetails ===========
# app/models/orderdetails.py
from __future__ import annotations
import datetime
import decimal
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .items import Items
    from .orders import Orders
    from .warehouses import Warehouses

from sqlalchemy import Integer, Unicode, DECIMAL, DateTime, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship, mapped_column
#from .items import Items
#from .orders import Orders
#from .warehouses import Warehouses
from app.db import Base

class OrderDetails(Base):
    __tablename__ = 'OrderDetails'
    __table_args__ = (
        ForeignKeyConstraint(['CompanyID','ItemID'], ['Items.CompanyID','Items.ItemID'], name='FK_OrderDetails_Items'),
        ForeignKeyConstraint(['CompanyID','BranchID','OrderID'], ['Orders.CompanyID','Orders.BranchID','Orders.OrderID'], name='FK_OrderDetails_Orders'),
        ForeignKeyConstraint(['CompanyID','WarehouseID'], ['Warehouses.CompanyID','Warehouses.WarehouseID'], name='FK_OrderDetails_Warehouses'),
        PrimaryKeyConstraint('CompanyID','BranchID','OrderID','OrderDetailID', name='PK_OrderDetails')
    )

    CompanyID: Mapped[int] = mapped_column(Integer)
    BranchID: Mapped[int] = mapped_column(Integer)
    OrderID: Mapped[int] = mapped_column(Integer)
    OrderDetailID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1))
    ItemID: Mapped[int] = mapped_column(Integer)
    WarehouseID: Mapped[int] = mapped_column(Integer)
    Quantity: Mapped[int] = mapped_column(Integer)
    UnitPrice: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 2))
    LineDescription: Mapped[str] = mapped_column(Unicode(200, 'Modern_Spanish_CI_AS'))
    LastModified: Mapped[datetime.datetime] = mapped_column(DateTime, server_default=text('(getdate())'))

    # Relaciones
    items_: Mapped['Items'] = relationship('Items', back_populates='orderDetails')
    orders_: Mapped['Orders'] = relationship(
        'Orders',
        back_populates='orderDetails',
        overlaps='items_,orderDetails'
    )
    warehouses_: Mapped['Warehouses'] = relationship(
        'Warehouses',
        back_populates='orderDetails',
        overlaps='items_,orders_,orderDetails'
    )
    
