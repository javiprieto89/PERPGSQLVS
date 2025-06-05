# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class OrderStatus(Base):
    __tablename__ = 'OrderStatus'
    __table_args__ = (
        PrimaryKeyConstraint('OrderStatusID', name='PK__OrderSta__BC674F4170B3E561'),
    )

    orderStatusID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    status = Column(Unicode(50))

    orders = relationship('Orders', foreign_keys='[Orders.OrderStatusID]', back_populates='OrderStatus_')
    orders_ = relationship('Orders', foreign_keys='[Orders.StatusID]', back_populates='OrderStatus1')


