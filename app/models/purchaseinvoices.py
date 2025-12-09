# app/models/purchaseinvoices.py - VERSIÓN COMPLETA
# Resumen: Modelo SQLAlchemy para facturas de compra (PurchaseInvoices), con relaciones completas y FKs compuestas.

from __future__ import annotations
import datetime
import decimal
from typing import TYPE_CHECKING, List, Optional

from sqlalchemy import (
    Integer,
    Unicode,
    Date,
    DateTime,
    Boolean,
    DECIMAL,
    Identity,
    PrimaryKeyConstraint,
    ForeignKeyConstraint,
)
from sqlalchemy.orm import relationship, Mapped, mapped_column
from app.db import Base

if TYPE_CHECKING:
    from .branches import Branches
    from .suppliers import Suppliers
    from .users import Users
    from .company import Company
    from .purchaseinvoicedetails import PurchaseInvoiceDetails


class PurchaseInvoices(Base):
    __tablename__ = "PurchaseInvoices"
    __table_args__ = (
        ForeignKeyConstraint(
            ["CompanyID"], ["Company.CompanyID"], name="FK_PurchaseInvoices_Company"),
        ForeignKeyConstraint(["BranchID"], ["Branches.BranchID"],
                             name="FK_PurchaseInvoices_Branches"),
        ForeignKeyConstraint(["CompanyID", "SupplierID"], [
                             "Suppliers.CompanyID", "Suppliers.SupplierID"], name="FK_PurchaseInvoices_Suppliers"),
        ForeignKeyConstraint(["UserID"], ["Users.UserID"],
                             name="FK_PurchaseInvoices_Users"),
        PrimaryKeyConstraint("CompanyID", "BranchID",
                             "PurchaseInvoiceID", name="PK_PurchaseInvoices"),
    )

    CompanyID: Mapped[int] = mapped_column(Integer, primary_key=True)
    BranchID: Mapped[int] = mapped_column(Integer, primary_key=True)
    PurchaseInvoiceID: Mapped[int] = mapped_column(
        Integer, Identity(start=1, increment=1), primary_key=True)
    SupplierID: Mapped[int] = mapped_column(Integer, nullable=False)
    UserID: Mapped[int] = mapped_column(Integer, nullable=False)
    InvoiceNumber: Mapped[str] = mapped_column(
        Unicode(50, "Modern_Spanish_CI_AS"), nullable=False)
    InvoiceDate: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    TotalAmount: Mapped[decimal.Decimal] = mapped_column(
        DECIMAL(18, 2), nullable=False)
    IsPaid: Mapped[bool] = mapped_column(
        Boolean, nullable=False, default=False)
    PaymentDate: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, nullable=True)
    Notes: Mapped[Optional[str]] = mapped_column(
        Unicode(255, "Modern_Spanish_CI_AS"))
    # Relaciones ORM
    Company_: Mapped["Company"] = relationship("Company")
    Branches_: Mapped["Branches"] = relationship("Branches")
    Suppliers_: Mapped["Suppliers"] = relationship("Suppliers")
    Users_: Mapped["Users"] = relationship("Users")
    PurchaseInvoiceDetails: Mapped[List["PurchaseInvoiceDetails"]] = relationship(
        "PurchaseInvoiceDetails",
        back_populates="PurchaseInvoices_"
    )

    def __repr__(self) -> str:
        return f"<PurchaseInvoices ID={self.PurchaseInvoiceID} SupplierID={self.SupplierID} Total={self.TotalAmount}>"
