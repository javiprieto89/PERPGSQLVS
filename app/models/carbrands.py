# ========== CarBrands ===========
# app/models/carbrands.py
from __future__ import annotations
from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.carmodels import CarModels

from sqlalchemy import (

    Integer,
    Unicode,
    Identity,
    PrimaryKeyConstraint,
    ForeignKeyConstraint,
)
from sqlalchemy.orm import Mapped, relationship, mapped_column
from app.db import Base

class CarBrands(Base):
    __tablename__ = 'CarBrands'
    __table_args__ = (
        ForeignKeyConstraint(["CompanyID"], ["Company.CompanyID"], name="FK_CarBrands_Company"),
        PrimaryKeyConstraint("CompanyID","CarBrandID", name="PK_CarBrands"),
    )

    CompanyID: Mapped[int] = mapped_column(Integer)
    CarBrandID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1))
    CarBrandName: Mapped[str] = mapped_column(Unicode(100, "Modern_Spanish_CI_AS"))

    # Relaciones
    carModels: Mapped[List["CarModels"]] = relationship(
        "CarModels", back_populates="carBrand"
    )
