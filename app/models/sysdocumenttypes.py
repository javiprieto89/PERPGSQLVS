# ========== SysDocumentTypes ===========
# app/models/sysdocumenttypes.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .documents import Documents
    from .orders import Orders

from typing import List

from sqlalchemy import Integer, Unicode, Identity, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, relationship, mapped_column
#from .documents import Documents
#from .orders import Orders 
from app.db import Base

class SysDocumentTypes(Base):
    __tablename__ = 'SysDocumentTypes'
    __table_args__ = (
        PrimaryKeyConstraint('DocumentTypeID', name='PK__Document__DBA390C10019FEFA'),
    )

    DocumentTypeID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    Name: Mapped[str] = mapped_column(Unicode(50, 'Modern_Spanish_CI_AS'))

    # Relaciones
    documents: Mapped[List['Documents']] = relationship('Documents', back_populates='sysDocumentTypes_')
    orders: Mapped[List['Orders']] = relationship('Orders', back_populates='sysDocumentTypes_')
