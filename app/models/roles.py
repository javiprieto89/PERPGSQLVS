# ========== Roles ===========
# app/models/roles.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .useraccess import UserAccess  
from typing import List

from sqlalchemy import Column, Integer, Unicode, Identity, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, relationship

from app.db import Base


class Roles(Base):
    __tablename__ = 'Roles'
    __table_args__ = (
        PrimaryKeyConstraint('RoleID', name='PK__Roles__8AFACE3A6B39B353'),
    )

    RoleID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    RoleName = Column(Unicode(50, 'Modern_Spanish_CI_AS'))

    # Relaciones
    user_access: Mapped[List['UserAccess']] = relationship('UserAccess', back_populates='roles_')