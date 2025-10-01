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

from sqlalchemy import (

    Integer,
    Unicode,
    Boolean,
    Identity,
    PrimaryKeyConstraint,
    ForeignKeyConstraint,
)
from sqlalchemy.orm import Mapped, relationship, mapped_column
from app.db import Base

class Cars(Base):
    __tablename__ = 'Cars'
    __table_args__ = (
        ForeignKeyConstraint(["CompanyID","ClientID"], ["Clients.CompanyID","Clients.ClientID"], name="FK_Cars_Clients"),
        ForeignKeyConstraint(["CompanyID","DiscountID"], ["Discounts.CompanyID","Discounts.DiscountID"], name="FK_Cars_Discounts"),
        ForeignKeyConstraint(["CompanyID"], ["Company.CompanyID"], name="FK_Cars_Company"),
        ForeignKeyConstraint(["CompanyID","CarBrandID","CarModelID"], ["CarModels.CompanyID","CarModels.CarBrandID","CarModels.CarModelID"], name="FK_Cars_CarModels"),
        PrimaryKeyConstraint("CompanyID","CarID", name="PK_Cars")
    )

    CompanyID: Mapped[int] = mapped_column(Integer)
    CarID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1))
    BranchID: Mapped[int] = mapped_column(Integer)
    CarBrandID: Mapped[int] = mapped_column(Integer)
    CarModelID: Mapped[int] = mapped_column(Integer)
    ClientID: Mapped[int] = mapped_column(Integer)
    LicensePlate: Mapped[str] = mapped_column(Unicode(20, 'Modern_Spanish_CI_AS'))
    DiscountID: Mapped[int] = mapped_column(Integer)
    Year: Mapped[int] = mapped_column(Integer)
    LastServiceMileage: Mapped[int] = mapped_column(Integer)
    IsDebtor: Mapped[bool] = mapped_column(Boolean)

    # Relaciones
    carModels_: Mapped[CarModels] = relationship('CarModels', back_populates='cars')
    clients_: Mapped[Clients] = relationship(
        'Clients',
        back_populates='cars',
        overlaps='carModels_,cars'
    )
    discounts_: Mapped[Discounts] = relationship(
        'Discounts',
        back_populates='cars',
        overlaps='carModels_,cars,clients_'
    )
    orders: Mapped[List[Orders]] = relationship('Orders', back_populates='cars_')
    orderHistory: Mapped[List[OrderHistory]] = relationship('OrderHistory', back_populates='cars_')
