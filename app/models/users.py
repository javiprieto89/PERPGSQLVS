# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text, Column
from sqlalchemy.orm import relationship
from app.db import Base

class Users(Base):
    __tablename__ = 'Users'
    __table_args__ = (
        PrimaryKeyConstraint('userID', name='PK__Users__1788CCAC4149E5BC'),
    )

    userID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    nickname = Column(Unicode(50))
    fullName = Column(Unicode(100))
    password = Column(Unicode(100))
    isActive = Column(Boolean, server_default=text('((1))'))

    user_activity_log = relationship('UserActivityLog', back_populates='user')
    user_access = relationship('UserAccess', back_populates='user')
    orders = relationship('Orders', back_populates='user')
    stock_history = relationship('StockHistory', back_populates='user')
    temp_stock_entries = relationship('TempStockEntries', back_populates='user')
    temp_order_details = relationship('TempOrderDetails', back_populates='user')


