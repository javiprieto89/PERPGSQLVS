# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class ServiceType(Base):
    __tablename__ = 'ServiceType'
    __table_args__ = (
        PrimaryKeyConstraint('ServiceTypeID', name='PK_tipos_casos'),
    )

    serviceTypeID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    type = Column(Unicode(100))

    orders = relationship('Orders', back_populates='ServiceType_')
    orderHistory = relationship('OrderHistory', back_populates='ServiceType_')


