# ========== Items ===========
# app/models/items.py
from __future__ import annotations
from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.branches import Branches
    from app.models.brands import Brands
    from app.models.companydata import CompanyData
    from app.models.itemcategories import ItemCategories
    from app.models.itemsubcategories import ItemSubcategories
    from app.models.suppliers import Suppliers
    from app.models.warehouses import Warehouses
    from app.models.itempricehistory import ItemPriceHistory
    from app.models.itemstock import Itemstock
    from app.models.pricelistitems import PriceListItems
    from app.models.stockhistory import StockHistory
    from app.models.tempstockhistorydetails import TempStockHistoryDetails
    from app.models.orderdetails import OrderDetails
    from app.models.temporderdetails import TempOrderDetails
    from app.models.orderhistorydetails import OrderHistoryDetails

from sqlalchemy import Column, Integer, Unicode, Boolean, Date, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, Index, text
from sqlalchemy.orm import Mapped, relationship
from app.db import Base


class Items(Base):
    __tablename__ = 'Items'
    __table_args__ = (
        ForeignKeyConstraint(
            ["CompanyID", "BranchID"],
            ["Branches.CompanyID", "Branches.BranchID"],
            name="FK_Items_Branches",
        ),
        ForeignKeyConstraint(['BrandID'], ['Brands.BrandID'], name='FK_Items_Brands'),
        ForeignKeyConstraint(['ItemCategoryID'], ['ItemCategories.ItemCategoryID'], name='FK_Items_ItemCategories'),
        ForeignKeyConstraint(['ItemSubcategoryID'], ['ItemSubcategories.ItemSubcategoryID'], name='FK_Items_ItemSubcategories'),
        ForeignKeyConstraint(['SupplierID'], ['Suppliers.SupplierID'], name='FK_Items_Suppliers'),
        ForeignKeyConstraint(['WarehouseID'], ['Warehouses.WarehouseID'], name='FK_Items_Warehouses'),
        PrimaryKeyConstraint('ItemID', name='PK__Items__727E83EB997DFA51'),
        Index('UQ__Items__A25C5AA7F6BA0424', 'Code', unique=True)
    )

    ItemID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    CompanyID = Column(Integer)
    BranchID = Column(Integer)
    BrandID = Column(Integer)
    Code = Column(Unicode(50, 'Modern_Spanish_CI_AS'))
    Description = Column(Unicode(200, 'Modern_Spanish_CI_AS'))
    ItemCategoryID = Column(Integer)
    ItemSubcategoryID = Column(Integer)
    SupplierID = Column(Integer)
    ControlStock = Column(Boolean, server_default=text('((1))'))
    ReplenishmentStock = Column(Integer, server_default=text('((0))'))
    IsOffer = Column(Boolean, server_default=text('((0))'))
    LastModified = Column(Date, server_default=text('(CONVERT([date],getdate()))'))
    WarehouseID = Column(Integer)
    IsActive = Column(Boolean, server_default=text('((1))'))
    OEM = Column(Unicode(50, 'Modern_Spanish_CI_AS'))

    # Relaciones
    branches_: Mapped[Branches] = relationship(
        'Branches',
        back_populates='items',
        overlaps='items'
    )
    brands_: Mapped[Brands] = relationship('Brands', back_populates='items')
    companyData_: Mapped[CompanyData] = relationship(
        'CompanyData',
        back_populates='items',
        primaryjoin='foreign(Items.CompanyID) == CompanyData.CompanyID',
        foreign_keys='Items.CompanyID',
        overlaps='branches_,items'
    )
    itemCategories_: Mapped[ItemCategories] = relationship('ItemCategories', back_populates='items')
    itemSubcategories_: Mapped[ItemSubcategories] = relationship('ItemSubcategories', back_populates='items')
    suppliers_: Mapped[Suppliers] = relationship('Suppliers', back_populates='items')
    warehouses_: Mapped[Warehouses] = relationship('Warehouses', back_populates='items')
    itemPriceHistory: Mapped[List[ItemPriceHistory]] = relationship('ItemPriceHistory', back_populates='items_')
    itemstock: Mapped[List[Itemstock]] = relationship('Itemstock', back_populates='items_')
    priceListItems: Mapped[List[PriceListItems]] = relationship('PriceListItems', back_populates='items_')
    stockHistory: Mapped[List[StockHistory]] = relationship('StockHistory', back_populates='items_')
    tempStockHistoryDetails: Mapped[List[TempStockHistoryDetails]] = relationship('TempStockHistoryDetails', back_populates='items_')
    orderDetails: Mapped[List[OrderDetails]] = relationship('OrderDetails', back_populates='items_')
    tempOrderDetails: Mapped[List[TempOrderDetails]] = relationship('TempOrderDetails', back_populates='items_')
    orderHistoryDetails: Mapped[List[OrderHistoryDetails]] = relationship('OrderHistoryDetails', back_populates='items_')

