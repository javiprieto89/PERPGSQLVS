# ========== CreditCardGroups ===========
# app/models/creditcardgroups.py
from __future__ import annotations
from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.creditcards import CreditCards

from sqlalchemy import Column, Integer, Unicode, Identity, PrimaryKeyConstraint, ForeignKeyConstraint
from sqlalchemy.orm import Mapped, relationship
from app.db import Base


class CreditCardGroups(Base):
    __tablename__ = 'CreditCardGroups'
    __table_args__ = (
        ForeignKeyConstraint(['CompanyID'], ['CompanyData.CompanyID'], name='FK_CreditCardGroups_CompanyData'),
        PrimaryKeyConstraint('CreditCardGroupID', name='PK_CreditCardGroups'),
    )

    CreditCardGroupID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    CompanyID = Column(Integer)
    GroupName = Column(Unicode(100, 'Modern_Spanish_CI_AS'))

    # Relaciones
    creditCards: Mapped[List[CreditCards]] = relationship('CreditCards', back_populates='creditCardGroups_')
