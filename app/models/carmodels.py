# ========== CarModels ===========
# app/models/carmodels.py
from __future__ import annotations
from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.carbrands import CarBrands
    from app.models.cars import Cars

from sqlalchemy import Column, Integer, Unicode, Identity, PrimaryKeyConstraint, ForeignKeyConstraint
from sqlalchemy.orm import Mapped, relationship
from app.db import Base


class CarModels(Base):
    __tablename__ = 'CarModels'
    __table_args__ = (
        ForeignKeyConstraint(['CarBrandID'], ['CarBrands.CarBrandID'], name='FK__CarModels__CarBr__5441852A'),
        PrimaryKeyConstraint('CarModelID', name='PK__CarModel__C585C36F707AD8EA')
    )

    CarModelID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    CarBrandID = Column(Integer)
    Model = Column(Unicode(100, 'Modern_Spanish_CI_AS'))

    # Relaciones
    carBrand: Mapped['CarBrands'] = relationship('CarBrands', back_populates='carModels')
    cars: Mapped[List[Cars]] = relationship('Cars', back_populates='carModels_')

