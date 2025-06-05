# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text, Column
from sqlalchemy.orm import relationship
from app.db import Base

class Brands(Base):
    __tablename__ = 'Brands'
    __table_args__ = (
        PrimaryKeyConstraint('brand_id', name='PK__Brands__DAD4F3BEC807F89F'),
    )

    brand_id = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    name = Column(Unicode(100))

    items = relationship('Items', back_populates='brand')


