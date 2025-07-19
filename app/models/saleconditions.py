# ========== SaleConditions ===========
# app/models/saleconditions.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .creditcards import CreditCards
    from .orders import Orders

from typing import List

from sqlalchemy import Column, Integer, Unicode, Date, Boolean, DECIMAL, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship
#from .creditcards import CreditCards
#from .orders import Orders
from app.db import Base


class SaleConditions(Base):
    __tablename__ = 'SaleConditions'
    __table_args__ = (
        ForeignKeyConstraint(['CreditCardID'], ['CreditCards.CreditCardID'], name='FK_SaleConditions_CreditCards'),
        PrimaryKeyConstraint('SaleConditionID', name='PK__SaleCond__22A3A655BD0A6B44')
    )

    SaleConditionID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    CreditCardID = Column(Integer)
    Name = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    DueDate = Column(Date, server_default=text('(getdate())'))
    Surcharge = Column(DECIMAL(10, 2), server_default=text('((0))'))
    IsActive = Column(Boolean, server_default=text('((1))'))

    # Relaciones
    creditCards_: Mapped['CreditCards'] = relationship('CreditCards', back_populates='saleConditions')
    orders: Mapped[List['Orders']] = relationship('Orders', back_populates='saleConditions_')
