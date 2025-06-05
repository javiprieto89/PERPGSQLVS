# Auto-generado. Revisar imports si faltan.
from typing import List, Optional
from sqlalchemy import Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text, Column
from sqlalchemy.orm import relationship
from app.db import Base

class Items(Base):
    __tablename__ = 'Items'
    __table_args__ = (
        ForeignKeyConstraint(['branchID'], ['Branches.branch_id'], name='FK_Items_Branches'),
        ForeignKeyConstraint(['brandID'], ['Brands.brand_id'], name='FK_Items_Brands'),
        ForeignKeyConstraint(['companyID'], ['CompanyData.company_id'], name='FK_Items_CompanyData'),
        ForeignKeyConstraint(['itemCategoryID'], ['ItemCategories.itemCategoryID'], name='FK_Items_ItemCategories'),
        ForeignKeyConstraint(['itemSubcategoryID'], ['ItemSubcategories.itemSubcategoryID'], name='FK_Items_ItemSubcategories'),
        ForeignKeyConstraint(['supplierID'], ['Suppliers.supplierID'], name='FK_Items_Suppliers'),
        ForeignKeyConstraint(['warehouseID'], ['Warehouses.warehouseID'], name='FK_Items_Warehouses'),
        PrimaryKeyConstraint('itemID', name='PK__Items__727E83EB997DFA51'),
        Index('UQ__Items__A25C5AA7F6BA0424', 'code', unique=True)
    )

    itemID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    companyID = Column(Integer)
    branchID = Column(Integer)
    brandID = Column(Integer)
    code = Column(Unicode(50))
    description = Column(Unicode(200))
    itemCategoryID = Column(Integer)
    itemSubcategoryID = Column(Integer)
    supplierID = Column(Integer)
    controlStock = Column(Boolean, server_default=text('((1))'))
    replenishmentStock = Column(Integer, server_default=text('((0))'))
    isOffer = Column(Boolean, server_default=text('((0))'))
    lastModified = Column(Date, server_default=text('(CONVERT([date],getdate()))'))
    warehouseID = Column(Integer)
    isActive = Column(Boolean, server_default=text('((1))'))
    oEM = Column(Unicode(50))

    branches = relationship('Branches', back_populates='items')
    brands = relationship('Brands', back_populates='items')
    company_data = relationship('CompanyData', back_populates='items')
    item_categories = relationship('ItemCategories', back_populates='items')
    item_subcategories = relationship('ItemSubcategories', back_populates='items')
    suppliers = relationship('Suppliers', back_populates='items')
    warehouses = relationship('Warehouses', back_populates='items')
    item_price_history = relationship('ItemPriceHistory', back_populates='items')
    item_stock = relationship('Itemstock', back_populates='items')
    price_list_items = relationship('PriceListItems', back_populates='items')
    stock_history = relationship('StockHistory', back_populates='items')
    temp_stock_entries = relationship('TempStockEntries', back_populates='items')
    order_details = relationship('OrderDetails', back_populates='items')
    temp_order_details = relationship('TempOrderDetails', back_populates='items')
    order_history_details = relationship('OrderHistoryDetails', back_populates='items')


