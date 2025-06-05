# Auto-generado. Revisar imports si faltan.
from typing import List, Optional
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class TempOrderDetails(Base):
    __tablename__ = 'TempOrderDetails'
    __table_args__ = (
        ForeignKeyConstraint(['BranchID'], ['Branches.BranchID'], name='FK_TempOrderDetails_Branches'),
        ForeignKeyConstraint(['CompanyID'], ['CompanyData.CompanyID'], name='FK__TempOrder__Compa__0C85DE4D'),
        ForeignKeyConstraint(['ItemID'], ['Items.ItemID'], name='FK__TempOrder__ItemI__0F624AF8'),
        ForeignKeyConstraint(['OrderID'], ['Orders.OrderID'], name='FK_TempOrderDetails_Orders'),
        ForeignKeyConstraint(['PriceListID'], ['PriceLists.PriceListID'], name='FK_TempOrderDetails_PriceLists'),
        ForeignKeyConstraint(['UserID'], ['Users.UserID'], name='FK__TempOrder__UserI__0E6E26BF'),
        ForeignKeyConstraint(['WarehouseID'], ['Warehouses.WarehouseID'], name='FK_TempOrderDetails_Warehouses'),
        PrimaryKeyConstraint('TempOrderItemID', name='PK__TempOrde__AC4DF55EB1F17B71')
    )

    tempOrderItemID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    orderSessionID = Column(Uuid, server_default=text('(newid())'))
    companyID = Column(Integer)
    branchID = Column(Integer)
    userID = Column(Integer)
    itemID = Column(Integer)
    quantity = Column(Integer)
    warehouseID = Column(Integer)
    priceListID = Column(Integer)
    unitPrice = Column(DECIMAL(10, 2))
    description = Column(Unicode(200))
    orderDetailsID = Column(Integer)
    orderID = Column(Integer)

    branches_ = relationship('Branches', back_populates='TempOrderDetails')
    companyData_ = relationship('CompanyData', back_populates='TempOrderDetails')
    items_ = relationship('Items', back_populates='TempOrderDetails')
    orders_ = relationship('Orders', back_populates='TempOrderDetails')
    priceLists_ = relationship('PriceLists', back_populates='TempOrderDetails')
    users_ = relationship('Users', back_populates='TempOrderDetails')
    warehouses_ = relationship('Warehouses', back_populates='TempOrderDetails')


