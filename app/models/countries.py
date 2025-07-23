# ========== Countries ===========
# app/models/countries.py
from __future__ import annotations
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.provinces import Provinces
    from app.models.clients import Clients
    from app.models.suppliers import Suppliers

from typing import List

from sqlalchemy import Column, Integer, Unicode, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, relationship

from app.db import Base


class Countries(Base):
    __tablename__ = 'Countries'
    __table_args__ = (
        PrimaryKeyConstraint('CountryID', name='PK__Countrie__10D160BFBD00A82C'),
    )

    CountryID = Column(Integer, primary_key=True)
    Name = Column(Unicode(100, 'Modern_Spanish_CI_AS'))

    # Relaciones
    provinces: Mapped[List['Provinces']] = relationship('Provinces', back_populates='countries_')
    clients: Mapped[List['Clients']] = relationship(
        'Clients',
        back_populates='countries_',
        primaryjoin='Clients.CountryID == Countries.CountryID',
        foreign_keys='Clients.CountryID',
    )
    suppliers: Mapped[List['Suppliers']] = relationship(
        'Suppliers',
        back_populates='countries_',
        primaryjoin='Suppliers.CountryID == Countries.CountryID',
        foreign_keys='Suppliers.CountryID',
    )
