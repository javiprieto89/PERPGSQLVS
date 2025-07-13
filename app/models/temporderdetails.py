# app/models/temporderdetails.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .branches import Branches
    from .companydata import CompanyData
    from .items import Items
    from .orders import Orders
    from .pricelists import PriceLists
    from .users import Users
    from .warehouses import Warehouses

from typing import Optional

from sqlalchemy import Column, Integer, Unicode, DECIMAL, Uuid, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship
from app.db import Base


class TempOrderDetails(Base):
    __tablename__ = 'TempOrderDetails'
    __table_args__ = (
        ForeignKeyConstraint(['BranchID'], ['Branches.BranchID'], name='FK_TempOrderDetails_Branches'),
        ForeignKeyConstraint(['CompanyID'], ['CompanyData.CompanyID'], name='FK__TempOrder__Compa__0C85DE4D'),
        ForeignKeyConstraint(['ItemID'], ['Items.ItemID'], name='FK__TempOrder__ItemI__0F624AF8'),
        ForeignKeyConstraint(['OrderID'], ['Orders.OrderID'], name='FK_TempOrderDetails_Orders'),
        ForeignKeyConstraint(['OrderDetailID'], ['OrderDetails.OrderDetailID'], name='FK_TempOrderDetails_OrderDetails'),
        ForeignKeyConstraint(['PriceListID'], ['PriceLists.PriceListID'], name='FK_TempOrderDetails_PriceLists'),
        ForeignKeyConstraint(['UserID'], ['Users.UserID'], name='FK__TempOrder__UserI__0E6E26BF'),
        ForeignKeyConstraint(['WarehouseID'], ['Warehouses.WarehouseID'], name='FK_TempOrderDetails_Warehouses'),
        # Clave primaria basada en un campo identidad
        PrimaryKeyConstraint('TempOrderItemID', name='PK__TempOrde__AC4DF55EB1F17B71')
    )

    # Campos obligatorios según la estructura de SQL Server
    TempOrderItemID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    CompanyID = Column(Integer, nullable=False)
    BranchID = Column(Integer, nullable=False)
    UserID = Column(Integer, nullable=False)
    OrderSessionID = Column(Uuid, server_default=text('(newid())'), nullable=False)
    ItemID = Column(Integer, nullable=False)
    Quantity = Column(Integer, nullable=False)
    WarehouseID = Column(Integer, nullable=False)
    PriceListID = Column(Integer, nullable=False)
    UnitPrice = Column(DECIMAL(10, 2), nullable=False)
    Description = Column(Unicode(200, 'Modern_Spanish_CI_AS'), nullable=False)
    
    # Campos opcionales
    OrderID = Column(Integer, nullable=True)
    OrderDetailID = Column(Integer, nullable=True)

    # Relaciones
    branches_: Mapped['Branches'] = relationship('Branches', back_populates='tempOrderDetails')
    companyData_: Mapped['CompanyData'] = relationship('CompanyData', back_populates='tempOrderDetails')
    items_: Mapped['Items'] = relationship('Items', back_populates='tempOrderDetails')
    orders_: Mapped[Optional['Orders']] = relationship('Orders', back_populates='tempOrderDetails')
    priceLists_: Mapped['PriceLists'] = relationship('PriceLists', back_populates='tempOrderDetails')
    users_: Mapped['Users'] = relationship('Users', back_populates='tempOrderDetails')
    warehouses_: Mapped['Warehouses'] = relationship('Warehouses', back_populates='tempOrderDetails')