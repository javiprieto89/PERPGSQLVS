# ========== SysDocumentTypes ===========
# app/models/sys/documenttypes.py
from __future__ import annotations
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from ..documents import Documents
    from ..orders import Orders

from typing import List
from sqlalchemy import Column, Integer, Unicode, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, relationship
from app.db import Base


class SysDocumentTypes(Base):
    __tablename__ = 'sysDocumentTypes'
    __table_args__ = (
        PrimaryKeyConstraint('DocumentTypeID', name='PK__Document__DBA390C10019FEFA'),
    )

    DocumentTypeID = Column(Integer, primary_key=True)
    Name = Column(Unicode(100, 'Modern_Spanish_CI_AS'), nullable=False)

    # Relaciones (solo lectura)
    documents: Mapped[List['Documents']] = relationship('Documents', back_populates='sysDocumentTypes_')
    orders: Mapped[List['Orders']] = relationship('Orders', back_populates='sysDocumentTypes_')


__all__ = ["SysDocumentTypes"]
