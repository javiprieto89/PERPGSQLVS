# ========== Orders ==========
# app/models/orders.py
from __future__ import annotations
import datetime
import decimal
from typing import List, Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .branches import Branches
    from .cars import Cars
    from .clients import Clients
    from .company import Company
    from .discounts import Discounts
    from .documents import Documents
    from .sysorderstatus import SysOrderStatus
    from .pricelists import PriceLists
    from .saleconditions import SaleConditions
    from .servicetype import ServiceTypes
    from .users import Users
    from .vendors import Vendors
    from .warehouses import Warehouses
    from .orderdetails import OrderDetails
    from .orderhistory import OrderHistory
    from .temporderdetails import TempOrderDetails

from sqlalchemy import (
    Integer,
    Unicode,
    Boolean,
    DateTime,
    DECIMAL,
    Identity,
    PrimaryKeyConstraint,
    ForeignKeyConstraint,
    Index,
    text,
)
from sqlalchemy.orm import Mapped, relationship, mapped_column

from app.db import Base


class Orders(Base):
    __tablename__ = "Orders"
    __table_args__ = (
        ForeignKeyConstraint(
            ["BranchID"], ["Branches.BranchID"], name="FK_Orders_Branches"),
        ForeignKeyConstraint(
            ["CompanyID"], ["Company.CompanyID"], name="FK_Orders_Company"),
        ForeignKeyConstraint(["CompanyID", "ClientID"], [
                             "Clients.CompanyID", "Clients.ClientID"], name="FK_Orders_Clients"),
        ForeignKeyConstraint(["CompanyID", "CarID"], [
                             "Cars.CompanyID", "Cars.CarID"], name="FK_Orders_Cars"),
        ForeignKeyConstraint(["CompanyID", "ServiceTypeID"], [
                             "ServiceTypes.CompanyID", "ServiceTypes.ServiceTypeID"], name="FK_Orders_ServiceTypes"),
        ForeignKeyConstraint(["CompanyID", "SaleConditionID"], [
                             "SaleConditions.CompanyID", "SaleConditions.SaleConditionID"], name="FK_Orders_SaleConditions"),
        ForeignKeyConstraint(["CompanyID", "DiscountID"], [
                             "Discounts.CompanyID", "Discounts.DiscountID"], name="FK_Orders_Discounts"),
        ForeignKeyConstraint(["CompanyID", "PriceListID"], [
                             "PriceLists.CompanyID", "PriceLists.PriceListID"], name="FK_Orders_PriceLists"),
        ForeignKeyConstraint(
            ["CompanyID", "BranchID", "DocumentID"],
            ["CommercialDocuments.CompanyID", "CommercialDocuments.BranchID",
                "CommercialDocuments.DocumentID"],
            name="FK_Orders_CommercialDocuments",
        ),
        ForeignKeyConstraint(["OrderStatusID"], [
                             "SysOrderStatus.OrderStatusID"], name="FK_Orders_sysOrderStatus"),
        ForeignKeyConstraint(["UserID"], ["Users.UserID"],
                             name="FK_Orders_Users"),
        ForeignKeyConstraint(["CompanyID", "WarehouseID"], [
                             "Warehouses.CompanyID", "Warehouses.WarehouseID"], name="FK_Orders_Warehouses"),
        ForeignKeyConstraint(["CompanyID", "VendorID"], [
                             "Vendors.CompanyID", "Vendors.VendorID"], name="FK_Orders_Vendors"),
        PrimaryKeyConstraint("CompanyID", "BranchID",
                             "OrderID", name="PK_Orders"),
        Index("idx_clientID", "ClientID"),
        Index("idx_companyID", "CompanyID"),
        Index("idx_OrderDate", "OrderDate"),
    )

    CompanyID: Mapped[int] = mapped_column(Integer, nullable=False)
    BranchID: Mapped[int] = mapped_column(Integer, nullable=False)
    OrderID: Mapped[int] = mapped_column(
        Integer, Identity(start=1, increment=1), nullable=False)
    OrderDate: Mapped[datetime.datetime] = mapped_column(
        DateTime, server_default=text("(getdate())"), nullable=False
    )
    ClientID: Mapped[int] = mapped_column(Integer, nullable=False)
    CarID: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    IsService: Mapped[Optional[bool]] = mapped_column(Boolean, nullable=True)
    ServiceTypeID: Mapped[Optional[int]] = mapped_column(
        Integer, nullable=True)
    Mileage: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    NextServiceMileage: Mapped[Optional[int]
                               ] = mapped_column(Integer, nullable=True)
    Notes: Mapped[Optional[str]] = mapped_column(
        Unicode(500, "Modern_Spanish_CI_AS"), nullable=True)
    SaleConditionID: Mapped[Optional[int]
                            ] = mapped_column(Integer, nullable=True)
    DiscountID: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    Subtotal: Mapped[decimal.Decimal] = mapped_column(
        DECIMAL(10, 2), nullable=False)
    DiscountAmount: Mapped[decimal.Decimal] = mapped_column(
        DECIMAL(10, 2), server_default=text("((0))"), nullable=False
    )
    TotalTaxAmount: Mapped[decimal.Decimal] = mapped_column(
        DECIMAL(10, 2), server_default=text("((0))"), nullable=False
    )
    Total: Mapped[decimal.Decimal] = mapped_column(
        DECIMAL(10, 2), nullable=False)
    UserID: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    DocumentID: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    PriceListID: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    OrderStatusID: Mapped[Optional[int]] = mapped_column(
        Integer, nullable=True)
    WarehouseID: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    VendorID: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)

    # Relaciones
    branches_: Mapped["Branches"] = relationship(
        "Branches",
        back_populates="orders",
        overlaps="orders,cars_",
    )
    cars_: Mapped[Optional["Cars"]] = relationship(
        "Cars",
        primaryjoin="and_(Orders.CompanyID == Cars.CompanyID, Orders.CarID == Cars.CarID)",
        foreign_keys=[CompanyID, CarID],
        back_populates="orders",
        overlaps="orders,cars_",
    )
    clients_: Mapped["Clients"] = relationship(
        "Clients",
        back_populates="orders",
        overlaps="branches_,orders,cars_", viewonly=True
    )
    company_: Mapped["Company"] = relationship(
        "Company",
        back_populates="orders",
        overlaps="branches_,orders,cars_",
        viewonly=True,
    )
    discounts_: Mapped[Optional["Discounts"]] = relationship(
        "Discounts",
        back_populates="orders",
        overlaps="branches_,clients_,orders,cars_", viewonly=True
    )
    orderStatus_: Mapped[Optional["SysOrderStatus"]] = relationship(
        "SysOrderStatus",
        back_populates="orders",
        foreign_keys=[OrderStatusID],
    )
    priceLists_: Mapped[Optional["PriceLists"]] = relationship(
        "PriceLists",
        back_populates="orders",
        overlaps="branches_,clients_,discounts_,orders,cars_", viewonly=True
    )
    saleConditions_: Mapped[Optional["SaleConditions"]] = relationship(
        "SaleConditions",
        back_populates="orders",
        overlaps="branches_,clients_,discounts_,orders,priceLists_,cars_", viewonly=True
    )
    serviceType_: Mapped[Optional["ServiceTypes"]] = relationship(
        "ServiceTypes",
        back_populates="orders",
        overlaps="branches_,clients_,discounts_,orders,priceLists_,saleConditions_,cars_", viewonly=True
    )
    users_: Mapped[Optional["Users"]] = relationship(
        "Users",
        back_populates="orders",
        overlaps="branches_,clients_,discounts_,orders,priceLists_,saleConditions_,serviceType_,cars_", viewonly=True
    )
    warehouses_: Mapped[Optional["Warehouses"]] = relationship(
        "Warehouses",
        back_populates="orders",
        overlaps="clients_,discounts_,priceLists_,saleConditions_,serviceType_,users_,orders,branches_,cars_", viewonly=True
    )
    vendors_: Mapped[Optional["Vendors"]] = relationship(
        "Vendors",
        back_populates="orders",
        overlaps="clients_,discounts_,priceLists_,saleConditions_,serviceType_,users_,warehouses_,orders,cars_", viewonly=True
    )
    documents_: Mapped[Optional["Documents"]] = relationship(
        "Documents",
        primaryjoin="and_(Orders.CompanyID == Documents.CompanyID, Orders.BranchID == Documents.BranchID, Orders.DocumentID == Documents.DocumentID)",
        foreign_keys=[CompanyID, BranchID, DocumentID],
        viewonly=True,
    )
    orderDetails: Mapped[List["OrderDetails"]] = relationship(
        "OrderDetails",
        back_populates="orders_",
        overlaps="items_,orderDetails",
    )
    orderHistory: Mapped[List["OrderHistory"]] = relationship(
        "OrderHistory",
        back_populates="orders_",
    )
    tempOrderDetails: Mapped[List["TempOrderDetails"]] = relationship(
        "TempOrderDetails",
        back_populates="orders_",
        overlaps="tempOrderDetails",
    )

    @property
    def Items(self) -> List["OrderDetails"]:
        """Alias de acceso para los detalles de la orden."""
        return self.orderDetails
