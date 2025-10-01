# app/models/temporderdetails.py
from __future__ import annotations
import uuid
import decimal
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .branches import Branches
    from .company import Company
    from .items import Items
    from .orders import Orders
    from .pricelists import PriceLists
    from .users import Users
    from .warehouses import Warehouses


from sqlalchemy import Integer, Unicode, DECIMAL, Uuid, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship, mapped_column
from app.db import Base

class TempOrderDetails(Base):
    __tablename__ = 'TempOrderDetails'
    __table_args__ = (
        ForeignKeyConstraint(
            ["CompanyID", "BranchID"],
            ["Branches.CompanyID", "Branches.BranchID"],
            name='FK_TempOrderDetails_Branches'
        ),
        ForeignKeyConstraint(
            ['CompanyID'], ['Company.CompanyID'], name='FK_TempOrderDetails_Company'),
        ForeignKeyConstraint(['CompanyID', 'ItemID'], [
                             'Items.CompanyID', 'Items.ItemID'], name='FK_TempOrderDetails_Items'),
        ForeignKeyConstraint(['CompanyID', 'BranchID', 'OrderID'], [
                             'Orders.CompanyID', 'Orders.BranchID', 'Orders.OrderID'], name='FK_TempOrderDetails_Orders'),
        # OrderDetails ahora tiene PK compuesta; mantenemos referencia simple por compatibilidad o se puede eliminar si no es usada
        # ForeignKeyConstraint(['OrderDetailID'], ['OrderDetails.OrderDetailID'], name='FK_TempOrderDetails_OrderDetails'),
        ForeignKeyConstraint(['CompanyID', 'PriceListID'], [
                             'PriceLists.CompanyID', 'PriceLists.PriceListID'], name='FK_TempOrderDetails_PriceLists'),
        ForeignKeyConstraint(['UserID'], ['Users.UserID'],
                             name='FK_TempOrderDetails_Users'),
        ForeignKeyConstraint(['CompanyID', 'WarehouseID'], [
                             'Warehouses.CompanyID', 'Warehouses.WarehouseID'], name='FK_TempOrderDetails_Warehouses'),
        # Clave primaria compuesta siguiendo el schema de SQL Server
        PrimaryKeyConstraint('CompanyID', 'BranchID', 'UserID',
                             'OrderSessionID', 'ItemID', name='PK_TempOrderDetails_Composite')
    )

    # Campos obligatorios según la estructura de SQL Server
    CompanyID: Mapped[int] = mapped_column(Integer, nullable=False)
    BranchID: Mapped[int] = mapped_column(Integer, nullable=False)
    UserID: Mapped[int] = mapped_column(Integer, nullable=False)
    OrderSessionID: Mapped[uuid.UUID] = mapped_column(Uuid, server_default=text('(newid())'), nullable=False)
    ItemID: Mapped[int] = mapped_column(Integer, nullable=False)
    Quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    WarehouseID: Mapped[int] = mapped_column(Integer, nullable=False)
    PriceListID: Mapped[int] = mapped_column(Integer, nullable=False)
    UnitPrice: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 2), nullable=False)
    Description: Mapped[str] = mapped_column(Unicode(200, 'Modern_Spanish_CI_AS'), nullable=False)

    # Campos opcionales
    OrderID: Mapped[int] = mapped_column(Integer, nullable=True)
    OrderDetailID: Mapped[int] = mapped_column(Integer, nullable=True)

    # Relaciones
    branches_: Mapped['Branches'] = relationship(
        'Branches',
        back_populates='tempOrderDetails',
        overlaps='tempOrderDetails'
    )
    company_: Mapped['Company'] = relationship(
        'Company',
        back_populates='tempOrderDetails',
        overlaps='branches_,tempOrderDetails',
        viewonly=True
    )
    items_: Mapped['Items'] = relationship(
        'Items',
        back_populates='tempOrderDetails',
        overlaps='orders_,priceLists_,users_,warehouses_,tempOrderDetails,branches_'
    )
    orders_: Mapped[Optional['Orders']] = relationship(
        'Orders',
        back_populates='tempOrderDetails',
        overlaps='items_,priceLists_,users_,warehouses_,branches_,tempOrderDetails'
    )
    priceLists_: Mapped['PriceLists'] = relationship(
        'PriceLists',
        back_populates='tempOrderDetails',
        overlaps='items_,orders_,users_,warehouses_,tempOrderDetails,branches_'
    )
    users_: Mapped['Users'] = relationship(
        'Users',
        back_populates='tempOrderDetails',
        overlaps='items_,orders_,priceLists_,warehouses_,tempOrderDetails,branches_'
    )
    warehouses_: Mapped['Warehouses'] = relationship(
        'Warehouses',
        back_populates='tempOrderDetails',
        overlaps='items_,orders_,priceLists_,users_,tempOrderDetails,branches_'
    )
