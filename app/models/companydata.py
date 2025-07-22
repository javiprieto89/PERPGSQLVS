# ========== CompanyData ===========
# app/models/companydata.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models import itemcategories
    from .branches import Branches
    from .documents import Documents
    from .useraccess import UserAccess
    from .items import Items
    from .itemstock import Itemstock
    from .orders import Orders  
    from .stockhistory import StockHistory
    from .tempstockhistorydetails import TempStockHistoryDetails
    from .orderhistory import OrderHistory
    from .temporderdetails import TempOrderDetails

from typing import List

from sqlalchemy import Column, Integer, Unicode, Date, LargeBinary, Identity, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, relationship


from app.db import Base


class CompanyData(Base):
    __tablename__ = 'CompanyData'
    __table_args__ = (
        PrimaryKeyConstraint('CompanyID', name='PK__CompanyD__2D971C4CF963B1F3'),
    )

    CompanyID = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    Name = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Address = Column(Unicode(200, 'Modern_Spanish_CI_AS'))
    CUIT = Column(Unicode(20, 'Modern_Spanish_CI_AS'))
    GrossIncome = Column(Unicode(20, 'Modern_Spanish_CI_AS'))
    StartDate = Column(Date)
    Logo = Column(LargeBinary)

    # Relaciones
    branches: Mapped[List['Branches']] = relationship('Branches', back_populates='companyData_')
    documents: Mapped[List['Documents']] = relationship('Documents', back_populates='companyData_')
    userAccess: Mapped[List['UserAccess']] = relationship('UserAccess', back_populates='companyData_')
    items: Mapped[List['Items']] = relationship('Items', back_populates='companyData_')
    itemstock: Mapped[List['Itemstock']] = relationship('Itemstock', back_populates='companyData_')
    orders: Mapped[List['Orders']] = relationship('Orders', back_populates='companyData_')
    stockHistory: Mapped[List['StockHistory']] = relationship('StockHistory', back_populates='companyData_')
    tempStockHistoryDetails: Mapped[List['TempStockHistoryDetails']] = relationship('TempStockHistoryDetails', back_populates='companyData_')
    orderHistory: Mapped[List['OrderHistory']] = relationship('OrderHistory', back_populates='companyData_')
    tempOrderDetails: Mapped[List['TempOrderDetails']] = relationship('TempOrderDetails', back_populates='companyData_')