# ========== Documents ===========
# app/models/documents.py
from __future__ import annotations
import datetime
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .branches import Branches
    from .company import Company
    from .sysdocumenttypes import SysDocumentTypes
    from .sysfiscaldoctypes import SysFiscalDocTypes

from typing import List

from sqlalchemy import Integer, Unicode, Boolean, LargeBinary, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, text, Date
from sqlalchemy.orm import Mapped, relationship, foreign, mapped_column
# from .branches import Branches
# from .company import Company
# from .documenttypes import DocumentTypes
from app.db import Base


class Documents(Base):
    __tablename__ = 'CommercialDocuments'
    __table_args__ = (
        ForeignKeyConstraint(["CompanyID", "BranchID"], [
                             "Branches.CompanyID", "Branches.BranchID"], name="FK_CommercialDocuments_Branches"),
        ForeignKeyConstraint(['DocumentTypeID'], [
                             'sysFiscalDocTypes.DocumentTypeID'], name='FK_CommercialDocuments_sysFiscalDocTypes'),
        ForeignKeyConstraint(['CompanyID'], ['Company.CompanyID'],
                             name='FK_CommercialDocuments_Company'),
        PrimaryKeyConstraint('CompanyID', 'BranchID',
                             'DocumentID', name='PK_CommercialDocuments')
    )

    DocumentID: Mapped[int] = mapped_column(
        Integer, Identity(start=1, increment=1))
    CompanyID: Mapped[int] = mapped_column(Integer)
    BranchID: Mapped[int] = mapped_column(Integer)
    DocumentTypeID: Mapped[int] = mapped_column(Integer)
    CurrencyID: Mapped[int] = mapped_column(Integer)
    DocumentDescription: Mapped[str] = mapped_column(
        Unicode(100, 'Modern_Spanish_CI_AS'))
    DocumentNumber: Mapped[int] = mapped_column(Integer)
    PointOfSale: Mapped[int] = mapped_column(Integer)
    IsFiscal: Mapped[bool] = mapped_column(Boolean)
    IsElectronic: Mapped[bool] = mapped_column(Boolean)
    IsManual: Mapped[bool] = mapped_column(Boolean)
    IsQuotation: Mapped[bool] = mapped_column(Boolean)
    IsActive: Mapped[bool] = mapped_column(
        Boolean, server_default=text('((1))'))
    IsTest: Mapped[bool] = mapped_column(Boolean, server_default=text('((0))'))
    MaxItems: Mapped[int] = mapped_column(Integer)
    ShouldAccount: Mapped[bool] = mapped_column(Boolean)
    AffectsStock: Mapped[bool] = mapped_column(Boolean)
    FromDate: Mapped[datetime.date] = mapped_column(Date)

    # Relaciones
    branches_: Mapped['Branches'] = relationship(
        'Branches',
        back_populates='documents',
        overlaps='documents'
    )
    company_: Mapped['Company'] = relationship(
        'Company',
        back_populates='documents',
        primaryjoin='foreign(Documents.CompanyID) == Company.CompanyID',
        foreign_keys='Documents.CompanyID',
        overlaps='branches_,documents',
        viewonly=True
    )
    fiscalDocType: Mapped['SysFiscalDocTypes'] = relationship(
        'SysFiscalDocTypes',
        back_populates='documents',
        primaryjoin='foreign(Documents.DocumentTypeID) == SysFiscalDocTypes.DocumentTypeID',
        foreign_keys='Documents.DocumentTypeID',
        viewonly=True
    )
