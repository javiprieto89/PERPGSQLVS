
from app.db import Base

from typing import TYPE_CHECKING, List, Optional
from sqlalchemy import BigInteger, Integer, String, ForeignKeyConstraint, PrimaryKeyConstraint, Index, Identity, Date, text, Unicode
from sqlalchemy.dialects.mssql import DATETIME2
from sqlalchemy.orm import Mapped, mapped_column, relationship
import datetime
if TYPE_CHECKING:
    from .bankaccounts import BankAccounts
    from .checks import Checks
    from .transactions import Transactions
    
class CheckMovements(Base):
    __tablename__ = 'CheckMovements'
    __table_args__ = (
        ForeignKeyConstraint(['BankAccountID'], ['BankAccounts.BankAccountID'], name='FK_CheckMovements_BankAccounts'),
        ForeignKeyConstraint(['CheckID'], ['Checks.CheckID'], name='FK_CheckMovements_Checks'),
        ForeignKeyConstraint(['CompanyID', 'BranchID', 'TransactionID'], ['Transactions.CompanyID', 'Transactions.BranchID', 'Transactions.TransactionID'], name='FK_CheckMovements_Transactions3'),
        PrimaryKeyConstraint('CheckMovementID', name='PK_CheckMovements'),
        Index('IX_CheckMovements_Check_Date', 'CheckID', 'EventDate'),
        Index('IX_CheckMovements_Company_Branch_Transaction', 'CompanyID', 'BranchID', 'TransactionID'),
        Index('IX_FK_FK_CheckMovements_BankAccounts', 'BankAccountID')
    )

    CompanyID: Mapped[int] = mapped_column(Integer)
    CheckMovementID: Mapped[int] = mapped_column(BigInteger, Identity(start=1, increment=1), primary_key=True)
    CheckID: Mapped[int] = mapped_column(BigInteger)
    EventDate: Mapped[datetime.date] = mapped_column(Date)
    EventType: Mapped[str] = mapped_column(Unicode(20, 'Modern_Spanish_CI_AS'))
    CreatedAt: Mapped[datetime.datetime] = mapped_column(DATETIME2, server_default=text('(sysutcdatetime())'))
    BankAccountID: Mapped[Optional[int]] = mapped_column(Integer)
    BranchID: Mapped[Optional[int]] = mapped_column(Integer)
    TransactionID: Mapped[Optional[int]] = mapped_column(Integer)
    Notes: Mapped[Optional[str]] = mapped_column(Unicode(200, 'Modern_Spanish_CI_AS'))

    BankAccounts_: Mapped[Optional['BankAccounts']] = relationship('BankAccounts', back_populates='CheckMovements')
    Checks_: Mapped['Checks'] = relationship('Checks', back_populates='CheckMovements')
    Transactions_: Mapped[Optional['Transactions']] = relationship('Transactions', back_populates='CheckMovements')
