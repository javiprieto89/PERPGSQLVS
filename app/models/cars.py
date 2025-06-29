# ========== Cars ===========
# app/models/cars.py
from __future__ import annotations
from typing import List, Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.carmodels import CarModels
    from app.models.clients import Clients
    from app.models.discounts import Discounts
    from app.models.orders import Orders
    from app.models.orderhistory import OrderHistory

from sqlalchemy import Column, Integer, Unicode, Boolean, Identity, PrimaryKeyConstraint, ForeignKeyConstraint
from sqlalchemy.orm import Mapped, relationship
from app.db import Base


class Cars(Base):
    __tablename__ = 'Cars'
    __table_args__ = (
        ForeignKeyConstraint(['CarModelID'], ['CarModels.CarModelID'], name='FK__Cars__carModelID__571DF1D5'),
        ForeignKeyConstraint(['ClientID'], ['Clients.ClientID'], name='FK_Cars_Clients'),
        ForeignKeyConstraint(['DiscountID'], ['Discounts.DiscountID'], name='FK_Cars_Discounts'),
        PrimaryKeyConstraint('CarID', name='PK__Cars__68A0340E0C926E4D')
    )

    CarID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    CarModelID = Column(Integer)
    ClientID = Column(Integer)
    LicensePlate = Column(Unicode(20, 'Modern_Spanish_CI_AS'))
    DiscountID = Column(Integer)
    Year = Column(Integer)
    LastServiceMileage = Column(Integer)
    IsDebtor = Column(Boolean)

    # Relaciones
    carModels_: Mapped[CarModels] = relationship('CarModels', back_populates='cars')
    clients_: Mapped[Clients] = relationship('Clients', back_populates='cars')
    discounts_: Mapped[Discounts] = relationship('Discounts', back_populates='cars')
    orders: Mapped[List[Orders]] = relationship('Orders', back_populates='cars_')
    orderHistory: Mapped[List[OrderHistory]] = relationship('OrderHistory', back_populates='cars_')
