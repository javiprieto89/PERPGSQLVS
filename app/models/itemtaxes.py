# ========== ItemTaxes ===========
# app/models/itemtaxes.py
from __future__ import annotations

from sqlalchemy import (
    Column,
    Integer,
    Identity,
    PrimaryKeyConstraint,
    ForeignKeyConstraint,
)
from sqlalchemy.orm import Mapped, relationship

from app.db import Base


class ItemTaxes(Base):
    __tablename__ = 'ItemTaxes'
    __table_args__ = (
        ForeignKeyConstraint(['CompanyID', 'BranchID'], ['Branches.CompanyID', 'Branches.BranchID'], name='FK_ItemTaxes_CompanyBranch'),
        ForeignKeyConstraint(['ItemID'], ['Items.ItemID'], name='FK_ItemTaxes_Item'),
        ForeignKeyConstraint(['TaxID'], ['Taxes.TaxID'], name='FK_ItemTaxes_Tax'),
        PrimaryKeyConstraint('ItemTaxID', name='PK__ItemTaxe__0E367AA2F11B9CE0'),
    )

    ItemTaxID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    CompanyID = Column(Integer, nullable=False)
    BranchID = Column(Integer, nullable=False)
    ItemID = Column(Integer, nullable=False)
    TaxID = Column(Integer, nullable=False)
