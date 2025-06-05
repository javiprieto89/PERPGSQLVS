# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text, Column
from sqlalchemy.orm import relationship
from app.db import Base

class CarBrands(Base):
    __tablename__ = 'CarBrands'
    __table_args__ = (
        PrimaryKeyConstraint('car_brand_id', name='PK__CarBrand__3EAE0B29835BF1AC'),
    )

    car_brand_id = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    name = Column(Unicode(100))

    car_models = relationship('CarModels', back_populates='car_brands')


