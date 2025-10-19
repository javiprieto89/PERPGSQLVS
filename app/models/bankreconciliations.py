
from app.db import Base

from typing import TYPE_CHECKING, List, Optional
from sqlalchemy import BigInteger, Integer, ForeignKeyConstraint, PrimaryKeyConstraint, Index, Identity, DECIMAL, Date, text, Unicode
from sqlalchemy.dialects.mssql import DATETIME2
from sqlalchemy.orm import Mapped, mapped_column, relationship
import datetime
import decimal
if TYPE_CHECKING:
    from .bankaccounts import BankAccounts
    
class BankReconciliations(Base):
    __tablename__ = 'BankReconciliations'
    __table_args__ = (
        ForeignKeyConstraint(['BankAccountID'], ['BankAccounts.BankAccountID'], name='FK_BankReconciliations_BankAccounts'),
        PrimaryKeyConstraint('ReconciliationID', name='PK__BankReco__096DC8603585FA30'),
        Index('IX_FK_FK_BankReconciliations_BankAccounts', 'BankAccountID')
    )

    ReconciliationID: Mapped[int] = mapped_column(BigInteger, Identity(start=1, increment=1), primary_key=True)
    CompanyID: Mapped[int] = mapped_column(Integer)
    BankAccountID: Mapped[int] = mapped_column(Integer)
    StatementDate: Mapped[datetime.date] = mapped_column(Date)
    ClosingBalance: Mapped[decimal.Decimal] = mapped_column(DECIMAL(18, 2))
    CreatedAt: Mapped[datetime.datetime] = mapped_column(DATETIME2, server_default=text('(sysutcdatetime())'))
    Notes: Mapped[Optional[str]] = mapped_column(Unicode(200, 'Modern_Spanish_CI_AS'))

    BankAccounts_: Mapped['BankAccounts'] = relationship('BankAccounts', back_populates='BankReconciliations')

