# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class Warehouses(Base):
    __tablename__ = 'Warehouses'
    __table_args__ = (
        PrimaryKeyConstraint('WarehouseID', name='PK__Warehous__2608AFD9216E9B31'),
    )

    warehouseID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    name = Column(Unicode(100))
    addres = Column(Unicode(100))

    items = relationship('Items', back_populates='Warehouses_')
    itemstock = relationship('Itemstock', back_populates='Warehouses_')
    orders = relationship('Orders', back_populates='Warehouses_')
    stockHistory = relationship('StockHistory', back_populates='Warehouses_')
    tempStockEntries = relationship('TempStockEntries', back_populates='Warehouses_')
    orderDetails = relationship('OrderDetails', back_populates='Warehouses_')
    tempOrderDetails = relationship('TempOrderDetails', back_populates='Warehouses_')


