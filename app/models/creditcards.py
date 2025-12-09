# ========== CreditCards ===========
# app/models/creditcards.py
from __future__ import annotations
import decimal
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.creditcardgroups import CreditCardGroups
    from app.models.company import Company
    from app.models.saleconditions import SaleConditions

from typing import List

from sqlalchemy import Integer, Unicode, Boolean, DECIMAL, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship, foreign, mapped_column

from app.db import Base


class CreditCards(Base):
    __tablename__ = 'CreditCards'
    __table_args__ = (
        ForeignKeyConstraint(['CompanyID', 'CreditCardGroupID'], [
                             'CreditCardGroups.CompanyID', 'CreditCardGroups.CreditCardGroupID'], name='FK_CreditCards_CardGroups'),
        PrimaryKeyConstraint('CompanyID', 'CreditCardID',
                             name='PK_CreditCards')
    )

    CompanyID: Mapped[int] = mapped_column(Integer, primary_key=True)
    CreditCardID: Mapped[int] = mapped_column(
        Integer, Identity(start=1, increment=1), primary_key=True)
    CardName: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    CreditCardGroupID: Mapped[int] = mapped_column(Integer)
    IsActive: Mapped[bool] = mapped_column(
        Boolean, server_default=text('((1))'))
    Surcharge: Mapped[decimal.Decimal] = mapped_column(
        DECIMAL(18, 4), server_default=text('((0))'))
    Installments: Mapped[int] = mapped_column(Integer)

    # Relaciones
    creditCardGroup_: Mapped['CreditCardGroups'] = relationship(
        'CreditCardGroups',
        back_populates='creditCards',
    )

    saleConditions: Mapped[List['SaleConditions']] = relationship(
        'SaleConditions',
        back_populates='creditCards_'
    )

    company_: Mapped['Company'] = relationship(
        'Company',
        back_populates='creditCards_',
        primaryjoin='CreditCards.CompanyID == Company.CompanyID',
        foreign_keys='[CreditCards.CompanyID]',
        overlaps='company_',
        viewonly=True,
    )
