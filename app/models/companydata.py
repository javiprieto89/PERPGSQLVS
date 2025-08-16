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
    from .clients import Clients
    from .brands import Brands

from typing import List

from sqlalchemy import Column, Integer, Unicode, Date, LargeBinary, Identity, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, relationship, foreign


from app.db import Base


class CompanyData(Base):
    __tablename__ = 'CompanyData'
    __table_args__ = (
        PrimaryKeyConstraint(
            'CompanyID', name='PK__CompanyD__2D971C4CF963B1F3'),
    )

    CompanyID = Column(Integer, Identity(
        start=1, increment=1), primary_key=True)
    Name = Column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Address = Column(Unicode(200, 'Modern_Spanish_CI_AS'))
    CUIT = Column(Unicode(20, 'Modern_Spanish_CI_AS'))
    GrossIncome = Column(Unicode(20, 'Modern_Spanish_CI_AS'))
    StartDate = Column(Date)
    Logo = Column(LargeBinary)
