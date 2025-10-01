# ========== SaleConditions ===========
# app/models/saleconditions.py
from __future__ import annotations
import datetime
import decimal
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .creditcards import CreditCards
    from .orders import Orders

from typing import List

from sqlalchemy import Integer, Unicode, Date, Boolean, DECIMAL, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship, mapped_column
#from .creditcards import CreditCards
#from .orders import Orders
from app.db import Base

class SaleConditions(Base):
    __tablename__ = 'SaleConditions'
    __table_args__ = (
        ForeignKeyConstraint(['CompanyID','CreditCardID'], ['CreditCards.CompanyID','CreditCards.CreditCardID'], name='FK_SaleConditions_CreditCards'),
        PrimaryKeyConstraint('CompanyID','SaleConditionID', name='PK_SaleConditions')
    )

    CompanyID: Mapped[int] = mapped_column(Integer, primary_key=True)
    SaleConditionID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    CreditCardID: Mapped[int] = mapped_column(Integer)
    Name: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    DueDate: Mapped[datetime.date] = mapped_column(Date, server_default=text('(getdate())'))
    Surcharge: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 2), server_default=text('((0))'))
    IsActive: Mapped[bool] = mapped_column(Boolean, server_default=text('((1))'))

    # Relaciones
    creditCards_: Mapped['CreditCards'] = relationship('CreditCards', back_populates='saleConditions')
    orders: Mapped[List['Orders']] = relationship(
        'Orders',
        back_populates='saleConditions_',
        overlaps='clients_,discounts_,orders,priceLists_,serviceType_,users_', viewonly=True
    )
