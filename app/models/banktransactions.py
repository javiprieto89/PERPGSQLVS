
from unittest.mock import Base

from app.db import Base
from typing import TYPE_CHECKING, List, Optional
from sqlalchemy import BigInteger, Integer, ForeignKeyConstraint, PrimaryKeyConstraint, Index, Identity, DECIMAL, Date, text, Unicode
from sqlalchemy.dialects.mssql import DATETIME2
from sqlalchemy.orm import Mapped, mapped_column, relationship
import datetime
import decimal
if TYPE_CHECKING:
    from .bankaccounts import BankAccounts
    from .transactions import Transactions
    
class BankTransactions(Base):
    __tablename__ = 'BankTransactions'
    __table_args__ = (
        ForeignKeyConstraint(['BankAccountID'], ['BankAccounts.BankAccountID'], name='FK_BankTransactions_BankAccounts'),
        ForeignKeyConstraint(['CompanyID', 'BranchID', 'TransactionID'], ['Transactions.CompanyID', 'Transactions.BranchID', 'Transactions.TransactionID'], name='FK_BankTransactions_Transactions3'),
        PrimaryKeyConstraint('BankTrnID', name='PK__BankTran__A28896C080423939'),
        Index('IX_BankTransactions_Account_Date', 'CompanyID', 'BankAccountID', 'TrnDate'),
        Index('IX_BankTransactions_Company_Branch_Transaction', 'CompanyID', 'BranchID', 'TransactionID'),
        Index('IX_FK_FK_BankTransactions_BankAccounts', 'BankAccountID')
    )

    CompanyID: Mapped[int] = mapped_column(Integer)
    BankTrnID: Mapped[int] = mapped_column(BigInteger, Identity(start=1, increment=1), primary_key=True)
    BankAccountID: Mapped[int] = mapped_column(Integer)
    TrnDate: Mapped[datetime.date] = mapped_column(Date)
    AmountDr: Mapped[decimal.Decimal] = mapped_column(DECIMAL(18, 2), server_default=text('((0))'))
    AmountCr: Mapped[decimal.Decimal] = mapped_column(DECIMAL(18, 2), server_default=text('((0))'))
    TransactionID: Mapped[int] = mapped_column(Integer)
    CreatedAt: Mapped[datetime.datetime] = mapped_column(DATETIME2, server_default=text('(sysutcdatetime())'))
    BranchID: Mapped[int] = mapped_column(Integer)
    Description: Mapped[Optional[str]] = mapped_column(Unicode(200, 'Modern_Spanish_CI_AS'))
    ReconciliationID: Mapped[Optional[int]] = mapped_column(BigInteger)

    BankAccounts_: Mapped['BankAccounts'] = relationship('BankAccounts', back_populates='BankTransactions')
    Transactions_: Mapped['Transactions'] = relationship('Transactions', back_populates='BankTransactions')