# ========== Countries ===========
# app/models/countries.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from provinces import Provinces  # Assuming Provinces is defined in provinces.py
    from clients import Clients  # Assuming Clients is defined in clients.py
    from suppliers import Suppliers  # Assuming Suppliers is defined in suppliers.py

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
    clients: Mapped[List['Clients']] = relationship('Clients', back_populates='countries_')
    suppliers: Mapped[List['Suppliers']] = relationship('Suppliers', back_populates='countries_')