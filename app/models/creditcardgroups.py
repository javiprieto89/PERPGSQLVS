# ========== CreditCardGroups ===========
# app/models/creditcardgroups.py
from __future__ import annotations
from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.creditcards import CreditCards
    from app.models.company import Company

from sqlalchemy import Integer, Unicode, Identity, PrimaryKeyConstraint, ForeignKeyConstraint
from sqlalchemy.orm import Mapped, relationship, foreign, mapped_column
from app.db import Base


class CreditCardGroups(Base):
    __tablename__ = 'CreditCardGroups'
    __table_args__ = (
        ForeignKeyConstraint(['CompanyID', 'CreditCardGroupID'], [
                             'CreditCardGroups.CompanyID', 'CreditCardGroups.CreditCardGroupID'], name='FK_CreditCardGroups_Company'),
        PrimaryKeyConstraint('CompanyID', 'CreditCardGroupID',
                             name='PK_CreditCardGroups'),
    )

    CompanyID: Mapped[int] = mapped_column(Integer, primary_key=True)
    CreditCardGroupID: Mapped[int] = mapped_column(
        Integer, Identity(start=1, increment=1), primary_key=True)
    GroupName: Mapped[str] = mapped_column(
        Unicode(100, 'Modern_Spanish_CI_AS'))

    # Relaciones
    creditCards: Mapped[List['CreditCards']] = relationship(
        'CreditCards',
        back_populates='creditCardGroup_',
        primaryjoin='CreditCardGroups.CompanyID == CreditCards.CompanyID',
        foreign_keys='[CreditCards.CompanyID]',
    )

    company_: Mapped['Company'] = relationship(
        'Company',
        back_populates='creditCardGroups_',
        primaryjoin='CreditCardGroups.CompanyID == Company.CompanyID',
        foreign_keys='[CreditCardGroups.CompanyID]',
    )
