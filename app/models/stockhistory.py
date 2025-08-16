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
        ForeignKeyConstraint(["CompanyID", "BranchID"], [
                             "Branches.CompanyID", "Branches.BranchID"], name="FK_StockHistory_CompanyBranch"),
        ForeignKeyConstraint(["ItemID"], ["Items.ItemID"],
                             name="FK_StockHistory_Items"),
        ForeignKeyConstraint(["UserID"], ["Users.UserID"],
                             name="FK_StockHistory_Users"),
        ForeignKeyConstraint(["WarehouseID"], [
                             "Warehouses.WarehouseID"], name="FK_StockHistory_Warehouses"),
        PrimaryKeyConstraint(
            "StockHistoryID", name="PK__StockHis__A6CE86DBEB46B995")
    )

    StockHistoryID = Column(Integer, Identity(
        start=1, increment=1), primary_key=True)
    CompanyID = Column(Integer, nullable=False)
    BranchID = Column(Integer, nullable=False)
    UserID = Column(Integer, nullable=False)
    ItemID = Column(Integer, nullable=False)
    WarehouseID = Column(Integer, nullable=False)
    QuantityUpdate = Column(Integer, nullable=False)
    QuantityBefore = Column(Integer, nullable=False)
    QuantityAfter = Column(Integer, nullable=False)
    TransactionDate = Column(
        DateTime, server_default=text("(getdate())"), nullable=False)
    Reason = Column(Unicode(200, "Modern_Spanish_CI_AS"), nullable=True)
    TransactionType = Column(
        Unicode(50, "Modern_Spanish_CI_AS"), nullable=True)
    Notes = Column(Unicode(255, "Modern_Spanish_CI_AS"), nullable=True)

    # Relaciones simétricas y exactas según el SQL definitivo
    # No se definen relaciones inversas aquí, solo FK explícitas
