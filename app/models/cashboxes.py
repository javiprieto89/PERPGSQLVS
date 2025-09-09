# ========== CashBoxes ===========
# app/models/cashboxes.py
from __future__ import annotations
from typing import List, Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .branches import Branches
    from .users import Users
    from .cashboxmovements import CashBoxMovements

from sqlalchemy import (
    Column,
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
from sqlalchemy.orm import Mapped, relationship
from app.db import Base


class CashBoxes(Base):
    __tablename__ = "CashBoxes"
    __table_args__ = (
        ForeignKeyConstraint(["CompanyID", "BranchID"], ["Branches.CompanyID", "Branches.BranchID"], name="FK_CashBoxes_CompanyBranch"),
        ForeignKeyConstraint(["UserID"], ["Users.UserID"], name="FK_CashBoxes_User"),
        PrimaryKeyConstraint("CashBoxID", name="PK_CashBoxes"),
    )

    CashBoxID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    CompanyID = Column(Integer)
    BranchID = Column(Integer)
    Name = Column(Unicode(100, "Modern_Spanish_CI_AS"))
    Description = Column(Unicode(255, "Modern_Spanish_CI_AS"))
    IsActive = Column(Boolean, server_default=text("((1))"))
    OpenDate = Column(DateTime)
    CloseDate = Column(DateTime)
    InitialBalance = Column(DECIMAL(18, 2), server_default=text("((0))"))
    CurrentBalance = Column(DECIMAL(18, 2), server_default=text("((0))"))
    UserID = Column(Integer)
    Notes = Column(Unicode(255, "Modern_Spanish_CI_AS"))

    # Relaciones
    branches_: Mapped[Branches] = relationship("Branches", back_populates="cashBoxes")
    users_: Mapped[Optional[Users]] = relationship("Users", back_populates="cashBoxes")
    cashBoxMovements: Mapped[List[CashBoxMovements]] = relationship("CashBoxMovements", back_populates="cashBoxes_")


