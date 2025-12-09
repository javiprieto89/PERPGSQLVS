# app/models/checkmovements.py - VERSIÓN COMPLETA
# Resumen: Modelo SQLAlchemy para movimientos de cheques (CheckMovements).

from app.db import Base
from typing import TYPE_CHECKING, Optional
from sqlalchemy import (
    BigInteger, Integer, Unicode, Date, ForeignKeyConstraint,
    PrimaryKeyConstraint, Identity, Index, text
)
from sqlalchemy.dialects.mssql import DATETIME2
from sqlalchemy.orm import Mapped, mapped_column, relationship
import datetime

if TYPE_CHECKING:
    from .bankaccounts import BankAccounts
    from .checks import Checks
    from .transactions import Transactions
    from .branches import Branches
    from .company import Company


class CheckMovements(Base):
    __tablename__ = "CheckMovements"
    __table_args__ = (
        PrimaryKeyConstraint("CheckMovementID", name="PK_CheckMovements"),
        ForeignKeyConstraint(
            ["CompanyID"], ["Company.CompanyID"], name="FK_CheckMovements_Company"),
        ForeignKeyConstraint(["CheckID"], ["Checks.CheckID"],
                             name="FK_CheckMovements_Checks"),
        ForeignKeyConstraint(["BankAccountID"], [
                             "BankAccounts.BankAccountID"], name="FK_CheckMovements_BankAccounts"),
        ForeignKeyConstraint(["BranchID"], ["Branches.BranchID"],
                             name="FK_CheckMovements_Branches"),
        ForeignKeyConstraint(["TransactionID"], [
                             "Transactions.TransactionID"], name="FK_CheckMovements_Transactions"),
        Index("IX_CheckMovements_Check_Date", "CheckID", "EventDate"),
        Index("IX_CheckMovements_Company_Branch_Transaction",
              "CompanyID", "BranchID", "TransactionID"),
        Index("IX_CheckMovements_BankAccount", "BankAccountID"),
    )

    CompanyID: Mapped[int] = mapped_column(Integer, nullable=False)
    CheckMovementID: Mapped[int] = mapped_column(
        BigInteger, Identity(start=1, increment=1))
    CheckID: Mapped[int] = mapped_column(Integer, nullable=False)
    EventDate: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    EventType: Mapped[str] = mapped_column(Unicode(20), nullable=False)
    BankAccountID: Mapped[Optional[int]] = mapped_column(Integer)
    BranchID: Mapped[Optional[int]] = mapped_column(Integer)
    TransactionID: Mapped[Optional[int]] = mapped_column(Integer)
    Notes: Mapped[Optional[str]] = mapped_column(Unicode(200))
    CreatedAt: Mapped[datetime.datetime] = mapped_column(
        DATETIME2, server_default=text("(sysutcdatetime())"))

    # Relaciones
    Company_: Mapped["Company"] = relationship(
        "Company", back_populates="CheckMovements")
    Checks_: Mapped["Checks"] = relationship(
        "Checks", back_populates="CheckMovements")
    BankAccounts_: Mapped[Optional["BankAccounts"]] = relationship(
        "BankAccounts", back_populates="CheckMovements")
    Branches_: Mapped[Optional["Branches"]] = relationship(
        "Branches", back_populates="CheckMovements")
    Transactions_: Mapped[Optional["Transactions"]] = relationship(
        "Transactions", back_populates="CheckMovements")
