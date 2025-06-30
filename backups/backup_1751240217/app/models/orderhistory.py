# ========== OrderHistory ===========
# app/models/orderhistory.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .branches  import Branches
    from .cars import Cars
    from .suppliers import Suppliers
    from .companydata import CompanyData
    from .orders import Orders
    from .serviceType import ServiceType
    from .users import Users
    from .orderhistorydetails import OrderHistoryDetails

from typing import List, Optional

from sqlalchemy import Column, Integer, Unicode, Boolean, DateTime, DECIMAL, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship

from app.db import Base


class OrderHistory(Base):
    __tablename__ = 'OrderHistory'
    __table_args__ = (
        ForeignKeyConstraint(['BranchID'], ['Branches.BranchID'], name='FK__OrderHist__Branc__1DB06A4F'),
        ForeignKeyConstraint(['CarID'], ['Cars.CarID'], name='FK__OrderHist__carID__2180FB33'),
        ForeignKeyConstraint(['ClientID'], ['Suppliers.SupplierID'], name='FK__OrderHist__Clien__208CD6FA'),
        ForeignKeyConstraint(['CompanyID'], ['CompanyData.CompanyID'], name='FK__OrderHist__Compa__1EA48E88'),
        ForeignKeyConstraint(['OrderID'], ['Orders.OrderID'], name='FK__OrderHist__Order__1F98B2C1'),
        ForeignKeyConstraint(['ServiceTypeID'], ['ServiceType.ServiceTypeID'], name='FK_OrderHistory_ServiceType'),
        ForeignKeyConstraint(['UserID'], ['Users.UserID'], name='FK_OrderHistory_Users'),
        PrimaryKeyConstraint('OrderHistoryID', name='PK__OrderHis__4D7B4ADD5AAE57F2')
    )

    OrderHistoryID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    CompanyID = Column(Integer)
    BranchID = Column(Integer)
    OrderID = Column(Integer)
    ClientID = Column(Integer)
    UserID = Column(Integer)
    Date_ = Column('Date', DateTime, server_default=text('(getdate())'))
    CarID = Column(Integer)
    ServiceTypeID = Column(Integer)
    Mileage = Column(Integer)
    NextServiceMileage = Column(Integer)
    Subtotal = Column(DECIMAL(10, 2))
    Total = Column(DECIMAL(10, 2))
    Status = Column(Unicode(50, 'Modern_Spanish_CI_AS'))
    Comments = Column(Unicode(500, 'Modern_Spanish_CI_AS'))

    # Relaciones
    branches_: Mapped['Branches'] = relationship('Branches', back_populates='orderHistory')
    cars_: Mapped[Optional['Cars']] = relationship('Cars', back_populates='orderHistory')
    suppliers_: Mapped['Suppliers'] = relationship('Suppliers', back_populates='orderHistory')
    companyData_: Mapped['CompanyData'] = relationship('CompanyData', back_populates='orderHistory')
    orders_: Mapped['Orders'] = relationship('Orders', back_populates='orderHistory')
    serviceType_: Mapped[Optional['ServiceType']] = relationship('ServiceType', back_populates='orderHistory')
    users_: Mapped['Users'] = relationship('Users', back_populates='orderHistory')
    orderHistoryDetails: Mapped[List['OrderHistoryDetails']] = relationship('OrderHistoryDetails', back_populates='orderHistory_')