# ========== Taxes ===========
# app/models/taxes.py
from __future__ import annotations

from sqlalchemy import (
    Column,
    Integer,
    Unicode,
    Boolean,
    DECIMAL,
    Identity,
    PrimaryKeyConstraint,
    ForeignKeyConstraint,
    text,
)
from sqlalchemy.orm import Mapped, relationship

from app.db import Base


class Taxes(Base):
    __tablename__ = 'Taxes'
    __table_args__ = (
        ForeignKeyConstraint(['CountryID'], ['Countries.CountryID'], name='FK_Taxes_Countries'),
        ForeignKeyConstraint(['CountryID', 'ProvinceID'], ['Provinces.CountryID', 'Provinces.ProvinceID'], name='FK_Taxes_Provinces'),
        ForeignKeyConstraint(['CompanyID'], ['CompanyData.CompanyID'], name='FK_Taxes_Company'),
        PrimaryKeyConstraint('TaxID', name='PK__Taxes__711BE08C21750481'),
    )

    TaxID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    CountryID = Column(Integer)
    ProvinceID = Column(Integer)
    TaxName = Column(Unicode(50, 'Modern_Spanish_CI_AS'), nullable=False)
    TaxPercent = Column(DECIMAL(5, 2), nullable=False)
    IsActive = Column(Boolean, server_default=text('((1))'), nullable=False)
    CompanyID = Column(Integer)
