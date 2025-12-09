# ========== Suppliers ===========
# app/models/suppliers.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .countries import Countries
    from .sysidentitydoctypes import SysIdentityDocTypes
    from .provinces import Provinces
    from .accountbalances import AccountBalances
    from .items import Items
    from .itemstock import Itemstock
    from .orderhistory import OrderHistory
    from .company import Company

from typing import List

from sqlalchemy import Integer, Unicode, Boolean, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship, mapped_column

from app.db import Base


class Suppliers(Base):
    __tablename__ = 'Suppliers'
    __table_args__ = (
        ForeignKeyConstraint(['DocTypeID'], [
                             'sysIdentityDocTypes.DocTypeID'], name='FK_Suppliers_sysIdentityDocTypes'),
        ForeignKeyConstraint(['CountryID', 'ProvinceID'], [
                             'Provinces.CountryID', 'Provinces.ProvinceID'], name='FK_Suppliers_Provinces'),
        ForeignKeyConstraint(
            ['CompanyID'], ['Company.CompanyID'], name='FK_Suppliers_Company'),
        PrimaryKeyConstraint('CompanyID', 'SupplierID', name='PK_Suppliers')
    )

    SupplierID: Mapped[int] = mapped_column(
        Integer, Identity(start=1, increment=1))
    CompanyID: Mapped[int] = mapped_column(Integer)
    DocTypeID: Mapped[int] = mapped_column(Integer)
    FirstName: Mapped[str] = mapped_column(
        Unicode(100, 'Modern_Spanish_CI_AS'))
    IsActive: Mapped[bool] = mapped_column(
        Boolean, server_default=text('((1))'))
    CountryID: Mapped[int] = mapped_column(Integer)
    ProvinceID: Mapped[int] = mapped_column(Integer)
    DocNumber: Mapped[str] = mapped_column(Unicode(50, 'Modern_Spanish_CI_AS'))
    LastName: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Phone: Mapped[str] = mapped_column(Unicode(20, 'Modern_Spanish_CI_AS'))
    Email: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Address: Mapped[str] = mapped_column(Unicode(200, 'Modern_Spanish_CI_AS'))
    City: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    PostalCode: Mapped[str] = mapped_column(
        Unicode(20, 'Modern_Spanish_CI_AS'))

    # Relaciones
    countries_: Mapped['Countries'] = relationship(
        'Countries',
        back_populates='suppliers',
        primaryjoin='Suppliers.CountryID == Countries.CountryID',
        foreign_keys='Suppliers.CountryID',
        overlaps='suppliers'
    )
    docTypes_: Mapped['SysIdentityDocTypes'] = relationship(
        'SysIdentityDocTypes', back_populates='suppliers')
    provinces_: Mapped['Provinces'] = relationship(
        'Provinces',
        back_populates='suppliers',
        overlaps='countries_,suppliers'
    )
    company_: Mapped['Company'] = relationship(
        'Company',
        back_populates='suppliers',
        primaryjoin='foreign(Suppliers.CompanyID) == Company.CompanyID',
        foreign_keys='Suppliers.CompanyID',
        viewonly=True
    )
    accountBalances: Mapped[List['AccountBalances']] = relationship(
        'AccountBalances', back_populates='suppliers_')
    items: Mapped[List['Items']] = relationship(
        'Items',
        back_populates='suppliers_',
        overlaps='items'
    )
    itemstock: Mapped[List['Itemstock']] = relationship(
        'Itemstock',
        back_populates='suppliers_',
        overlaps='itemstock'
    )
    orderHistory: Mapped[List['OrderHistory']] = relationship(
        'OrderHistory', back_populates='suppliers_')
