# app/models/sysdoctypes.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING, List

if TYPE_CHECKING:
    from .clients import Clients
    from .suppliers import Suppliers

from sqlalchemy import Integer, Unicode, Boolean, Identity, PrimaryKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship, mapped_column
from app.db import Base

class SysDocTypes(Base):
    __tablename__ = 'SysDocTypes'
    __table_args__ = (
        PrimaryKeyConstraint('DocTypeID', name='PK__SysDocTypes__055E26832A8E0FF3'),
    )

    DocTypeID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    Name: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    IsActive: Mapped[bool] = mapped_column(Boolean, server_default=text('((1))'))

    # Relaciones deshabilitadas (tabla legacy sin FKs hacia Clients/Suppliers en el schema actual)
    # Mantener el modelo por compatibilidad, sin relaciones que requieran join automático.
    
