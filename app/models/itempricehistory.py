# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class ItemPriceHistory(Base):
    __tablename__ = 'ItemPriceHistory'
    __table_args__ = (
        ForeignKeyConstraint(['itemID'], ['Items.itemID'], name='FK__ItemPrice__ItemI__367C1819'),
        PrimaryKeyConstraint('priceHistoryID', name='PK__ItemPric__A927CB2BB60ACD35')
    )

    priceHistoryID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    itemID = Column(Integer)
    effectiveDate = Column(DateTime, server_default=text('(getdate())'))
    price = Column(DECIMAL(10, 2))

    items_ = relationship('Items', back_populates='ItemPriceHistory')


