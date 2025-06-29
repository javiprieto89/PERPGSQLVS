# ========== OrderStatus ===========
# app/models/orderstatus.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .orders import Orders

from typing import List

from sqlalchemy import Column, Integer, Unicode, Identity, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, relationship

from app.db import Base


class OrderStatus(Base):
    __tablename__ = 'OrderStatus'
    __table_args__ = (
        PrimaryKeyConstraint('OrderstatusID', name='PK__OrderSta__BC674F4170B3E561'),
    )

    OrderstatusID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    Status = Column(Unicode(50, 'Modern_Spanish_CI_AS'))

    # Relaciones
    orders: Mapped[List['Orders']] = relationship('Orders', foreign_keys='[Orders.OrderstatusID]', back_populates='orderStatus_')
    orders_: Mapped[List['Orders']] = relationship('Orders', foreign_keys='[Orders.StatusID]', back_populates='orderStatus1')
