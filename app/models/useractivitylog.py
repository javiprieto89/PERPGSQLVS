# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class UserActivityLog(Base):
    __tablename__ = 'UserActivityLog'
    __table_args__ = (
        ForeignKeyConstraint(['UserActionID'], ['UserActions.UserActionID'], name='FK_UserActivityLog_UserActions'),
        ForeignKeyConstraint(['UserID'], ['Users.UserID'], name='FK__UserActiv__UserI__3A4CA8FD'),
        PrimaryKeyConstraint('ActivityID', name='PK__UserActi__45F4A7F1A8CAACBC')
    )

    activityID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    userID = Column(Integer)
    userActionID = Column(Integer)
    timestamp = Column(DateTime, server_default=text('(getdate())'))

    userActions_ = relationship('UserActions', back_populates='UserActivityLog')
    users_ = relationship('Users', back_populates='UserActivityLog')


