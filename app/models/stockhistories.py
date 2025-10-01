# ========== StockHistories ==========
# app/models/stockhistories.py
from __future__ import annotations
import datetime
from typing import TYPE_CHECKING

from sqlalchemy import (

    Integer,
    DateTime,
    Unicode,
    ForeignKeyConstraint,
    PrimaryKeyConstraint,
    Identity,
    text,
)
from sqlalchemy.orm import Mapped, relationship, mapped_column

from app.db import Base

if TYPE_CHECKING:
    from .branches import Branches
    from .company import Company  
    from .users import Users

class StockHistories(Base):
    __tablename__ = "StockHistories"
    __table_args__ = (
        PrimaryKeyConstraint("CompanyID", "BranchID", "StockHistoryID", name="PK_StockHistories"),
        ForeignKeyConstraint(["BranchID"], ["Branches.BranchID"], name="FK_StockHistories_Branches"),
        ForeignKeyConstraint(["CompanyID"], ["Company.CompanyID"], name="FK_StockHistories_Company"),
        ForeignKeyConstraint(["UserID"], ["Users.UserID"], name="FK_StockHistories_Users"),
    )

    CompanyID: Mapped[int] = mapped_column(Integer, nullable=False)
    BranchID: Mapped[int] = mapped_column(Integer, nullable=False)
    StockHistoryID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), nullable=False)
    UserID: Mapped[int] = mapped_column(Integer, nullable=False)
    TransactionDate: Mapped[datetime.datetime] = mapped_column(DateTime, server_default=text("(getdate())"), nullable=False)
    Reason: Mapped[str] = mapped_column(Unicode(200, "Modern_Spanish_CI_AS"))
    Notes: Mapped[str] = mapped_column(Unicode(255, "Modern_Spanish_CI_AS"))
    
    branches_: Mapped["Branches"] = relationship("Branches", back_populates="stockHistories")
    users_: Mapped["Users"] = relationship("Users", back_populates="stockHistories")
    company_: Mapped["Company"] = relationship(
        "Company",
        back_populates='StockHistories',
        overlaps='stockHistoryDetails'
    )
