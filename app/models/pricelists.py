# Auto-generado. Revisar imports si faltan.
from typing import List, Optional
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class PriceLists(Base):
    __tablename__ = 'PriceLists'
    __table_args__ = (
        PrimaryKeyConstraint('PriceListID', name='PK__PriceLis__1E30F34C58783DD3'),
    )

    priceListID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    name = Column(Unicode(100))
    isActive = Column(Boolean, server_default=text('((1))'))
    description = Column(Unicode(250))
    createdDate = Column(Date, server_default=text('(CONVERT([date],getdate()))'))

    clients = relationship('Clients', back_populates='PriceLists_')
    orders = relationship('Orders', back_populates='PriceLists_')
    priceListItems = relationship('PriceListItems', back_populates='PriceLists_')
    tempOrderDetails = relationship('TempOrderDetails', back_populates='PriceLists_')


