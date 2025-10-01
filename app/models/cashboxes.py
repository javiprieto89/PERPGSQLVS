# ========== CashBoxes ===========
# app/models/cashboxes.py
from __future__ import annotations
import datetime
import decimal
from typing import List, Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .branches import Branches
    from .users import Users
    from .cashboxmovements import CashBoxMovements

from sqlalchemy import (

    Integer,
    Unicode,
    DECIMAL,
    DateTime,
    Boolean,
    Identity,
    PrimaryKeyConstraint,
    ForeignKeyConstraint,
    text,
)
from sqlalchemy.orm import Mapped, relationship, mapped_column
from app.db import Base

class CashBoxes(Base):
    __tablename__ = "CashBoxes"
    __table_args__ = (
        ForeignKeyConstraint(["CompanyID", "BranchID"], ["Branches.CompanyID", "Branches.BranchID"], name="FK_CashBoxes_CompanyBranch"),
        ForeignKeyConstraint(["UserID"], ["Users.UserID"], name="FK_CashBoxes_User"),
        PrimaryKeyConstraint("CashBoxID", name="PK_CashBoxes"),
    )

    CashBoxID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    CompanyID: Mapped[int] = mapped_column(Integer)
    BranchID: Mapped[int] = mapped_column(Integer)
    Name: Mapped[str] = mapped_column(Unicode(100, "Modern_Spanish_CI_AS"))
    Description: Mapped[str] = mapped_column(Unicode(255, "Modern_Spanish_CI_AS"))
    IsActive: Mapped[bool] = mapped_column(Boolean, server_default=text("((1))"))
    OpenDate: Mapped[datetime.datetime] = mapped_column(DateTime)
    CloseDate: Mapped[datetime.datetime] = mapped_column(DateTime)
    InitialBalance: Mapped[decimal.Decimal] = mapped_column(DECIMAL(18, 2), server_default=text("((0))"))
    CurrentBalance: Mapped[decimal.Decimal] = mapped_column(DECIMAL(18, 2), server_default=text("((0))"))
    UserID: Mapped[int] = mapped_column(Integer)
    Notes: Mapped[str] = mapped_column(Unicode(255, "Modern_Spanish_CI_AS"))

    # Relaciones
    branches_: Mapped[Branches] = relationship("Branches", back_populates="cashBoxes")
    users_: Mapped[Optional[Users]] = relationship("Users", back_populates="cashBoxes")
    cashBoxMovements: Mapped[List[CashBoxMovements]] = relationship("CashBoxMovements", back_populates="cashBoxes_")
