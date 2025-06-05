# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class SaleConditions(Base):
    __tablename__ = 'SaleConditions'
    __table_args__ = (
        ForeignKeyConstraint(['CreditCardID'], ['CreditCards.CreditCardID'], name='FK_SaleConditions_CreditCards'),
        PrimaryKeyConstraint('SaleConditionID', name='PK__SaleCond__22A3A655BD0A6B44')
    )

    saleConditionID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    creditCardID = Column(Integer)
    name = Column(Unicode(100))
    dueDate = Column(Date, server_default=text('(getdate())'))
    surcharge = Column(DECIMAL(10, 2), server_default=text('((0))'))
    isActive = Column(Boolean, server_default=text('((1))'))

    creditCards_ = relationship('CreditCards', back_populates='SaleConditions')
    orders = relationship('Orders', back_populates='SaleConditions_')


