# ========== Branches ===========
# app/models/branches.py
from __future__ import annotations
from typing import List, Optional, TYPE_CHECKING
from sqlalchemy import Column, Integer, Unicode, LargeBinary, ForeignKeyConstraint, PrimaryKeyConstraint, Identity
from sqlalchemy.orm import relationship, Mapped
from app.db import Base

if TYPE_CHECKING:
    from .companydata import CompanyData
    from .documents import Documents
    from .useraccess import UserAccess
    from .items import Items
    from .itemstock import Itemstock
    from .orders import Orders
    from .stockhistory import StockHistory
    from .tempstockentries import TempStockEntries
    from .orderhistory import OrderHistory
    from .temporderdetails import TempOrderDetails
    from .transactions import Transactions


class Branches(Base):
    __tablename__ = 'Branches'
    __table_args__ = (
        ForeignKeyConstraint(['CompanyID'], ['CompanyData.CompanyID'], name='FK__Branches__Compan__398D8EEE'),
        PrimaryKeyConstraint('BranchID', name='PK__Branches__A1682FA515D37C5D')
    )

    BranchID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    CompanyID = Column(Integer)
    Name = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Address = Column(Unicode(200, 'Modern_Spanish_CI_AS'))
    Phone = Column(Unicode(20, 'Modern_Spanish_CI_AS'))
    Logo = Column(LargeBinary)

    # Relaciones
    companyData_: Mapped[CompanyData] = relationship('CompanyData', back_populates='branches')
    documents: Mapped[List[Documents]] = relationship('Documents', back_populates='branches_')
    userAccess: Mapped[List[UserAccess]] = relationship('UserAccess', back_populates='branches_')
    items: Mapped[List[Items]] = relationship('Items', back_populates='branches_')
    itemstock: Mapped[List[Itemstock]] = relationship('Itemstock', back_populates='branches_')
    orders: Mapped[List[Orders]] = relationship('Orders', back_populates='branches_')
    stockHistory: Mapped[List[StockHistory]] = relationship('StockHistory', back_populates='branches_')
    tempStockEntries: Mapped[List[TempStockEntries]] = relationship('TempStockEntries', back_populates='branches_')
    orderHistory: Mapped[List[OrderHistory]] = relationship('OrderHistory', back_populates='branches_')
    tempOrderDetails: Mapped[List[TempOrderDetails]] = relationship('TempOrderDetails', back_populates='branches_')
    transactions: Mapped[List[Transactions]] = relationship('Transactions', back_populates='branches_')