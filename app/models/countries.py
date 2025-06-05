# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class Countries(Base):
    __tablename__ = 'Countries'
    __table_args__ = (
        PrimaryKeyConstraint('countryID', name='PK__Countrie__10D160BFBD00A82C'),
    )

    countryID = Column(Integer, primary_key=True)
    name = Column(Unicode(100))

    provinces = relationship('Provinces', back_populates='Countries_')
    clients = relationship('Clients', back_populates='Countries_')
    suppliers = relationship('Suppliers', back_populates='Countries_')


