# ========== ServiceType ===========
# app/models/servicetype.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .orders import Orders
    from .orderhistory import OrderHistory

from typing import List

from sqlalchemy import Column, Integer, Unicode, Identity, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, relationship
#from .orders import Orders
#from .orderhistory import OrderHistory
from app.db import Base


class ServiceType(Base):
    __tablename__ = 'ServiceType'
    __table_args__ = (
        PrimaryKeyConstraint('ServiceTypeID', name='PK_tipos_casos'),
    )

    ServiceTypeID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    Type = Column(Unicode(100, 'Modern_Spanish_CI_AS'))

    # Relaciones
    orders: Mapped[List['Orders']] = relationship('Orders', back_populates='serviceType_')
    orderHistory: Mapped[List['OrderHistory']] = relationship('OrderHistory', back_populates='serviceType_')