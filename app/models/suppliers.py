# ========== Suppliers ===========
# app/models/suppliers.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .countries import Countries
    from .sysdoctypes import SysDocTypes
    from .provinces import Provinces
    from .accountbalances import AccountBalances
    from .items import Items
    from .itemstock import Itemstock
    from .orderhistory import OrderHistory
    from .branches import Branches
    from .companydata import CompanyData

from typing import List

from sqlalchemy import Column, Integer, Unicode, Boolean, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship

from app.db import Base


class Suppliers(Base):
    __tablename__ = 'Suppliers'
    __table_args__ = (
        ForeignKeyConstraint(
            ['DocTypeID'], ['SysDocTypes.DocTypeID'], name='FK_Suppliers_SysDocTypes'),
        ForeignKeyConstraint(
            ['CountryID'], ['Countries.CountryID'], name='FK_Suppliers_Countries'),
        ForeignKeyConstraint(
            ['CountryID', 'ProvinceID'],
            ['Provinces.CountryID', 'Provinces.ProvinceID'],
            name='FK__Suppliers__Provi__44FF419A',
        ),
        ForeignKeyConstraint(
            ['CompanyID'], ['CompanyData.CompanyID'], name='FK_Suppliers_CompanyData'),
        ForeignKeyConstraint(
            ['CompanyID', 'BranchID'],
            ['Branches.CompanyID', 'Branches.BranchID'],
            name='FK_Suppliers_Branches',
        ),
        PrimaryKeyConstraint(
            'SupplierID', name='PK__Supplier__4BE6669487E21347')
    )

    SupplierID = Column(Integer, Identity(
        start=1, increment=1), primary_key=True)
    CompanyID = Column(Integer)
    BranchID = Column(Integer)
    DocTypeID = Column(Integer)
    FirstName = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    IsActive = Column(Boolean, server_default=text('((1))'))
    CountryID = Column(Integer)
    ProvinceID = Column(Integer)
    DocNumber = Column(Unicode(50, 'Modern_Spanish_CI_AS'))
    LastName = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Phone = Column(Unicode(20, 'Modern_Spanish_CI_AS'))
    Email = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Address = Column(Unicode(200, 'Modern_Spanish_CI_AS'))
    City = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    PostalCode = Column(Unicode(20, 'Modern_Spanish_CI_AS'))

    # Relaciones
    docTypes_: Mapped[Optional['SysDocTypes']] = relationship(
        'SysDocTypes', back_populates='suppliers')
    countries_: Mapped[Optional['Countries']] = relationship(
        'Countries', back_populates='suppliers', overlaps='provinces_')
    provinces_: Mapped[Optional['Provinces']] = relationship(
        'Provinces', back_populates='suppliers', overlaps='countries_')
    branches_: Mapped[Optional['Branches']] = relationship(
        'Branches', back_populates='suppliers')
    companyData_: Mapped[Optional['CompanyData']] = relationship(
        'CompanyData', back_populates='suppliers', overlaps='branches_,suppliers')
