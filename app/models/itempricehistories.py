# ========== ItemPriceHistories ===========
# app/models/itempricehistories.py
from __future__ import annotations
import datetime
import decimal
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .items import Items
    from .syscurrencies import SysCurrencies
    from .company import Company
    from .branches import Branches
    from .pricelists import PriceLists
    from .users import Users

from sqlalchemy import Integer, DateTime, DECIMAL, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship, mapped_column
from app.db import Base


class ItemPriceHistories(Base):
    __tablename__ = 'ItemPriceHistories'
    __table_args__ = (
        ForeignKeyConstraint(['CompanyID', 'ItemID'], [
                             'Items.CompanyID', 'Items.ItemID'], name='FK_ItemPriceHistories_Items'),
        ForeignKeyConstraint(['CompanyID', 'PriceListID'], [
                             'PriceLists.CompanyID', 'PriceLists.PriceListID'], name='FK_ItemPriceHistories_PriceLists'),
        ForeignKeyConstraint(['CurrencyID'], [
                             'sysCurrencies.CurrencyID'], name='FK_ItemPriceHistories_sysCurrencies'),
        ForeignKeyConstraint(['UserID'], ['Users.UserID'],
                             name='FK_ItemPriceHistories_Users'),
        ForeignKeyConstraint(['BranchID'], ['Branches.BranchID'],
                             name='FK_ItemPriceHistories_Branches'),
        ForeignKeyConstraint(['CompanyID'], ['Company.CompanyID'],
                             name='FK_ItemPriceHistories_CompanyInfo'),
        PrimaryKeyConstraint('CompanyID', 'BranchID', 'ItemID', 'PriceListID',
                             'PriceHistoryID', name='PK__ItemPric__A927CB2BB60ACD35')
    )

    CompanyID: Mapped[int] = mapped_column(Integer)
    BranchID: Mapped[int] = mapped_column(Integer)
    ItemID: Mapped[int] = mapped_column(Integer)
    PriceListID: Mapped[int] = mapped_column(Integer)
    PriceHistoryID: Mapped[int] = mapped_column(
        Integer, Identity(start=1, increment=1))
    EffectiveDate: Mapped[datetime.datetime] = mapped_column(
        DateTime, server_default=text('(getdate())'))
    Price: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 2))
    CurrencyID: Mapped[int] = mapped_column(Integer)
    UserID: Mapped[int] = mapped_column(Integer)

    # Relaciones
    items_: Mapped['Items'] = relationship(
        'Items',
        primaryjoin='and_(ItemPriceHistories.CompanyID == Items.CompanyID, ItemPriceHistories.ItemID == Items.ItemID)',
        foreign_keys=[CompanyID, ItemID],
        back_populates='itemPriceHistory',
        overlaps='priceLists_,branches_',
        viewonly=True
    )

    priceLists_: Mapped['PriceLists'] = relationship(
        'PriceLists',
        primaryjoin='and_(ItemPriceHistories.CompanyID == PriceLists.CompanyID, ItemPriceHistories.PriceListID == PriceLists.PriceListID)',
        foreign_keys=[CompanyID, PriceListID],
        back_populates='ItemPriceHistories',
        overlaps='items_,branches_',
        viewonly=True
    )

    sysCurrencies_: Mapped['SysCurrencies'] = relationship(
        'SysCurrencies',
        primaryjoin='ItemPriceHistories.CurrencyID == SysCurrencies.CurrencyID',
        foreign_keys=[CurrencyID],
        viewonly=True
    )

    users_: Mapped['Users'] = relationship(
        'Users',
        primaryjoin='ItemPriceHistories.UserID == Users.UserID',
        foreign_keys=[UserID],
        viewonly=True
    )

    branches_: Mapped['Branches'] = relationship(
        'Branches',
        primaryjoin='and_(ItemPriceHistories.CompanyID == Branches.CompanyID, ItemPriceHistories.BranchID == Branches.BranchID)',
        foreign_keys=[CompanyID, BranchID],
        overlaps='items_,priceLists_',
        viewonly=True
    )

    company_: Mapped['Company'] = relationship(
        'Company',
        primaryjoin='ItemPriceHistories.CompanyID == Company.CompanyID',
        foreign_keys=[CompanyID],
        viewonly=True
    )
