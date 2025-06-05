# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class Discounts(Base):
    __tablename__ = 'Discounts'
    __table_args__ = (
        PrimaryKeyConstraint('discountID', name='PK__Discount__E43F6DF6AAF602B3'),
        Index('idx_DiscountID', 'discountID')
    )

    discountID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    discountName = Column(Unicode(100))
    percentage = Column(DECIMAL(5, 2))

    cars = relationship('Cars', back_populates='Discounts_')
    orders = relationship('Orders', back_populates='Discounts_')


