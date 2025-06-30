# ========== Vendors ===========
# app/models/vendors.py
from __future__ import annotations
from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.clients import Clients

from sqlalchemy import Column, Integer, Unicode, DECIMAL, Boolean, Identity, PrimaryKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship
from app.db import Base

class Vendors(Base):
    __tablename__ = 'Vendors'
    __table_args__ = (
        PrimaryKeyConstraint('VendorID', name='PK_Vendors'),
    )

    VendorID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    VendorName = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Commission = Column(DECIMAL(18, 4))
    IsActive = Column(Boolean, server_default=text('((1))'))

    # Relaciones
    clients: Mapped[List['Clients']] = relationship('Clients', back_populates='vendors_')

    