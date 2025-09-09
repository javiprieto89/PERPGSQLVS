# ========== Provinces ===========
# app/models/provinces.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.countries import Countries
    from app.models.clients import Clients
    from app.models.suppliers import Suppliers

from typing import List

from sqlalchemy import Column, Integer, Unicode, Identity, PrimaryKeyConstraint, ForeignKeyConstraint
from sqlalchemy.orm import Mapped, relationship

from app.db import Base


class Provinces(Base):
    __tablename__ = 'Provinces'
    __table_args__ = (
        ForeignKeyConstraint(
            ["CountryID"], ["Countries.CountryID"],
            name="FK__Provinces__Count__403A8C7D",
        ),
        PrimaryKeyConstraint("CountryID", "ProvinceID", name="PK_Provinces"),
    )

    CountryID = Column(Integer, primary_key=True)
    ProvinceID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    Name = Column(Unicode(100, 'Modern_Spanish_CI_AS'))

    # Relaciones
    countries_: Mapped['Countries'] = relationship('Countries', back_populates='provinces')
    clients: Mapped[List['Clients']] = relationship(
        'Clients',
        back_populates='provinces_',
        overlaps='clients,countries_'
    )
    suppliers: Mapped[List['Suppliers']] = relationship(
        'Suppliers',
        back_populates='provinces_',
        overlaps='suppliers'
    )
    