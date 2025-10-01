# ========== Vendors ===========
# app/models/vendors.py
from __future__ import annotations
import decimal
from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.clients import Clients
    from app.models.orders import Orders

from sqlalchemy import Integer, Unicode, DECIMAL, Boolean, Identity, PrimaryKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship, mapped_column
from app.db import Base

class Vendors(Base):
    __tablename__ = 'Vendors'
    __table_args__ = (
        PrimaryKeyConstraint('CompanyID','VendorID', name='PK_Vendors'),
    )

    CompanyID: Mapped[int] = mapped_column(Integer, primary_key=True)
    VendorID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    VendorName: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Commission: Mapped[decimal.Decimal] = mapped_column(DECIMAL(18, 4))
    IsActive: Mapped[bool] = mapped_column(Boolean, server_default=text('((1))'))

    # Relaciones
    clients: Mapped[List['Clients']] = relationship(
        'Clients',
        back_populates='vendors_',
        overlaps='branches_,clients,clients'
    )
    orders: Mapped[List['Orders']] = relationship(
        'Orders',
        back_populates='vendors_',
        overlaps='clients_,orders', viewonly=True
    )
