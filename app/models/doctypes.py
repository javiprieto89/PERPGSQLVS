# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class DocTypes(Base):
    __tablename__ = 'DocTypes'
    __table_args__ = (
        PrimaryKeyConstraint('docTypeID', name='PK__DocTypes__055E26832A8E0FF3'),
    )

    docTypeID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    name = Column(Unicode(100))
    isActive = Column(Boolean, server_default=text('((1))'))

    clients = relationship('Clients', back_populates='DocTypes_')
    suppliers = relationship('Suppliers', back_populates='DocTypes_')


