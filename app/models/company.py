# ========== Company ===========
# app/models/company.py
from __future__ import annotations
import datetime
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models import itemcategories
    from .branches import Branches
    from .documents import Documents
    from .userapermissions import UserPermissions
    from .items import Items
    from .itemstock import Itemstock
    from .orders import Orders
    from .stockhistories import StockHistories
    from .stockhistorydetails import StockHistoryDetails
    from .tempstockhistorydetails import TempStockHistoryDetails
    from .orderhistory import OrderHistory
    from .temporderdetails import TempOrderDetails
    from .clients import Clients
    from .brands import Brands
    from .suppliers import Suppliers
    from .discounts import Discounts
    from .carmodels import CarModels
    from .creditcards import CreditCards
    from .creditcardgroups import CreditCardGroups
    from .checkmovements import CheckMovements
    from .checks import Checks
    from app.models.banks import Banks
    from app.models.bankaccounts import BankAccounts

from typing import List

from sqlalchemy import Integer, Unicode, Date, LargeBinary, Identity, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, relationship, foreign, mapped_column

from app.db import Base


class Company(Base):
    __tablename__ = 'Company'
    __table_args__ = (
        PrimaryKeyConstraint('CompanyID', name='PK_Company'),
    )

    CompanyID: Mapped[int] = mapped_column(
        Integer, Identity(start=1, increment=1), primary_key=True)
    CompanyName: Mapped[str] = mapped_column(
        Unicode(100, 'Modern_Spanish_CI_AS'))
    Address: Mapped[str] = mapped_column(Unicode(200, 'Modern_Spanish_CI_AS'))
    CUIT: Mapped[str] = mapped_column(Unicode(20, 'Modern_Spanish_CI_AS'))
    GrossIncome: Mapped[str] = mapped_column(
        Unicode(20, 'Modern_Spanish_CI_AS'))
    StartDate: Mapped[datetime.date] = mapped_column(Date)
    Logo: Mapped[bytes] = mapped_column(LargeBinary)

    # Relaciones
    branches: Mapped[List['Branches']] = relationship(
        'Branches', back_populates='company_', viewonly=True)
    documents: Mapped[List['Documents']] = relationship(
        'Documents', back_populates='company_', viewonly=True)
    userPermissions: Mapped[List['UserPermissions']] = relationship(
        'UserPermissions', back_populates='company_', viewonly=True)
    items: Mapped[List['Items']] = relationship(
        'Items',
        back_populates='company_',
        primaryjoin='Company.CompanyID == Items.CompanyID',
        foreign_keys='[Items.CompanyID]',
        viewonly=True
    )

    itemstock: Mapped[List['Itemstock']] = relationship(
        'Itemstock',
        back_populates='company_',
        primaryjoin='Company.CompanyID == Itemstock.CompanyID',
        foreign_keys='[Itemstock.CompanyID]',
        viewonly=True
    )
    orders: Mapped[List['Orders']] = relationship(
        'Orders', back_populates='company_', viewonly=True)
    stockHistoryDetails: Mapped[List['StockHistoryDetails']] = relationship(
        'StockHistoryDetails', back_populates='company_', viewonly=True)

    StockHistories: Mapped[List['StockHistories']] = relationship(
        'StockHistories', back_populates='company_', viewonly=True)

    tempStockHistoryDetails: Mapped[List['TempStockHistoryDetails']] = relationship(
        'TempStockHistoryDetails', back_populates='company_', viewonly=True)
    orderHistory: Mapped[List['OrderHistory']] = relationship(
        'OrderHistory', back_populates='company_', viewonly=True)
    tempOrderDetails: Mapped[List['TempOrderDetails']] = relationship(
        'TempOrderDetails', back_populates='company_', viewonly=True)
    clients: Mapped[List['Clients']] = relationship(
        'Clients',
        back_populates='company_',
        primaryjoin='Company.CompanyID == Clients.CompanyID',
        foreign_keys='[Clients.CompanyID]',
        viewonly=True)
    brands: Mapped[List['Brands']] = relationship(
        'Brands',
        back_populates='company_',
        primaryjoin='Company.CompanyID == Brands.CompanyID',
        foreign_keys='[Brands.CompanyID]'
    )
    suppliers: Mapped[List['Suppliers']] = relationship(
        'Suppliers',
        back_populates='company_',
        primaryjoin='Company.CompanyID == Suppliers.CompanyID',
        foreign_keys='[Suppliers.CompanyID]'
    )
    discounts: Mapped[List['Discounts']] = relationship(
        'Discounts',
        back_populates='company_',
        primaryjoin='Company.CompanyID == Discounts.CompanyID',
        foreign_keys='[Discounts.CompanyID]',
    )
    carModels: Mapped[List['CarModels']] = relationship(
        'CarModels',
        back_populates='company_',
        primaryjoin='Company.CompanyID == CarModels.CompanyID',
        foreign_keys='[CarModels.CompanyID]',
        viewonly=True,
    )

    creditCards_: Mapped[List['CreditCards']] = relationship(
        'CreditCards',
        back_populates='company_',
        primaryjoin='Company.CompanyID == CreditCards.CompanyID',
        foreign_keys='[CreditCards.CompanyID]',
        overlaps='company_',
        viewonly=True,
    )

    creditCardGroups_: Mapped[List['CreditCardGroups']] = relationship(
        'CreditCardGroups',
        back_populates='company_',
        primaryjoin='Company.CompanyID == CreditCardGroups.CompanyID',
        foreign_keys='[CreditCardGroups.CompanyID]',
        viewonly=True,
    )

    banks: Mapped[List['Banks']] = relationship(
        'Banks', back_populates='company_', viewonly=True)
    bankaccounts: Mapped[List['BankAccounts']] = relationship(
        'BankAccounts', back_populates='company_', viewonly=True)
    checks: Mapped[List['Checks']] = relationship(
        'Checks', back_populates='company_', viewonly=True)

    CheckMovements: Mapped[List['CheckMovements']] = relationship(
        'CheckMovements', back_populates='Company_', viewonly=True)
