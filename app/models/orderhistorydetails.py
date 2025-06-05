# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class OrderHistoryDetails(Base):
    __tablename__ = 'OrderHistoryDetails'
    __table_args__ = (
        ForeignKeyConstraint(['itemID'], ['Items.itemID'], name='FK__OrderHist__ItemI__32AB8735'),
        ForeignKeyConstraint(['orderHistoryID'], ['OrderHistory.orderHistoryID'], name='FK__OrderHist__Histo__31B762FC'),
        PrimaryKeyConstraint('OrderHistoryDetailID', name='PK__OrderHis__D6D0F42ABBC4939A')
    )

    orderHistoryDetailID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    orderHistoryID = Column(Integer)
    itemID = Column(Integer)
    quantity = Column(Integer)
    unitPrice = Column(DECIMAL(10, 2))
    description = Column(Unicode(200))
    lastModified = Column(DateTime, server_default=text('(getdate())'))

    items_ = relationship('Items', back_populates='OrderHistoryDetails')
    orderHistory_ = relationship('OrderHistory', back_populates='OrderHistoryDetails')
