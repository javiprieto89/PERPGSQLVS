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

from typing import List

from sqlalchemy import Integer, Unicode, Date, LargeBinary, Identity, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, relationship, foreign, mapped_column

from app.db import Base

class Company(Base):
    __tablename__ = 'Company'
    __table_args__ = (
        PrimaryKeyConstraint('CompanyID', name='PK_Company'),
    )

    CompanyID: Mapped[int] = mapped_column(Integer, Identity( start=1, increment=1), primary_key=True)
    CompanyName: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Address: Mapped[str] = mapped_column(Unicode(200, 'Modern_Spanish_CI_AS'))
    CUIT: Mapped[str] = mapped_column(Unicode(20, 'Modern_Spanish_CI_AS'))
    GrossIncome: Mapped[str] = mapped_column(Unicode(20, 'Modern_Spanish_CI_AS'))
    StartDate: Mapped[datetime.date] = mapped_column(Date)
    Logo: Mapped[bytes] = mapped_column(LargeBinary)

    # Relaciones
    branches: Mapped[List['Branches']] = relationship(
        'Branches', back_populates='company_')
    documents: Mapped[List['Documents']] = relationship(
        'Documents',
        back_populates='company_',
        primaryjoin='Company.CompanyID == Documents.CompanyID',
        foreign_keys='Documents.CompanyID',
        overlaps='documents'
    )
    userPermissions: Mapped[List['UserPermissions']] = relationship(
        'UserPermissions', back_populates='company_', overlaps='userPermissions'
    )
    items: Mapped[List['Items']] = relationship(
        'Items',
        back_populates='company_',
        primaryjoin='Company.CompanyID == Items.CompanyID',
        foreign_keys='Items.CompanyID',
        overlaps='branches,items'
    )

    itemstock: Mapped[List['Itemstock']] = relationship(
        'Itemstock',
        back_populates='company_',
        primaryjoin='Company.CompanyID == Itemstock.CompanyID',
        foreign_keys='Itemstock.CompanyID',
        overlaps='branches,itemstock'
    )
    orders: Mapped[List['Orders']] = relationship(
        'Orders', back_populates='company_', overlaps='orders'
    )
    stockHistoryDetails: Mapped[List['StockHistoryDetails']] = relationship(
        'StockHistoryDetails', back_populates='company_', overlaps='stockHistoryDetails'
    )

    StockHistories: Mapped[List['StockHistories']] = relationship(
        'StockHistories', back_populates='company_', overlaps='stockHistories')

    tempStockHistoryDetails: Mapped[List['TempStockHistoryDetails']] = relationship(
        'TempStockHistoryDetails', back_populates='company_', overlaps='tempStockHistoryDetails'
    )
    orderHistory: Mapped[List['OrderHistory']] = relationship(
        'OrderHistory', back_populates='company_', overlaps='orderHistory'
    )
    tempOrderDetails: Mapped[List['TempOrderDetails']] = relationship(
        'TempOrderDetails', back_populates='company_', overlaps='tempOrderDetails'
    )
    clients: Mapped[List['Clients']] = relationship(
        'Clients',
        back_populates='company_',
        primaryjoin='Company.CompanyID == Clients.CompanyID',
        foreign_keys='[Clients.CompanyID]',
        overlaps='branches_,clients'
    )
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
