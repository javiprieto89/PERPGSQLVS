# ========== SysUserActions ===========
# app/models/sys/useractions.py
from __future__ import annotations
from typing import TYPE_CHECKING, List

if TYPE_CHECKING:
    from ..useractivitylog import UserActivityLog

from sqlalchemy import Column, Integer, Unicode, Identity, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, relationship
from app.db import Base


class SysUserActions(Base):
    __tablename__ = 'sysUserActions'
    __table_args__ = (
        PrimaryKeyConstraint('UserActionID', name='PK_sysUserActions'),
    )

    UserActionID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    ActionName = Column(Unicode(100, 'Modern_Spanish_CI_AS'), nullable=False)

    # Relaciones (solo lectura)
    userActivityLog: Mapped[List['UserActivityLog']] = relationship('UserActivityLog', back_populates='sysUserActions_')


__all__ = ["SysUserActions"]
