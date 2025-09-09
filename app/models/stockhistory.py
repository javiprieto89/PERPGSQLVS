# ========== StockHistory ===========
# app/models/stockhistory.py
from __future__ import annotations
from typing import TYPE_CHECKING, Optional

if TYPE_CHECKING:
    from .items import Items
    from .warehouses import Warehouses
    from .branches import Branches
    from .companydata import CompanyData
    from .users import Users

from sqlalchemy import (
    Column,
    Integer,
    DateTime,
    Unicode,
    Identity,
    PrimaryKeyConstraint,
    ForeignKeyConstraint,
    text,
)
from sqlalchemy.orm import Mapped, relationship

from app.db import Base


class StockHistory(Base):
    __tablename__ = "StockHistory"
    __table_args__ = (
        ForeignKeyConstraint(
            ["ItemID"], ["Items.ItemID"], name="FK__StockHist__ItemI__7A672E12"
        ),
        ForeignKeyConstraint(
            ["WarehouseID"],
            ["Warehouses.WarehouseID"],
            name="FK__StockHist__Wareh__7B5B524B",
        ),
        ForeignKeyConstraint(
            ["CompanyID", "BranchID"],
            ["Branches.CompanyID", "Branches.BranchID"],
            name="FK_StockHistory_Branches",
        ),
        ForeignKeyConstraint(
            ["CompanyID"], ["CompanyData.CompanyID"], name="FK_StockHistory_CompanyData"
        ),
        ForeignKeyConstraint(
            ["UserID"], ["Users.UserID"], name="FK_StockHistory_Users"
        ),
        PrimaryKeyConstraint("StockHistoryID", name="PK__StockHis__A6CE86DBEB46B995"),
    )

    StockHistoryID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    ItemID = Column(Integer)
    CompanyID = Column(Integer)
    BranchID = Column(Integer)
    WarehouseID = Column(Integer)
    QuantityUpdate = Column(Integer)
    QuantityBefore = Column(Integer)
    QuantityAfter = Column(Integer)
    TransactionDate = Column(DateTime, server_default=text("(getdate())"))
    Reason = Column(Unicode(200, "Modern_Spanish_CI_AS"))
    UserID = Column(Integer)

    # Relaciones
    items_: Mapped["Items"] = relationship("Items", back_populates="stockHistory")
    warehouses_: Mapped["Warehouses"] = relationship(
        "Warehouses", back_populates="stockHistory"
    )
    branches_: Mapped["Branches"] = relationship(
        "Branches",
        back_populates="stockHistory",
        overlaps="stockHistory"
    )
    companyData_: Mapped["CompanyData"] = relationship(
        "CompanyData",
        back_populates="stockHistory",
        overlaps="branches_,stockHistory"
    )
    users_: Mapped["Users"] = relationship("Users", back_populates="stockHistory")

