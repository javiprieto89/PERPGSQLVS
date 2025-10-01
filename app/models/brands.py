# ========== Brands ===========
# app/models/brands.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.items import Items
    from app.models.company import Company

from typing import List

from sqlalchemy import (

    Integer,
    Unicode,
    Boolean,
    Identity,
    PrimaryKeyConstraint,
    ForeignKeyConstraint,
    text,
)
from sqlalchemy.orm import Mapped, relationship, foreign, mapped_column
from app.db import Base

class Brands(Base):
    __tablename__ = 'Brands'
    __table_args__ = (
        ForeignKeyConstraint(
            ["CompanyID"], ["Company.CompanyID"], name="FK_Brands_Company"),
        PrimaryKeyConstraint("CompanyID", "BrandID", name="PK_Brands"),
    )

    CompanyID: Mapped[int] = mapped_column(Integer)
    BrandID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1))
    BrandName: Mapped[str] = mapped_column(Unicode(100, "Modern_Spanish_CI_AS"))
    IsActive: Mapped[bool] = mapped_column(Boolean, nullable=False, server_default=text("((1))"))

    # Relaciones
    items: Mapped[List['Items']] = relationship(
        'Items',
        back_populates='brands_',
        overlaps='items'
    )
    company_: Mapped['Company'] = relationship(
        'Company',
        back_populates='brands',
        primaryjoin='Brands.CompanyID == Company.CompanyID',
        foreign_keys='[Brands.CompanyID]',
        viewonly=True
    )
