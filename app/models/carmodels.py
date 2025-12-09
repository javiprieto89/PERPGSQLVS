# ========== CarModels ===========
# app/models/carmodels.py
from __future__ import annotations
from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.carbrands import CarBrands
    from app.models.cars import Cars
    from app.models.company import Company

from sqlalchemy import Integer, Unicode, Identity, PrimaryKeyConstraint, ForeignKeyConstraint
from sqlalchemy.orm import Mapped, relationship, mapped_column
from app.db import Base


class CarModels(Base):
    __tablename__ = 'CarModels'
    __table_args__ = (
        ForeignKeyConstraint(['CompanyID', 'CarBrandID'], [
                             'CarBrands.CompanyID', 'CarBrands.CarBrandID'], name='FK_CarModels_CarBrands'),
        PrimaryKeyConstraint('CompanyID', 'CarBrandID',
                             'CarModelID', name='PK_CarModels')
    )

    CompanyID: Mapped[int] = mapped_column(Integer)
    CarBrandID: Mapped[int] = mapped_column(Integer)
    CarModelID: Mapped[int] = mapped_column(
        Integer, Identity(start=1, increment=1))
    CarModelName: Mapped[str] = mapped_column(
        Unicode(100, 'Modern_Spanish_CI_AS'))

    # Relaciones
    carBrand: Mapped['CarBrands'] = relationship(
        'CarBrands',
        back_populates='carModels'
    )

    cars: Mapped[List[Cars]] = relationship(
        'Cars',
        back_populates='carModels_',
        overlaps='cars'
    )

    company_: Mapped[Company] = relationship(
        'Company',
        back_populates='carModels',
        primaryjoin='CarModels.CompanyID == Company.CompanyID',
        foreign_keys='[CarModels.CompanyID]',
        overlaps='carBrand,carModels',
        viewonly=True,
    )
