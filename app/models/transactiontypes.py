# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class TransactionTypes(Base):
    __tablename__ = 'TransactionTypes'
    __table_args__ = (
        PrimaryKeyConstraint('TransactTypeID', name='PK_TransactionTypes'),
    )

    transactTypeID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    typeName = Column(Unicode(100))

    transactions = relationship('Transactions', back_populates='TransactionTypes_')


