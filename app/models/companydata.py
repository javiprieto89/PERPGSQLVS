# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text, Column
from sqlalchemy.orm import relationship
from app.db import Base

class CompanyData(Base):
    __tablename__ = 'CompanyData'
    __table_args__ = (
        PrimaryKeyConstraint('company_id', name='PK__CompanyD__2D971C4CF963B1F3'),
    )

    company_id = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    name = Column(Unicode(100))
    address = Column(Unicode(200))
    c_uit = Column(Unicode(20))
    gross_income = Column(Unicode(20))
    start_date = Column(Date)
    logo = Column(LargeBinary)

    branches = relationship('Branches', back_populates='company_data')
    documents = relationship('Documents', back_populates='company_data')
    user_access = relationship('UserAccess', back_populates='company_data')
    items = relationship('Items', back_populates='company_data')
    itemstock = relationship('Itemstock', back_populates='company_data')
    orders = relationship('Orders', back_populates='company_data')
    stock_history = relationship('StockHistory', back_populates='company_data')
    temp_stock_entries = relationship('TempStockEntries', back_populates='company_data')
    order_history = relationship('OrderHistory', back_populates='company_data')
    temp_order_details = relationship('TempOrderDetails', back_populates='company_data')
    transactions = relationship('Transactions', back_populates='company_data')


