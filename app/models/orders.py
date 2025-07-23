# ========== Orders ===========
# app/models/orders.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .branches import Branches
    from .cars import Cars
    from .clients import Clients
    from .companydata import CompanyData
    from .discounts import Discounts
    from .sysdocumenttypes import SysDocumentTypes
    from .orderstatus import OrderStatus
    from .pricelists import PriceLists
    from .saleconditions import SaleConditions
    from .servicetype import ServiceType
    from .users import Users
    from .warehouses import Warehouses
    from .orderdetails import OrderDetails
    from .orderhistory import OrderHistory
    from .temporderdetails import TempOrderDetails

from typing import List, Optional

from sqlalchemy import Column, Integer, Unicode, Boolean, DateTime, DECIMAL, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, Index, text
from sqlalchemy.orm import Mapped, relationship

from app.db import Base


class Orders(Base):
    __tablename__ = 'Orders'
    __table_args__ = (
        ForeignKeyConstraint(['BranchID'], ['Branches.BranchID'], name='FK__Orders__branchID__01142BA1'),
        ForeignKeyConstraint(['CarID'], ['Cars.CarID'], name='FK__Orders__carID__02FC7413'),
        ForeignKeyConstraint(['ClientID'], ['Clients.ClientID'], name='FK__Orders__clientID__00200768'),
        ForeignKeyConstraint(['CompanyID'], ['CompanyData.CompanyID'], name='FK__Orders__CompanyI__02084FDA'),
        ForeignKeyConstraint(['DiscountID'], ['Discounts.DiscountID'], name='FK__Orders__Discount__04E4BC85'),
        ForeignKeyConstraint(['DocumentID'], ['SysDocumentTypes.DocumentTypeID'], name='FK__Orders__SysDocume__06CD04F7'),
        ForeignKeyConstraint(['OrderStatusID'], ['OrderStatus.OrderstatusID'], name='FK_Orders_OrderStatus'),
        ForeignKeyConstraint(['PriceListID'], ['PriceLists.PriceListID'], name='FK__Orders__PriceLis__08B54D69'),
        ForeignKeyConstraint(['SaleConditionID'], ['SaleConditions.SaleConditionID'], name='FK__Orders__SaleCond__03F0984C'),
        ForeignKeyConstraint(['ServiceTypeID'], ['ServiceType.ServiceTypeID'], name='FK_Orders_ServiceType'),        
        ForeignKeyConstraint(['UserID'], ['Users.UserID'], name='FK__Orders__userID__05D8E0BE'),
        ForeignKeyConstraint(['WarehouseID'], ['Warehouses.WarehouseID'], name='FK_Orders_Warehouses'),
        PrimaryKeyConstraint('OrderID', name='PK__Orders__C3905BAF2829B144'),
        Index('idx_clientID', 'ClientID'),
        Index('idx_companyID', 'CompanyID'),
        Index('idx_OrderDate', 'Date')
    )

    OrderID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    CompanyID = Column(Integer)
    BranchID = Column(Integer)
    Date_ = Column('Date', DateTime, server_default=text('(getdate())'))
    ClientID = Column(Integer)
    SaleConditionID = Column(Integer)
    DiscountID = Column(Integer)
    Subtotal = Column(DECIMAL(10, 2))
    Total = Column(DECIMAL(10, 2))
    VAT = Column(DECIMAL(10, 2))
    UserID = Column(Integer)
    DocumentID = Column(Integer)    
    PriceListID = Column(Integer)
    OrderStatusID = Column(Integer)
    WarehouseID = Column(Integer)
    CarID = Column(Integer)
    IsService = Column(Boolean)
    ServiceTypeID = Column(Integer)
    Mileage = Column(Integer)
    NextServiceMileage = Column(Integer)
    Notes = Column(Unicode(500, 'Modern_Spanish_CI_AS'))

    # Relaciones
    branches_: Mapped['Branches'] = relationship('Branches', back_populates='orders')
    cars_: Mapped[Optional['Cars']] = relationship('Cars', back_populates='orders')
    clients_: Mapped['Clients'] = relationship('Clients', back_populates='orders')
    companyData_: Mapped['CompanyData'] = relationship('CompanyData', back_populates='orders')
    discounts_: Mapped['Discounts'] = relationship('Discounts', back_populates='orders')
    sysDocumentTypes_: Mapped['SysDocumentTypes'] = relationship('SysDocumentTypes', back_populates='orders')
    orderStatus_: Mapped['OrderStatus'] = relationship('OrderStatus', foreign_keys=[OrderStatusID], back_populates='orders')    
    priceLists_: Mapped['PriceLists'] = relationship('PriceLists', back_populates='orders')
    saleConditions_: Mapped['SaleConditions'] = relationship('SaleConditions', back_populates='orders')
    serviceType_: Mapped[Optional['ServiceType']] = relationship('ServiceType', back_populates='orders')    
    users_: Mapped['Users'] = relationship('Users', back_populates='orders')
    warehouses_: Mapped['Warehouses'] = relationship('Warehouses', back_populates='orders')
    orderDetails: Mapped[List['OrderDetails']] = relationship('OrderDetails', back_populates='orders_')
    orderHistory: Mapped[List['OrderHistory']] = relationship('OrderHistory', back_populates='orders_')
    tempOrderDetails: Mapped[List['TempOrderDetails']] = relationship('TempOrderDetails', back_populates='orders_')

    @property
    def Items(self) -> List['OrderDetails']:
        """Alias de acceso para los detalles de la orden."""
        return self.orderDetails

