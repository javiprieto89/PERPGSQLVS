
from app.db import Base
from typing import TYPE_CHECKING, List, Optional
from sqlalchemy import Boolean, Integer, String, ForeignKeyConstraint, PrimaryKeyConstraint, Index, Identity, text
from sqlalchemy.orm import Mapped, mapped_column, relationship
if TYPE_CHECKING:
    from .banks import Banks
    from .syscurrencies import SysCurrencies
    from .bankreconciliations import BankReconciliations
    from .banktransactions import BankTransactions
    from .checkmovements import CheckMovements
    
class BankAccounts(Base):
    __tablename__ = 'BankAccounts'
    __table_args__ = (
        ForeignKeyConstraint(['BankID'], ['Banks.BankID'], name='FK_BankAccounts_Banks'),
        ForeignKeyConstraint(['CurrencyID'], ['sysCurrencies.CurrencyID'], name='FK_BankAccounts_Currencies'),
        PrimaryKeyConstraint('BankAccountID', name='PK__BankAcco__4FC8E741DC7098A4'),
        Index('IX_FK_FK_BankAccounts_Banks', 'BankID'),
        Index('IX_FK_FK_BankAccounts_Currencies', 'CurrencyID'),
        Index('UQ__BankAcco__D675B09BF181EA6F', 'CompanyID', 'AccountNumber', unique=True)
    )

    CompanyID: Mapped[int] = mapped_column(Integer)
    BankAccountID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    BankID: Mapped[int] = mapped_column(Integer)
    AccountNumber: Mapped[str] = mapped_column(String(50, 'Modern_Spanish_CI_AS'))
    CurrencyID: Mapped[int] = mapped_column(Integer)
    IsActive: Mapped[bool] = mapped_column(Boolean, server_default=text('((1))'))
    Alias: Mapped[Optional[str]] = mapped_column(String(80, 'Modern_Spanish_CI_AS'))

    Banks_: Mapped['Banks'] = relationship('Banks', back_populates='BankAccounts')
    sysCurrencies: Mapped['SysCurrencies'] = relationship('SysCurrencies', back_populates='BankAccounts')
    BankReconciliations: Mapped[List['BankReconciliations']] = relationship('BankReconciliations', back_populates='BankAccounts_')
    BankTransactions: Mapped[List['BankTransactions']] = relationship('BankTransactions', back_populates='BankAccounts_')
    CheckMovements: Mapped[List['CheckMovements']] = relationship('CheckMovements', back_populates='BankAccounts_')
