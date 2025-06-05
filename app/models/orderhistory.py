# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class OrderHistory(Base):
    __tablename__ = 'OrderHistory'
    __table_args__ = (
        ForeignKeyConstraint(['branchID'], ['Branches.branch_id'], name='FK__OrderHist__Branc__1DB06A4F'),
        ForeignKeyConstraint(['carID'], ['Cars.car_id'], name='FK__OrderHist__CarID__2180FB33'),
        ForeignKeyConstraint(['clientID'], ['Suppliers.supplierID'], name='FK__OrderHist__Clien__208CD6FA'),
        ForeignKeyConstraint(['companyID'], ['CompanyData.company_id'], name='FK__OrderHist__Compa__1EA48E88'),
        ForeignKeyConstraint(['orderID'], ['Orders.orderID'], name='FK__OrderHist__Order__1F98B2C1'),
        ForeignKeyConstraint(['serviceTypeID'], ['ServiceType.serviceTypeID'], name='FK_OrderHistory_ServiceType'),
        PrimaryKeyConstraint('OrderHistoryID', name='PK__OrderHis__4D7B4ADD5AAE57F2')
    )

    orderHistoryID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    companyID = Column(Integer)
    branchID = Column(Integer)
    orderID = Column(Integer)
    clientID = Column(Integer)
    date_ = Column('Date', DateTime, server_default=text('(getdate())'))
    carID = Column(Integer)
    serviceTypeID = Column(Integer)
    mileage = Column(Integer)
    nextServiceMileage = Column(Integer)
    subtotal = Column(DECIMAL(10, 2))
    total = Column(DECIMAL(10, 2))
    status = Column(Unicode(50))
    comments = Column(Unicode(500))

    branches_ = relationship('Branches', back_populates='OrderHistory')
    cars_ = relationship('Cars', back_populates='OrderHistory')
    suppliers_ = relationship('Suppliers', back_populates='OrderHistory')
    companyData_ = relationship('CompanyData', back_populates='OrderHistory')
    orders_ = relationship('Orders', back_populates='OrderHistory')
    serviceType_ = relationship('ServiceType', back_populates='OrderHistory')
    orderHistoryDetails = relationship('OrderHistoryDetails', back_populates='OrderHistory_')


