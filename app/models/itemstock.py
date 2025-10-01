# ========== Itemstock ===========
# app/models/itemstock.py
from __future__ import annotations
import datetime
from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.branches import Branches
    from app.models.company import Company
    from app.models.items import Items
    from app.models.suppliers import Suppliers
    from app.models.warehouses import Warehouses

from sqlalchemy import Integer, Unicode, Date, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, Index, text
from sqlalchemy.orm import Mapped, relationship, foreign, mapped_column
from app.db import Base

class Itemstock(Base):
    __tablename__ = 'ItemStocks'
    __table_args__ = (
        ForeignKeyConstraint(
            ['BranchID'], ['Branches.BranchID'], name='FK_ItemStocks_Branches'),
        ForeignKeyConstraint(['CompanyID', 'ItemID'], [
                             'Items.CompanyID', 'Items.ItemID'], name='FK_ItemStocks_Items'),
        ForeignKeyConstraint(['CompanyID', 'SupplierID'], [
                             'Suppliers.CompanyID', 'Suppliers.SupplierID'], name='FK_ItemStocks_Suppliers'),
        ForeignKeyConstraint(['CompanyID', 'WarehouseID'], [
                             'Warehouses.CompanyID', 'Warehouses.WarehouseID'], name='FK_ItemStocks_Warehouses'),
        PrimaryKeyConstraint('CompanyID', 'ItemID',
                             'WarehouseID', name='PK_ItemStocks'),
        Index('idx_branchID', 'CompanyID'),
        Index('idx_ItemWarehouse', 'ItemID', 'WarehouseID'),
        Index('idx_SupplierStatus', 'SupplierID', 'StockStatus')
    )

    CompanyID: Mapped[int] = mapped_column(Integer, primary_key=True)
    ItemID: Mapped[int] = mapped_column(Integer, primary_key=True)
    WarehouseID: Mapped[int] = mapped_column(Integer, primary_key=True)
    BranchID: Mapped[int] = mapped_column(Integer)
    Quantity: Mapped[int] = mapped_column(Integer)
    ReservedQuantity: Mapped[int] = mapped_column(Integer)
    LastModified: Mapped[datetime.date] = mapped_column(Date, server_default=text( '(CONVERT([date],getdate()))'))
    StockStatus: Mapped[str] = mapped_column(Unicode(50, 'Modern_Spanish_CI_AS'))
    MinStockLevel: Mapped[int] = mapped_column(Integer, server_default=text('((0))'))
    MaxStockLevel: Mapped[int] = mapped_column(Integer, server_default=text('((0))'))
    SupplierID: Mapped[int] = mapped_column(Integer)
    StockLocation: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    BatchNumber: Mapped[str] = mapped_column(Unicode(50, 'Modern_Spanish_CI_AS'))
    ExpiryDate: Mapped[datetime.date] = mapped_column(Date)

    # Relaciones
    branches_: Mapped[Branches] = relationship(
        'Branches',
        back_populates='itemstock',
        overlaps='itemstock'
    )
    company_: Mapped[Company] = relationship(
        'Company',
        back_populates='itemstock',
        primaryjoin='foreign(Itemstock.CompanyID) == Company.CompanyID',
        foreign_keys='Itemstock.CompanyID',
        overlaps='branches_,itemstock',
        viewonly=True
    )
    items_: Mapped[Items] = relationship(
        'Items',
        back_populates='itemstock',
        overlaps='itemstock'
    )
    suppliers_: Mapped[Suppliers] = relationship(
        'Suppliers',
        back_populates='itemstock',
        overlaps='items_,itemstock,itemstock'
    )
    warehouses_: Mapped[Warehouses] = relationship(
        'Warehouses',
        back_populates='itemstock',
        overlaps='items_,itemstock,itemstock,suppliers_'
    )
