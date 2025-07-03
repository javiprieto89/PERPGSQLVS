# ========== Brands ===========
# app/models/brands.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.items import Items

from typing import List

from sqlalchemy import Column, Integer, Unicode, Identity, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, relationship
from app.db import Base


class Brands(Base):
    __tablename__ = 'Brands'
    __table_args__ = (
        PrimaryKeyConstraint('BrandID', name='PK__Brands__DAD4F3BEC807F89F'),
    )

    BrandID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    Name = Column(Unicode(100, 'Modern_Spanish_CI_AS'))

    # Relaciones
    items: Mapped[List['Items']] = relationship('Items', back_populates='brands_')