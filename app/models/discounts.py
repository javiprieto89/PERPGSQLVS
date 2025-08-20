# ========== Discounts ===========
# app/models/discounts.py
from __future__ import annotations
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .cars import Cars
    from .orders import Orders
    from .companydata import CompanyData

from typing import List

from sqlalchemy import (
    Column,
    Integer,
    Unicode,
    DECIMAL,
    Identity,
    PrimaryKeyConstraint,
    Index,
    ForeignKeyConstraint,
)
from sqlalchemy.orm import Mapped, relationship
from app.db import Base


class Discounts(Base):
    __tablename__ = 'Discounts'
    __table_args__ = (
        ForeignKeyConstraint(
            ['CompanyID'], ['CompanyData.CompanyID'], name='FK_Discounts_CompanyData'
        ),
        PrimaryKeyConstraint('DiscountID', name='PK__Discount__E43F6DF6AAF602B3'),
        Index('idx_discountID', 'DiscountID'),
    )

    DiscountID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    CompanyID = Column(Integer)
    DiscountName = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Percentage = Column(DECIMAL(5, 2))

    # Relaciones
    companyData_: Mapped['CompanyData'] = relationship('CompanyData')
