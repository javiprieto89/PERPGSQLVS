# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text, Column
from sqlalchemy.orm import relationship
from app.db import Base

class CarModels(Base):
    __tablename__ = 'CarModels'
    __table_args__ = (
        ForeignKeyConstraint(['car_brand_id'], ['CarBrands.car_brand_id'], name='FK__CarModels__CarBr__5441852A'),
        PrimaryKeyConstraint('car_model_id', name='PK__CarModel__C585C36F707AD8EA')
    )

    car_model_id = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    car_brand_id = Column(Integer)
    model = Column(Unicode(100))

    car_brand = relationship('CarBrands', back_populates='car_models')
    cars = relationship('Cars', back_populates='car_model')


