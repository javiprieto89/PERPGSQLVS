# ========== CashBoxMovements ===========
# app/models/cashboxmovements.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .cashboxes import CashBoxes
    from .branches import Branches
    from .users import Users

from sqlalchemy import (
    Column,
    Integer,
    Unicode,
    DECIMAL,
    DateTime,
    Identity,
    PrimaryKeyConstraint,
    ForeignKeyConstraint,
    text,
)
from sqlalchemy.orm import Mapped, relationship
from app.db import Base


class CashBoxMovements(Base):
    __tablename__ = "CashBoxMovements"
    __table_args__ = (
        ForeignKeyConstraint(["CashBoxID"], ["CashBoxes.CashBoxID"], name="FK_CashBoxMovements_CashBox"),
        ForeignKeyConstraint(["CompanyID", "BranchID"], ["Branches.CompanyID", "Branches.BranchID"], name="FK_CashBoxMovements_CompanyBranch"),
        ForeignKeyConstraint(["UserID"], ["Users.UserID"], name="FK_CashBoxMovements_User"),
        PrimaryKeyConstraint("CashBoxMovementID", name="PK_CashBoxMovements"),
    )

    CashBoxMovementID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    CashBoxID = Column(Integer)
    CompanyID = Column(Integer)
    BranchID = Column(Integer)
    MovementDate = Column(DateTime, server_default=text("(getdate())"))
    Amount = Column(DECIMAL(18, 2))
    MovementType = Column(Unicode(50, "Modern_Spanish_CI_AS"))
    Description = Column(Unicode(255, "Modern_Spanish_CI_AS"))
    UserID = Column(Integer)
    Notes = Column(Unicode(255, "Modern_Spanish_CI_AS"))

    # Relaciones
    cashBoxes_: Mapped[CashBoxes] = relationship("CashBoxes", back_populates="cashBoxMovements")
    branches_: Mapped[Branches] = relationship("Branches")
    users_: Mapped[Optional[Users]] = relationship("Users", back_populates="cashBoxMovements")


