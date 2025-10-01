# ========== RMADetails ==========
# app/models/rmadetails.py
from __future__ import annotations
import datetime
import decimal
from typing import TYPE_CHECKING

from sqlalchemy import (

    Integer,
    DateTime,
    Unicode,
    DECIMAL,
    ForeignKeyConstraint,
    PrimaryKeyConstraint,
    Identity,
    text,
)
from sqlalchemy.orm import Mapped, relationship, mapped_column

from app.db import Base

if TYPE_CHECKING:
    from .rmas import RMAs
    from .items import Items
    from .warehouses import Warehouses

class RMADetails(Base):
    __tablename__ = "RMADetails"
    __table_args__ = (
        PrimaryKeyConstraint("CompanyID", "BranchID", "RmaID", "RmaDetailID", name="PK_RMADetails"),
        ForeignKeyConstraint(["CompanyID", "RmaID", "BranchID"], ["RMAs.CompanyID", "RMAs.RmaID", "RMAs.BranchID"], name="FK_RMADetails_RMAs", ondelete="CASCADE"),
        ForeignKeyConstraint(["CompanyID", "ItemID"], ["Items.CompanyID", "Items.ItemID"], name="FK_RMADetails_Items"),
        ForeignKeyConstraint(["CompanyID", "WarehouseID"], ["Warehouses.CompanyID", "Warehouses.WarehouseID"], name="FK_RMADetails_Warehouses"),
    )

    CompanyID: Mapped[int] = mapped_column(Integer, nullable=False)
    BranchID: Mapped[int] = mapped_column(Integer, nullable=False)
    RmaID: Mapped[int] = mapped_column(Integer, nullable=False)
    RmaDetailID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), nullable=False)
    ItemID: Mapped[int] = mapped_column(Integer, nullable=False)
    WarehouseID: Mapped[int] = mapped_column(Integer, nullable=False)
    Quantity: Mapped[decimal.Decimal] = mapped_column(DECIMAL(18, 2), nullable=False)
    UnitPrice: Mapped[decimal.Decimal] = mapped_column(DECIMAL(18, 2), nullable=False)
    LineDescription: Mapped[str] = mapped_column(Unicode(200, "Modern_Spanish_CI_AS"))
    LastModified: Mapped[datetime.datetime] = mapped_column(DateTime, server_default=text("(getdate())"), nullable=False)

    rmas_: Mapped["RMAs"] = relationship("RMAs", back_populates="rmaDetails")
