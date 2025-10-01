# ========== Taxes ===========
# app/models/taxes.py
from __future__ import annotations
import decimal

from sqlalchemy import (

    Integer,
    Unicode,
    Boolean,
    DECIMAL,
    Identity,
    PrimaryKeyConstraint,
    ForeignKeyConstraint,
    text,
)
from sqlalchemy.orm import Mapped, relationship, mapped_column

from app.db import Base

class Taxes(Base):
    __tablename__ = 'Taxes'
    __table_args__ = (
        ForeignKeyConstraint(['CountryID'], ['Countries.CountryID'], name='FK_Taxes_Countries'),
        ForeignKeyConstraint(['CountryID', 'ProvinceID'], ['Provinces.CountryID', 'Provinces.ProvinceID'], name='FK_Taxes_Provinces'),
        ForeignKeyConstraint(['CompanyID'], ['Company.CompanyID'], name='FK_Taxes_Company'),
        ForeignKeyConstraint(['BranchID'], ['Branches.BranchID'], name='FK_Taxes_Branches'),
        PrimaryKeyConstraint('CompanyID','BranchID','TaxID', name='PK_Taxes'),
    )

    CompanyID: Mapped[int] = mapped_column(Integer)
    BranchID: Mapped[int] = mapped_column(Integer)
    TaxID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1))
    CountryID: Mapped[int] = mapped_column(Integer)
    ProvinceID: Mapped[int] = mapped_column(Integer)
    TaxName: Mapped[str] = mapped_column(Unicode(50, 'Modern_Spanish_CI_AS'), nullable=False)
    TaxPercent: Mapped[decimal.Decimal] = mapped_column(DECIMAL(5, 2), nullable=False)
    IsActive: Mapped[bool] = mapped_column(Boolean, server_default=text('((1))'), nullable=False)
