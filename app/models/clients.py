# ========== Clients ===========
# app/models/clients.py
from __future__ import annotations
from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.accountbalances import AccountBalances
    from app.models.cars import Cars
    from app.models.orders import Orders
    from app.models.countries import Countries
    from app.models.sysidentitydoctypes import SysIdentityDocTypes
    from app.models.pricelists import PriceLists
    from app.models.provinces import Provinces
    from app.models.vendors import Vendors
    from app.models.branches import Branches
    from app.models.company import Company

from sqlalchemy import Integer, Unicode, Boolean, Date, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship, mapped_column
from app.db import Base

class Clients(Base):
    __tablename__ = 'Clients'
    __table_args__ = (
        ForeignKeyConstraint(['DocTypeID'], ['sysIdentityDocTypes.DocTypeID'], name='FK_Clients_sysIdentityDocTypes'),
        ForeignKeyConstraint(['CompanyID', 'PriceListID'], [
                             'PriceLists.CompanyID', 'PriceLists.PriceListID'], name='FK_Clients_PriceLists'),
        ForeignKeyConstraint(['CountryID', 'ProvinceID'], [
                             'Provinces.CountryID', 'Provinces.ProvinceID'], name='FK_Clients_Provinces'),
        ForeignKeyConstraint(['CompanyID', 'VendorID'], [
                             'Vendors.CompanyID', 'Vendors.VendorID'], name='FK_Clients_Vendors'),
        ForeignKeyConstraint(['CompanyID', 'BranchID'], [
                             'Branches.CompanyID', 'Branches.BranchID'], name='FK_Clients_CompanyBranch'),
        PrimaryKeyConstraint('CompanyID', 'ClientID', name='PK_Clients')
    )

    CompanyID: Mapped[int] = mapped_column(Integer)
    ClientID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1))
    BranchID: Mapped[int] = mapped_column(Integer, nullable=True)
    DocTypeID: Mapped[int] = mapped_column(Integer)
    FirstName: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    IsActive: Mapped[bool] = mapped_column(Boolean, server_default=text('((1))'))
    CountryID: Mapped[int] = mapped_column(Integer)
    ProvinceID: Mapped[int] = mapped_column(Integer)
    PriceListID: Mapped[int] = mapped_column(Integer)
    VendorID: Mapped[int] = mapped_column(Integer, server_default=text('((1))'))
    DocNumber: Mapped[str] = mapped_column(Unicode(50, 'Modern_Spanish_CI_AS'))
    LastName: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Phone: Mapped[str] = mapped_column(Unicode(20, 'Modern_Spanish_CI_AS'))
    Email: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Address: Mapped[str] = mapped_column(Unicode(200, 'Modern_Spanish_CI_AS'))
    City: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    PostalCode: Mapped[str] = mapped_column(Unicode(20, 'Modern_Spanish_CI_AS'))

    # Relaciones
    countries_: Mapped['Countries'] = relationship(
        'Countries',
        back_populates='clients',
        primaryjoin='Clients.CountryID == Countries.CountryID',
        foreign_keys='Clients.CountryID',
    )
    docTypes_: Mapped['SysIdentityDocTypes'] = relationship(
        'SysIdentityDocTypes', back_populates='clients')
    pricelists_: Mapped['PriceLists'] = relationship(
        'PriceLists',
        back_populates='clients',
        overlaps='clients'
    )
    provinces_: Mapped['Provinces'] = relationship(
        'Provinces',
        back_populates='clients',
        overlaps='countries_',
    )
    vendors_: Mapped['Vendors'] = relationship(
        'Vendors',
        back_populates='clients',
        overlaps='clients,pricelists_'
    )
    accountBalances: Mapped[List['AccountBalances']] = relationship(
        'AccountBalances', back_populates='clients_')
    cars: Mapped[List['Cars']] = relationship(
        'Cars',
        back_populates='clients_',
        overlaps='carModels_,cars'
    )
    orders: Mapped[List['Orders']] = relationship(
        'Orders',
        back_populates='clients_',
        overlaps='orders', viewonly=True
    )
    branches_: Mapped['Branches'] = relationship(
        'Branches',
        back_populates='clients',
        primaryjoin='and_(Clients.CompanyID == Branches.CompanyID, Clients.BranchID == Branches.BranchID)',
        foreign_keys='[Clients.CompanyID, Clients.BranchID]',
        overlaps='pricelists_,vendors_'
    )
    company_: Mapped['Company'] = relationship(
        'Company',
        back_populates='clients',
        primaryjoin='Clients.CompanyID == Company.CompanyID',
        foreign_keys='[Clients.CompanyID]',
        overlaps='branches_,clients,pricelists_,vendors_',
        viewonly=True
    )
