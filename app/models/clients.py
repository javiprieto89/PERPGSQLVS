# Auto-generado. Revisar imports si faltan.
from typing import List, Optional
from sqlalchemy import Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text, Column
from sqlalchemy.orm import relationship
from app.db import Base

class Clients(Base):
    __tablename__ = 'Clients'
    __table_args__ = (
        ForeignKeyConstraint(['countryID'], ['Countries.countryID'], name='FK_Clients_Countries'),
        ForeignKeyConstraint(['docTypeID'], ['DocTypes.docTypeID'], name='FK_Clients_DocTypes'),
        ForeignKeyConstraint(['priceListID'], ['PriceLists.priceListID'], name='FK_Clients_PriceLists'),
        ForeignKeyConstraint(['provinceID'], ['Provinces.provinceID'], name='FK_Clients_Provinces'),
        ForeignKeyConstraint(['vendorID'], ['Vendors.vendorID'], name='FK_Clients_Vendors'),
        PrimaryKeyConstraint('clientID', name='PK__Clients__E67E1A048D5F930D')
    )

    clientID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    docTypeID = Column(Integer)
    firstName = Column(Unicode(100))
    isActive = Column(Boolean, server_default=text('((1))'))
    countryID = Column(Integer)
    provinceID = Column(Integer)
    priceListID = Column(Integer)
    vendorID = Column(Integer, server_default=text('((1))'))
    docNumber = Column(Unicode(50))
    lastName = Column(Unicode(100))
    phone = Column(Unicode(20))
    email = Column(Unicode(100))
    address = Column(Unicode(200))
    city = Column(Unicode(100))
    postalCode = Column(Unicode(20))

    country = relationship('Countries', back_populates='clients')
    doc_type = relationship('DocTypes', back_populates='clients')
    price_list = relationship('PriceLists', back_populates='clients')
    province = relationship('Provinces', back_populates='clients')
    vendor = relationship('Vendors', back_populates='clients')
    account_balances = relationship('AccountBalances', back_populates='client')
    cars = relationship('Cars', back_populates='client')
    orders = relationship('Orders', back_populates='client')
    transactions = relationship('Transactions', back_populates='client')


