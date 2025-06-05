# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class Transactions(Base):
    __tablename__ = 'Transactions'
    __table_args__ = (
        ForeignKeyConstraint(['BranchID'], ['Branches.BranchID'], name='FK_Transactions_Branches'),
        ForeignKeyConstraint(['ClientID'], ['Clients.ClientID'], name='FK_Transactions_Clients'),
        ForeignKeyConstraint(['CompanyID'], ['CompanyData.CompanyID'], name='FK_Transactions_CompanyData'),
        ForeignKeyConstraint(['OrderID'], ['Orders.OrderID'], name='FK_Transactions_Orders'),
        ForeignKeyConstraint(['SupplierID'], ['Suppliers.SupplierID'], name='FK_Transactions_Suppliers'),
        ForeignKeyConstraint(['TransacTypeID'], ['TransactionTypes.TransactTypeID'], name='FK_Transactions_TransactionTypes'),
        PrimaryKeyConstraint('TransactionID', name='PK__Transact__55433A4BB5EE9535'),
        Index('idx_ClientID_Transactions', 'ClientID'),
        Index('idx_SupplierID', 'SupplierID'),
        Index('idx_TransactionDate', 'TransactionDate')
    )

    transactionID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    companyID = Column(Integer)
    branchID = Column(Integer)
    transactionDate = Column(DateTime, server_default=text('(getdate())'))
    amount = Column(DECIMAL(10, 2))
    transacTypeID = Column(Integer)
    clientID = Column(Integer)
    supplierID = Column(Integer)
    orderID = Column(Integer)
    notes = Column(Unicode(200))

    branches_ = relationship('Branches', back_populates='Transactions')
    clients_ = relationship('Clients', back_populates='Transactions')
    companyData_ = relationship('CompanyData', back_populates='Transactions')
    orders_ = relationship('Orders', back_populates='Transactions')
    suppliers_ = relationship('Suppliers', back_populates='Transactions')
    transactionTypes_ = relationship('TransactionTypes', back_populates='Transactions')


