# ========== TransactionTypes ===========
# app/models/transactiontypes.py
from sqlalchemy import Column, Integer, Unicode, Identity, PrimaryKeyConstraint
from app.db import Base


class TransactionTypes(Base):
    __tablename__ = 'TransactionTypes'
    __table_args__ = (
        PrimaryKeyConstraint('TransactTypeID', name='PK_TransactionTypes'),
    )

    TransactTypeID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    YypeName = Column(Unicode(100, 'Modern_Spanish_CI_AS'))