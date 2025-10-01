# ========== Branches ===========
# app/models/branches.py
from __future__ import annotations
from typing import List, Optional, TYPE_CHECKING
from sqlalchemy import Integer, Unicode, LargeBinary, ForeignKeyConstraint, PrimaryKeyConstraint, Identity
from sqlalchemy.orm import relationship, Mapped, mapped_column
from app.db import Base

if TYPE_CHECKING:
    from .company import Company  # TODO: rename to Company
    from .documents import Documents  # TODO: rename to CommercialDocuments
    from .userapermissions import UserPermissions  # TODO: rename to UserPermissions
    from .items import Items
    from .itemstock import Itemstock
    from .orders import Orders
    from .stockhistories import StockHistories
    from .stockhistorydetails import StockHistoryDetails
    from .tempstockhistorydetails import TempStockHistoryDetails
    from .orderhistory import OrderHistory
    from .temporderdetails import TempOrderDetails
    from .transactions import Transactions
    from .cashboxes import CashBoxes
    from .clients import Clients
    from .rmas import RMAs

class Branches(Base):
    __tablename__ = 'Branches'
    __table_args__ = (
        ForeignKeyConstraint(
            ["CompanyID"], ["Company.CompanyID"], name="FK_Branches_Company"),
        PrimaryKeyConstraint("BranchID", name="PK_Branches"),
    )

    CompanyID: Mapped[int] = mapped_column(Integer, nullable=False)
    BranchID: Mapped[int] = mapped_column(Integer, Identity( start=1, increment=1), primary_key=True)
    BranchName: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Address: Mapped[str] = mapped_column(Unicode(200, 'Modern_Spanish_CI_AS'))
    Phone: Mapped[str] = mapped_column(Unicode(20, 'Modern_Spanish_CI_AS'))
    Logo: Mapped[bytes] = mapped_column(LargeBinary)

    # Relaciones
    company_: Mapped[Company] = relationship(
        'Company',
        back_populates='branches',
        viewonly=True
    )
    documents: Mapped[List[Documents]] = relationship(
        'Documents', back_populates='branches_')
    userPermissions: Mapped[List[UserPermissions]] = relationship(
        'UserPermissions', back_populates='branches_')
    items: Mapped[List[Items]] = relationship(
        'Items', back_populates='branches_')
    itemstock: Mapped[List[Itemstock]] = relationship(
        'Itemstock', back_populates='branches_')
    orders: Mapped[List[Orders]] = relationship(
        'Orders', back_populates='branches_')
    stockHistoryDetails: Mapped[List[StockHistoryDetails]] = relationship(
        'StockHistoryDetails', back_populates='branches_')
    stockHistories: Mapped[List['StockHistories']] = relationship(
        'StockHistories', back_populates='branches_')
    tempStockHistoryDetails: Mapped[List[TempStockHistoryDetails]] = relationship(
        'TempStockHistoryDetails', back_populates='branches_')
    orderHistory: Mapped[List[OrderHistory]] = relationship(
        'OrderHistory', back_populates='branches_')
    tempOrderDetails: Mapped[List[TempOrderDetails]] = relationship(
        'TempOrderDetails', back_populates='branches_')
    transactions: Mapped[List[Transactions]] = relationship(
        'Transactions', back_populates='branches_')
    cashBoxes: Mapped[List[CashBoxes]] = relationship(
        'CashBoxes', back_populates='branches_')
    clients: Mapped[List['Clients']] = relationship(
        'Clients',
        back_populates='branches_',
        primaryjoin='and_(Branches.CompanyID == foreign(Clients.CompanyID), Branches.BranchID == foreign(Clients.BranchID))',
        foreign_keys='[Clients.CompanyID, Clients.BranchID]'
    )
    rmas: Mapped[List['RMAs']] = relationship(
        'RMAs', back_populates='branches_')
