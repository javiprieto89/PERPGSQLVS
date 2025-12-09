
from app.db import Base

from typing import TYPE_CHECKING, List, Optional
from sqlalchemy import BigInteger, Boolean, Integer, String, ForeignKeyConstraint, PrimaryKeyConstraint, Index, Identity, DECIMAL, Date, text, Unicode
from sqlalchemy.dialects.mssql import DATETIME2
from sqlalchemy.orm import Mapped, mapped_column, relationship
import datetime
import decimal
if TYPE_CHECKING:
    from .banks import Banks
    from .checkstatuses import CheckStatuses
    from .syscurrencies import SysCurrencies
    from .company import Company
    from .checkmovements import CheckMovements


class Checks(Base):
    __tablename__ = 'Checks'
    __table_args__ = (
        ForeignKeyConstraint(['CompanyID'], ['Company.CompanyID'],
                             name='FK_Checks_Company'),
        ForeignKeyConstraint(['BankID'], ['Banks.BankID'],
                             name='FK_Checks_Banks'),
        ForeignKeyConstraint(['CheckStatusID'], [
                             'CheckStatuses.CheckStatusID'], name='FK_Checks_CheckStatuses'),
        ForeignKeyConstraint(
            ['CurrencyID'], ['sysCurrencies.CurrencyID'], name='FK_Checks_Currencies'),
        PrimaryKeyConstraint('CheckID', name='PK_Checks'),
        Index('IX_FK_FK_Checks_Banks', 'BankID'),
        Index('IX_FK_FK_Checks_Currencies', 'CurrencyID'),
        Index('UX_Checks_Company_Number', 'CompanyID', 'Number', unique=True)
    )

    CompanyID: Mapped[int] = mapped_column(Integer)
    CheckID: Mapped[int] = mapped_column(
        BigInteger, Identity(start=1, increment=1), primary_key=True)
    Number: Mapped[str] = mapped_column(String(30, 'Modern_Spanish_CI_AS'))
    CurrencyID: Mapped[int] = mapped_column(Integer)
    Amount: Mapped[decimal.Decimal] = mapped_column(DECIMAL(18, 2))
    IssueDate: Mapped[datetime.date] = mapped_column(Date)
    StatusAt: Mapped[datetime.datetime] = mapped_column(
        DATETIME2, server_default=text('(sysutcdatetime())'))
    CreatedAt: Mapped[datetime.datetime] = mapped_column(
        DATETIME2, server_default=text('(sysutcdatetime())'))
    BankID: Mapped[Optional[int]] = mapped_column(Integer)
    DueDate: Mapped[Optional[datetime.date]] = mapped_column(Date)
    DrawerName: Mapped[Optional[str]] = mapped_column(
        Unicode(120, 'Modern_Spanish_CI_AS'))
    HolderName: Mapped[Optional[str]] = mapped_column(
        Unicode(120, 'Modern_Spanish_CI_AS'))
    CheckStatusID: Mapped[Optional[int]] = mapped_column(Integer)

    company_: Mapped['Company'] = relationship('Company', back_populates='checks')
    Banks_: Mapped[Optional['Banks']] = relationship('Banks', back_populates='checks')
    CheckStatuses_: Mapped[Optional['CheckStatuses']
                           ] = relationship('CheckStatuses', back_populates='Checks')
    sysCurrencies: Mapped['SysCurrencies'] = relationship('SysCurrencies', back_populates='Checks')
    CheckMovements: Mapped[List['CheckMovements']] = relationship(
        'CheckMovements', back_populates='Checks_')
