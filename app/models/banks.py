# app/models/banks.py - VERSIÓN COMPLETA
# Resumen: Modelo SQLAlchemy para Banks con relaciones a Company y BankAccounts

from __future__ import annotations
from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.company import Company
    from app.models.bankaccounts import BankAccounts
    from app.models.checks import Checks

from sqlalchemy import Integer, String, Boolean, Identity, ForeignKeyConstraint, PrimaryKeyConstraint, text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db import Base


class Banks(Base):
    __tablename__ = 'Banks'
    __table_args__ = (
        ForeignKeyConstraint(
            ['CompanyID'], ['Company.CompanyID'], name='FK_Banks_Company'),
        PrimaryKeyConstraint('CompanyID', 'BankID', name='PK_Banks'),
    )

    CompanyID: Mapped[int] = mapped_column(Integer, nullable=False)
    BankID: Mapped[int] = mapped_column(
        Integer, Identity(start=1, increment=1))
    Name: Mapped[str] = mapped_column(
        String(120, 'Modern_Spanish_CI_AS'), nullable=False)
    IsActive: Mapped[bool] = mapped_column(
        Boolean, server_default=text('((1))'))

    # Relaciones
    company_: Mapped['Company'] = relationship(
        'Company',
        back_populates='banks',
        overlaps='banks'
    )

    bankaccounts: Mapped[List['BankAccounts']] = relationship(
        'BankAccounts',
        back_populates='Banks_'
    )
    checks: Mapped[List['Checks']] = relationship(
        'Checks',
        back_populates='Banks_'
    )
