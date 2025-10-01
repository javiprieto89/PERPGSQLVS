# ========== Warehouses ===========
# app/models/warehouses.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .items import Items
    from .itemstock import Itemstock
    from .orders import Orders
    from .stockhistorydetails import StockHistoryDetails
    from .tempstockhistorydetails import TempStockHistoryDetails
    from .orderdetails import OrderDetails
    from .temporderdetails import TempOrderDetails
    from .orderhistorydetails import OrderHistoryDetails

from typing import List

from sqlalchemy import Integer, Unicode, Identity, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, relationship, mapped_column

from app.db import Base


class Warehouses(Base):
    __tablename__ = 'Warehouses'
    __table_args__ = (
        PrimaryKeyConstraint('CompanyID', 'WarehouseID', name='PK_Warehouses'),
    )

    CompanyID: Mapped[int] = mapped_column(Integer)
    WarehouseID: Mapped[int] = mapped_column(
        Integer, Identity(start=1, increment=1))
    WarehouseName: Mapped[str] = mapped_column(
        'WarehouseName', Unicode(100, 'Modern_Spanish_CI_AS'))
    Addres: Mapped[str] = mapped_column(
        'Address', Unicode(100, 'Modern_Spanish_CI_AS'))

    # Relaciones
    items: Mapped[List['Items']] = relationship(
        'Items',
        back_populates='warehouses_',
        overlaps='items'
    )
    itemstock: Mapped[List['Itemstock']] = relationship(
        'Itemstock',
        back_populates='warehouses_',
        overlaps='items_,itemstock,itemstock,suppliers_'
    )
    orders: Mapped[List['Orders']] = relationship(
        'Orders',
        back_populates='warehouses_',
        overlaps='clients_,discounts_,priceLists_,saleConditions_,serviceType_,users_,orders', viewonly=True
    )
    stockHistoryDetails: Mapped[List['StockHistoryDetails']] = relationship(
        'StockHistoryDetails',
        back_populates='warehouses_',
        overlaps='items_,users_,stockHistoryDetails'
    )
    tempStockHistoryDetails: Mapped[List['TempStockHistoryDetails']] = relationship(
        'TempStockHistoryDetails',
        back_populates='warehouses_',
        overlaps='items_,users_,tempStockHistoryDetails',
        viewonly=True
    )
    orderDetails: Mapped[List['OrderDetails']] = relationship(
        'OrderDetails',
        back_populates='warehouses_',
        overlaps='items_,orders_,orderDetails'
    )
    tempOrderDetails: Mapped[List['TempOrderDetails']] = relationship(
        'TempOrderDetails',
        back_populates='warehouses_',
        overlaps='items_,orders_,priceLists_,users_,tempOrderDetails'
    )
    orderHistoryDetails: Mapped[List['OrderHistoryDetails']] = relationship(
        'OrderHistoryDetails',
        back_populates='warehouses_',
        overlaps='items_,orderHistoryDetails,orderHistory_'
    )
