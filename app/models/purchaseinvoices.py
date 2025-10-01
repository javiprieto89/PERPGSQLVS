# ========== PurchaseInvoices ==========
# app/models/purchaseinvoices.py
from __future__ import annotations
import datetime
import decimal
from typing import TYPE_CHECKING

from sqlalchemy import (

    Integer,
    Unicode,
    DateTime,
    Boolean,
    DECIMAL,
    Identity,
    PrimaryKeyConstraint,
    ForeignKeyConstraint,
)
from sqlalchemy.orm import relationship, Mapped, mapped_column

from app.db import Base

class PurchaseInvoices(Base):
    __tablename__ = 'PurchaseInvoices'
    __table_args__ = (
        ForeignKeyConstraint(['CompanyID'], ['Company.CompanyID'], name='FK_PurchaseInvoices_Company'),
        ForeignKeyConstraint(['BranchID'], ['Branches.BranchID'], name='FK_PurchaseInvoices_Branches'),
        ForeignKeyConstraint(['CompanyID','SupplierID'], ['Suppliers.CompanyID','Suppliers.SupplierID'], name='FK_PurchaseInvoices_Suppliers'),
        ForeignKeyConstraint(['UserID'], ['Users.UserID'], name='FK_PurchaseInvoices_Users'),
        PrimaryKeyConstraint('CompanyID','BranchID','PurchaseInvoiceID', name='PK_PurchaseInvoices'),
    )

    CompanyID: Mapped[int] = mapped_column(Integer)
    BranchID: Mapped[int] = mapped_column(Integer)
    PurchaseInvoiceID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1))
    SupplierID: Mapped[int] = mapped_column(Integer)
    UserID: Mapped[int] = mapped_column(Integer)
    InvoiceNumber: Mapped[str] = mapped_column(Unicode(50, 'Modern_Spanish_CI_AS'))
    InvoiceDate: Mapped[datetime.datetime] = mapped_column(DateTime)
    TotalAmount: Mapped[decimal.Decimal] = mapped_column(DECIMAL(18, 2))
    IsPaid: Mapped[bool] = mapped_column(Boolean)
    PaymentDate: Mapped[datetime.datetime] = mapped_column(DateTime)
    Notes: Mapped[str] = mapped_column(Unicode(255, 'Modern_Spanish_CI_AS'))
