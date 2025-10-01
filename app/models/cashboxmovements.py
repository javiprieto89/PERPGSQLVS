# ========== CashBoxMovements ===========
# app/models/cashboxmovements.py
from __future__ import annotations
import datetime
import decimal
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .cashboxes import CashBoxes
    from .branches import Branches
    from .users import Users

from sqlalchemy import (

    Integer,
    Unicode,
    DECIMAL,
    DateTime,
    Identity,
    PrimaryKeyConstraint,
    ForeignKeyConstraint,
    text,
)
from sqlalchemy.orm import Mapped, relationship, mapped_column
from app.db import Base

class CashBoxMovements(Base):
    __tablename__ = "CashBoxMovements"
    __table_args__ = (
        ForeignKeyConstraint(["CashBoxID"], ["CashBoxes.CashBoxID"], name="FK_CashBoxMovements_CashBox"),
        ForeignKeyConstraint(["CompanyID", "BranchID"], ["Branches.CompanyID", "Branches.BranchID"], name="FK_CashBoxMovements_CompanyBranch"),
        ForeignKeyConstraint(["UserID"], ["Users.UserID"], name="FK_CashBoxMovements_User"),
        PrimaryKeyConstraint("CashBoxMovementID", name="PK_CashBoxMovements"),
    )

    CashBoxMovementID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    CashBoxID: Mapped[int] = mapped_column(Integer)
    CompanyID: Mapped[int] = mapped_column(Integer)
    BranchID: Mapped[int] = mapped_column(Integer)
    MovementDate: Mapped[datetime.datetime] = mapped_column(DateTime, server_default=text("(getdate())"))
    Amount: Mapped[decimal.Decimal] = mapped_column(DECIMAL(18, 2))
    MovementType: Mapped[str] = mapped_column(Unicode(50, "Modern_Spanish_CI_AS"))
    Description: Mapped[str] = mapped_column(Unicode(255, "Modern_Spanish_CI_AS"))
    UserID: Mapped[int] = mapped_column(Integer)
    Notes: Mapped[str] = mapped_column(Unicode(255, "Modern_Spanish_CI_AS"))

    # Relaciones
    cashBoxes_: Mapped[CashBoxes] = relationship("CashBoxes", back_populates="cashBoxMovements")
    branches_: Mapped[Branches] = relationship("Branches")
    users_: Mapped[Optional[Users]] = relationship("Users", back_populates="cashBoxMovements")
