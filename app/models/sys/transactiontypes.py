# ========== SysTransactionTypes ===========
# app/models/sys/transactiontypes.py
from sqlalchemy import Column, Integer, Unicode, Identity, PrimaryKeyConstraint
from app.db import Base


class SysTransactionTypes(Base):
    __tablename__ = 'sysTransactionTypes'
    __table_args__ = (
        PrimaryKeyConstraint('TransactTypeID', name='PK_TransactionTypes'),
    )

    TransactTypeID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    TypeName = Column(Unicode(100, 'Modern_Spanish_CI_AS'), nullable=False)


__all__ = ["SysTransactionTypes"]
