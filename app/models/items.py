# ========== Items ===========
# app/models/items.py
from __future__ import annotations
import datetime
from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.branches import Branches
    from app.models.brands import Brands
    from app.models.company import Company
    from app.models.itemcategories import ItemCategories
    from app.models.itemsubcategories import ItemSubcategories
    from app.models.suppliers import Suppliers
    from app.models.warehouses import Warehouses
    from app.models.itempricehistories import ItemPriceHistories
    from app.models.itemstock import Itemstock
    from app.models.pricelistitems import PriceListItems
    from app.models.stockhistorydetails import StockHistoryDetails
    from app.models.tempstockhistorydetails import TempStockHistoryDetails
    from app.models.orderdetails import OrderDetails
    from app.models.temporderdetails import TempOrderDetails
    from app.models.orderhistorydetails import OrderHistoryDetails

from sqlalchemy import Integer, Unicode, UnicodeText, Boolean, Date, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, Index, text
from sqlalchemy.orm import Mapped, relationship, mapped_column
from app.db import Base


def _itempricehistories_fk():
    from .itempricehistories import ItemPriceHistories
    return [ItemPriceHistories.CompanyID, ItemPriceHistories.ItemID]


class Items(Base):
    __tablename__ = 'Items'
    __table_args__ = (
        ForeignKeyConstraint(["CompanyID", "BranchID"], [
                             "Branches.CompanyID", "Branches.BranchID"], name="FK_Items_Branches"),
        ForeignKeyConstraint(["CompanyID", "BrandID"], [
                             "Brands.CompanyID", "Brands.BrandID"], name='FK_Items_Brands'),
        ForeignKeyConstraint(["CompanyID", "ItemCategoryID"], [
                             "ItemCategories.CompanyID", "ItemCategories.ItemCategoryID"], name='FK_Items_ItemCategories'),
        ForeignKeyConstraint(["CompanyID", "ItemCategoryID", "ItemSubcategoryID"], ["ItemSubcategories.CompanyID",
                             "ItemSubcategories.ItemCategoryID", "ItemSubcategories.ItemSubcategoryID"], name='FK_Items_ItemSubcategories'),
        ForeignKeyConstraint(["CompanyID", "SupplierID"], [
                             "Suppliers.CompanyID", "Suppliers.SupplierID"], name='FK_Items_Suppliers'),
        ForeignKeyConstraint(["CompanyID", "WarehouseID"], [
                             "Warehouses.CompanyID", "Warehouses.WarehouseID"], name='FK_Items_Warehouses'),
        PrimaryKeyConstraint('CompanyID', 'ItemID', name='PK_Items'),
        Index('UQ_Items_ItemCode', 'ItemCode', unique=False)
    )

    ItemID: Mapped[int] = mapped_column(
        Integer, Identity(start=1, increment=1))
    CompanyID: Mapped[int] = mapped_column(Integer)
    BranchID: Mapped[int] = mapped_column(Integer)
    BrandID: Mapped[int] = mapped_column(Integer)
    ItemCode: Mapped[str] = mapped_column(Unicode(50, 'Modern_Spanish_CI_AS'))
    ItemDescription: Mapped[str] = mapped_column(
        UnicodeText(collation='Modern_Spanish_CI_AS'))
    ItemCategoryID: Mapped[int] = mapped_column(Integer)
    ItemSubcategoryID: Mapped[int] = mapped_column(Integer)
    SupplierID: Mapped[int] = mapped_column(Integer)
    ControlStock: Mapped[bool] = mapped_column(
        Boolean, server_default=text('((1))'))
    ReplenishmentStock: Mapped[int] = mapped_column(
        Integer, server_default=text('((0))'))
    IsOffer: Mapped[bool] = mapped_column(
        Boolean, server_default=text('((0))'))
    LastModified: Mapped[datetime.date] = mapped_column(
        Date, server_default=text('(CONVERT([date],getdate()))'))
    WarehouseID: Mapped[int] = mapped_column(Integer)
    IsActive: Mapped[bool] = mapped_column(
        Boolean, server_default=text('((1))'))
    OEM: Mapped[str] = mapped_column(Unicode(50, 'Modern_Spanish_CI_AS'))

    # Relaciones
    branches_: Mapped[Branches] = relationship(
        'Branches',
        back_populates='items',
        overlaps='items'
    )
    brands_: Mapped[Brands] = relationship(
        'Brands',
        back_populates='items',
        overlaps='branches_,items,company_,itemCategories_,itemSubcategories_'
    )
    company_: Mapped[Company] = relationship(
        'Company',
        back_populates='items',
        primaryjoin='foreign(Items.CompanyID) == Company.CompanyID',
        foreign_keys='Items.CompanyID',
        overlaps='branches_,items,brands_',
        viewonly=True
    )
    itemCategories_: Mapped[ItemCategories] = relationship(
        'ItemCategories',
        back_populates='items',
        overlaps='branches_,brands_,company_,items,itemSubcategories_'
    )
    itemSubcategories_: Mapped[ItemSubcategories] = relationship(
        'ItemSubcategories',
        back_populates='items',
        overlaps='branches_,brands_,company_,itemCategories_,items'
    )
    suppliers_: Mapped[Suppliers] = relationship(
        'Suppliers',
        back_populates='items',
        overlaps='branches_,brands_,company_,items,itemCategories_,itemSubcategories_'
    )
    warehouses_: Mapped[Warehouses] = relationship(
        'Warehouses',
        back_populates='items',
        overlaps='branches_,brands_,company_,items,itemCategories_,itemSubcategories_,suppliers_'
    )
    itemPriceHistory: Mapped[List[ItemPriceHistories]] = relationship(
        'ItemPriceHistories',
        back_populates='items_',
        foreign_keys=_itempricehistories_fk,
        overlaps='priceLists_,branches_'
    )
    itemstock: Mapped[List[Itemstock]] = relationship(
        'Itemstock', back_populates='items_')
    priceListItems: Mapped[List[PriceListItems]] = relationship(
        'PriceListItems',
        back_populates='items_',
        primaryjoin='Items.ItemID == foreign(PriceListItems.ItemID)'
    )
    stockHistoryDetails: Mapped[List[StockHistoryDetails]] = relationship(
        'StockHistoryDetails',
        back_populates='items_',
        overlaps='stockHistoryDetails'
    )
    tempStockHistoryDetails: Mapped[List[TempStockHistoryDetails]] = relationship(
        'TempStockHistoryDetails',
        back_populates='items_',
        overlaps='tempStockHistoryDetails'
    )
    orderDetails: Mapped[List[OrderDetails]] = relationship(
        'OrderDetails', back_populates='items_')
    tempOrderDetails: Mapped[List[TempOrderDetails]] = relationship(
        'TempOrderDetails',
        back_populates='items_',
        overlaps='tempOrderDetails'
    )
    orderHistoryDetails: Mapped[List[OrderHistoryDetails]] = relationship(
        'OrderHistoryDetails', back_populates='items_')
