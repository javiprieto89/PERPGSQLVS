# ========== UserActivityLog ===========
# app/models/useractivitylog.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .sysuseractions import SysUserActions
    from .users import Users

from typing import List

from sqlalchemy import Column, Integer, DateTime, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship
#from .sysuseractions import SysUserActions
#from .users import Users
from app.db import Base


class UserActivityLog(Base):
    __tablename__ = 'UserActivityLog'
    __table_args__ = (
        ForeignKeyConstraint(['UserActionID'], ['sysUserActions.UserActionID'], name='FK_UserActivityLog_sysUserActions'),
        ForeignKeyConstraint(['UserID'], ['Users.UserID'], name='FK__UserActiv__UserI__3A4CA8FD'),
        PrimaryKeyConstraint('ActivityID', name='PK__UserActi__45F4A7F1A8CAACBC')
    )

    ActivityID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    UserID = Column(Integer)
    UserActionID = Column(Integer)
    Timestamp = Column(DateTime, server_default=text('(getdate())'))

    # Relaciones
    sysUserActions_: Mapped['SysUserActions'] = relationship('SysUserActions', back_populates='userActivityLog')
    users_: Mapped['Users'] = relationship('Users', back_populates='userActivityLog')
    