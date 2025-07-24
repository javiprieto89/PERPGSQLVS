# ========== SysOrderStatus ===========
# app/models/sysorderstatus.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .orders import Orders

from typing import List

from sqlalchemy import Column, Integer, Unicode, Identity, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, relationship

from app.db import Base


class SysOrderStatus(Base):  # <--- nombre de la clase
    # Mantener el nombre de la tabla igual al que referencia Orders
    __tablename__ = 'SysOrderStatus'
    __table_args__ = (
        PrimaryKeyConstraint('OrderStatusID', name='PK__OrderSta__BC674F4170B3E561'),
    )

    OrderStatusID = Column('OrderStatusID', Integer, Identity(start=1, increment=1), primary_key=True)
    Status = Column(Unicode(50, 'Modern_Spanish_CI_AS'))

    # Relaciones
    orders: Mapped[List['Orders']] = relationship('Orders', foreign_keys='Orders.OrderStatusID', back_populates='orderStatus_')
