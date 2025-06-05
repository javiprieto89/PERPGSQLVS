# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Boolean, Column, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class Vendors(Base):
    __tablename__ = 'Vendors'
    __table_args__ = (
        PrimaryKeyConstraint('vendorID', name='PK_Vendors'),
    )

    vendorID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    vendorName = Column(Unicode(100))
    commission = Column(DECIMAL(18, 4))
    isActive = Column(Boolean, server_default=text('((1))'))

    clients = relationship('Clients', back_populates='vendor')


