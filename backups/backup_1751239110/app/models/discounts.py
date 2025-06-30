# ========== Discounts ===========
# app/models/discounts.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .cars import Cars
    from .orders import Orders

from typing import List

from sqlalchemy import Column, Integer, Unicode, DECIMAL, Identity, PrimaryKeyConstraint, Index
from sqlalchemy.orm import Mapped, relationship
from app.db import Base


class Discounts(Base):
    __tablename__ = 'Discounts'
    __table_args__ = (
        PrimaryKeyConstraint('DiscountID', name='PK__Discount__E43F6DF6AAF602B3'),
        Index('idx_discountID', 'DiscountID')
    )

    DiscountID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    DiscountName = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Percentage = Column(DECIMAL(5, 2))

    # Relaciones
    cars: Mapped[List['Cars']] = relationship('Cars', back_populates='discounts_')
    orders: Mapped[List['Orders']] = relationship('Orders', back_populates='discounts_')