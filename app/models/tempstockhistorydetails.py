# ========== TempStockHistoryDetails ===========
# app/models/tempstockhistorydetails.py
from __future__ import annotations
from typing import TYPE_CHECKING, Optional

if TYPE_CHECKING:
    from .branches import Branches
    from .companydata import CompanyData
    from .items import Items
    from .users import Users
    from .warehouses import Warehouses

from sqlalchemy import (
    Column,
    Integer,
    DateTime,
    Unicode,
    Boolean,
    Uuid,
    Identity,
    PrimaryKeyConstraint,
    ForeignKeyConstraint,
    text,
)
from sqlalchemy.orm import Mapped, relationship

from app.db import Base


class TempStockHistoryDetails(Base):
    __tablename__ = "TempStockHistoryDetails"
    __table_args__ = (
        ForeignKeyConstraint(
            ["CompanyID", "BranchID"],
            ["Branches.CompanyID", "Branches.BranchID"],
            name="FK__TempStock__Branc__160F4887",
        ),
        ForeignKeyConstraint(
            ["CompanyID"],
            ["CompanyData.CompanyID"],
            name="FK__TempStock__Compa__151B244E",
        ),
        ForeignKeyConstraint(
            ["ItemID"], ["Items.ItemID"], name="FK__TempStock__ItemI__17F790F9"
        ),
        ForeignKeyConstraint(
            ["UserID"], ["Users.UserID"], name="FK__TempStock__UserI__17036CC0"
        ),
        ForeignKeyConstraint(
            ["WarehouseID"],
            ["Warehouses.WarehouseID"],
            name="FK__TempStock__Wareh__18EBB532",
        ),
        PrimaryKeyConstraint("TempStockEntryID", name="PK__TempStoc__6BCFA2A4F18BE300"),
    )

    TempStockEntryID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    CompanyID = Column(Integer)
    BranchID = Column(Integer)
    UniqueID = Column(Uuid, server_default=text("(newid())"))
    SessionID = Column(Unicode(100, "Modern_Spanish_CI_AS"))
    UserID = Column(Integer)
    ItemID = Column(Integer)
    WarehouseID = Column(Integer)
    Quantity = Column(Integer)
    EntryDate = Column(DateTime, server_default=text("(getdate())"))
    Reason = Column(Unicode(200, "Modern_Spanish_CI_AS"))
    IsProcessed = Column(Boolean, server_default=text("((0))"))

    # Relaciones
    branches_: Mapped["Branches"] = relationship(
        "Branches",
        back_populates="tempStockHistoryDetails",
        overlaps="tempStockHistoryDetails"
    )
    companyData_: Mapped["CompanyData"] = relationship(
        "CompanyData",
        back_populates="tempStockHistoryDetails",
        overlaps="branches_,tempStockHistoryDetails"
    )
    items_: Mapped["Items"] = relationship(
        "Items", back_populates="tempStockHistoryDetails"
    )
    users_: Mapped["Users"] = relationship(
        "Users", back_populates="tempStockHistoryDetails"
    )
    warehouses_: Mapped["Warehouses"] = relationship(
        "Warehouses", back_populates="tempStockHistoryDetails"
    )

