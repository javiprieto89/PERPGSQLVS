from sqlalchemy import Integer, Unicode, Boolean, PrimaryKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship, mapped_column
from typing import List, TYPE_CHECKING

if TYPE_CHECKING:    
    from .clients import Clients
    from .suppliers import Suppliers

from app.db import Base

class SysIdentityDocTypes(Base):
    __tablename__ = 'sysIdentityDocTypes'
    __table_args__ = (
        PrimaryKeyConstraint('DocTypeID', name='PK_sysIdentityDocTypes'),
    )

    DocTypeID: Mapped[int] = mapped_column(Integer, primary_key=True)
    DocTypeName: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    IsActive: Mapped[bool] = mapped_column(Boolean, server_default=text('((1))'))

    # Relaciones (no expuestas en GraphQL, solo ORM)
    clients: Mapped[List['Clients']] = relationship('Clients', back_populates='docTypes_')
    suppliers: Mapped[List['Suppliers']] = relationship('Suppliers', back_populates='docTypes_')
