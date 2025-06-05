# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class TempStockEntries(Base):
    __tablename__ = 'TempStockEntries'
    __table_args__ = (
        ForeignKeyConstraint(['BranchID'], ['Branches.BranchID'], name='FK__TempStock__Branc__160F4887'),
        ForeignKeyConstraint(['CompanyID'], ['CompanyData.CompanyID'], name='FK__TempStock__Compa__151B244E'),
        ForeignKeyConstraint(['ItemID'], ['Items.ItemID'], name='FK__TempStock__ItemI__17F790F9'),
        ForeignKeyConstraint(['UserID'], ['Users.UserID'], name='FK__TempStock__UserI__17036CC0'),
        ForeignKeyConstraint(['WarehouseID'], ['Warehouses.WarehouseID'], name='FK__TempStock__Wareh__18EBB532'),
        PrimaryKeyConstraint('TempStockEntryID', name='PK__TempStoc__6BCFA2A4F18BE300')
    )

    tempStockEntryID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    companyID = Column(Integer)
    branchID = Column(Integer)
    uniqueID = Column(Uuid, server_default=text('(newid())'))
    sessionID = Column(Unicode(100))
    userID = Column(Integer)
    itemID = Column(Integer)
    warehouseID = Column(Integer)
    quantityChange = Column(Integer)
    entryDate = Column(DateTime, server_default=text('(getdate())'))
    isProcessed = Column(Boolean, server_default=text('((0))'))
    reason = Column(Unicode(200))

    branches_ = relationship('Branches', back_populates='TempStockEntries')
    companyData_ = relationship('CompanyData', back_populates='TempStockEntries')
    items_ = relationship('Items', back_populates='TempStockEntries')
    users_ = relationship('Users', back_populates='TempStockEntries')
    warehouses_ = relationship('Warehouses', back_populates='TempStockEntries')


