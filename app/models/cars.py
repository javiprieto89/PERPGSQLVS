# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text, Column
from sqlalchemy.orm import relationship
from app.db import Base

class Cars(Base):
    __tablename__ = 'cars'
    __table_args__ = (
        ForeignKeyConstraint(['car_model_id'], ['CarModels.car_model_id'], name='FK__cars__car_model_id__571DF1D5'),
        ForeignKeyConstraint(['client_id'], ['Clients.client_id'], name='FK_cars_clients'),
        ForeignKeyConstraint(['discount_id'], ['Discounts.discount_id'], name='FK_cars_discounts'),
        PrimaryKeyConstraint('car_id', name='PK__cars__68A0340E0C926E4D')
    )

    car_id = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    car_model_id = Column(Integer)
    client_id = Column(Integer)
    license_plate = Column(Unicode(20))
    discount_id = Column(Integer)
    year = Column(Integer)
    last_service_mileage = Column(Integer)
    is_debtor = Column(Boolean)

    car_model = relationship('CarModels', back_populates='cars')
    client = relationship('Clients', back_populates='cars')
    discount = relationship('Discounts', back_populates='cars')
    orders = relationship('Orders', back_populates='car')
    order_history = relationship('OrderHistory', back_populates='car')


