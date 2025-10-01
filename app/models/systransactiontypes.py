from sqlalchemy.orm import Mapped, mapped_column
# ========== SysTransactionTypes ===========
# app/models/systransactiontypes.py
from sqlalchemy import Integer, Unicode, Identity, PrimaryKeyConstraint
from app.db import Base


class SysTransactionTypes(Base):  # <--- nombre de clase corregido
    __tablename__ = 'sysTransactionTypes'
    __table_args__ = (
        PrimaryKeyConstraint('TransactTypeID', name='PK_TransactionTypes'),
    )

    TransactTypeID: Mapped[int] = mapped_column(
        Integer, Identity(start=1, increment=1), primary_key=True)
    TypeName: Mapped[str] = mapped_column(
        Unicode(100, 'Modern_Spanish_CI_AS'))  # <--- typo corregido
