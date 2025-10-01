# ========== ServiceType ===========
# app/models/servicetype.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .orders import Orders
    from .orderhistory import OrderHistory

from typing import List

from sqlalchemy import Integer, Unicode, Identity, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, relationship, mapped_column
#from .orders import Orders
#from .orderhistory import OrderHistory
from app.db import Base

class ServiceTypes(Base):
    __tablename__ = 'ServiceTypes'
    __table_args__ = (
        PrimaryKeyConstraint('CompanyID', 'ServiceTypeID', name='PK_ServiceTypes'),
    )

    CompanyID: Mapped[int] = mapped_column(Integer)
    ServiceTypeID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1))
    ServiceTypeName: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))

    # Relaciones
    orders: Mapped[List['Orders']] = relationship(
        'Orders',
        back_populates='serviceType_',
        overlaps='clients_,discounts_,orders,orders,priceLists_,saleConditions_,users_', viewonly=True
    )
    orderHistory: Mapped[List['OrderHistory']] = relationship(
        'OrderHistory',
        back_populates='serviceType_',
        overlaps='orderHistory'
    )
    
