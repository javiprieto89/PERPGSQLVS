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
    from .itemstock import ItemStock
    from .orders import Orders
    from .stockhistory import StockHistory
    from .tempstockhistorydetails import TempStockHistoryDetails
    from .orderhistory import OrderHistory
    from .temporderdetails import TempOrderDetails
    from .transactions import Transactions
    from .cashboxes import CashBoxes
    from .clients import Clients
    from .suppliers import Suppliers


class Branches(Base):
    __tablename__ = 'Branches'
    __table_args__ = (
        ForeignKeyConstraint(
            ["CompanyID"], ["CompanyData.CompanyID"],
            name="FK_Branches_CompanyData",
        ),
        PrimaryKeyConstraint("CompanyID", "BranchID", name="PK_Branches"),
    )

    CompanyID = Column(Integer, primary_key=True)
    BranchID = Column(Integer, Identity(
        start=1, increment=1), primary_key=True)
    Name = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Address = Column(Unicode(200, 'Modern_Spanish_CI_AS'))
    Phone = Column(Unicode(20, 'Modern_Spanish_CI_AS'))
    Logo = Column(LargeBinary)

    # Relaciones
    companyData_: Mapped[Optional['CompanyData']] = relationship(
        'CompanyData', back_populates='branches')
    documents: Mapped[List["Documents"]] = relationship(
        "Documents",
        back_populates="branches_"
    )
    clients: Mapped[List['Clients']] = relationship(
        'Clients', back_populates='branches_')
    suppliers: Mapped[List['Suppliers']] = relationship(
        'Suppliers', back_populates='branches_')
    transactions: Mapped[List['Transactions']] = relationship(
        'Transactions', back_populates='branches_')
    orderHistory_: Mapped[List['OrderHistory']] = relationship(
        'OrderHistory', back_populates='branches_')
    tempOrderDetails: Mapped[List['TempOrderDetails']] = relationship(
        'TempOrderDetails', back_populates='branches_')
    tempStockHistoryDetails: Mapped[List['TempStockHistoryDetails']] = relationship(
        'TempStockHistoryDetails', back_populates='branches_')
    cashBoxes: Mapped[List['CashBoxes']] = relationship(
        'CashBoxes', back_populates='branches_')

    @property
    def CompanyData(self) -> Optional['CompanyData']:
        return self.companyData_

    @CompanyData.setter
    def CompanyData(self, value: Optional['CompanyData']) -> None:
        self.companyData_ = value
