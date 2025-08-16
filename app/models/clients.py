# ========== Clients ===========
# app/models/clients.py
from __future__ import annotations
from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.vendors import Vendors
    from app.models.accountbalances import AccountBalances
    from app.models.cars import Cars
    from app.models.orders import Orders
    from app.models.countries import Countries
    from app.models.sysdoctypes import SysDocTypes
    from app.models.pricelists import PriceLists
    from app.models.provinces import Provinces
    from app.models.vendors import Vendors
    from app.models.branches import Branches
    from app.models.companydata import CompanyData

from sqlalchemy import Column, Integer, Unicode, Boolean, Date, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship
from app.db import Base


class Clients(Base):
    __tablename__ = 'Clients'
    __table_args__ = (
        ForeignKeyConstraint(
            ['DocTypeID'], ['SysDocTypes.DocTypeID'], name='FK_Clients_SysDocTypes'),
        ForeignKeyConstraint(
            ['PriceListID'], ['PriceLists.PriceListID'], name='FK_Clients_PriceLists'),
        ForeignKeyConstraint(
            ['CountryID'], ['Countries.CountryID'], name='FK_Clients_Countries'),
        ForeignKeyConstraint(
            ['CountryID', 'ProvinceID'],
            ['Provinces.CountryID', 'Provinces.ProvinceID'],
            name='FK_Clients_Provinces',
        ),
        ForeignKeyConstraint(
            ['VendorID'], ['Vendors.VendorID'], name='FK_Clients_Vendors'),
        ForeignKeyConstraint(
            ['CompanyID', 'BranchID'],
            ['Branches.CompanyID', 'Branches.BranchID'],
            name='FK_Clients_Branches',
        ),
        PrimaryKeyConstraint('ClientID', name='PK__Clients__E67E1A048D5F930D')
    )

    ClientID = Column(Integer, Identity(
        start=1, increment=1), primary_key=True)
    CompanyID = Column(Integer)
    BranchID = Column(Integer)
    DocTypeID = Column(Integer)
    FirstName = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    IsActive = Column(Boolean, server_default=text('((1))'))
    CountryID = Column(Integer)
    ProvinceID = Column(Integer)
    PriceListID = Column(Integer)
    VendorID = Column(Integer, server_default=text('((1))'))
    DocNumber = Column(Unicode(50, 'Modern_Spanish_CI_AS'))
    LastName = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Phone = Column(Unicode(20, 'Modern_Spanish_CI_AS'))
    Email = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Address = Column(Unicode(200, 'Modern_Spanish_CI_AS'))
    City = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    PostalCode = Column(Unicode(20, 'Modern_Spanish_CI_AS'))

    # Relaciones
    docTypes_: Mapped["SysDocTypes"] = relationship(
        "SysDocTypes", back_populates="clients")
    countries_: Mapped["Countries"] = relationship(
        "Countries", back_populates="clients")
    provinces_: Mapped["Provinces"] = relationship(
        "Provinces", back_populates="clients")
    pricelists_: Mapped["PriceLists"] = relationship(
        "PriceLists", back_populates="clients")
    vendors_: Mapped["Vendors"] = relationship(
        "Vendors", back_populates="clients")
    branches_: Mapped["Branches"] = relationship(
        "Branches", back_populates="clients")
    companyData_: Mapped["CompanyData"] = relationship(
        "CompanyData", back_populates="clients")
