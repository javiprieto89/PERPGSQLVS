# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class OrderDetails(Base):
    __tablename__ = 'OrderDetails'
    __table_args__ = (
        ForeignKeyConstraint(['itemID'], ['Items.itemID'], name='FK__OrderDeta__ItemI__2DE6D218'),
        ForeignKeyConstraint(['orderID'], ['Orders.orderID'], name='FK__OrderDeta__Order__2CF2ADDF'),
        ForeignKeyConstraint(['warehouseID'], ['Warehouses.warehouseID'], name='FK_OrderDetails_Warehouses'),
        PrimaryKeyConstraint('orderDetailID', name='PK__OrderDet__9DD74D9DF5D37EDA')
    )

    orderDetailID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    orderID = Column(Integer)
    itemID = Column(Integer)
    warehouseID = Column(Integer)
    quantity = Column(Integer)
    unitPrice = Column(DECIMAL(10, 2))
    description = Column(Unicode(200))
    lastModified = Column(DateTime, server_default=text('(getdate())'))

    items_ = relationship('Items', back_populates='OrderDetails')
    orders_ = relationship('Orders', back_populates='OrderDetails')
    warehouses_ = relationship('Warehouses', back_populates='OrderDetails')


