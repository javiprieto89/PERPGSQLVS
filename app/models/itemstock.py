# ========== Itemstock ===========
# app/models/itemstock.py
from __future__ import annotations
from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.branches import Branches
    from app.models.companydata import CompanyData
    from app.models.items import Items
    from app.models.suppliers import Suppliers
    from app.models.warehouses import Warehouses

from sqlalchemy import Column, Integer, Unicode, Date, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, Index, text
from sqlalchemy.orm import Mapped, relationship, foreign
from app.db import Base


class Itemstock(Base):
    __tablename__ = 'Itemstock'
    __table_args__ = (
        ForeignKeyConstraint(
            ["CompanyID", "BranchID"],
            ["Branches.CompanyID", "Branches.BranchID"],
            name="FK_Itemstock_Branches",
        ),
        ForeignKeyConstraint(['ItemID'], ['Items.ItemID'], name='FK_Itemstock_Items'),
        ForeignKeyConstraint(['SupplierID'], ['Suppliers.SupplierID'], name='FK_Itemstock_Suppliers'),
        ForeignKeyConstraint(['WarehouseID'], ['Warehouses.WarehouseID'], name='FK_Itemstock_Warehouses'),
        PrimaryKeyConstraint('ItemID', 'WarehouseID', name='PK__Itemstoc__F01E09161DA94055'),
        Index('idx_branchID', 'CompanyID'),
        Index('idx_ItemWarehouse', 'ItemID', 'WarehouseID'),
        Index('idx_SupplierStatus', 'SupplierID', 'StockStatus')
    )

    ItemID = Column(Integer, primary_key=True)
    WarehouseID = Column(Integer, primary_key=True)
    CompanyID = Column(Integer)
    BranchID = Column(Integer)
    Quantity = Column(Integer)
    ReservedQuantity = Column(Integer)
    LastModified = Column(Date, server_default=text('(CONVERT([date],getdate()))'))
    StockStatus = Column(Unicode(50, 'Modern_Spanish_CI_AS'))
    MinStockLevel = Column(Integer, server_default=text('((0))'))
    MaxStockLevel = Column(Integer, server_default=text('((0))'))
    SupplierID = Column(Integer)
    StockLocation = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    BatchNumber = Column(Unicode(50, 'Modern_Spanish_CI_AS'))
    ExpiryDate = Column(Date)

    # Relaciones
    branches_: Mapped[Branches] = relationship('Branches', back_populates='itemstock')
    companyData_: Mapped[CompanyData] = relationship(
        'CompanyData',
        back_populates='itemstock',
        primaryjoin='foreign(Itemstock.CompanyID) == CompanyData.CompanyID',
        foreign_keys='Itemstock.CompanyID',
        overlaps='branches',
    )
    items_: Mapped[Items] = relationship('Items', back_populates='itemstock')
    suppliers_: Mapped[Suppliers] = relationship('Suppliers', back_populates='itemstock')
    warehouses_: Mapped[Warehouses] = relationship('Warehouses', back_populates='itemstock')
