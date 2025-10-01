# ========== Roles ===========
# app/models/roles.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .userapermissions import UserPermissions
from typing import List

from sqlalchemy import Integer, Unicode, Identity, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, relationship, mapped_column

from app.db import Base

class Roles(Base):
    __tablename__ = 'Roles'
    __table_args__ = (
        PrimaryKeyConstraint('RoleID', name='PK__Roles__8AFACE3A6B39B353'),
    )

    RoleID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    RoleName: Mapped[str] = mapped_column(Unicode(50, 'Modern_Spanish_CI_AS'))

    # Relaciones
    userPermissions: Mapped[List['UserPermissions']] = relationship(
        'UserPermissions', back_populates='roles_')
