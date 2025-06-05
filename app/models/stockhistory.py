# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class StockHistory(Base):
    __tablename__ = 'StockHistory'
    __table_args__ = (
        ForeignKeyConstraint(['BranchID'], ['Branches.BranchID'], name='FK_StockHistory_Branches'),
        ForeignKeyConstraint(['CompanyID'], ['CompanyData.CompanyID'], name='FK_StockHistory_CompanyData'),
        ForeignKeyConstraint(['ItemID'], ['Items.ItemID'], name='FK__StockHist__ItemI__7A672E12'),
        ForeignKeyConstraint(['UserID'], ['Users.UserID'], name='FK_StockHistory_Users'),
        ForeignKeyConstraint(['WarehouseID'], ['Warehouses.WarehouseID'], name='FK__StockHist__Wareh__7B5B524B'),
        PrimaryKeyConstraint('StockHistoryID', name='PK__StockHis__A6CE86DBEB46B995')
    )

    stockHistoryID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    itemID = Column(Integer)
    companyID = Column(Integer)
    branchID = Column(Integer)
    warehouseID = Column(Integer)
    quantityUpdate = Column(Integer)
    quantityBefore = Column(Integer)
    quantityAfter = Column(Integer)
    transactionDate = Column(DateTime, server_default=text('(getdate())'))
    userID = Column(Integer)
    reason = Column(Unicode(200))

    branches_ = relationship('Branches', back_populates='StockHistory')
    companyData_ = relationship('CompanyData', back_populates='StockHistory')
    items_ = relationship('Items', back_populates='StockHistory')
    users_ = relationship('Users', back_populates='StockHistory')
    warehouses_ = relationship('Warehouses', back_populates='StockHistory')


