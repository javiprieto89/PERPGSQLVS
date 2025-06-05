# Auto-generado. Revisar imports si faltan.
from typing import List, Optional
from sqlalchemy import Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text, Column
from sqlalchemy.orm import relationship
from app.db import Base

class Orders(Base):
    __tablename__ = 'Orders'
    __table_args__ = (
        ForeignKeyConstraint(['branchID'], ['Branches.branch_id'], name='FK__Orders__BranchID__01142BA1'),
        ForeignKeyConstraint(['carID'], ['Cars.car_id'], name='FK__Orders__CarID__02FC7413'),
        ForeignKeyConstraint(['clientID'], ['Clients.clientID'], name='FK__Orders__ClientID__00200768'),
        ForeignKeyConstraint(['companyID'], ['CompanyData.company_id'], name='FK__Orders__CompanyI__02084FDA'),
        ForeignKeyConstraint(['discountID'], ['Discounts.discountID'], name='FK__Orders__Discount__04E4BC85'),
        ForeignKeyConstraint(['documentID'], ['DocumentTypes.document_type_id'], name='FK__Orders__Document__06CD04F7'),
        ForeignKeyConstraint(['orderStatusID'], ['OrderStatus.orderStatusID'], name='FK_Orders_OrderStatus'),
        ForeignKeyConstraint(['priceListID'], ['PriceLists.priceListID'], name='FK__Orders__PriceLis__08B54D69'),
        ForeignKeyConstraint(['saleConditionID'], ['SaleConditions.saleConditionID'], name='FK__Orders__SaleCond__03F0984C'),
        ForeignKeyConstraint(['serviceTypeID'], ['ServiceType.serviceTypeID'], name='FK_Orders_ServiceType'),
        ForeignKeyConstraint(['statusID'], ['OrderStatus.orderStatusID'], name='FK__Orders__StatusID__07C12930'),
        ForeignKeyConstraint(['userID'], ['Users.userID'], name='FK__Orders__UserID__05D8E0BE'),
        ForeignKeyConstraint(['warehouseID'], ['Warehouses.warehouseID'], name='FK_Orders_Warehouses'),
        PrimaryKeyConstraint('orderID', name='PK__Orders__C3905BAF2829B144'),
        Index('idx_ClientID', 'clientID'),
        Index('idx_CompanyID', 'companyID'),
        Index('idx_OrderDate', 'date_')
    )

    orderID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    companyID = Column(Integer)
    branchID = Column(Integer)
    date_ = Column('Date', DateTime, server_default=text('(getdate())'))
    clientID = Column(Integer)
    saleConditionID = Column(Integer)
    discountID = Column(Integer)
    subtotal = Column(DECIMAL(10, 2))
    total = Column(DECIMAL(10, 2))
    vAT = Column(DECIMAL(10, 2))
    userID = Column(Integer)
    documentID = Column(Integer)
    statusID = Column(Integer)
    priceListID = Column(Integer)
    orderStatusID = Column(Integer)
    warehouseID = Column(Integer)
    carID = Column(Integer)
    isService = Column(Boolean)
    serviceTypeID = Column(Integer)
    mileage = Column(Integer)
    nextServiceMileage = Column(Integer)
    notes = Column(Unicode(500))

    branch = relationship('Branches', back_populates='orders')
    car = relationship('Cars', back_populates='orders')
    client = relationship('Clients', back_populates='orders')
    company_data = relationship('CompanyData', back_populates='orders')
    discount = relationship('Discounts', back_populates='orders')
    document_type = relationship('DocumentTypes', back_populates='orders')
    order_status = relationship('OrderStatus', foreign_keys=[orderStatusID], back_populates='orders')
    price_list = relationship('PriceLists', back_populates='orders')
    sale_condition = relationship('SaleConditions', back_populates='orders')
    service_type = relationship('ServiceType', back_populates='orders')
    status = relationship('OrderStatus', foreign_keys=[statusID], back_populates='orders_status')
    user = relationship('Users', back_populates='orders')
    warehouse = relationship('Warehouses', back_populates='orders')
    order_details = relationship('OrderDetails', back_populates='order')
    order_history = relationship('OrderHistory', back_populates='order')
    temp_order_details = relationship('TempOrderDetails', back_populates='order')
    transactions = relationship('Transactions', back_populates='order')


