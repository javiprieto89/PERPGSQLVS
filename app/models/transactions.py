# ========== Transactions ===========
# app/models/transactions.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .branches import Branches

from sqlalchemy import Column, Integer, Unicode, DateTime, DECIMAL, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, Index, text
from sqlalchemy.orm import Mapped, relationship
from app.db import Base


class Transactions(Base):
    __tablename__ = 'Transactions'
    __table_args__ = (
        # AGREGAR: Foreign Key a Branches
        ForeignKeyConstraint(['BranchID'], ['Branches.BranchID'], name='FK_Transactions_Branches'),
        PrimaryKeyConstraint('TransactionID', name='PK__Transact__55433A4BB5EE9535'),
        Index('idx_clientID_Transactions', 'ClientID'),
        Index('idx_supplierID', 'SupplierID'),
        Index('idx_TransactionDate', 'TransactionDate')
    )

    TransactionID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    CompanyID = Column(Integer)
    BranchID = Column(Integer)
    TransactionDate = Column(DateTime, server_default=text('(getdate())'))
    TransacTypeID = Column(Integer)
    ClientID = Column(Integer)
    SupplierID = Column(Integer)
    OrderID = Column(Integer)
    Subtotal = Column(DECIMAL(10, 2))
    Taxes = Column(DECIMAL(10, 2))
    Total = Column(DECIMAL(10, 2))
    Notes = Column(Unicode(200, 'Modern_Spanish_CI_AS'))

    # Relación con Branches - debe llamarse branches_ para coincidir con back_populates
    branches_: Mapped[Optional['Branches']] = relationship('Branches', back_populates='transactions')