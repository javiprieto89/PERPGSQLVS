# ========== SysCurrencies ==========
# app/models/syscurrencies.py
from __future__ import annotations

from typing import Optional, TYPE_CHECKING, List

from sqlalchemy import (
    Boolean,
    Identity,
    Integer,
    PrimaryKeyConstraint,
    String,
    UniqueConstraint,
    Unicode,
    text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base

if TYPE_CHECKING:
    from .bankaccounts import BankAccounts
    from .checks import Checks


class SysCurrencies(Base):
    __tablename__ = "sysCurrencies"
    __table_args__ = (
        PrimaryKeyConstraint("CurrencyID", name="PK_sysCurrency"),
        UniqueConstraint("Code", name="UQ_sysCurrencies_Code"),
    )

    CurrencyID: Mapped[int] = mapped_column(
        Integer,
        Identity(start=1, increment=1),
        nullable=False,
    )
    CurrencyName: Mapped[str] = mapped_column(
        Unicode(100, "Modern_Spanish_CI_AS"),
        nullable=False,
    )
    Symbol: Mapped[str] = mapped_column(
        Unicode(10, "Modern_Spanish_CI_AS"),
        nullable=False,
    )
    IsBase: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        server_default=text("((0))"),
    )
    IsActive: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        server_default=text("((1))"),
    )
    Code: Mapped[Optional[str]] = mapped_column(
        String(8, "Modern_Spanish_CI_AS"),
        nullable=True,
    )
    Name: Mapped[str] = mapped_column(
        String(50, "Modern_Spanish_CI_AS"),
        nullable=False,
    )

    BankAccounts: Mapped[List["BankAccounts"]] = relationship(
        "BankAccounts", back_populates="sysCurrencies"
    )
    Checks: Mapped[List["Checks"]] = relationship(
        "Checks", back_populates="sysCurrencies"
    )
