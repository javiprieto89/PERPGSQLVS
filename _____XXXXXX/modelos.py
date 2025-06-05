from typing import List, Optional

from sqlalchemy import Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
import datetime
import decimal
import uuid

class Base(DeclarativeBase):
    pass


class Brands(Base):
    __tablename__ = 'Brands'
    __table_args__ = (
        PrimaryKeyConstraint('BrandID', name='PK__Brands__DAD4F3BEC807F89F'),
    )

    BrandID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    Name: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))

    Items: Mapped[List['Items']] = relationship('Items', back_populates='Brands_')


class CarBrands(Base):
    __tablename__ = 'CarBrands'
    __table_args__ = (
        PrimaryKeyConstraint('CarBrandID', name='PK__CarBrand__3EAE0B29835BF1AC'),
    )

    CarBrandID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    Name: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))

    CarModels: Mapped[List['CarModels']] = relationship('CarModels', back_populates='CarBrands_')


class CompanyData(Base):
    __tablename__ = 'CompanyData'
    __table_args__ = (
        PrimaryKeyConstraint('CompanyID', name='PK__CompanyD__2D971C4CF963B1F3'),
    )

    CompanyID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    Name: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Address: Mapped[Optional[str]] = mapped_column(Unicode(200, 'Modern_Spanish_CI_AS'))
    CUIT: Mapped[Optional[str]] = mapped_column(Unicode(20, 'Modern_Spanish_CI_AS'))
    GrossIncome: Mapped[Optional[str]] = mapped_column(Unicode(20, 'Modern_Spanish_CI_AS'))
    StartDate: Mapped[Optional[datetime.date]] = mapped_column(Date)
    Logo: Mapped[Optional[bytes]] = mapped_column(LargeBinary)

    Branches: Mapped[List['Branches']] = relationship('Branches', back_populates='CompanyData_')
    Documents: Mapped[List['Documents']] = relationship('Documents', back_populates='CompanyData_')
    UserAccess: Mapped[List['UserAccess']] = relationship('UserAccess', back_populates='CompanyData_')
    Items: Mapped[List['Items']] = relationship('Items', back_populates='CompanyData_')
    Itemstock: Mapped[List['Itemstock']] = relationship('Itemstock', back_populates='CompanyData_')
    Orders: Mapped[List['Orders']] = relationship('Orders', back_populates='CompanyData_')
    StockHistory: Mapped[List['StockHistory']] = relationship('StockHistory', back_populates='CompanyData_')
    TempStockEntries: Mapped[List['TempStockEntries']] = relationship('TempStockEntries', back_populates='CompanyData_')
    OrderHistory: Mapped[List['OrderHistory']] = relationship('OrderHistory', back_populates='CompanyData_')
    TempOrderDetails: Mapped[List['TempOrderDetails']] = relationship('TempOrderDetails', back_populates='CompanyData_')


class Countries(Base):
    __tablename__ = 'Countries'
    __table_args__ = (
        PrimaryKeyConstraint('CountryID', name='PK__Countrie__10D160BFBD00A82C'),
    )

    CountryID: Mapped[int] = mapped_column(Integer, primary_key=True)
    Name: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))

    Provinces: Mapped[List['Provinces']] = relationship('Provinces', back_populates='Countries_')
    Clients: Mapped[List['Clients']] = relationship('Clients', back_populates='Countries_')
    Suppliers: Mapped[List['Suppliers']] = relationship('Suppliers', back_populates='Countries_')


class CreditCardGroups(Base):
    __tablename__ = 'CreditCardGroups'
    __table_args__ = (
        PrimaryKeyConstraint('CreditCardGroupID', name='PK_CreditCardGroups'),
    )

    CreditCardGroupID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    GroupName: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))

    CreditCards: Mapped[List['CreditCards']] = relationship('CreditCards', back_populates='CreditCardGroups_')


class Discounts(Base):
    __tablename__ = 'Discounts'
    __table_args__ = (
        PrimaryKeyConstraint('DiscountID', name='PK__Discount__E43F6DF6AAF602B3'),
        Index('idx_DiscountID', 'DiscountID')
    )

    DiscountID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    DiscountName: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Percentage: Mapped[decimal.Decimal] = mapped_column(DECIMAL(5, 2))

    Cars: Mapped[List['Cars']] = relationship('Cars', back_populates='Discounts_')
    Orders: Mapped[List['Orders']] = relationship('Orders', back_populates='Discounts_')


class DocTypes(Base):
    __tablename__ = 'DocTypes'
    __table_args__ = (
        PrimaryKeyConstraint('DocTypeID', name='PK__DocTypes__055E26832A8E0FF3'),
    )

    DocTypeID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    Name: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    IsActive: Mapped[bool] = mapped_column(Boolean, server_default=text('((1))'))

    Clients: Mapped[List['Clients']] = relationship('Clients', back_populates='DocTypes_')
    Suppliers: Mapped[List['Suppliers']] = relationship('Suppliers', back_populates='DocTypes_')


class DocumentTypes(Base):
    __tablename__ = 'DocumentTypes'
    __table_args__ = (
        PrimaryKeyConstraint('DocumentTypeID', name='PK__Document__DBA390C10019FEFA'),
    )

    DocumentTypeID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    Name: Mapped[str] = mapped_column(Unicode(50, 'Modern_Spanish_CI_AS'))

    Documents: Mapped[List['Documents']] = relationship('Documents', back_populates='DocumentTypes_')
    Orders: Mapped[List['Orders']] = relationship('Orders', back_populates='DocumentTypes_')


class ItemCategories(Base):
    __tablename__ = 'ItemCategories'
    __table_args__ = (
        PrimaryKeyConstraint('ItemCategoryID', name='PK_ItemCategories'),
        Index('ix_Categories_CategoryID', 'ItemCategoryID')
    )

    ItemCategoryID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    CategoryName: Mapped[str] = mapped_column(String(100, 'Modern_Spanish_CI_AS'))

    ItemSubcategories: Mapped[List['ItemSubcategories']] = relationship('ItemSubcategories', back_populates='ItemCategories_')
    Items: Mapped[List['Items']] = relationship('Items', back_populates='ItemCategories_')


class OrderStatus(Base):
    __tablename__ = 'OrderStatus'
    __table_args__ = (
        PrimaryKeyConstraint('OrderStatusID', name='PK__OrderSta__BC674F4170B3E561'),
    )

    OrderStatusID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    Status: Mapped[str] = mapped_column(Unicode(50, 'Modern_Spanish_CI_AS'))

    Orders: Mapped[List['Orders']] = relationship('Orders', foreign_keys='[Orders.OrderStatusID]', back_populates='OrderStatus_')
    Orders_: Mapped[List['Orders']] = relationship('Orders', foreign_keys='[Orders.StatusID]', back_populates='OrderStatus1')


class PriceLists(Base):
    __tablename__ = 'PriceLists'
    __table_args__ = (
        PrimaryKeyConstraint('PriceListID', name='PK__PriceLis__1E30F34C58783DD3'),
    )

    PriceListID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    Name: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    IsActive: Mapped[bool] = mapped_column(Boolean, server_default=text('((1))'))
    Description: Mapped[Optional[str]] = mapped_column(Unicode(250, 'Modern_Spanish_CI_AS'))
    CreatedDate: Mapped[Optional[datetime.date]] = mapped_column(Date, server_default=text('(CONVERT([date],getdate()))'))

    Clients: Mapped[List['Clients']] = relationship('Clients', back_populates='PriceLists_')
    ItemPriceHistory: Mapped[List['ItemPriceHistory']] = relationship('ItemPriceHistory', back_populates='PriceLists_')
    Orders: Mapped[List['Orders']] = relationship('Orders', back_populates='PriceLists_')
    PriceListItems: Mapped[List['PriceListItems']] = relationship('PriceListItems', back_populates='PriceLists_')
    TempOrderDetails: Mapped[List['TempOrderDetails']] = relationship('TempOrderDetails', back_populates='PriceLists_')


class Roles(Base):
    __tablename__ = 'Roles'
    __table_args__ = (
        PrimaryKeyConstraint('RoleID', name='PK__Roles__8AFACE3A6B39B353'),
    )

    RoleID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    RoleName: Mapped[str] = mapped_column(Unicode(50, 'Modern_Spanish_CI_AS'))

    UserAccess: Mapped[List['UserAccess']] = relationship('UserAccess', back_populates='Roles_')


class ServiceType(Base):
    __tablename__ = 'ServiceType'
    __table_args__ = (
        PrimaryKeyConstraint('ServiceTypeID', name='PK_tipos_casos'),
    )

    ServiceTypeID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    Type: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))

    Orders: Mapped[List['Orders']] = relationship('Orders', back_populates='ServiceType_')
    OrderHistory: Mapped[List['OrderHistory']] = relationship('OrderHistory', back_populates='ServiceType_')


class TransactionTypes(Base):
    __tablename__ = 'TransactionTypes'
    __table_args__ = (
        PrimaryKeyConstraint('TransactTypeID', name='PK_TransactionTypes'),
    )

    TransactTypeID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    TypeName: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))


class Transactions(Base):
    __tablename__ = 'Transactions'
    __table_args__ = (
        PrimaryKeyConstraint('TransactionID', name='PK__Transact__55433A4BB5EE9535'),
        Index('idx_ClientID_Transactions', 'ClientID'),
        Index('idx_SupplierID', 'SupplierID'),
        Index('idx_TransactionDate', 'TransactionDate')
    )

    TransactionID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    CompanyID: Mapped[int] = mapped_column(Integer)
    BranchID: Mapped[int] = mapped_column(Integer)
    TransactionDate: Mapped[datetime.datetime] = mapped_column(DateTime, server_default=text('(getdate())'))
    TransacTypeID: Mapped[int] = mapped_column(Integer)
    ClientID: Mapped[Optional[int]] = mapped_column(Integer)
    SupplierID: Mapped[Optional[int]] = mapped_column(Integer)
    OrderID: Mapped[Optional[int]] = mapped_column(Integer)
    Subtotal: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(10, 2))
    Taxes: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(10, 2))
    Total: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(10, 2))
    Notes: Mapped[Optional[str]] = mapped_column(Unicode(200, 'Modern_Spanish_CI_AS'))


class UserActions(Base):
    __tablename__ = 'UserActions'
    __table_args__ = (
        PrimaryKeyConstraint('UserActionID', name='PK_UserActions'),
    )

    UserActionID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    ActionName: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))

    UserActivityLog: Mapped[List['UserActivityLog']] = relationship('UserActivityLog', back_populates='UserActions_')


class Users(Base):
    __tablename__ = 'Users'
    __table_args__ = (
        PrimaryKeyConstraint('UserID', name='PK__Users__1788CCAC4149E5BC'),
    )

    UserID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    Nickname: Mapped[str] = mapped_column(Unicode(50, 'Modern_Spanish_CI_AS'))
    FullName: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Password: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    IsActive: Mapped[bool] = mapped_column(Boolean, server_default=text('((1))'))

    UserActivityLog: Mapped[List['UserActivityLog']] = relationship('UserActivityLog', back_populates='Users_')
    UserAccess: Mapped[List['UserAccess']] = relationship('UserAccess', back_populates='Users_')
    Orders: Mapped[List['Orders']] = relationship('Orders', back_populates='Users_')
    StockHistory: Mapped[List['StockHistory']] = relationship('StockHistory', back_populates='Users_')
    TempStockEntries: Mapped[List['TempStockEntries']] = relationship('TempStockEntries', back_populates='Users_')
    OrderHistory: Mapped[List['OrderHistory']] = relationship('OrderHistory', back_populates='Users_')
    TempOrderDetails: Mapped[List['TempOrderDetails']] = relationship('TempOrderDetails', back_populates='Users_')


class Vendors(Base):
    __tablename__ = 'Vendors'
    __table_args__ = (
        PrimaryKeyConstraint('VendorID', name='PK_Vendors'),
    )

    VendorID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    VendorName: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Commission: Mapped[decimal.Decimal] = mapped_column(DECIMAL(18, 4))
    IsActive: Mapped[bool] = mapped_column(Boolean, server_default=text('((1))'))

    Clients: Mapped[List['Clients']] = relationship('Clients', back_populates='Vendors_')


class Warehouses(Base):
    __tablename__ = 'Warehouses'
    __table_args__ = (
        PrimaryKeyConstraint('WarehouseID', name='PK__Warehous__2608AFD9216E9B31'),
    )

    WarehouseID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    Name: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Addres: Mapped[Optional[str]] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))

    Items: Mapped[List['Items']] = relationship('Items', back_populates='Warehouses_')
    Itemstock: Mapped[List['Itemstock']] = relationship('Itemstock', back_populates='Warehouses_')
    Orders: Mapped[List['Orders']] = relationship('Orders', back_populates='Warehouses_')
    StockHistory: Mapped[List['StockHistory']] = relationship('StockHistory', back_populates='Warehouses_')
    TempStockEntries: Mapped[List['TempStockEntries']] = relationship('TempStockEntries', back_populates='Warehouses_')
    OrderDetails: Mapped[List['OrderDetails']] = relationship('OrderDetails', back_populates='Warehouses_')
    TempOrderDetails: Mapped[List['TempOrderDetails']] = relationship('TempOrderDetails', back_populates='Warehouses_')
    OrderHistoryDetails: Mapped[List['OrderHistoryDetails']] = relationship('OrderHistoryDetails', back_populates='Warehouses_')


class Sysdiagrams(Base):
    __tablename__ = 'sysdiagrams'
    __table_args__ = (
        PrimaryKeyConstraint('diagram_id', name='PK__sysdiagr__C2B05B6105D049F8'),
        Index('UK_principal_name', 'principal_id', 'name', unique=True)
    )

    name: Mapped[str] = mapped_column(Unicode(128, 'Modern_Spanish_CI_AS'))
    principal_id: Mapped[int] = mapped_column(Integer)
    diagram_id: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    version: Mapped[Optional[int]] = mapped_column(Integer)
    definition: Mapped[Optional[bytes]] = mapped_column(LargeBinary)


class Branches(Base):
    __tablename__ = 'Branches'
    __table_args__ = (
        ForeignKeyConstraint(['CompanyID'], ['CompanyData.CompanyID'], name='FK__Branches__Compan__398D8EEE'),
        PrimaryKeyConstraint('BranchID', name='PK__Branches__A1682FA515D37C5D')
    )

    BranchID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    CompanyID: Mapped[int] = mapped_column(Integer)
    Name: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Address: Mapped[Optional[str]] = mapped_column(Unicode(200, 'Modern_Spanish_CI_AS'))
    Phone: Mapped[Optional[str]] = mapped_column(Unicode(20, 'Modern_Spanish_CI_AS'))
    Logo: Mapped[Optional[bytes]] = mapped_column(LargeBinary)

    CompanyData_: Mapped['CompanyData'] = relationship('CompanyData', back_populates='Branches')
    Documents: Mapped[List['Documents']] = relationship('Documents', back_populates='Branches_')
    UserAccess: Mapped[List['UserAccess']] = relationship('UserAccess', back_populates='Branches_')
    Items: Mapped[List['Items']] = relationship('Items', back_populates='Branches_')
    Itemstock: Mapped[List['Itemstock']] = relationship('Itemstock', back_populates='Branches_')
    Orders: Mapped[List['Orders']] = relationship('Orders', back_populates='Branches_')
    StockHistory: Mapped[List['StockHistory']] = relationship('StockHistory', back_populates='Branches_')
    TempStockEntries: Mapped[List['TempStockEntries']] = relationship('TempStockEntries', back_populates='Branches_')
    OrderHistory: Mapped[List['OrderHistory']] = relationship('OrderHistory', back_populates='Branches_')
    TempOrderDetails: Mapped[List['TempOrderDetails']] = relationship('TempOrderDetails', back_populates='Branches_')


class CarModels(Base):
    __tablename__ = 'CarModels'
    __table_args__ = (
        ForeignKeyConstraint(['CarBrandID'], ['CarBrands.CarBrandID'], name='FK__CarModels__CarBr__5441852A'),
        PrimaryKeyConstraint('CarModelID', name='PK__CarModel__C585C36F707AD8EA')
    )

    CarModelID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    CarBrandID: Mapped[int] = mapped_column(Integer)
    Model: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))

    CarBrands_: Mapped['CarBrands'] = relationship('CarBrands', back_populates='CarModels')
    Cars: Mapped[List['Cars']] = relationship('Cars', back_populates='CarModels_')


class CreditCards(Base):
    __tablename__ = 'CreditCards'
    __table_args__ = (
        ForeignKeyConstraint(['CreditCardGroupID'], ['CreditCardGroups.CreditCardGroupID'], name='FK_CreditCards_CardGroups'),
        PrimaryKeyConstraint('CreditCardID', name='PK_CreditCards')
    )

    CreditCardID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    CardName: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    CreditCardGroupID: Mapped[int] = mapped_column(Integer)
    IsActive: Mapped[bool] = mapped_column(Boolean, server_default=text('((1))'))
    Surcharge: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(18, 4), server_default=text('((0))'))
    Installments: Mapped[Optional[int]] = mapped_column(Integer)

    CreditCardGroups_: Mapped['CreditCardGroups'] = relationship('CreditCardGroups', back_populates='CreditCards')
    SaleConditions: Mapped[List['SaleConditions']] = relationship('SaleConditions', back_populates='CreditCards_')


class ItemSubcategories(Base):
    __tablename__ = 'ItemSubcategories'
    __table_args__ = (
        ForeignKeyConstraint(['ItemCategoryID'], ['ItemCategories.ItemCategoryID'], name='FK_ItemSubcategories_ItemCategories'),
        PrimaryKeyConstraint('ItemSubcategoryID', name='PK_ItemSubcategories_1'),
        Index('ix_Subcategories_SubcategoryID', 'ItemSubcategoryID')
    )

    ItemSubcategoryID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    ItemCategoryID: Mapped[int] = mapped_column(Integer)
    SubcategoryName: Mapped[str] = mapped_column(String(100, 'Modern_Spanish_CI_AS'))

    ItemCategories_: Mapped['ItemCategories'] = relationship('ItemCategories', back_populates='ItemSubcategories')
    Items: Mapped[List['Items']] = relationship('Items', back_populates='ItemSubcategories_')


class Provinces(Base):
    __tablename__ = 'Provinces'
    __table_args__ = (
        ForeignKeyConstraint(['CountryID'], ['Countries.CountryID'], name='FK__Provinces__Count__403A8C7D'),
        PrimaryKeyConstraint('ProvinceID', name='PK__Province__FD0A6FA3062273F9')
    )

    ProvinceID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    CountryID: Mapped[int] = mapped_column(Integer)
    Name: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))

    Countries_: Mapped['Countries'] = relationship('Countries', back_populates='Provinces')
    Clients: Mapped[List['Clients']] = relationship('Clients', back_populates='Provinces_')
    Suppliers: Mapped[List['Suppliers']] = relationship('Suppliers', back_populates='Provinces_')


class UserActivityLog(Base):
    __tablename__ = 'UserActivityLog'
    __table_args__ = (
        ForeignKeyConstraint(['UserActionID'], ['UserActions.UserActionID'], name='FK_UserActivityLog_UserActions'),
        ForeignKeyConstraint(['UserID'], ['Users.UserID'], name='FK__UserActiv__UserI__3A4CA8FD'),
        PrimaryKeyConstraint('ActivityID', name='PK__UserActi__45F4A7F1A8CAACBC')
    )

    ActivityID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    UserID: Mapped[int] = mapped_column(Integer)
    UserActionID: Mapped[int] = mapped_column(Integer)
    Timestamp: Mapped[datetime.datetime] = mapped_column(DateTime, server_default=text('(getdate())'))

    UserActions_: Mapped['UserActions'] = relationship('UserActions', back_populates='UserActivityLog')
    Users_: Mapped['Users'] = relationship('Users', back_populates='UserActivityLog')


class Clients(Base):
    __tablename__ = 'Clients'
    __table_args__ = (
        ForeignKeyConstraint(['CountryID'], ['Countries.CountryID'], name='FK_Clients_Countries'),
        ForeignKeyConstraint(['DocTypeID'], ['DocTypes.DocTypeID'], name='FK_Clients_DocTypes'),
        ForeignKeyConstraint(['PriceListID'], ['PriceLists.PriceListID'], name='FK_Clients_PriceLists'),
        ForeignKeyConstraint(['ProvinceID'], ['Provinces.ProvinceID'], name='FK_Clients_Provinces'),
        ForeignKeyConstraint(['VendorID'], ['Vendors.VendorID'], name='FK_Clients_Vendors'),
        PrimaryKeyConstraint('ClientID', name='PK__Clients__E67E1A048D5F930D')
    )

    ClientID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    DocTypeID: Mapped[int] = mapped_column(Integer)
    FirstName: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    IsActive: Mapped[bool] = mapped_column(Boolean, server_default=text('((1))'))
    CountryID: Mapped[int] = mapped_column(Integer)
    ProvinceID: Mapped[int] = mapped_column(Integer)
    PriceListID: Mapped[int] = mapped_column(Integer)
    VendorID: Mapped[int] = mapped_column(Integer, server_default=text('((1))'))
    DocNumber: Mapped[Optional[str]] = mapped_column(Unicode(50, 'Modern_Spanish_CI_AS'))
    LastName: Mapped[Optional[str]] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Phone: Mapped[Optional[str]] = mapped_column(Unicode(20, 'Modern_Spanish_CI_AS'))
    Email: Mapped[Optional[str]] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Address: Mapped[Optional[str]] = mapped_column(Unicode(200, 'Modern_Spanish_CI_AS'))
    City: Mapped[Optional[str]] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    PostalCode: Mapped[Optional[str]] = mapped_column(Unicode(20, 'Modern_Spanish_CI_AS'))

    Countries_: Mapped['Countries'] = relationship('Countries', back_populates='Clients')
    DocTypes_: Mapped['DocTypes'] = relationship('DocTypes', back_populates='Clients')
    PriceLists_: Mapped['PriceLists'] = relationship('PriceLists', back_populates='Clients')
    Provinces_: Mapped['Provinces'] = relationship('Provinces', back_populates='Clients')
    Vendors_: Mapped['Vendors'] = relationship('Vendors', back_populates='Clients')
    AccountBalances: Mapped[List['AccountBalances']] = relationship('AccountBalances', back_populates='Clients_')
    Cars: Mapped[List['Cars']] = relationship('Cars', back_populates='Clients_')
    Orders: Mapped[List['Orders']] = relationship('Orders', back_populates='Clients_')


class Documents(Base):
    __tablename__ = 'Documents'
    __table_args__ = (
        ForeignKeyConstraint(['BranchID'], ['Branches.BranchID'], name='FK_Documents_Branches'),
        ForeignKeyConstraint(['CompanyID'], ['CompanyData.CompanyID'], name='FK_Documents_CompanyData'),
        ForeignKeyConstraint(['DocumentTypeID'], ['DocumentTypes.DocumentTypeID'], name='FK_Documents_DocumentTypes'),
        PrimaryKeyConstraint('DocumentID', name='PK__Document__1ABEEF6F4A2B1589')
    )

    DocumentID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    CompanyID: Mapped[int] = mapped_column(Integer)
    BranchID: Mapped[int] = mapped_column(Integer)
    DocumentTypeID: Mapped[int] = mapped_column(Integer)
    Description: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    DocumentNumber: Mapped[int] = mapped_column(Integer)
    PointOfSale: Mapped[int] = mapped_column(Integer)
    IsActive: Mapped[bool] = mapped_column(Boolean, server_default=text('((1))'))
    Testing: Mapped[bool] = mapped_column(Boolean, server_default=text('((0))'))
    ShouldAccount: Mapped[bool] = mapped_column(Boolean)
    MovesStock: Mapped[bool] = mapped_column(Boolean)
    IsFiscal: Mapped[Optional[bool]] = mapped_column(Boolean)
    IsElectronic: Mapped[Optional[bool]] = mapped_column(Boolean)
    IsManual: Mapped[Optional[bool]] = mapped_column(Boolean)
    IsQuotation: Mapped[Optional[bool]] = mapped_column(Boolean)
    MaxItems: Mapped[Optional[int]] = mapped_column(Integer)

    Branches_: Mapped['Branches'] = relationship('Branches', back_populates='Documents')
    CompanyData_: Mapped['CompanyData'] = relationship('CompanyData', back_populates='Documents')
    DocumentTypes_: Mapped['DocumentTypes'] = relationship('DocumentTypes', back_populates='Documents')


class SaleConditions(Base):
    __tablename__ = 'SaleConditions'
    __table_args__ = (
        ForeignKeyConstraint(['CreditCardID'], ['CreditCards.CreditCardID'], name='FK_SaleConditions_CreditCards'),
        PrimaryKeyConstraint('SaleConditionID', name='PK__SaleCond__22A3A655BD0A6B44')
    )

    SaleConditionID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    CreditCardID: Mapped[int] = mapped_column(Integer)
    Name: Mapped[Optional[str]] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    DueDate: Mapped[Optional[datetime.date]] = mapped_column(Date, server_default=text('(getdate())'))
    Surcharge: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(10, 2), server_default=text('((0))'))
    IsActive: Mapped[Optional[bool]] = mapped_column(Boolean, server_default=text('((1))'))

    CreditCards_: Mapped['CreditCards'] = relationship('CreditCards', back_populates='SaleConditions')
    Orders: Mapped[List['Orders']] = relationship('Orders', back_populates='SaleConditions_')


class Suppliers(Base):
    __tablename__ = 'Suppliers'
    __table_args__ = (
        ForeignKeyConstraint(['CountryID'], ['Countries.CountryID'], name='FK__Suppliers__Count__440B1D61'),
        ForeignKeyConstraint(['DocTypeID'], ['DocTypes.DocTypeID'], name='FK_Suppliers_DocTypes'),
        ForeignKeyConstraint(['ProvinceID'], ['Provinces.ProvinceID'], name='FK__Suppliers__Provi__44FF419A'),
        PrimaryKeyConstraint('SupplierID', name='PK__Supplier__4BE6669487E21347')
    )

    SupplierID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    DocTypeID: Mapped[int] = mapped_column(Integer)
    FirstName: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    IsActive: Mapped[bool] = mapped_column(Boolean, server_default=text('((1))'))
    CountryID: Mapped[int] = mapped_column(Integer)
    ProvinceID: Mapped[int] = mapped_column(Integer)
    DocNumber: Mapped[Optional[str]] = mapped_column(Unicode(50, 'Modern_Spanish_CI_AS'))
    LastName: Mapped[Optional[str]] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Phone: Mapped[Optional[str]] = mapped_column(Unicode(20, 'Modern_Spanish_CI_AS'))
    Email: Mapped[Optional[str]] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    Address: Mapped[Optional[str]] = mapped_column(Unicode(200, 'Modern_Spanish_CI_AS'))
    City: Mapped[Optional[str]] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    PostalCode: Mapped[Optional[str]] = mapped_column(Unicode(20, 'Modern_Spanish_CI_AS'))

    Countries_: Mapped['Countries'] = relationship('Countries', back_populates='Suppliers')
    DocTypes_: Mapped['DocTypes'] = relationship('DocTypes', back_populates='Suppliers')
    Provinces_: Mapped['Provinces'] = relationship('Provinces', back_populates='Suppliers')
    AccountBalances: Mapped[List['AccountBalances']] = relationship('AccountBalances', back_populates='Suppliers_')
    Items: Mapped[List['Items']] = relationship('Items', back_populates='Suppliers_')
    Itemstock: Mapped[List['Itemstock']] = relationship('Itemstock', back_populates='Suppliers_')
    OrderHistory: Mapped[List['OrderHistory']] = relationship('OrderHistory', back_populates='Suppliers_')


class UserAccess(Base):
    __tablename__ = 'UserAccess'
    __table_args__ = (
        ForeignKeyConstraint(['BranchID'], ['Branches.BranchID'], name='FK_UserAccess_Branches'),
        ForeignKeyConstraint(['CompanyID'], ['CompanyData.CompanyID'], name='FK_UserAccess_CompanyData'),
        ForeignKeyConstraint(['RoleID'], ['Roles.RoleID'], name='FK_UserAccess_Roles'),
        ForeignKeyConstraint(['UserID'], ['Users.UserID'], name='FK_UserAccess_Users'),
        PrimaryKeyConstraint('UserID', 'CompanyID', 'BranchID', 'RoleID', name='PK_UserAccess')
    )

    UserID: Mapped[int] = mapped_column(Integer, primary_key=True)
    CompanyID: Mapped[int] = mapped_column(Integer, primary_key=True)
    BranchID: Mapped[int] = mapped_column(Integer, primary_key=True)
    RoleID: Mapped[int] = mapped_column(Integer, primary_key=True)

    Branches_: Mapped['Branches'] = relationship('Branches', back_populates='UserAccess')
    CompanyData_: Mapped['CompanyData'] = relationship('CompanyData', back_populates='UserAccess')
    Roles_: Mapped['Roles'] = relationship('Roles', back_populates='UserAccess')
    Users_: Mapped['Users'] = relationship('Users', back_populates='UserAccess')


class AccountBalances(Base):
    __tablename__ = 'AccountBalances'
    __table_args__ = (
        ForeignKeyConstraint(['ClientID'], ['Clients.ClientID'], name='FK__AccountBa__Clien__3F115E1A'),
        ForeignKeyConstraint(['SupplierID'], ['Suppliers.SupplierID'], name='FK__AccountBa__Suppl__3E1D39E1'),
        PrimaryKeyConstraint('AccountID', name='PK__AccountB__349DA5866875C1B5')
    )

    AccountID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    Balance: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 2), server_default=text('((0))'))
    SupplierID: Mapped[Optional[int]] = mapped_column(Integer)
    ClientID: Mapped[Optional[int]] = mapped_column(Integer)

    Clients_: Mapped[Optional['Clients']] = relationship('Clients', back_populates='AccountBalances')
    Suppliers_: Mapped[Optional['Suppliers']] = relationship('Suppliers', back_populates='AccountBalances')


class Cars(Base):
    __tablename__ = 'Cars'
    __table_args__ = (
        ForeignKeyConstraint(['CarModelID'], ['CarModels.CarModelID'], name='FK__Cars__CarModelID__571DF1D5'),
        ForeignKeyConstraint(['ClientID'], ['Clients.ClientID'], name='FK_Cars_Clients'),
        ForeignKeyConstraint(['DiscountID'], ['Discounts.DiscountID'], name='FK_Cars_Discounts'),
        PrimaryKeyConstraint('CarID', name='PK__Cars__68A0340E0C926E4D')
    )

    CarID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    CarModelID: Mapped[int] = mapped_column(Integer)
    ClientID: Mapped[int] = mapped_column(Integer)
    LicensePlate: Mapped[str] = mapped_column(Unicode(20, 'Modern_Spanish_CI_AS'))
    DiscountID: Mapped[int] = mapped_column(Integer)
    Year: Mapped[Optional[int]] = mapped_column(Integer)
    LastServiceMileage: Mapped[Optional[int]] = mapped_column(Integer)
    IsDebtor: Mapped[Optional[bool]] = mapped_column(Boolean)

    CarModels_: Mapped['CarModels'] = relationship('CarModels', back_populates='Cars')
    Clients_: Mapped['Clients'] = relationship('Clients', back_populates='Cars')
    Discounts_: Mapped['Discounts'] = relationship('Discounts', back_populates='Cars')
    Orders: Mapped[List['Orders']] = relationship('Orders', back_populates='Cars_')
    OrderHistory: Mapped[List['OrderHistory']] = relationship('OrderHistory', back_populates='Cars_')


class Items(Base):
    __tablename__ = 'Items'
    __table_args__ = (
        ForeignKeyConstraint(['BranchID'], ['Branches.BranchID'], name='FK_Items_Branches'),
        ForeignKeyConstraint(['BrandID'], ['Brands.BrandID'], name='FK_Items_Brands'),
        ForeignKeyConstraint(['CompanyID'], ['CompanyData.CompanyID'], name='FK_Items_CompanyData'),
        ForeignKeyConstraint(['ItemCategoryID'], ['ItemCategories.ItemCategoryID'], name='FK_Items_ItemCategories'),
        ForeignKeyConstraint(['ItemSubcategoryID'], ['ItemSubcategories.ItemSubcategoryID'], name='FK_Items_ItemSubcategories'),
        ForeignKeyConstraint(['SupplierID'], ['Suppliers.SupplierID'], name='FK_Items_Suppliers'),
        ForeignKeyConstraint(['WarehouseID'], ['Warehouses.WarehouseID'], name='FK_Items_Warehouses'),
        PrimaryKeyConstraint('ItemID', name='PK__Items__727E83EB997DFA51'),
        Index('UQ__Items__A25C5AA7F6BA0424', 'Code', unique=True)
    )

    ItemID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    CompanyID: Mapped[int] = mapped_column(Integer)
    BranchID: Mapped[int] = mapped_column(Integer)
    BrandID: Mapped[int] = mapped_column(Integer)
    Code: Mapped[str] = mapped_column(Unicode(50, 'Modern_Spanish_CI_AS'))
    Description: Mapped[str] = mapped_column(Unicode(200, 'Modern_Spanish_CI_AS'))
    ItemCategoryID: Mapped[int] = mapped_column(Integer)
    ItemSubcategoryID: Mapped[int] = mapped_column(Integer)
    SupplierID: Mapped[int] = mapped_column(Integer)
    ControlStock: Mapped[bool] = mapped_column(Boolean, server_default=text('((1))'))
    ReplenishmentStock: Mapped[int] = mapped_column(Integer, server_default=text('((0))'))
    IsOffer: Mapped[bool] = mapped_column(Boolean, server_default=text('((0))'))
    LastModified: Mapped[datetime.date] = mapped_column(Date, server_default=text('(CONVERT([date],getdate()))'))
    WarehouseID: Mapped[int] = mapped_column(Integer)
    IsActive: Mapped[bool] = mapped_column(Boolean, server_default=text('((1))'))
    OEM: Mapped[Optional[str]] = mapped_column(Unicode(50, 'Modern_Spanish_CI_AS'))

    Branches_: Mapped['Branches'] = relationship('Branches', back_populates='Items')
    Brands_: Mapped['Brands'] = relationship('Brands', back_populates='Items')
    CompanyData_: Mapped['CompanyData'] = relationship('CompanyData', back_populates='Items')
    ItemCategories_: Mapped['ItemCategories'] = relationship('ItemCategories', back_populates='Items')
    ItemSubcategories_: Mapped['ItemSubcategories'] = relationship('ItemSubcategories', back_populates='Items')
    Suppliers_: Mapped['Suppliers'] = relationship('Suppliers', back_populates='Items')
    Warehouses_: Mapped['Warehouses'] = relationship('Warehouses', back_populates='Items')
    ItemPriceHistory: Mapped[List['ItemPriceHistory']] = relationship('ItemPriceHistory', back_populates='Items_')
    Itemstock: Mapped[List['Itemstock']] = relationship('Itemstock', back_populates='Items_')
    PriceListItems: Mapped[List['PriceListItems']] = relationship('PriceListItems', back_populates='Items_')
    StockHistory: Mapped[List['StockHistory']] = relationship('StockHistory', back_populates='Items_')
    TempStockEntries: Mapped[List['TempStockEntries']] = relationship('TempStockEntries', back_populates='Items_')
    OrderDetails: Mapped[List['OrderDetails']] = relationship('OrderDetails', back_populates='Items_')
    TempOrderDetails: Mapped[List['TempOrderDetails']] = relationship('TempOrderDetails', back_populates='Items_')
    OrderHistoryDetails: Mapped[List['OrderHistoryDetails']] = relationship('OrderHistoryDetails', back_populates='Items_')


class ItemPriceHistory(Base):
    __tablename__ = 'ItemPriceHistory'
    __table_args__ = (
        ForeignKeyConstraint(['ItemID'], ['Items.ItemID'], name='FK__ItemPrice__ItemI__367C1819'),
        ForeignKeyConstraint(['PriceListID'], ['PriceLists.PriceListID'], name='FK_ItemPriceHistory_PriceLists'),
        PrimaryKeyConstraint('PriceHistoryID', name='PK__ItemPric__A927CB2BB60ACD35')
    )

    PriceHistoryID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    ItemID: Mapped[int] = mapped_column(Integer)
    PriceListID: Mapped[int] = mapped_column(Integer)
    EffectiveDate: Mapped[datetime.datetime] = mapped_column(DateTime, server_default=text('(getdate())'))
    Price: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 2))

    Items_: Mapped['Items'] = relationship('Items', back_populates='ItemPriceHistory')
    PriceLists_: Mapped['PriceLists'] = relationship('PriceLists', back_populates='ItemPriceHistory')


class Itemstock(Base):
    __tablename__ = 'Itemstock'
    __table_args__ = (
        ForeignKeyConstraint(['BranchID'], ['Branches.BranchID'], name='FK_Itemstock_Branches'),
        ForeignKeyConstraint(['CompanyID'], ['CompanyData.CompanyID'], name='FK_Itemstock_CompanyData'),
        ForeignKeyConstraint(['ItemID'], ['Items.ItemID'], name='FK_Itemstock_Items'),
        ForeignKeyConstraint(['SupplierID'], ['Suppliers.SupplierID'], name='FK_Itemstock_Suppliers'),
        ForeignKeyConstraint(['WarehouseID'], ['Warehouses.WarehouseID'], name='FK_Itemstock_Warehouses'),
        PrimaryKeyConstraint('ItemID', 'WarehouseID', name='PK__Itemstoc__F01E09161DA94055'),
        Index('idx_BranchID', 'CompanyID'),
        Index('idx_ItemWarehouse', 'ItemID', 'WarehouseID'),
        Index('idx_SupplierStatus', 'SupplierID', 'StockStatus')
    )

    ItemID: Mapped[int] = mapped_column(Integer, primary_key=True)
    WarehouseID: Mapped[int] = mapped_column(Integer, primary_key=True)
    CompanyID: Mapped[int] = mapped_column(Integer)
    BranchID: Mapped[int] = mapped_column(Integer)
    Quantity: Mapped[int] = mapped_column(Integer)
    ReservedQuantity: Mapped[int] = mapped_column(Integer)
    LastModified: Mapped[datetime.date] = mapped_column(Date, server_default=text('(CONVERT([date],getdate()))'))
    StockStatus: Mapped[str] = mapped_column(Unicode(50, 'Modern_Spanish_CI_AS'))
    MinStockLevel: Mapped[int] = mapped_column(Integer, server_default=text('((0))'))
    MaxStockLevel: Mapped[int] = mapped_column(Integer, server_default=text('((0))'))
    SupplierID: Mapped[int] = mapped_column(Integer)
    StockLocation: Mapped[Optional[str]] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    BatchNumber: Mapped[Optional[str]] = mapped_column(Unicode(50, 'Modern_Spanish_CI_AS'))
    ExpiryDate: Mapped[Optional[datetime.date]] = mapped_column(Date)

    Branches_: Mapped['Branches'] = relationship('Branches', back_populates='Itemstock')
    CompanyData_: Mapped['CompanyData'] = relationship('CompanyData', back_populates='Itemstock')
    Items_: Mapped['Items'] = relationship('Items', back_populates='Itemstock')
    Suppliers_: Mapped['Suppliers'] = relationship('Suppliers', back_populates='Itemstock')
    Warehouses_: Mapped['Warehouses'] = relationship('Warehouses', back_populates='Itemstock')


class Orders(Base):
    __tablename__ = 'Orders'
    __table_args__ = (
        ForeignKeyConstraint(['BranchID'], ['Branches.BranchID'], name='FK__Orders__BranchID__01142BA1'),
        ForeignKeyConstraint(['CarID'], ['Cars.CarID'], name='FK__Orders__CarID__02FC7413'),
        ForeignKeyConstraint(['ClientID'], ['Clients.ClientID'], name='FK__Orders__ClientID__00200768'),
        ForeignKeyConstraint(['CompanyID'], ['CompanyData.CompanyID'], name='FK__Orders__CompanyI__02084FDA'),
        ForeignKeyConstraint(['DiscountID'], ['Discounts.DiscountID'], name='FK__Orders__Discount__04E4BC85'),
        ForeignKeyConstraint(['DocumentID'], ['DocumentTypes.DocumentTypeID'], name='FK__Orders__Document__06CD04F7'),
        ForeignKeyConstraint(['OrderStatusID'], ['OrderStatus.OrderStatusID'], name='FK_Orders_OrderStatus'),
        ForeignKeyConstraint(['PriceListID'], ['PriceLists.PriceListID'], name='FK__Orders__PriceLis__08B54D69'),
        ForeignKeyConstraint(['SaleConditionID'], ['SaleConditions.SaleConditionID'], name='FK__Orders__SaleCond__03F0984C'),
        ForeignKeyConstraint(['ServiceTypeID'], ['ServiceType.ServiceTypeID'], name='FK_Orders_ServiceType'),
        ForeignKeyConstraint(['StatusID'], ['OrderStatus.OrderStatusID'], name='FK__Orders__StatusID__07C12930'),
        ForeignKeyConstraint(['UserID'], ['Users.UserID'], name='FK__Orders__UserID__05D8E0BE'),
        ForeignKeyConstraint(['WarehouseID'], ['Warehouses.WarehouseID'], name='FK_Orders_Warehouses'),
        PrimaryKeyConstraint('OrderID', name='PK__Orders__C3905BAF2829B144'),
        Index('idx_ClientID', 'ClientID'),
        Index('idx_CompanyID', 'CompanyID'),
        Index('idx_OrderDate', 'Date')
    )

    OrderID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    CompanyID: Mapped[int] = mapped_column(Integer)
    BranchID: Mapped[int] = mapped_column(Integer)
    Date_: Mapped[datetime.datetime] = mapped_column('Date', DateTime, server_default=text('(getdate())'))
    ClientID: Mapped[int] = mapped_column(Integer)
    SaleConditionID: Mapped[int] = mapped_column(Integer)
    DiscountID: Mapped[int] = mapped_column(Integer)
    Subtotal: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 2))
    Total: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 2))
    VAT: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 2))
    UserID: Mapped[int] = mapped_column(Integer)
    DocumentID: Mapped[int] = mapped_column(Integer)
    StatusID: Mapped[int] = mapped_column(Integer)
    PriceListID: Mapped[int] = mapped_column(Integer)
    OrderStatusID: Mapped[int] = mapped_column(Integer)
    WarehouseID: Mapped[int] = mapped_column(Integer)
    CarID: Mapped[Optional[int]] = mapped_column(Integer)
    IsService: Mapped[Optional[bool]] = mapped_column(Boolean)
    ServiceTypeID: Mapped[Optional[int]] = mapped_column(Integer)
    Mileage: Mapped[Optional[int]] = mapped_column(Integer)
    NextServiceMileage: Mapped[Optional[int]] = mapped_column(Integer)
    Notes: Mapped[Optional[str]] = mapped_column(Unicode(500, 'Modern_Spanish_CI_AS'))

    Branches_: Mapped['Branches'] = relationship('Branches', back_populates='Orders')
    Cars_: Mapped[Optional['Cars']] = relationship('Cars', back_populates='Orders')
    Clients_: Mapped['Clients'] = relationship('Clients', back_populates='Orders')
    CompanyData_: Mapped['CompanyData'] = relationship('CompanyData', back_populates='Orders')
    Discounts_: Mapped['Discounts'] = relationship('Discounts', back_populates='Orders')
    DocumentTypes_: Mapped['DocumentTypes'] = relationship('DocumentTypes', back_populates='Orders')
    OrderStatus_: Mapped['OrderStatus'] = relationship('OrderStatus', foreign_keys=[OrderStatusID], back_populates='Orders')
    PriceLists_: Mapped['PriceLists'] = relationship('PriceLists', back_populates='Orders')
    SaleConditions_: Mapped['SaleConditions'] = relationship('SaleConditions', back_populates='Orders')
    ServiceType_: Mapped[Optional['ServiceType']] = relationship('ServiceType', back_populates='Orders')
    OrderStatus1: Mapped['OrderStatus'] = relationship('OrderStatus', foreign_keys=[StatusID], back_populates='Orders_')
    Users_: Mapped['Users'] = relationship('Users', back_populates='Orders')
    Warehouses_: Mapped['Warehouses'] = relationship('Warehouses', back_populates='Orders')
    OrderDetails: Mapped[List['OrderDetails']] = relationship('OrderDetails', back_populates='Orders_')
    OrderHistory: Mapped[List['OrderHistory']] = relationship('OrderHistory', back_populates='Orders_')
    TempOrderDetails: Mapped[List['TempOrderDetails']] = relationship('TempOrderDetails', back_populates='Orders_')


class PriceListItems(Base):
    __tablename__ = 'PriceListItems'
    __table_args__ = (
        ForeignKeyConstraint(['ItemID'], ['Items.ItemID'], name='FK__PriceList__ItemI__76969D2E'),
        ForeignKeyConstraint(['PriceListID'], ['PriceLists.PriceListID'], name='FK__PriceList__Price__75A278F5'),
        PrimaryKeyConstraint('PriceListID', 'ItemID', name='PK_PriceListItems')
    )

    PriceListID: Mapped[int] = mapped_column(Integer, primary_key=True)
    ItemID: Mapped[int] = mapped_column(Integer, primary_key=True)
    Price: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 2))
    EffectiveDate: Mapped[datetime.datetime] = mapped_column(DateTime, server_default=text('(getdate())'))

    Items_: Mapped['Items'] = relationship('Items', back_populates='PriceListItems')
    PriceLists_: Mapped['PriceLists'] = relationship('PriceLists', back_populates='PriceListItems')


class StockHistory(Base):
    __tablename__ = 'StockHistory'
    __table_args__ = (
        ForeignKeyConstraint(['BranchID'], ['Branches.BranchID'], name='FK_StockHistory_Branches'),
        ForeignKeyConstraint(['CompanyID'], ['CompanyData.CompanyID'], name='FK_StockHistory_CompanyData'),
        ForeignKeyConstraint(['ItemID'], ['Items.ItemID'], name='FK__StockHist__ItemI__7A672E12'),
        ForeignKeyConstraint(['UserID'], ['Users.UserID'], name='FK_StockHistory_Users'),
        ForeignKeyConstraint(['WarehouseID'], ['Warehouses.WarehouseID'], name='FK__StockHist__Wareh__7B5B524B'),
        PrimaryKeyConstraint('StockHistoryID', name='PK__StockHis__A6CE86DBEB46B995')
    )

    StockHistoryID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    ItemID: Mapped[int] = mapped_column(Integer)
    CompanyID: Mapped[int] = mapped_column(Integer)
    BranchID: Mapped[int] = mapped_column(Integer)
    WarehouseID: Mapped[int] = mapped_column(Integer)
    QuantityUpdate: Mapped[int] = mapped_column(Integer)
    QuantityBefore: Mapped[int] = mapped_column(Integer)
    QuantityAfter: Mapped[int] = mapped_column(Integer)
    TransactionDate: Mapped[datetime.datetime] = mapped_column(DateTime, server_default=text('(getdate())'))
    UserID: Mapped[int] = mapped_column(Integer)
    Reason: Mapped[Optional[str]] = mapped_column(Unicode(200, 'Modern_Spanish_CI_AS'))

    Branches_: Mapped['Branches'] = relationship('Branches', back_populates='StockHistory')
    CompanyData_: Mapped['CompanyData'] = relationship('CompanyData', back_populates='StockHistory')
    Items_: Mapped['Items'] = relationship('Items', back_populates='StockHistory')
    Users_: Mapped['Users'] = relationship('Users', back_populates='StockHistory')
    Warehouses_: Mapped['Warehouses'] = relationship('Warehouses', back_populates='StockHistory')


class TempStockEntries(Base):
    __tablename__ = 'TempStockEntries'
    __table_args__ = (
        ForeignKeyConstraint(['BranchID'], ['Branches.BranchID'], name='FK__TempStock__Branc__160F4887'),
        ForeignKeyConstraint(['CompanyID'], ['CompanyData.CompanyID'], name='FK__TempStock__Compa__151B244E'),
        ForeignKeyConstraint(['ItemID'], ['Items.ItemID'], name='FK__TempStock__ItemI__17F790F9'),
        ForeignKeyConstraint(['UserID'], ['Users.UserID'], name='FK__TempStock__UserI__17036CC0'),
        ForeignKeyConstraint(['WarehouseID'], ['Warehouses.WarehouseID'], name='FK__TempStock__Wareh__18EBB532'),
        PrimaryKeyConstraint('TempStockEntryID', name='PK__TempStoc__6BCFA2A4F18BE300')
    )

    TempStockEntryID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    CompanyID: Mapped[int] = mapped_column(Integer)
    BranchID: Mapped[int] = mapped_column(Integer)
    UniqueID: Mapped[uuid.UUID] = mapped_column(Uuid, server_default=text('(newid())'))
    SessionID: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))
    UserID: Mapped[int] = mapped_column(Integer)
    ItemID: Mapped[int] = mapped_column(Integer)
    WarehouseID: Mapped[int] = mapped_column(Integer)
    Quantity: Mapped[int] = mapped_column(Integer)
    EntryDate: Mapped[datetime.datetime] = mapped_column(DateTime, server_default=text('(getdate())'))
    IsProcessed: Mapped[bool] = mapped_column(Boolean, server_default=text('((0))'))
    Reason: Mapped[Optional[str]] = mapped_column(Unicode(200, 'Modern_Spanish_CI_AS'))

    Branches_: Mapped['Branches'] = relationship('Branches', back_populates='TempStockEntries')
    CompanyData_: Mapped['CompanyData'] = relationship('CompanyData', back_populates='TempStockEntries')
    Items_: Mapped['Items'] = relationship('Items', back_populates='TempStockEntries')
    Users_: Mapped['Users'] = relationship('Users', back_populates='TempStockEntries')
    Warehouses_: Mapped['Warehouses'] = relationship('Warehouses', back_populates='TempStockEntries')


class OrderDetails(Base):
    __tablename__ = 'OrderDetails'
    __table_args__ = (
        ForeignKeyConstraint(['ItemID'], ['Items.ItemID'], name='FK__OrderDeta__ItemI__2DE6D218'),
        ForeignKeyConstraint(['OrderID'], ['Orders.OrderID'], name='FK__OrderDeta__Order__2CF2ADDF'),
        ForeignKeyConstraint(['WarehouseID'], ['Warehouses.WarehouseID'], name='FK_OrderDetails_Warehouses'),
        PrimaryKeyConstraint('OrderDetailID', name='PK__OrderDet__9DD74D9DF5D37EDA')
    )

    OrderDetailID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    OrderID: Mapped[int] = mapped_column(Integer)
    ItemID: Mapped[int] = mapped_column(Integer)
    WarehouseID: Mapped[int] = mapped_column(Integer)
    Quantity: Mapped[int] = mapped_column(Integer)
    UnitPrice: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 2))
    Description: Mapped[str] = mapped_column(Unicode(200, 'Modern_Spanish_CI_AS'))
    LastModified: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('(getdate())'))

    Items_: Mapped['Items'] = relationship('Items', back_populates='OrderDetails')
    Orders_: Mapped['Orders'] = relationship('Orders', back_populates='OrderDetails')
    Warehouses_: Mapped['Warehouses'] = relationship('Warehouses', back_populates='OrderDetails')


class OrderHistory(Base):
    __tablename__ = 'OrderHistory'
    __table_args__ = (
        ForeignKeyConstraint(['BranchID'], ['Branches.BranchID'], name='FK__OrderHist__Branc__1DB06A4F'),
        ForeignKeyConstraint(['CarID'], ['Cars.CarID'], name='FK__OrderHist__CarID__2180FB33'),
        ForeignKeyConstraint(['ClientID'], ['Suppliers.SupplierID'], name='FK__OrderHist__Clien__208CD6FA'),
        ForeignKeyConstraint(['CompanyID'], ['CompanyData.CompanyID'], name='FK__OrderHist__Compa__1EA48E88'),
        ForeignKeyConstraint(['OrderID'], ['Orders.OrderID'], name='FK__OrderHist__Order__1F98B2C1'),
        ForeignKeyConstraint(['ServiceTypeID'], ['ServiceType.ServiceTypeID'], name='FK_OrderHistory_ServiceType'),
        ForeignKeyConstraint(['UserID'], ['Users.UserID'], name='FK_OrderHistory_Users'),
        PrimaryKeyConstraint('OrderHistoryID', name='PK__OrderHis__4D7B4ADD5AAE57F2')
    )

    OrderHistoryID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    CompanyID: Mapped[int] = mapped_column(Integer)
    BranchID: Mapped[int] = mapped_column(Integer)
    OrderID: Mapped[int] = mapped_column(Integer)
    ClientID: Mapped[int] = mapped_column(Integer)
    UserID: Mapped[int] = mapped_column(Integer)
    Date_: Mapped[datetime.datetime] = mapped_column('Date', DateTime, server_default=text('(getdate())'))
    CarID: Mapped[Optional[int]] = mapped_column(Integer)
    ServiceTypeID: Mapped[Optional[int]] = mapped_column(Integer)
    Mileage: Mapped[Optional[int]] = mapped_column(Integer)
    NextServiceMileage: Mapped[Optional[int]] = mapped_column(Integer)
    Subtotal: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(10, 2))
    Total: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(10, 2))
    Status: Mapped[Optional[str]] = mapped_column(Unicode(50, 'Modern_Spanish_CI_AS'))
    Comments: Mapped[Optional[str]] = mapped_column(Unicode(500, 'Modern_Spanish_CI_AS'))

    Branches_: Mapped['Branches'] = relationship('Branches', back_populates='OrderHistory')
    Cars_: Mapped[Optional['Cars']] = relationship('Cars', back_populates='OrderHistory')
    Suppliers_: Mapped['Suppliers'] = relationship('Suppliers', back_populates='OrderHistory')
    CompanyData_: Mapped['CompanyData'] = relationship('CompanyData', back_populates='OrderHistory')
    Orders_: Mapped['Orders'] = relationship('Orders', back_populates='OrderHistory')
    ServiceType_: Mapped[Optional['ServiceType']] = relationship('ServiceType', back_populates='OrderHistory')
    Users_: Mapped['Users'] = relationship('Users', back_populates='OrderHistory')
    OrderHistoryDetails: Mapped[List['OrderHistoryDetails']] = relationship('OrderHistoryDetails', back_populates='OrderHistory_')


class TempOrderDetails(Base):
    __tablename__ = 'TempOrderDetails'
    __table_args__ = (
        ForeignKeyConstraint(['BranchID'], ['Branches.BranchID'], name='FK_TempOrderDetails_Branches'),
        ForeignKeyConstraint(['CompanyID'], ['CompanyData.CompanyID'], name='FK__TempOrder__Compa__0C85DE4D'),
        ForeignKeyConstraint(['ItemID'], ['Items.ItemID'], name='FK__TempOrder__ItemI__0F624AF8'),
        ForeignKeyConstraint(['OrderID'], ['Orders.OrderID'], name='FK_TempOrderDetails_Orders'),
        ForeignKeyConstraint(['PriceListID'], ['PriceLists.PriceListID'], name='FK_TempOrderDetails_PriceLists'),
        ForeignKeyConstraint(['UserID'], ['Users.UserID'], name='FK__TempOrder__UserI__0E6E26BF'),
        ForeignKeyConstraint(['WarehouseID'], ['Warehouses.WarehouseID'], name='FK_TempOrderDetails_Warehouses'),
        PrimaryKeyConstraint('TempOrderItemID', name='PK__TempOrde__AC4DF55EB1F17B71')
    )

    TempOrderItemID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    OrderSessionID: Mapped[uuid.UUID] = mapped_column(Uuid, server_default=text('(newid())'))
    CompanyID: Mapped[int] = mapped_column(Integer)
    BranchID: Mapped[int] = mapped_column(Integer)
    UserID: Mapped[int] = mapped_column(Integer)
    ItemID: Mapped[int] = mapped_column(Integer)
    Quantity: Mapped[int] = mapped_column(Integer)
    WarehouseID: Mapped[int] = mapped_column(Integer)
    PriceListID: Mapped[int] = mapped_column(Integer)
    UnitPrice: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 2))
    Description: Mapped[str] = mapped_column(Unicode(200, 'Modern_Spanish_CI_AS'))
    OrderDetailID: Mapped[Optional[int]] = mapped_column(Integer)
    OrderID: Mapped[Optional[int]] = mapped_column(Integer)

    Branches_: Mapped['Branches'] = relationship('Branches', back_populates='TempOrderDetails')
    CompanyData_: Mapped['CompanyData'] = relationship('CompanyData', back_populates='TempOrderDetails')
    Items_: Mapped['Items'] = relationship('Items', back_populates='TempOrderDetails')
    Orders_: Mapped[Optional['Orders']] = relationship('Orders', back_populates='TempOrderDetails')
    PriceLists_: Mapped['PriceLists'] = relationship('PriceLists', back_populates='TempOrderDetails')
    Users_: Mapped['Users'] = relationship('Users', back_populates='TempOrderDetails')
    Warehouses_: Mapped['Warehouses'] = relationship('Warehouses', back_populates='TempOrderDetails')


class OrderHistoryDetails(Base):
    __tablename__ = 'OrderHistoryDetails'
    __table_args__ = (
        ForeignKeyConstraint(['ItemID'], ['Items.ItemID'], name='FK__OrderHist__ItemI__32AB8735'),
        ForeignKeyConstraint(['OrderHistoryID'], ['OrderHistory.OrderHistoryID'], name='FK__OrderHist__Histo__31B762FC'),
        ForeignKeyConstraint(['WarehouseID'], ['Warehouses.WarehouseID'], name='FK_OrderHistoryDetails_Warehouses'),
        PrimaryKeyConstraint('OrderHistoryDetailID', name='PK__OrderHis__D6D0F42ABBC4939A')
    )

    OrderHistoryDetailID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    OrderHistoryID: Mapped[int] = mapped_column(Integer)
    ItemID: Mapped[int] = mapped_column(Integer)
    WarehouseID: Mapped[int] = mapped_column(Integer)
    Quantity: Mapped[int] = mapped_column(Integer)
    UnitPrice: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 2))
    Description: Mapped[str] = mapped_column(Unicode(200, 'Modern_Spanish_CI_AS'))
    LastModified: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('(getdate())'))

    Items_: Mapped['Items'] = relationship('Items', back_populates='OrderHistoryDetails')
    OrderHistory_: Mapped['OrderHistory'] = relationship('OrderHistory', back_populates='OrderHistoryDetails')
    Warehouses_: Mapped['Warehouses'] = relationship('Warehouses', back_populates='OrderHistoryDetails')
