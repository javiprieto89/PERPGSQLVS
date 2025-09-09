# ========== Brands ===========
# app/models/brands.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.items import Items
    from app.models.companydata import CompanyData 

from typing import List

from sqlalchemy import (
    Column,
    Integer,
    Unicode,
    Boolean,
    Identity,
    PrimaryKeyConstraint,
    ForeignKeyConstraint,
    text,
)
from sqlalchemy.orm import Mapped, relationship, foreign
from app.db import Base


class Brands(Base):
    __tablename__ = 'Brands'
    __table_args__ = (
        ForeignKeyConstraint(["CompanyID"], ["CompanyData.CompanyID"], name="FK_Brands_Company"),
        PrimaryKeyConstraint("BrandID", name="PK__Brands__DAD4F3BEC807F89F"),
    )

    BrandID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    Name = Column(Unicode(100, "Modern_Spanish_CI_AS"))
    IsActive = Column(Boolean, nullable=False, server_default=text("((1))"))
    CompanyID = Column(Integer)

    # Relaciones
    items: Mapped[List['Items']] = relationship('Items', back_populates='brands_')
    companyData_: Mapped['CompanyData'] = relationship(
        'CompanyData', 
        back_populates='brands',
        primaryjoin='Brands.CompanyID == CompanyData.CompanyID',
        foreign_keys='[Brands.CompanyID]'
    )

