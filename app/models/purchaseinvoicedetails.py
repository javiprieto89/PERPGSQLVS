
from typing import Optional
from sqlalchemy import BigInteger, Integer, ForeignKeyConstraint, PrimaryKeyConstraint, Index, Identity, DECIMAL, text, Unicode
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db import Base
from typing import TYPE_CHECKING
import decimal
if TYPE_CHECKING:
    from .branches import Branches
    from .purchaseinvoices import PurchaseInvoices
    from .items import Items
    from .warehouses import Warehouses
    from .company import Company


class PurchaseInvoiceDetails(Base):
    __tablename__ = 'PurchaseInvoiceDetails'
    __table_args__ = (
        ForeignKeyConstraint(['BranchID'], ['Branches.BranchID'],
                             name='FK_PurchaseInvoiceDetails_Branches'),
        ForeignKeyConstraint(['CompanyID', 'BranchID', 'PurchaseInvoiceID'], ['PurchaseInvoices.CompanyID',
                             'PurchaseInvoices.BranchID', 'PurchaseInvoices.PurchaseInvoiceID'], name='FK_PurchaseInvoiceDetails_PurchaseInvoices'),
        ForeignKeyConstraint(['CompanyID', 'ItemID'], [
                             'Items.CompanyID', 'Items.ItemID'], name='FK_PurchaseInvoiceDetails_Items'),
        ForeignKeyConstraint(['CompanyID', 'WarehouseID'], [
                             'Warehouses.CompanyID', 'Warehouses.WarehouseID'], name='FK_PurchaseInvoiceDetails_Warehouses'),
        ForeignKeyConstraint(['CompanyID'], ['Company.CompanyID'],
                             name='FK_PurchaseInvoiceDetails_CompanyInfo'),
        PrimaryKeyConstraint('CompanyID', 'BranchID', 'PurchaseInvoiceID',
                             'PurchaseInvoiceDetailID', name='PK__Purchase__737EA39C9E0B63A8'),
        Index('IX_FK_FK_PurchaseInvoiceDetails_Branches', 'BranchID'),
        Index('IX_FK_FK_PurchaseInvoiceDetails_Items', 'CompanyID', 'ItemID'),
        Index('IX_FK_FK_PurchaseInvoiceDetails_Warehouses',
              'CompanyID', 'WarehouseID')
    )

    CompanyID: Mapped[int] = mapped_column(Integer, primary_key=True)
    BranchID: Mapped[int] = mapped_column(Integer, primary_key=True)
    PurchaseInvoiceID: Mapped[int] = mapped_column(Integer, primary_key=True)
    PurchaseInvoiceDetailID: Mapped[int] = mapped_column(
        Integer, Identity(start=1, increment=1), primary_key=True)
    ItemID: Mapped[int] = mapped_column(Integer)
    WarehouseID: Mapped[int] = mapped_column(Integer)
    Quantity: Mapped[decimal.Decimal] = mapped_column(DECIMAL(18, 2))
    UnitPrice: Mapped[decimal.Decimal] = mapped_column(DECIMAL(18, 2))
    Notes: Mapped[Optional[str]] = mapped_column(
        Unicode(255, 'Modern_Spanish_CI_AS'))

    Branches_: Mapped['Branches'] = relationship('Branches')
    PurchaseInvoices_: Mapped['PurchaseInvoices'] = relationship(
        'PurchaseInvoices', 
        back_populates='PurchaseInvoiceDetails'
    )
    Items_: Mapped['Items'] = relationship('Items')
    Warehouses_: Mapped['Warehouses'] = relationship('Warehouses')
    Company_: Mapped['Company'] = relationship('Company')
