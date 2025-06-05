# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class UserActions(Base):
    __tablename__ = 'UserActions'
    __table_args__ = (
        PrimaryKeyConstraint('UserActionID', name='PK_UserActions'),
    )

    userActionID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    actionName = Column(Unicode(100))

    userActivityLog = relationship('UserActivityLog', back_populates='UserActions_')


