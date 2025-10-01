# ========== ItemTaxes ===========
# app/models/itemtaxes.py
from __future__ import annotations

from sqlalchemy import (

    Integer,
    Identity,
    PrimaryKeyConstraint,
    ForeignKeyConstraint,
)
from sqlalchemy.orm import Mapped, relationship, mapped_column

from app.db import Base

class ItemTaxes(Base):
    __tablename__ = 'ItemTaxes'
    __table_args__ = (
        ForeignKeyConstraint(['CompanyID', 'BranchID'], ['Branches.CompanyID', 'Branches.BranchID'], name='FK_ItemTaxes_CompanyBranch'),
        ForeignKeyConstraint(['CompanyID','ItemID'], ['Items.CompanyID','Items.ItemID'], name='FK_ItemTaxes_Items'),
        ForeignKeyConstraint(['CompanyID','BranchID','TaxID'], ['Taxes.CompanyID','Taxes.BranchID','Taxes.TaxID'], name='FK_ItemTaxes_Taxes'),
        PrimaryKeyConstraint('CompanyID','BranchID','ItemID','TaxID', name='PK_ItemTaxes'),
    )

    CompanyID: Mapped[int] = mapped_column(Integer, nullable=False)
    BranchID: Mapped[int] = mapped_column(Integer, nullable=False)
    ItemID: Mapped[int] = mapped_column(Integer, nullable=False)
    TaxID: Mapped[int] = mapped_column(Integer, nullable=False)
