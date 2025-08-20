# ========== SysDocTypes ===========
# app/models/sys/doctypes.py
from __future__ import annotations
from typing import TYPE_CHECKING, List

if TYPE_CHECKING:
    from ..clients import Clients
    from ..suppliers import Suppliers

from sqlalchemy import Column, Integer, Unicode, Boolean, Identity, PrimaryKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship
from app.db import Base


class SysDocTypes(Base):
    __tablename__ = 'sysDocTypes'
    __table_args__ = (
        PrimaryKeyConstraint('DocTypeID', name='PK__SysDocTypes__055E26832A8E0FF3'),
    )

    DocTypeID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    Name = Column(Unicode(100, 'Modern_Spanish_CI_AS'), nullable=False)
    IsActive = Column(Boolean, nullable=False, server_default=text('((1))'))

    # Relaciones (solo lectura)
    clients: Mapped[List['Clients']] = relationship('Clients', back_populates='docTypes_')
    suppliers: Mapped[List['Suppliers']] = relationship('Suppliers', back_populates='docTypes_')


__all__ = ["SysDocTypes"]
