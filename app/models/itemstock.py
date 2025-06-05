# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class Itemstock(Base):
    __tablename__ = 'Itemstock'
    __table_args__ = (
        ForeignKeyConstraint(['branchID'], ['Branches.branch_id'], name='FK_Itemstock_Branches'),
        ForeignKeyConstraint(['companyID'], ['CompanyData.company_id'], name='FK_Itemstock_CompanyData'),
        ForeignKeyConstraint(['itemID'], ['Items.itemID'], name='FK_Itemstock_Items'),
        ForeignKeyConstraint(['supplierID'], ['Suppliers.supplierID'], name='FK_Itemstock_Suppliers'),
        ForeignKeyConstraint(['warehouseID'], ['Warehouses.warehouseID'], name='FK_Itemstock_Warehouses'),
        PrimaryKeyConstraint('itemID', 'warehouseID', name='PK__Itemstoc__F01E09161DA94055'),
        Index('idx_BranchID', 'companyID'),
        Index('idx_ItemWarehouse', 'itemID', 'warehouseID'),
        Index('idx_SupplierStatus', 'supplierID', 'stockStatus')
    )

    itemID = Column(Integer, primary_key=True)
    warehouseID = Column(Integer, primary_key=True)
    companyID = Column(Integer)
    branchID = Column(Integer)
    quantity = Column(Integer)
    reservedQuantity = Column(Integer)
    lastModified = Column(Date, server_default=text('(CONVERT([date],getdate()))'))
    stockStatus = Column(Unicode(50))
    minStockLevel = Column(Integer, server_default=text('((0))'))
    maxStockLevel = Column(Integer, server_default=text('((0))'))
    supplierID = Column(Integer)
    stockLocation = Column(Unicode(100))
    batchNumber = Column(Unicode(50))
    expiryDate = Column(Date)

    branches_ = relationship('Branches', back_populates='Itemstock')
    companyData_ = relationship('CompanyData', back_populates='Itemstock')
    items_ = relationship('Items', back_populates='Itemstock')
    suppliers_ = relationship('Suppliers', back_populates='Itemstock')
    warehouses_ = relationship('Warehouses', back_populates='Itemstock')


