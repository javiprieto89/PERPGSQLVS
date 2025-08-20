# ========== SysOrderStatus ===========
# app/models/sys/orderstatus.py
from __future__ import annotations
from typing import TYPE_CHECKING, List

if TYPE_CHECKING:
    from ..orders import Orders

from sqlalchemy import Column, Integer, Unicode, Identity, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, relationship
from app.db import Base


class SysOrderStatus(Base):
    __tablename__ = 'sysOrderStatus'
    __table_args__ = (
        PrimaryKeyConstraint('OrderStatusID', name='PK__OrderSta__BC674F4170B3E561'),
    )

    OrderStatusID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    Status = Column(Unicode(50, 'Modern_Spanish_CI_AS'), nullable=False)

    # Relaciones (solo lectura)
    orders: Mapped[List['Orders']] = relationship('Orders', foreign_keys='Orders.OrderStatusID', back_populates='orderStatus_')


__all__ = ["SysOrderStatus"]
