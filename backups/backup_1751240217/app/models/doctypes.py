# ========== DocTypes ===========
# app/models/doctypes.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .clients import Clients 
    from .suppliers import Suppliers  

from typing import List

from sqlalchemy import Column, Integer, Unicode, Boolean, Identity, PrimaryKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship
#from .clients import Clients
#from .suppliers import Suppliers
from app.db import Base


class DocTypes(Base):
    __tablename__ = 'DocTypes'
    __table_args__ = (
        PrimaryKeyConstraint('DocTypeID', name='PK__DocTypes__055E26832A8E0FF3'),
    )

    DocTypeID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    Name = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    IsActive = Column(Boolean, server_default=text('((1))'))

    # Relaciones
    clients: Mapped[List['Clients']] = relationship('Clients', back_populates='docTypes_')
    suppliers: Mapped[List['Suppliers']] = relationship('Suppliers', back_populates='docTypes_')