
from app.db import Base

from typing import TYPE_CHECKING, List, Optional, Set
from sqlalchemy import Boolean, Integer, PrimaryKeyConstraint, String, Index, Identity, text
from sqlalchemy.orm import Mapped, mapped_column, relationship
if TYPE_CHECKING:
    from .bankaccounts import BankAccounts
    from .checks import Checks
    
class Banks(Base):
    __tablename__ = 'Banks'
    __table_args__ = (
        PrimaryKeyConstraint('BankID', name='PK__Banks__AA08CB337179F1C4'),
        Index('UQ__Banks__737584F67BACF61F', 'Name', unique=True)
    )

    BankID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    Name: Mapped[str] = mapped_column(String(120, 'Modern_Spanish_CI_AS'))
    IsActive: Mapped[bool] = mapped_column(Boolean, server_default=text('((1))'))

    BankAccounts: Mapped[List['BankAccounts']] = relationship('BankAccounts', back_populates='Banks_')
    Checks: Mapped[List['Checks']] = relationship('Checks', back_populates='Banks_')