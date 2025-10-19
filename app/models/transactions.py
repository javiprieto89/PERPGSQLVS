# app/models/transactions.py
from __future__ import annotations

import datetime
import decimal
from typing import Optional, TYPE_CHECKING, List

from sqlalchemy import (
    Integer,
    Unicode,
    DateTime,
    DECIMAL,
    Identity,
    PrimaryKeyConstraint,
    ForeignKeyConstraint,
    Index,
    text,
)
from sqlalchemy.orm import Mapped, relationship, mapped_column

from app.db import Base

if TYPE_CHECKING:
    from .branches import Branches
    from .banktransactions import BankTransactions
    from .checkmovements import CheckMovements


class Transactions(Base):
    __tablename__ = "Transactions"
    __table_args__ = (
        ForeignKeyConstraint(
            ["CompanyID", "BranchID"],
            ["Branches.CompanyID", "Branches.BranchID"],
            name="FK_Transactions_Branches",
        ),
        PrimaryKeyConstraint("TransactionID", name="PK__Transact__55433A4BB5EE9535"),
        Index("idx_clientID_Transactions", "ClientID"),
        Index("idx_supplierID", "SupplierID"),
        Index("idx_TransactionDate", "TransactionDate"),
    )

    TransactionID: Mapped[int] = mapped_column(
        Integer, Identity(start=1, increment=1), primary_key=True
    )
    CompanyID: Mapped[int] = mapped_column(Integer)
    BranchID: Mapped[int] = mapped_column(Integer)
    TransactionDate: Mapped[datetime.datetime] = mapped_column(
        DateTime, server_default=text("(getdate())")
    )
    TransacTypeID: Mapped[int] = mapped_column(Integer)
    ClientID: Mapped[int] = mapped_column(Integer)
    SupplierID: Mapped[int] = mapped_column(Integer)
    OrderID: Mapped[int] = mapped_column(Integer)
    Subtotal: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 2))
    Taxes: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 2))
    Total: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 2))
    Notes: Mapped[str] = mapped_column(Unicode(200, "Modern_Spanish_CI_AS"))

    branches_: Mapped[Optional["Branches"]] = relationship(
        "Branches", back_populates="transactions"
    )
    BankTransactions: Mapped[List["BankTransactions"]] = relationship(
        "BankTransactions", back_populates="Transactions_"
    )
    CheckMovements: Mapped[List["CheckMovements"]] = relationship(
        "CheckMovements", back_populates="Transactions_"
    )
