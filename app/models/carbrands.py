# ========== CarBrands ===========
# app/models/carbrands.py
from __future__ import annotations
from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.carmodels import CarModels

from sqlalchemy import (
    Column,
    Integer,
    Unicode,
    Identity,
    PrimaryKeyConstraint,
    ForeignKeyConstraint,
)
from sqlalchemy.orm import Mapped, relationship
from app.db import Base


class CarBrands(Base):
    __tablename__ = 'CarBrands'
    __table_args__ = (
        ForeignKeyConstraint(
            ["CompanyID"], ["CompanyData.CompanyID"], name="FK_CarBrands_Company"
        ),
        PrimaryKeyConstraint(
            "CarBrandID", name="PK__CarBrand__3EAE0B29835BF1AC"),
    )

    CarBrandID = Column(Integer, Identity(
        start=1, increment=1), primary_key=True)
    Name = Column(Unicode(100, "Modern_Spanish_CI_AS"))
    CompanyID = Column(Integer)
