# app/models/bankreconciliations.py - VERSIÓN COMPLETA
# Resumen: Modelo SQLAlchemy para conciliaciones bancarias, con relaciones Company_, BankAccounts_ y Users_.

from app.db import Base
from typing import TYPE_CHECKING, Optional
from sqlalchemy import (
    BigInteger, Integer, Date, Unicode, DECIMAL, Boolean,
    ForeignKeyConstraint, PrimaryKeyConstraint, Identity, Index
)
from sqlalchemy.dialects.mssql import DATETIME2
from sqlalchemy.orm import Mapped, mapped_column, relationship
import datetime

if TYPE_CHECKING:
    from .bankaccounts import BankAccounts
    from .company import Company
    from .users import Users


class BankReconciliations(Base):
    __tablename__ = 'BankReconciliations'
    __table_args__ = (
        # Clave primaria
        PrimaryKeyConstraint('BankReconciliationID',
                             name='PK_BankReconciliations'),

        # Claves foráneas
        ForeignKeyConstraint(['CompanyID'], ['Company.CompanyID'],
                             name='FK_BankReconciliations_Company'),
        ForeignKeyConstraint(['BankAccountID'], [
                             'BankAccounts.BankAccountID'], name='FK_BankReconciliations_BankAccounts'),
        ForeignKeyConstraint(['CreatedBy'], ['Users.UserID'],
                             name='FK_BankReconciliations_Users'),

        # Índices para optimización
        Index('IX_BankReconciliations_Company_BankAccount',
              'CompanyID', 'BankAccountID'),
        Index('IX_BankReconciliations_DateRange', 'StartDate', 'EndDate'),
        Index('IX_BankReconciliations_Confirmed', 'Confirmed')
    )

    # Campos principales
    CompanyID: Mapped[int] = mapped_column(Integer, nullable=False)
    BankReconciliationID: Mapped[int] = mapped_column(
        BigInteger, Identity(start=1, increment=1))
    BankAccountID: Mapped[int] = mapped_column(Integer, nullable=False)
    StartDate: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    EndDate: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    OpeningBalance: Mapped[float] = mapped_column(
        DECIMAL(18, 2), nullable=False)
    ClosingBalance: Mapped[float] = mapped_column(
        DECIMAL(18, 2), nullable=False)
    Notes: Mapped[Optional[str]] = mapped_column(Unicode(200))
    CreatedAt: Mapped[datetime.datetime] = mapped_column(
        DATETIME2, nullable=False)
    CreatedBy: Mapped[Optional[int]] = mapped_column(Integer)
    Confirmed: Mapped[bool] = mapped_column(
        Boolean, nullable=False, default=False)
    ConfirmedAt: Mapped[Optional[datetime.datetime]] = mapped_column(DATETIME2)

    # Relaciones ORM
    Company_: Mapped['Company'] = relationship('Company', overlaps='BankReconciliations')
    BankAccounts_: Mapped['BankAccounts'] = relationship(
        'BankAccounts',
        back_populates='BankReconciliations'
    )
    Users_: Mapped[Optional['Users']] = relationship('Users')
