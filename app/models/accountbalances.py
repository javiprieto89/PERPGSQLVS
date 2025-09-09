# ========== AccountBalances ===========
# app/models/accountbalances.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.clients import Clients
    from app.models.suppliers import Suppliers

from sqlalchemy import Column, Integer, DECIMAL, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship
from app.db import Base


class AccountBalances(Base):
    __tablename__ = 'AccountBalances'
    __table_args__ = (
        ForeignKeyConstraint(['ClientID'], ['Clients.ClientID'], name='FK__AccountBa__Clien__3F115E1A'),
        ForeignKeyConstraint(['SupplierID'], ['Suppliers.SupplierID'], name='FK__AccountBa__Suppl__3E1D39E1'),
        PrimaryKeyConstraint('AccountID', name='PK__AccountB__349DA5866875C1B5')
    )

    AccountID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    Balance = Column(DECIMAL(10, 2), server_default=text('((0))'))
    SupplierID = Column(Integer)
    ClientID = Column(Integer)

    # Relaciones
    clients_: Mapped[Optional['Clients']] = relationship('Clients', back_populates='accountBalances')
    suppliers_: Mapped[Optional['Suppliers']] = relationship('Suppliers', back_populates='accountBalances')
    