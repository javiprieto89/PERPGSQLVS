# ========== CreditCards ===========
# app/models/creditcards.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.creditcardgroups import CreditCardGroups
    from app.models.saleconditions import SaleConditions

from typing import List

from sqlalchemy import Column, Integer, Unicode, Boolean, DECIMAL, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship

from app.db import Base


class CreditCards(Base):
    __tablename__ = 'CreditCards'
    __table_args__ = (
        ForeignKeyConstraint(['CreditCardGroupID'], ['CreditCardGroups.CreditCardGroupID'], name='FK_CreditCards_CardGroups'),
        PrimaryKeyConstraint('CreditCardID', name='PK_CreditCards')
    )

    CreditCardID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    CardName = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    CreditCardGroupID = Column(Integer)
    IsActive = Column(Boolean, server_default=text('((1))'))
    Surcharge = Column(DECIMAL(18, 4), server_default=text('((0))'))
    Installments = Column(Integer)

    # Relaciones
    creditCardGroups_: Mapped['CreditCardGroups'] = relationship('CreditCardGroups', back_populates='creditCards')
    saleConditions: Mapped[List['SaleConditions']] = relationship('SaleConditions', back_populates='creditCards_')

