# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class CreditCards(Base):
    __tablename__ = 'CreditCards'
    __table_args__ = (
        ForeignKeyConstraint(['cardGroupID'], ['CreditCardGroups.CardGroupID'], name='FK_CreditCards_CardGroups'),
        PrimaryKeyConstraint('creditCardID', name='PK_CreditCards')
    )

    creditCardID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    cardName = Column(Unicode(100))
    cardGroupID = Column(Integer)
    isActive = Column(Boolean, server_default=text('((1))'))
    surcharge = Column(DECIMAL(18, 4), server_default=text('((0))'))
    installments = Column(Integer)

    creditCardGroups_ = relationship('CreditCardGroups', back_populates='CreditCards')
    saleConditions = relationship('SaleConditions', back_populates='CreditCards_')


