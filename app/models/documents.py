# ========== Documents ===========
# app/models/documents.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .branches import Branches
    from .companydata import CompanyData
    from .sysdocumenttypes import SysDocumentTypes

from typing import List

from sqlalchemy import Column, Integer, Unicode, Boolean, LargeBinary, Identity, PrimaryKeyConstraint, ForeignKeyConstraint, text
from sqlalchemy.orm import Mapped, relationship
#from .branches import Branches
#from .companydata import CompanyData    
#from .documenttypes import DocumentTypes    
from app.db import Base


class Documents(Base):
    __tablename__ = 'Documents'
    __table_args__ = (
        ForeignKeyConstraint(
            ["CompanyID", "BranchID"],
            ["Branches.CompanyID", "Branches.BranchID"],
            name="FK_Documents_Branches",
        ),
        ForeignKeyConstraint(['DocumentTypeID'], ['SysDocumentTypes.DocumentTypeID'], name='FK_Documents_SysDocumentTypes'),
        PrimaryKeyConstraint('DocumentID', name='PK__Document__1ABEEF6F4A2B1589')
    )

    DocumentID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    CompanyID = Column(Integer)
    BranchID = Column(Integer)
    DocumentTypeID = Column(Integer)
    Description = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    DocumentNumber = Column(Integer)
    PointOfSale = Column(Integer)
    IsActive = Column(Boolean, server_default=text('((1))'))
    Testing = Column(Boolean, server_default=text('((0))'))
    ShouldAccount = Column(Boolean)
    MovesStock = Column(Boolean)
    IsFiscal = Column(Boolean)
    IsElectronic = Column(Boolean)
    IsManual = Column(Boolean)
    IsQuotation = Column(Boolean)
    MaxItems = Column(Integer)

    # Relaciones
    branches_: Mapped['Branches'] = relationship('Branches', back_populates='documents')
    companyData_: Mapped['CompanyData'] = relationship('CompanyData', back_populates='documents')
    sysDocumentTypes_: Mapped['SysDocumentTypes'] = relationship('SysDocumentTypes', back_populates='documents')