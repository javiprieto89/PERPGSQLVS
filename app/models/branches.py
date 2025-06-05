# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text, Column
from sqlalchemy.orm import relationship
from app.db import Base

class Branches(Base):
    __tablename__ = 'Branches'
    __table_args__ = (
        ForeignKeyConstraint(['company_id'], ['CompanyData.company_id'], name='FK__Branches__Compan__398D8EEE'),
        PrimaryKeyConstraint('branch_id', name='PK__Branches__A1682FA515D37C5D')
    )

    branch_id = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    company_id = Column(Integer)
    name = Column(Unicode(100))
    address = Column(Unicode(200))
    phone = Column(Unicode(20))
    logo = Column(LargeBinary)

    company_data = relationship('CompanyData', back_populates='branches')
    documents = relationship('Documents', back_populates='branch')
    user_access = relationship('UserAccess', back_populates='branch')
    items = relationship('Items', back_populates='branch')
    item_stock = relationship('ItemStock', back_populates='branch')
    orders = relationship('Orders', back_populates='branch')
    stock_history = relationship('StockHistory', back_populates='branch')
    temp_stock_entries = relationship('TempStockEntries', back_populates='branch')
    order_history = relationship('OrderHistory', back_populates='branch')
    temp_order_details = relationship('TempOrderDetails', back_populates='branch')
    transactions = relationship('Transactions', back_populates='branch')


