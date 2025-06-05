# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class Roles(Base):
    __tablename__ = 'Roles'
    __table_args__ = (
        PrimaryKeyConstraint('RoleID', name='PK__Roles__8AFACE3A6B39B353'),
    )

    roleID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    roleName = Column(Unicode(50))

    userAccess = relationship('UserAccess', back_populates='Roles_')


