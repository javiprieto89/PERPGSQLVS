# ========== Transactions ===========
# app/models/transactions.py
from sqlalchemy import Column, Integer, Unicode, DateTime, DECIMAL, Identity, PrimaryKeyConstraint, Index, text
from app.db import Base


class Transactions(Base):
    __tablename__ = 'Transactions'
    __table_args__ = (
        PrimaryKeyConstraint('TransactionID', name='PK__Transact__55433A4BB5EE9535'),
        Index('idx_clientID_Transactions', 'ClientID'),
        Index('idx_supplierID', 'SupplierID'),
        Index('idx_TransactionDate', 'TransactionDate')
    )

    TransactionID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    CompanyID = Column(Integer)
    BranchID = Column(Integer)
    TransactionDate = Column(DateTime, server_default=text('(getdate())'))
    TransacTypeID = Column(Integer)
    ClientID = Column(Integer)
    SupplierID = Column(Integer)
    OrderID = Column(Integer)
    Subtotal = Column(DECIMAL(10, 2))
    Taxes = Column(DECIMAL(10, 2))
    Total = Column(DECIMAL(10, 2))
    Notes = Column(Unicode(200, 'Modern_Spanish_CI_AS'))