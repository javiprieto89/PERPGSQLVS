# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class Provinces(Base):
    __tablename__ = 'Provinces'
    __table_args__ = (
        ForeignKeyConstraint(['CountryID'], ['Countries.CountryID'], name='FK__Provinces__Count__403A8C7D'),
        PrimaryKeyConstraint('ProvinceID', name='PK__Province__FD0A6FA3062273F9')
    )

    provinceID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    countryID = Column(Integer)
    name = Column(Unicode(100))

    countries_ = relationship('Countries', back_populates='Provinces')
    clients = relationship('Clients', back_populates='Provinces_')
    suppliers = relationship('Suppliers', back_populates='Provinces_')


