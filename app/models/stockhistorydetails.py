# ========== StockHistoryDetails ==========
# app/models/stockhistorydetails.py
from __future__ import annotations
import datetime
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .items import Items
    from .warehouses import Warehouses
    from .branches import Branches
    from .company import Company
    from .users import Users

from sqlalchemy import (

    Integer,
    DateTime,
    Unicode,
    Identity,
    PrimaryKeyConstraint,
    ForeignKeyConstraint,
    text,
)
from sqlalchemy.orm import Mapped, relationship, mapped_column

from app.db import Base

class StockHistoryDetails(Base):
    __tablename__ = "StockHistoryDetails"
    __table_args__ = (
        ForeignKeyConstraint(["CompanyID", "BranchID"], ["Branches.CompanyID", "Branches.BranchID"], name="FK_StockHistoryDetails_Branches"),
        ForeignKeyConstraint(["CompanyID"], ["Company.CompanyID"], name="FK_StockHistoryDetails_Company"),
        ForeignKeyConstraint(["UserID"], ["Users.UserID"], name="FK_StockHistoryDetails_Users"),
        ForeignKeyConstraint(["CompanyID", "WarehouseID"], ["Warehouses.CompanyID", "Warehouses.WarehouseID"], name="FK_StockHistoryDetails_Warehouses"),
        ForeignKeyConstraint(["CompanyID", "ItemID"], ["Items.CompanyID", "Items.ItemID"], name="FK_StockHistoryDetails_Items"),
        ForeignKeyConstraint(["CompanyID", "BranchID", "StockHistoryID"], ["StockHistories.CompanyID", "StockHistories.BranchID", "StockHistories.StockHistoryID"], name="FK_StockHistoryDetails_StockHistories"),
        PrimaryKeyConstraint("CompanyID", "BranchID", "StockHistoryID", "StockHistoryDetailID", name="PK_StockHistoryDetails"),
    )

    CompanyID: Mapped[int] = mapped_column(Integer)
    BranchID: Mapped[int] = mapped_column(Integer)
    StockHistoryID: Mapped[int] = mapped_column(Integer)
    StockHistoryDetailID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1))
    ItemID: Mapped[int] = mapped_column(Integer)
    WarehouseID: Mapped[int] = mapped_column(Integer)
    QuantityUpdate: Mapped[int] = mapped_column(Integer)
    QuantityBefore: Mapped[int] = mapped_column(Integer)
    QuantityAfter: Mapped[int] = mapped_column(Integer)
    BatchNumber: Mapped[str] = mapped_column(Unicode(50, "Modern_Spanish_CI_AS"))
    ExpiryDate: Mapped[datetime.datetime] = mapped_column(DateTime)
    Reason: Mapped[str] = mapped_column(Unicode(200, "Modern_Spanish_CI_AS"))
    UserID: Mapped[int] = mapped_column(Integer)

    # Relaciones
    items_: Mapped["Items"] = relationship(
        "Items",
        back_populates="stockHistoryDetails",
        overlaps="stockHistoryDetails",
    )
    warehouses_: Mapped["Warehouses"] = relationship(
        "Warehouses",
        back_populates="stockHistoryDetails",
        overlaps="items_,stockHistoryDetails",
    )
    branches_: Mapped["Branches"] = relationship(
        "Branches",
        back_populates="stockHistoryDetails",
        overlaps="stockHistoryDetails,items_,warehouses_",
    )
    company_: Mapped["Company"] = relationship(
        "Company",
        back_populates="stockHistoryDetails",
        overlaps="branches_,stockHistoryDetails",
        viewonly=True,
    )
    users_: Mapped["Users"] = relationship(
        "Users",
        back_populates="stockHistoryDetails",
        overlaps="stockHistoryDetails",
    )
