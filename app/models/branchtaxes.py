# ========== BranchTaxes ==========
# app/models/branchtaxes.py
from __future__ import annotations
import datetime
import decimal

from sqlalchemy import (

    Integer,
    Date,
    Boolean,
    DECIMAL,
    ForeignKeyConstraint,
    PrimaryKeyConstraint,
    text,
)
from sqlalchemy.orm import relationship, Mapped, mapped_column

from app.db import Base

class BranchTaxes(Base):
    __tablename__ = "BranchTaxes"
    __table_args__ = (
        PrimaryKeyConstraint("CompanyID", "BranchID", "TaxID", name="PK_BranchTaxes"),
        ForeignKeyConstraint(["BranchID"], ["Branches.BranchID"], name="FK_BranchTaxes_Branches"),
        ForeignKeyConstraint(["CompanyID"], ["Company.CompanyID"], name="FK_BranchTaxes_Company"),
        ForeignKeyConstraint(["CompanyID", "BranchID", "TaxID"], ["Taxes.CompanyID", "Taxes.BranchID", "Taxes.TaxID"], name="FK_BranchTaxes_Taxes"),
    )

    CompanyID: Mapped[int] = mapped_column(Integer, nullable=False)
    BranchID: Mapped[int] = mapped_column(Integer, nullable=False)
    TaxID: Mapped[int] = mapped_column(Integer, nullable=False)
    Rate: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 4), server_default=text("((0))"), nullable=False)
    FromDate: Mapped[datetime.date] = mapped_column(Date, server_default=text("('19000101')"), nullable=False)
    ToDate: Mapped[datetime.date] = mapped_column(Date)
    IsActive: Mapped[bool] = mapped_column(Boolean, server_default=text("((1))"), nullable=False)
