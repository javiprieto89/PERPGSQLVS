# ========== Discounts ===========
# app/models/discounts.py
from __future__ import annotations
import decimal
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .cars import Cars
    from .orders import Orders
    from .company import Company

from typing import List

from sqlalchemy import Integer, Unicode, DECIMAL, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, Index
from sqlalchemy.orm import Mapped, relationship, mapped_column
from app.db import Base

class Discounts(Base):
    __tablename__ = 'Discounts'
    __table_args__ = (
        ForeignKeyConstraint(
            ['CompanyID'], ['Company.CompanyID'], name='FK_Discounts_Company'),
        PrimaryKeyConstraint('CompanyID', 'DiscountID', name='PK_Discounts'),
        Index('idx_discountID', 'DiscountID')
    )

    CompanyID: Mapped[int] = mapped_column(Integer, primary_key=True)
    DiscountID: Mapped[int] = mapped_column(Integer, Identity( start=1, increment=1), primary_key=True)
    DiscountName: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Percentage: Mapped[decimal.Decimal] = mapped_column(DECIMAL(5, 2))

    # Relaciones
    cars: Mapped[List['Cars']] = relationship(
        'Cars',
        back_populates='discounts_',
        overlaps='carModels_,cars'
    )
    orders: Mapped[List['Orders']] = relationship(
        'Orders',
        back_populates='discounts_',
        overlaps='orders', viewonly=True
    )
    company_: Mapped['Company'] = relationship(
        'Company',
        back_populates='discounts',
        primaryjoin='foreign(Discounts.CompanyID) == Company.CompanyID',
        foreign_keys='Discounts.CompanyID',
    )
