# ========== RMAs ==========
# app/models/rmas.py
from __future__ import annotations
import datetime
import decimal
from typing import List, Optional, TYPE_CHECKING

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
    from .branches import Branches
    from .users import Users
    from .clients import Clients
    from .suppliers import Suppliers
    from .orders import Orders
    from .purchaseinvoices import PurchaseInvoices  # may not exist yet; keep TYPE_CHECKING only
    from .warehouses import Warehouses
    from .orderhistorydetails import OrderHistoryDetails
    from .pricelists import PriceLists
    from .sysorderstatus import SysOrderStatus
    from .sysrmatypes import SysRmaTypes  # to be added
    from .rmadetails import RMADetails

class RMAs(Base):
    __tablename__ = "RMAs"
    __table_args__ = (
        PrimaryKeyConstraint("CompanyID", "BranchID", "RmaID", name="PK_RMAs"),
        ForeignKeyConstraint(["CompanyID", "BranchID"], ["Branches.CompanyID", "Branches.BranchID"], name="FK_RMAs_Branches"),
        ForeignKeyConstraint(["CompanyID"], ["Company.CompanyID"], name="FK_RMAs_Company"),
        ForeignKeyConstraint(["UserID"], ["Users.UserID"], name="FK_RMAs_Users"),
        ForeignKeyConstraint(["CompanyID", "ClientID"], ["Clients.CompanyID", "Clients.ClientID"], name="FK_RMAs_Clients"),
        ForeignKeyConstraint(["CompanyID", "SupplierID"], ["Suppliers.CompanyID", "Suppliers.SupplierID"], name="FK_RMAs_Suppliers"),
        ForeignKeyConstraint(["CompanyID", "BranchID", "RelatedOrderID"], ["Orders.CompanyID", "Orders.BranchID", "Orders.OrderID"], name="FK_RMAs_Orders"),
        ForeignKeyConstraint(["CompanyID", "BranchID", "RelatedPIID"], ["PurchaseInvoices.CompanyID", "PurchaseInvoices.BranchID", "PurchaseInvoices.PurchaseInvoiceID"], name="FK_RMAs_PurchaseInvoices"),
        ForeignKeyConstraint(["CompanyID", "WarehouseID"], ["Warehouses.CompanyID", "Warehouses.WarehouseID"], name="FK_RMAs_Warehouses"),
        ForeignKeyConstraint(["StatusID"], ["SysOrderStatus.OrderStatusID"], name="FK_RMAs_sysOrderStatus"),
        ForeignKeyConstraint(["RmaTypeID"], ["sysRmaTypes.RmaTypeID"], name="FK_RMAs_sysRmaTypes"),
    )

    CompanyID: Mapped[int] = mapped_column(Integer, nullable=False)
    BranchID: Mapped[int] = mapped_column(Integer, nullable=False)
    RmaID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), nullable=False)
    RmaDate: Mapped[datetime.datetime] = mapped_column(DateTime, server_default=text("(getdate())"), nullable=False)
    RmaTypeID: Mapped[int] = mapped_column(Integer, nullable=False)
    ClientID: Mapped[int] = mapped_column(Integer)
    SupplierID: Mapped[int] = mapped_column(Integer)
    RelatedOrderID: Mapped[int] = mapped_column(Integer)
    RelatedPIID: Mapped[int] = mapped_column(Integer)
    WarehouseID: Mapped[int] = mapped_column(Integer, nullable=False)
    UserID: Mapped[int] = mapped_column(Integer, nullable=False)
    PriceListID: Mapped[int] = mapped_column(Integer)
    DocumentID: Mapped[int] = mapped_column(Integer)
    StatusID: Mapped[int] = mapped_column(Integer, nullable=False)
    Notes: Mapped[str] = mapped_column(Unicode(500, "Modern_Spanish_CI_AS"))
    Subtotal: Mapped[decimal.Decimal] = mapped_column(DECIMAL(18, 2), server_default=text("((0))"), nullable=False)
    VatAmount: Mapped[decimal.Decimal] = mapped_column(DECIMAL(18, 2), server_default=text("((0))"), nullable=False)
    Total: Mapped[decimal.Decimal] = mapped_column(DECIMAL(18, 2), server_default=text("((0))"), nullable=False)

    rmaDetails: Mapped[List["RMADetails"]] = relationship("RMADetails", back_populates="rmas_", cascade="all, delete-orphan")
    users_: Mapped["Users"] = relationship(
        "Users",
        back_populates="rmas",
        overlaps="rmas"
    )
    branches_: Mapped["Branches"] = relationship(
        "Branches",
        back_populates="rmas",
        overlaps="users_"
    )
