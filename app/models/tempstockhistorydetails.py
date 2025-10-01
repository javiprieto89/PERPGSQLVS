# ========== TempStockHistoryDetails ===========
# app/models/tempstockhistorydetails.py
from __future__ import annotations
import uuid
import datetime
from typing import TYPE_CHECKING, Optional

if TYPE_CHECKING:
    from .branches import Branches
    from .company import Company
    from .items import Items
    from .users import Users
    from .warehouses import Warehouses

from sqlalchemy import (

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
from sqlalchemy.orm import Mapped, relationship, mapped_column

from app.db import Base

class TempStockHistoryDetails(Base):
    __tablename__ = "TempStockHistoryDetails"
    __table_args__ = (
        ForeignKeyConstraint(
            ["CompanyID", "BranchID"],
            ["Branches.CompanyID", "Branches.BranchID"],
            name="FK__TempStock__Branc__160F4887",
        ),
        ForeignKeyConstraint(["CompanyID"], ["Company.CompanyID"],
                             name="FK_TempStockHistoryDetails_Company"),
        ForeignKeyConstraint(["CompanyID", "ItemID"], [
                             "Items.CompanyID", "Items.ItemID"], name="FK_TempStockHistoryDetails_Items"),
        ForeignKeyConstraint(["UserID"], ["Users.UserID"],
                             name="FK_TempStockHistoryDetails_Users"),
        ForeignKeyConstraint(["CompanyID", "WarehouseID"], [
                             "Warehouses.CompanyID", "Warehouses.WarehouseID"], name="FK_TempStockHistoryDetails_Warehouses"),
        PrimaryKeyConstraint("TempStockEntryID",
                             name="PK__TempStoc__6BCFA2A4F18BE300"),
    )

    TempStockEntryID: Mapped[int] = mapped_column(Integer, Identity( start=1, increment=1), primary_key=True)
    CompanyID: Mapped[int] = mapped_column(Integer)
    BranchID: Mapped[int] = mapped_column(Integer)
    UniqueID: Mapped[uuid.UUID] = mapped_column(Uuid, server_default=text("(newid())"))
    SessionID: Mapped[str] = mapped_column(Unicode(100, "Modern_Spanish_CI_AS"))
    UserID: Mapped[int] = mapped_column(Integer)
    ItemID: Mapped[int] = mapped_column(Integer)
    WarehouseID: Mapped[int] = mapped_column(Integer)
    Quantity: Mapped[int] = mapped_column(Integer)
    EntryDate: Mapped[datetime.datetime] = mapped_column(DateTime, server_default=text("(getdate())"))
    Reason: Mapped[str] = mapped_column(Unicode(200, "Modern_Spanish_CI_AS"))
    IsProcessed: Mapped[bool] = mapped_column(Boolean, server_default=text("((0))"))

    # Relaciones
    branches_: Mapped["Branches"] = relationship(
        "Branches",
        back_populates="tempStockHistoryDetails",
        overlaps="tempStockHistoryDetails"
    )
    company_: Mapped["Company"] = relationship(
        "Company",
        back_populates="tempStockHistoryDetails",
        overlaps="branches_,tempStockHistoryDetails",
        viewonly=True
    )
    items_: Mapped["Items"] = relationship(
        "Items",
        back_populates="tempStockHistoryDetails",
        overlaps="branches_,tempStockHistoryDetails,tempStockHistoryDetails"
    )
    users_: Mapped["Users"] = relationship(
        "Users",
        back_populates="tempStockHistoryDetails",
        overlaps="branches_,items_,tempStockHistoryDetails,tempStockHistoryDetails,tempStockHistoryDetails"
    )
    warehouses_: Mapped["Warehouses"] = relationship(
        "Warehouses",
        back_populates="tempStockHistoryDetails",
        overlaps="branches_,items_,tempStockHistoryDetails,tempStockHistoryDetails,tempStockHistoryDetails,users_"
    )
