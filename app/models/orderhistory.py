# ========== OrderHistory ===========
# app/models/orderhistory.py
from __future__ import annotations
import datetime
import decimal
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .branches import Branches
    from .cars import Cars
    from .suppliers import Suppliers
    from .company import Company
    from .orders import Orders
    from .servicetype import ServiceTypes
    from .users import Users
    from .orderhistorydetails import OrderHistoryDetails

from typing import List, Optional

from sqlalchemy import Integer, Unicode, Boolean, DateTime, DECIMAL, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship, mapped_column

from app.db import Base

class OrderHistory(Base):
    __tablename__ = 'OrderHistories'
    __table_args__ = (
        ForeignKeyConstraint(
            ["CompanyID", "BranchID"],
            ["Branches.CompanyID", "Branches.BranchID"],
            name='FK__OrderHist__Branc__1DB06A4F'
        ),
        ForeignKeyConstraint(['CarID'], ['Cars.CarID'],
                             name='FK__OrderHist__carID__2180FB33'),
        ForeignKeyConstraint(
            ['ClientID'], ['Suppliers.SupplierID'], name='FK__OrderHist__Clien__208CD6FA'),
        ForeignKeyConstraint(
            ['CompanyID'], ['Company.CompanyID'], name='FK_OrderHistory_Company'),
        ForeignKeyConstraint(['OrderID'], ['Orders.OrderID'],
                             name='FK__OrderHist__Order__1F98B2C1'),
        ForeignKeyConstraint(['CompanyID', 'ServiceTypeID'], [
                             'ServiceTypes.CompanyID', 'ServiceTypes.ServiceTypeID'], name='FK_OrderHistory_ServiceTypes'),
        ForeignKeyConstraint(['UserID'], ['Users.UserID'],
                             name='FK_OrderHistory_Users'),
        PrimaryKeyConstraint(
            'OrderHistoryID', name='PK__OrderHis__4D7B4ADD5AAE57F2')
    )

    OrderHistoryID: Mapped[int] = mapped_column(Integer, Identity( start=1, increment=1), primary_key=True)
    CompanyID: Mapped[int] = mapped_column(Integer)
    BranchID: Mapped[int] = mapped_column(Integer)
    OrderID: Mapped[int] = mapped_column(Integer)
    ClientID: Mapped[int] = mapped_column(Integer)
    UserID: Mapped[int] = mapped_column(Integer)
    Date_: Mapped[datetime.datetime] = mapped_column('EventDate', DateTime, server_default=text('(getdate())'))
    CarID: Mapped[int] = mapped_column(Integer)
    ServiceTypeID: Mapped[int] = mapped_column(Integer)
    Mileage: Mapped[int] = mapped_column(Integer)
    NextServiceMileage: Mapped[int] = mapped_column(Integer)
    Subtotal: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 2))
    Total: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 2))
    Status: Mapped[str] = mapped_column(Unicode(50, 'Modern_Spanish_CI_AS'))
    Comments: Mapped[str] = mapped_column(Unicode(500, 'Modern_Spanish_CI_AS'))

    # Relaciones
    branches_: Mapped['Branches'] = relationship(
        'Branches',
        back_populates='orderHistory',
        overlaps='orderHistory'
    )
    cars_: Mapped[Optional['Cars']] = relationship(
        'Cars', back_populates='orderHistory')
    suppliers_: Mapped['Suppliers'] = relationship(
        'Suppliers', back_populates='orderHistory')
    company_: Mapped['Company'] = relationship(
        'Company',
        back_populates='orderHistory',
        overlaps='branches_,orderHistory',
        viewonly=True
    )
    orders_: Mapped['Orders'] = relationship(
        'Orders', back_populates='orderHistory')
    serviceType_: Mapped[Optional['ServiceTypes']] = relationship(
        'ServiceTypes',
        back_populates='orderHistory',
        overlaps='branches_,orderHistory,orderHistory'
    )
    users_: Mapped['Users'] = relationship(
        'Users', back_populates='orderHistory')
    orderHistoryDetails: Mapped[List['OrderHistoryDetails']] = relationship(
        'OrderHistoryDetails',
        back_populates='orderHistory_',
        overlaps='orderHistoryDetails'
    )
