-- ==========================================
-- Script de creación de base de datos
-- Proyecto: LubricentroDB2
-- Autor: Javier Prieto
-- Fecha: 2025-07-09
-- Descripción: Crea la base de datos LubricentroDB2 en el directorio predeterminado del servidor SQL.
-- ==========================================

USE [master]
GO

-- Verifica si ya existe y la elimina (opcional, solo para entorno de pruebas)
IF DB_ID('LubricentroDB2') IS NOT NULL
BEGIN
    ALTER DATABASE LubricentroDB2 SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE LubricentroDB2;
END
GO

-- Crea la base de datos en el directorio predeterminado
CREATE DATABASE LubricentroDB2;
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [LubricentroDB2].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [LubricentroDB2] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [LubricentroDB2] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [LubricentroDB2] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [LubricentroDB2] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [LubricentroDB2] SET ARITHABORT OFF 
GO
ALTER DATABASE [LubricentroDB2] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [LubricentroDB2] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [LubricentroDB2] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [LubricentroDB2] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [LubricentroDB2] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [LubricentroDB2] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [LubricentroDB2] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [LubricentroDB2] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [LubricentroDB2] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [LubricentroDB2] SET  ENABLE_BROKER 
GO
ALTER DATABASE [LubricentroDB2] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [LubricentroDB2] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [LubricentroDB2] SET TRUSTWORTHY ON 
GO
ALTER DATABASE [LubricentroDB2] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [LubricentroDB2] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [LubricentroDB2] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [LubricentroDB2] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [LubricentroDB2] SET RECOVERY FULL 
GO
ALTER DATABASE [LubricentroDB2] SET  MULTI_USER 
GO
ALTER DATABASE [LubricentroDB2] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [LubricentroDB2] SET DB_CHAINING OFF 
GO
ALTER DATABASE [LubricentroDB2] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [LubricentroDB2] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [LubricentroDB2] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [LubricentroDB2] SET QUERY_STORE = OFF
GO
USE [LubricentroDB2]
GO
-- ==========================================
-- Sección: Creación de tablas
-- ==========================================

/****** Object:  User [tSQLt.TestClass]    Script Date: 9/7/2025 01:07:52 ******/
CREATE USER [tSQLt.TestClass] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Schema [SQLCop]    Script Date: 9/7/2025 01:07:52 ******/
CREATE SCHEMA [SQLCop]
GO
/****** Object:  Schema [tSQLt]    Script Date: 9/7/2025 01:07:52 ******/
CREATE SCHEMA [tSQLt]
GO
/****** Object:  UserDefinedFunction [dbo].[fn_toCamelCase]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_toCamelCase](@input NVARCHAR(128))
RETURNS NVARCHAR(128)
AS
BEGIN
    RETURN LOWER(LEFT(@input,1)) + SUBSTRING(@input, 2, LEN(@input))
END
GO
/****** Object:  Table [dbo].[AccountBalances]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AccountBalances](
	[AccountID] [int] IDENTITY(1,1) NOT NULL,
	[SupplierID] [int] NULL,
	[ClientID] [int] NULL,
	[Balance] [decimal](10, 2) NOT NULL,
 CONSTRAINT [PK__AccountB__349DA5866875C1B5] PRIMARY KEY CLUSTERED 
(
	[AccountID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Branches]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Branches](
	[BranchID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyID] [int] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Address] [nvarchar](200) NULL,
	[Phone] [nvarchar](20) NULL,
	[Logo] [varbinary](max) NULL,
 CONSTRAINT [PK__Branches__A1682FA515D37C5D] PRIMARY KEY CLUSTERED 
(
	[BranchID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Brands]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Brands](
	[BrandID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK__Brands__DAD4F3BEC807F89F] PRIMARY KEY CLUSTERED 
(
	[BrandID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CarBrands]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarBrands](
	[CarBrandID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK__CarBrand__3EAE0B29835BF1AC] PRIMARY KEY CLUSTERED 
(
	[CarBrandID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CarModels]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarModels](
	[CarModelID] [int] IDENTITY(1,1) NOT NULL,
	[CarBrandID] [int] NOT NULL,
	[Model] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK__CarModel__C585C36F707AD8EA] PRIMARY KEY CLUSTERED 
(
	[CarModelID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cars]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cars](
	[CarID] [int] IDENTITY(1,1) NOT NULL,
	[CarModelID] [int] NOT NULL,
	[ClientID] [int] NOT NULL,
	[LicensePlate] [nvarchar](20) NOT NULL,
	[Year] [int] NULL,
	[LastServiceMileage] [int] NULL,
	[IsDebtor] [bit] NULL,
	[DiscountID] [int] NOT NULL,
 CONSTRAINT [PK__Cars__68A0340E0C926E4D] PRIMARY KEY CLUSTERED 
(
	[CarID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Clients]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clients](
	[ClientID] [int] IDENTITY(1,1) NOT NULL,
	[DocTypeID] [int] NOT NULL,
	[DocNumber] [nvarchar](50) NULL,
	[FirstName] [nvarchar](100) NOT NULL,
	[LastName] [nvarchar](100) NULL,
	[Phone] [nvarchar](20) NULL,
	[Email] [nvarchar](100) NULL,
	[Address] [nvarchar](200) NULL,
	[IsActive] [bit] NOT NULL,
	[CountryID] [int] NOT NULL,
	[ProvinceID] [int] NOT NULL,
	[City] [nvarchar](100) NULL,
	[PostalCode] [nvarchar](20) NULL,
	[PriceListID] [int] NOT NULL,
	[VendorID] [int] NOT NULL,
 CONSTRAINT [PK__Clients__E67E1A048D5F930D] PRIMARY KEY CLUSTERED 
(
	[ClientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CompanyData]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CompanyData](
	[CompanyID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Address] [nvarchar](200) NULL,
	[CUIT] [nvarchar](20) NULL,
	[GrossIncome] [nvarchar](20) NULL,
	[StartDate] [date] NULL,
	[Logo] [varbinary](max) NULL,
 CONSTRAINT [PK__CompanyD__2D971C4CF963B1F3] PRIMARY KEY CLUSTERED 
(
	[CompanyID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Countries]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Countries](
	[CountryID] [int] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[CountryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CreditCardGroups]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CreditCardGroups](
	[CreditCardGroupID] [int] IDENTITY(1,1) NOT NULL,
	[GroupName] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_CreditCardGroups] PRIMARY KEY CLUSTERED 
(
	[CreditCardGroupID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CreditCards]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CreditCards](
	[CreditCardID] [int] IDENTITY(1,1) NOT NULL,
	[CardName] [nvarchar](100) NOT NULL,
	[Surcharge] [decimal](18, 4) NULL,
	[Installments] [int] NULL,
	[CreditCardGroupID] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK_CreditCards] PRIMARY KEY CLUSTERED 
(
	[CreditCardID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Discounts]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Discounts](
	[DiscountID] [int] IDENTITY(1,1) NOT NULL,
	[DiscountName] [nvarchar](100) NOT NULL,
	[Percentage] [decimal](5, 2) NOT NULL,
 CONSTRAINT [PK__Discount__E43F6DF6AAF602B3] PRIMARY KEY CLUSTERED 
(
	[DiscountID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DocTypes]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DocTypes](
	[DocTypeID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK__DocTypes__055E26832A8E0FF3] PRIMARY KEY CLUSTERED 
(
	[DocTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Documents]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Documents](
	[DocumentID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyID] [int] NOT NULL,
	[BranchID] [int] NOT NULL,
	[DocumentTypeID] [int] NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
	[DocumentNumber] [int] NOT NULL,
	[PointOfSale] [int] NOT NULL,
	[IsFiscal] [bit] NULL,
	[IsElectronic] [bit] NULL,
	[IsManual] [bit] NULL,
	[IsQuotation] [bit] NULL,
	[IsActive] [bit] NOT NULL,
	[Testing] [bit] NOT NULL,
	[MaxItems] [int] NULL,
	[ShouldAccount] [bit] NOT NULL,
	[MovesStock] [bit] NOT NULL,
 CONSTRAINT [PK__Document__1ABEEF6F4A2B1589] PRIMARY KEY CLUSTERED 
(
	[DocumentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DocumentTypes]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DocumentTypes](
	[DocumentTypeID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK__Document__DBA390C10019FEFA] PRIMARY KEY CLUSTERED 
(
	[DocumentTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ItemCategories]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ItemCategories](
	[ItemCategoryID] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [varchar](100) NOT NULL,
 CONSTRAINT [PK_ItemCategories] PRIMARY KEY CLUSTERED 
(
	[ItemCategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ItemPriceHistory]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ItemPriceHistory](
	[PriceHistoryID] [int] IDENTITY(1,1) NOT NULL,
	[ItemID] [int] NOT NULL,
	[PriceListID] [int] NOT NULL,
	[EffectiveDate] [datetime] NOT NULL,
	[Price] [decimal](10, 2) NOT NULL,
 CONSTRAINT [PK__ItemPric__A927CB2BB60ACD35] PRIMARY KEY CLUSTERED 
(
	[PriceHistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Items]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Items](
	[ItemID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyID] [int] NOT NULL,
	[BranchID] [int] NOT NULL,
	[BrandID] [int] NOT NULL,
	[Code] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](200) NOT NULL,
	[ItemCategoryID] [int] NOT NULL,
	[ItemSubcategoryID] [int] NOT NULL,
	[SupplierID] [int] NOT NULL,
	[ControlStock] [bit] NOT NULL,
	[ReplenishmentStock] [int] NOT NULL,
	[IsOffer] [bit] NOT NULL,
	[OEM] [nvarchar](50) NULL,
	[LastModified] [date] NOT NULL,
	[WarehouseID] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK__Items__727E83EB997DFA51] PRIMARY KEY CLUSTERED 
(
	[ItemID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Itemstock]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Itemstock](
	[ItemID] [int] NOT NULL,
	[WarehouseID] [int] NOT NULL,
	[CompanyID] [int] NOT NULL,
	[BranchID] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
	[ReservedQuantity] [int] NOT NULL,
	[LastModified] [date] NOT NULL,
	[StockStatus] [nvarchar](50) NOT NULL,
	[MinStockLevel] [int] NOT NULL,
	[MaxStockLevel] [int] NOT NULL,
	[StockLocation] [nvarchar](100) NULL,
	[SupplierID] [int] NOT NULL,
	[BatchNumber] [nvarchar](50) NULL,
	[ExpiryDate] [date] NULL,
 CONSTRAINT [PK__Itemstoc__F01E09161DA94055] PRIMARY KEY CLUSTERED 
(
	[ItemID] ASC,
	[WarehouseID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ItemSubcategories]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ItemSubcategories](
	[ItemSubcategoryID] [int] IDENTITY(1,1) NOT NULL,
	[ItemCategoryID] [int] NOT NULL,
	[SubcategoryName] [varchar](100) NOT NULL,
 CONSTRAINT [PK_ItemSubcategories_1] PRIMARY KEY CLUSTERED 
(
	[ItemSubcategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LastUserLogin]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LastUserLogin](
	[UserID] [int] NOT NULL,
	[CompanyID] [int] NOT NULL,
	[BranchID] [int] NOT NULL,
	[RoleID] [int] NOT NULL,
	[LastLogin] [datetime] NOT NULL,
 CONSTRAINT [PK_LastUserLogin] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC,
	[CompanyID] ASC,
	[BranchID] ASC,
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderDetails]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderDetails](
	[OrderDetailID] [int] IDENTITY(1,1) NOT NULL,
	[OrderID] [int] NOT NULL,
	[ItemID] [int] NOT NULL,
	[WarehouseID] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
	[UnitPrice] [decimal](10, 2) NOT NULL,
	[Description] [nvarchar](200) NOT NULL,
	[LastModified] [datetime] NULL,
 CONSTRAINT [PK__OrderDet__9DD74D9DF5D37EDA] PRIMARY KEY CLUSTERED 
(
	[OrderDetailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderHistory]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderHistory](
	[OrderHistoryID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyID] [int] NOT NULL,
	[BranchID] [int] NOT NULL,
	[OrderID] [int] NOT NULL,
	[ClientID] [int] NOT NULL,
	[CarID] [int] NULL,
	[ServiceTypeID] [int] NULL,
	[UserID] [int] NOT NULL,
	[Date] [datetime] NOT NULL,
	[Mileage] [int] NULL,
	[NextServiceMileage] [int] NULL,
	[Subtotal] [decimal](10, 2) NULL,
	[Total] [decimal](10, 2) NULL,
	[Status] [nvarchar](50) NULL,
	[Comments] [nvarchar](500) NULL,
 CONSTRAINT [PK__OrderHis__4D7B4ADD5AAE57F2] PRIMARY KEY CLUSTERED 
(
	[OrderHistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderHistoryDetails]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderHistoryDetails](
	[OrderHistoryDetailID] [int] IDENTITY(1,1) NOT NULL,
	[OrderHistoryID] [int] NOT NULL,
	[ItemID] [int] NOT NULL,
	[WarehouseID] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
	[UnitPrice] [decimal](10, 2) NOT NULL,
	[Description] [nvarchar](200) NOT NULL,
	[LastModified] [datetime] NULL,
 CONSTRAINT [PK__OrderHis__D6D0F42ABBC4939A] PRIMARY KEY CLUSTERED 
(
	[OrderHistoryDetailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[OrderID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyID] [int] NOT NULL,
	[BranchID] [int] NOT NULL,
	[Date] [datetime] NOT NULL,
	[ClientID] [int] NOT NULL,
	[CarID] [int] NULL,
	[IsService] [bit] NULL,
	[ServiceTypeID] [int] NULL,
	[Mileage] [int] NULL,
	[NextServiceMileage] [int] NULL,
	[Notes] [nvarchar](500) NULL,
	[SaleConditionID] [int] NOT NULL,
	[DiscountID] [int] NOT NULL,
	[Subtotal] [decimal](10, 2) NOT NULL,
	[Total] [decimal](10, 2) NOT NULL,
	[VAT] [decimal](10, 2) NOT NULL,
	[UserID] [int] NOT NULL,
	[DocumentID] [int] NOT NULL,
	[PriceListID] [int] NOT NULL,
	[OrderStatusID] [int] NOT NULL,
	[WarehouseID] [int] NOT NULL,
 CONSTRAINT [PK__Orders__C3905BAF2829B144] PRIMARY KEY CLUSTERED 
(
	[OrderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderStatus]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderStatus](
	[OrderStatusID] [int] IDENTITY(1,1) NOT NULL,
	[Status] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK__OrderSta__BC674F4170B3E561] PRIMARY KEY CLUSTERED 
(
	[OrderStatusID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PriceListItems]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PriceListItems](
	[PriceListID] [int] NOT NULL,
	[ItemID] [int] NOT NULL,
	[Price] [decimal](10, 2) NOT NULL,
	[EffectiveDate] [datetime] NOT NULL,
 CONSTRAINT [PK_PriceListItems] PRIMARY KEY CLUSTERED 
(
	[PriceListID] ASC,
	[ItemID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PriceLists]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PriceLists](
	[PriceListID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](250) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedDate] [date] NULL,
 CONSTRAINT [PK__PriceLis__1E30F34C58783DD3] PRIMARY KEY CLUSTERED 
(
	[PriceListID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Provinces]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Provinces](
	[ProvinceID] [int] IDENTITY(1,1) NOT NULL,
	[CountryID] [int] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK__Province__FD0A6FA3062273F9] PRIMARY KEY CLUSTERED 
(
	[ProvinceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[RoleID] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK__Roles__8AFACE3A6B39B353] PRIMARY KEY CLUSTERED 
(
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SaleConditions]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SaleConditions](
	[SaleConditionID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL,
	[DueDate] [date] NULL,
	[Surcharge] [decimal](10, 2) NULL,
	[IsActive] [bit] NULL,
	[CreditCardID] [int] NOT NULL,
 CONSTRAINT [PK__SaleCond__22A3A655BD0A6B44] PRIMARY KEY CLUSTERED 
(
	[SaleConditionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ServiceType]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ServiceType](
	[ServiceTypeID] [int] IDENTITY(1,1) NOT NULL,
	[Type] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_tipos_casos] PRIMARY KEY CLUSTERED 
(
	[ServiceTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StockHistory]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StockHistory](
	[StockHistoryID] [int] IDENTITY(1,1) NOT NULL,
	[ItemID] [int] NOT NULL,
	[CompanyID] [int] NOT NULL,
	[BranchID] [int] NOT NULL,
	[WarehouseID] [int] NOT NULL,
	[QuantityUpdate] [int] NOT NULL,
	[QuantityBefore] [int] NOT NULL,
	[QuantityAfter] [int] NOT NULL,
	[TransactionDate] [datetime] NOT NULL,
	[Reason] [nvarchar](200) NULL,
	[UserID] [int] NOT NULL,
 CONSTRAINT [PK__StockHis__A6CE86DBEB46B995] PRIMARY KEY CLUSTERED 
(
	[StockHistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Suppliers]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Suppliers](
	[SupplierID] [int] IDENTITY(1,1) NOT NULL,
	[DocTypeID] [int] NOT NULL,
	[DocNumber] [nvarchar](50) NULL,
	[FirstName] [nvarchar](100) NOT NULL,
	[LastName] [nvarchar](100) NULL,
	[Phone] [nvarchar](20) NULL,
	[Email] [nvarchar](100) NULL,
	[Address] [nvarchar](200) NULL,
	[IsActive] [bit] NOT NULL,
	[CountryID] [int] NOT NULL,
	[ProvinceID] [int] NOT NULL,
	[City] [nvarchar](100) NULL,
	[PostalCode] [nvarchar](20) NULL,
 CONSTRAINT [PK__Supplier__4BE6669487E21347] PRIMARY KEY CLUSTERED 
(
	[SupplierID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TempOrderDetails]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TempOrderDetails](	
	[OrderDetailID] [int] NULL,
	[OrderID] [int] NULL,
	[OrderSessionID] [uniqueidentifier] NOT NULL,
	[CompanyID] [int] NOT NULL,
	[BranchID] [int] NOT NULL,
	[UserID] [int] NOT NULL,
	[ItemID] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
	[WarehouseID] [int] NOT NULL,
	[PriceListID] [int] NOT NULL,
	[UnitPrice] [decimal](10, 2) NOT NULL,
	[Description] [nvarchar](200) NOT NULL 
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TempStockEntries]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TempStockEntries](
	[TempStockEntryID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyID] [int] NOT NULL,
	[BranchID] [int] NOT NULL,
	[UniqueID] [uniqueidentifier] NOT NULL,
	[SessionID] [nvarchar](100) NOT NULL,
	[UserID] [int] NOT NULL,
	[ItemID] [int] NOT NULL,
	[WarehouseID] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
	[EntryDate] [datetime] NOT NULL,
	[Reason] [nvarchar](200) NULL,
	[IsProcessed] [bit] NOT NULL,
 CONSTRAINT [PK__TempStoc__6BCFA2A4F18BE300] PRIMARY KEY CLUSTERED 
(
	[TempStockEntryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Transactions]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Transactions](
	[TransactionID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyID] [int] NOT NULL,
	[TransactionDate] [datetime] NOT NULL,
	[ClientID] [int] NULL,
	[SupplierID] [int] NULL,
	[TransacTypeID] [int] NOT NULL,
	[OrderID] [int] NULL,
	[Subtotal] [decimal](10, 2) NULL,
	[Taxes] [decimal](10, 2) NULL,
	[Total] [decimal](10, 2) NULL,
	[Notes] [nvarchar](200) NULL,
	[BranchID] [int] NULL,
 CONSTRAINT [PK__Transact__55433A4BB5EE9535] PRIMARY KEY CLUSTERED 
(
	[TransactionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TransactionTypes]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TransactionTypes](
	[TransactTypeID] [int] IDENTITY(1,1) NOT NULL,
	[TypeName] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_TransactionTypes] PRIMARY KEY CLUSTERED 
(
	[TransactTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserAccess]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserAccess](
	[UserID] [int] NOT NULL,
	[CompanyID] [int] NOT NULL,
	[BranchID] [int] NOT NULL,
	[RoleID] [int] NOT NULL,
 CONSTRAINT [PK_UserAccess] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC,
	[CompanyID] ASC,
	[BranchID] ASC,
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserActions]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserActions](
	[UserActionID] [int] IDENTITY(1,1) NOT NULL,
	[ActionName] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_UserActions] PRIMARY KEY CLUSTERED 
(
	[UserActionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserActivityLog]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserActivityLog](
	[ActivityID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[UserActionID] [int] NOT NULL,
	[Timestamp] [datetime] NOT NULL,
 CONSTRAINT [PK__UserActi__45F4A7F1A8CAACBC] PRIMARY KEY CLUSTERED 
(
	[ActivityID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[Nickname] [nvarchar](50) NOT NULL,
	[FullName] [nvarchar](100) NOT NULL,
	[Password] [nvarchar](100) NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK__Users__1788CCAC4149E5BC] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vendors]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vendors](
	[VendorID] [int] IDENTITY(1,1) NOT NULL,
	[VendorName] [nvarchar](100) NOT NULL,
	[Commission] [decimal](18, 4) NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK_Vendors] PRIMARY KEY CLUSTERED 
(
	[VendorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Warehouses]    Script Date: 9/7/2025 01:07:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Warehouses](
	[WarehouseID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Addres] [nvarchar](100) NULL,
 CONSTRAINT [PK__Warehous__2608AFD9216E9B31] PRIMARY KEY CLUSTERED 
(
	[WarehouseID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

-- ==========================================
-- Sección: Carga de datos de prueba
-- ==========================================

SET IDENTITY_INSERT [dbo].[Branches] ON 

INSERT [dbo].[Branches] ([BranchID], [CompanyID], [Name], [Address], [Phone], [Logo]) VALUES (1, 1, N'CENTRAL', N'XXXX', N'1234', NULL)
INSERT [dbo].[Branches] ([BranchID], [CompanyID], [Name], [Address], [Phone], [Logo]) VALUES (2, 1, N'SECUNDARIA', N'DDDDDD', N'456', NULL)
INSERT [dbo].[Branches] ([BranchID], [CompanyID], [Name], [Address], [Phone], [Logo]) VALUES (3, 2, N'CENTRAL_CT2', N'asdasdasd', N'324234234', NULL)
SET IDENTITY_INSERT [dbo].[Branches] OFF
GO
SET IDENTITY_INSERT [dbo].[Brands] ON 

INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (1, N'Motorola4', 1)
INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (2, N'Thrubanower Holdings Corp.', 1)
INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (3, N'Undimedar WorldWide ', 0)
INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (4, N'Supcadax International Company', 1)
INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (5, N'Cippebefar International Group', 1)
INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (6, N'Barkilazz Direct Inc', 1)
INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (7, N'Gropickilistor  Group', 1)
INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (8, N'Surdimanentor  Inc', 1)
INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (9, N'Supweran Holdings ', 1)
INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (10, N'Tiperimor WorldWide ', 1)
INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (11, N'Adwerpommex WorldWide ', 1)
INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (12, N'Haptumonan  Inc', 1)
INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (13, N'Winpickaquar  ', 1)
INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (14, N'Zeetanegentor Direct ', 1)
INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (15, N'Lomtinepover  ', 1)
INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (16, N'Unerommazz Direct ', 1)
INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (17, N'Indudan WorldWide ', 1)
INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (18, N'Surkilaquistor WorldWide ', 1)
INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (19, N'Cipmunilantor Direct Group', 1)
INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (20, N'Qwihupistor Holdings Group', 1)
INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (21, N'Fromunaquin International ', 1)
INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (22, N'ssssssssss', 1)
INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (23, N'test', 1)
INSERT [dbo].[Brands] ([BrandID], [Name], [IsActive]) VALUES (24, N'testttttt', 1)
SET IDENTITY_INSERT [dbo].[Brands] OFF
GO
SET IDENTITY_INSERT [dbo].[CarBrands] ON 

INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (1, N'Subaru')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (2, N'Volkswagen')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (3, N'KYA')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (4, N'BMW')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (5, N'Chrysler')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (6, N'Iveco')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (7, N'Nissan')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (8, N'Daewoo')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (9, N'Isuzu')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (10, N'Shineray')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (11, N'Fiat')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (12, N'Gilera')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (13, N'Chery')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (14, N'Aprilia')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (15, N'Peugeot')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (16, N'Corven')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (17, N'Hella')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (18, N'Zanella')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (19, N'Volvo')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (20, N'Motomel')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (21, N'Audi')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (22, N'Honda')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (23, N'Suzuki')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (24, N'Agrale')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (25, N'Chevrolet')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (26, N'Alfa Romeo')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (27, N'Tata')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (28, N'Geely')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (29, N'Seat')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (30, N'Lifan')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (31, N'Renault')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (32, N'Hyundai')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (33, N'Citroën')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (34, N'SsangYong')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (35, N'Mercedes Benz')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (36, N'Illinois')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (37, N'Rover')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (38, N'Mini')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (39, N'Mitsubishi')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (40, N'IAME')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (41, N'KIA')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (42, N'Sermat')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (43, N'Keller')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (44, N'Toyota')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (45, N'Mazda')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (46, N'Jeep')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (47, N'DFSK')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (48, N'Ford')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (49, N'Yamaha')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (50, N'IKA')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (51, N'DKW Union')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (52, N'Baic')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (53, N'Dodge')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (54, N'Daihatsu')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (55, N'Benelli')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (56, N'Guerrero')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (57, N'Dacia')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (58, N'test245')
INSERT [dbo].[CarBrands] ([CarBrandID], [Name]) VALUES (59, N'test')
SET IDENTITY_INSERT [dbo].[CarBrands] OFF
GO
SET IDENTITY_INSERT [dbo].[CarModels] ON 

INSERT [dbo].[CarModels] ([CarModelID], [CarBrandID], [Model]) VALUES (1, 1, N'Mazca')
INSERT [dbo].[CarModels] ([CarModelID], [CarBrandID], [Model]) VALUES (2, 15, N'408')
SET IDENTITY_INSERT [dbo].[CarModels] OFF
GO
SET IDENTITY_INSERT [dbo].[Cars] ON 

INSERT [dbo].[Cars] ([CarID], [CarModelID], [ClientID], [LicensePlate], [Year], [LastServiceMileage], [IsDebtor], [DiscountID]) VALUES (1, 1, 11, N'NIK006', 2013, 140000, 0, 1)
INSERT [dbo].[Cars] ([CarID], [CarModelID], [ClientID], [LicensePlate], [Year], [LastServiceMileage], [IsDebtor], [DiscountID]) VALUES (2, 2, 19, N'536GAU', 2010, 405484, 0, 1)
SET IDENTITY_INSERT [dbo].[Cars] OFF
GO
SET IDENTITY_INSERT [dbo].[Clients] ON 

INSERT [dbo].[Clients] ([ClientID], [DocTypeID], [DocNumber], [FirstName], [LastName], [Phone], [Email], [Address], [IsActive], [CountryID], [ProvinceID], [City], [PostalCode], [PriceListID], [VendorID]) VALUES (2, 1, N'34353582', N'Javier54654654654', N'Prieto', N'457300', N'javier@mail.com', N'Bacon 4932', 1, 51, 1, N'CABA', N'1419', 1, 1)
INSERT [dbo].[Clients] ([ClientID], [DocTypeID], [DocNumber], [FirstName], [LastName], [Phone], [Email], [Address], [IsActive], [CountryID], [ProvinceID], [City], [PostalCode], [PriceListID], [VendorID]) VALUES (9, 1, N'99999999', N'Javier', N'Nicolas', N'234234', N'ccts@gmail.com', N'sdfsdf', 1, 51, 1, N'sdfsdf', N'324', 1, 1)
INSERT [dbo].[Clients] ([ClientID], [DocTypeID], [DocNumber], [FirstName], [LastName], [Phone], [Email], [Address], [IsActive], [CountryID], [ProvinceID], [City], [PostalCode], [PriceListID], [VendorID]) VALUES (11, 2, N'66666', N'Adrian', N'Adrian', N'Lambrese', N'sdfs', N'sdfsdf', 1, 51, 1, N'5656', N'156', 1, 1)
INSERT [dbo].[Clients] ([ClientID], [DocTypeID], [DocNumber], [FirstName], [LastName], [Phone], [Email], [Address], [IsActive], [CountryID], [ProvinceID], [City], [PostalCode], [PriceListID], [VendorID]) VALUES (12, 1, N'4444444', N'ffffffff', N'Adroam', N'Pabñp', N'4@mi.vom', N'hjhj', 1, 51, 1, N'878', N'4733', 1, 1)
INSERT [dbo].[Clients] ([ClientID], [DocTypeID], [DocNumber], [FirstName], [LastName], [Phone], [Email], [Address], [IsActive], [CountryID], [ProvinceID], [City], [PostalCode], [PriceListID], [VendorID]) VALUES (13, 1, N'66666', N'ddddddd', N'ssssssssss', N'45454', N'545445', N'sssssss', 1, 54, 3, N'ssssssss', N'11111', 1, 1)
INSERT [dbo].[Clients] ([ClientID], [DocTypeID], [DocNumber], [FirstName], [LastName], [Phone], [Email], [Address], [IsActive], [CountryID], [ProvinceID], [City], [PostalCode], [PriceListID], [VendorID]) VALUES (14, 1, N'4545454545', N'xdsddddd', N'ddddddd', N'3333333', N'dddddd', N'sssss 4444', 1, 54, 1, N'caba', N'1195', 1, 1)
INSERT [dbo].[Clients] ([ClientID], [DocTypeID], [DocNumber], [FirstName], [LastName], [Phone], [Email], [Address], [IsActive], [CountryID], [ProvinceID], [City], [PostalCode], [PriceListID], [VendorID]) VALUES (15, 1, N'4545454545', N'xdsddddd', N'ddddddd', N'3333333', N'dddddd', N'sssss 4444', 1, 54, 1, N'caba', N'1195', 1, 1)
INSERT [dbo].[Clients] ([ClientID], [DocTypeID], [DocNumber], [FirstName], [LastName], [Phone], [Email], [Address], [IsActive], [CountryID], [ProvinceID], [City], [PostalCode], [PriceListID], [VendorID]) VALUES (16, 1, N'34353584', N'Javier', N'Prieto', N'01134862415', N'javier_prieto@outlook.com', N'Valentin Gomez 3887 PB B', 1, 54, 1, N'Capital Federal', N'1195', 1, 1)
INSERT [dbo].[Clients] ([ClientID], [DocTypeID], [DocNumber], [FirstName], [LastName], [Phone], [Email], [Address], [IsActive], [CountryID], [ProvinceID], [City], [PostalCode], [PriceListID], [VendorID]) VALUES (17, 1, N'34353582', N'Javier', N'Prieto', N'01134862415', N'javier_prieto@outlook.com', N'Valentin Gomez 3887 PB B', 1, 54, 1, N'Capital Federal', N'1195', 1, 1)
INSERT [dbo].[Clients] ([ClientID], [DocTypeID], [DocNumber], [FirstName], [LastName], [Phone], [Email], [Address], [IsActive], [CountryID], [ProvinceID], [City], [PostalCode], [PriceListID], [VendorID]) VALUES (18, 1, N'122222222', N'Pedro', N'Salinas', N'46424734', N'tuvieja@yahoo.com.ar', N'Avenida NAza 1745', 1, 54, 1, N'1419', N'1195', 1, 1)
INSERT [dbo].[Clients] ([ClientID], [DocTypeID], [DocNumber], [FirstName], [LastName], [Phone], [Email], [Address], [IsActive], [CountryID], [ProvinceID], [City], [PostalCode], [PriceListID], [VendorID]) VALUES (19, 1, N'4454554', N'Carlos', N'Stramiana', N'111245545', N'kilo@gmail.com', N'Pasep 12', 1, 51, 1, N'ssssss', N'1195', 1, 1)
SET IDENTITY_INSERT [dbo].[Clients] OFF
GO
SET IDENTITY_INSERT [dbo].[CompanyData] ON 

INSERT [dbo].[CompanyData] ([CompanyID], [Name], [Address], [CUIT], [GrossIncome], [StartDate], [Logo]) VALUES (1, N'CT', N'DDD', N'20343535822', NULL, CAST(N'2025-05-16' AS Date), NULL)
INSERT [dbo].[CompanyData] ([CompanyID], [Name], [Address], [CUIT], [GrossIncome], [StartDate], [Logo]) VALUES (2, N'CT2', N'SSSSS', N'565656565', NULL, CAST(N'2025-05-25' AS Date), NULL)
SET IDENTITY_INSERT [dbo].[CompanyData] OFF
GO
INSERT [dbo].[Countries] ([CountryID], [Name]) VALUES (51, N'Peru')
INSERT [dbo].[Countries] ([CountryID], [Name]) VALUES (54, N'Argentina')
GO
SET IDENTITY_INSERT [dbo].[CreditCardGroups] ON 

INSERT [dbo].[CreditCardGroups] ([CreditCardGroupID], [GroupName]) VALUES (1, N'Sin tarjeta')
INSERT [dbo].[CreditCardGroups] ([CreditCardGroupID], [GroupName]) VALUES (2, N'test')
SET IDENTITY_INSERT [dbo].[CreditCardGroups] OFF
GO
SET IDENTITY_INSERT [dbo].[CreditCards] ON 

INSERT [dbo].[CreditCards] ([CreditCardID], [CardName], [Surcharge], [Installments], [CreditCardGroupID], [IsActive]) VALUES (1, N'Contado', CAST(0.0000 AS Decimal(18, 4)), NULL, 1, 1)
INSERT [dbo].[CreditCards] ([CreditCardID], [CardName], [Surcharge], [Installments], [CreditCardGroupID], [IsActive]) VALUES (2, N'65656', CAST(0.0000 AS Decimal(18, 4)), 0, 2, 1)
SET IDENTITY_INSERT [dbo].[CreditCards] OFF
GO
SET IDENTITY_INSERT [dbo].[Discounts] ON 

INSERT [dbo].[Discounts] ([DiscountID], [DiscountName], [Percentage]) VALUES (1, N'Sin descuento', CAST(0.00 AS Decimal(5, 2)))
SET IDENTITY_INSERT [dbo].[Discounts] OFF
GO
SET IDENTITY_INSERT [dbo].[DocTypes] ON 

INSERT [dbo].[DocTypes] ([DocTypeID], [Name], [IsActive]) VALUES (1, N'DNI', 1)
INSERT [dbo].[DocTypes] ([DocTypeID], [Name], [IsActive]) VALUES (2, N'CUIT', 1)
SET IDENTITY_INSERT [dbo].[DocTypes] OFF
GO
SET IDENTITY_INSERT [dbo].[Documents] ON 

INSERT [dbo].[Documents] ([DocumentID], [CompanyID], [BranchID], [DocumentTypeID], [Description], [DocumentNumber], [PointOfSale], [IsFiscal], [IsElectronic], [IsManual], [IsQuotation], [IsActive], [Testing], [MaxItems], [ShouldAccount], [MovesStock]) VALUES (2, 1, 1, 1, N'Factura B', 0, 1, 0, 0, 1, NULL, 1, 1, 20, 0, 1)
SET IDENTITY_INSERT [dbo].[Documents] OFF
GO
SET IDENTITY_INSERT [dbo].[DocumentTypes] ON 

INSERT [dbo].[DocumentTypes] ([DocumentTypeID], [Name]) VALUES (1, N'Factura')
SET IDENTITY_INSERT [dbo].[DocumentTypes] OFF
GO
SET IDENTITY_INSERT [dbo].[ItemCategories] ON 

INSERT [dbo].[ItemCategories] ([ItemCategoryID], [CategoryName]) VALUES (1, N'Informatica')
INSERT [dbo].[ItemCategories] ([ItemCategoryID], [CategoryName]) VALUES (2, N'Hogar')
SET IDENTITY_INSERT [dbo].[ItemCategories] OFF
GO
SET IDENTITY_INSERT [dbo].[Items] ON 

INSERT [dbo].[Items] ([ItemID], [CompanyID], [BranchID], [BrandID], [Code], [Description], [ItemCategoryID], [ItemSubcategoryID], [SupplierID], [ControlStock], [ReplenishmentStock], [IsOffer], [OEM], [LastModified], [WarehouseID], [IsActive]) VALUES (1, 1, 1, 1, N'ARTICULOTEST1666666', N'ARTICULOTEST', 1, 1, 2, 0, 0, 0, NULL, CAST(N'2025-05-16' AS Date), 1, 1)
INSERT [dbo].[Items] ([ItemID], [CompanyID], [BranchID], [BrandID], [Code], [Description], [ItemCategoryID], [ItemSubcategoryID], [SupplierID], [ControlStock], [ReplenishmentStock], [IsOffer], [OEM], [LastModified], [WarehouseID], [IsActive]) VALUES (2, 1, 1, 1, N'ARTICULOTEST2', N'ARTICULOTEST2', 1, 1, 1, 0, 0, 0, NULL, CAST(N'2025-05-26' AS Date), 1, 1)
INSERT [dbo].[Items] ([ItemID], [CompanyID], [BranchID], [BrandID], [Code], [Description], [ItemCategoryID], [ItemSubcategoryID], [SupplierID], [ControlStock], [ReplenishmentStock], [IsOffer], [OEM], [LastModified], [WarehouseID], [IsActive]) VALUES (3, 1, 1, 1, N'ECO0000', N'Esunauto', 1, 1, 1, 1, 0, 0, NULL, CAST(N'2025-07-03' AS Date), 1, 1)
INSERT [dbo].[Items] ([ItemID], [CompanyID], [BranchID], [BrandID], [Code], [Description], [ItemCategoryID], [ItemSubcategoryID], [SupplierID], [ControlStock], [ReplenishmentStock], [IsOffer], [OEM], [LastModified], [WarehouseID], [IsActive]) VALUES (4, 1, 1, 1, N'3233', N'dfdfdf', 1, 2, 1, 1, 15, 0, NULL, CAST(N'2025-07-03' AS Date), 1, 1)
SET IDENTITY_INSERT [dbo].[Items] OFF
GO
SET IDENTITY_INSERT [dbo].[ItemSubcategories] ON 

INSERT [dbo].[ItemSubcategories] ([ItemSubcategoryID], [ItemCategoryID], [SubcategoryName]) VALUES (1, 1, N'Teclados')
INSERT [dbo].[ItemSubcategories] ([ItemSubcategoryID], [ItemCategoryID], [SubcategoryName]) VALUES (2, 1, N'test')
INSERT [dbo].[ItemSubcategories] ([ItemSubcategoryID], [ItemCategoryID], [SubcategoryName]) VALUES (1002, 2, N'Sillas')
SET IDENTITY_INSERT [dbo].[ItemSubcategories] OFF
GO
SET IDENTITY_INSERT [dbo].[OrderDetails] ON 

INSERT [dbo].[OrderDetails] ([OrderDetailID], [OrderID], [ItemID], [WarehouseID], [Quantity], [UnitPrice], [Description], [LastModified]) VALUES (3, 6, 1, 1, 1, CAST(222.00 AS Decimal(10, 2)), N'ARTICULOTEST', CAST(N'2025-07-08T00:30:52.577' AS DateTime))
INSERT [dbo].[OrderDetails] ([OrderDetailID], [OrderID], [ItemID], [WarehouseID], [Quantity], [UnitPrice], [Description], [LastModified]) VALUES (4, 7, 2, 1, 1, CAST(222.00 AS Decimal(10, 2)), N'ARTICULOTEST2', CAST(N'2025-07-08T00:55:30.600' AS DateTime))
INSERT [dbo].[OrderDetails] ([OrderDetailID], [OrderID], [ItemID], [WarehouseID], [Quantity], [UnitPrice], [Description], [LastModified]) VALUES (5, 8, 2, 2, 1, CAST(332.00 AS Decimal(10, 2)), N'ARTICULOTEST2', CAST(N'2025-07-08T01:43:58.677' AS DateTime))
INSERT [dbo].[OrderDetails] ([OrderDetailID], [OrderID], [ItemID], [WarehouseID], [Quantity], [UnitPrice], [Description], [LastModified]) VALUES (6, 8, 1, 2, 12, CAST(300.00 AS Decimal(10, 2)), N'ARTICULOTEST', CAST(N'2025-07-08T01:43:58.677' AS DateTime))
INSERT [dbo].[OrderDetails] ([OrderDetailID], [OrderID], [ItemID], [WarehouseID], [Quantity], [UnitPrice], [Description], [LastModified]) VALUES (7, 9, 3, 2, 88, CAST(500.00 AS Decimal(10, 2)), N'Esunauto', CAST(N'2025-07-08T15:16:45.567' AS DateTime))
INSERT [dbo].[OrderDetails] ([OrderDetailID], [OrderID], [ItemID], [WarehouseID], [Quantity], [UnitPrice], [Description], [LastModified]) VALUES (8, 9, 1, 2, 1, CAST(5454.00 AS Decimal(10, 2)), N'ARTICULOTEST', CAST(N'2025-07-08T15:16:45.567' AS DateTime))
SET IDENTITY_INSERT [dbo].[OrderDetails] OFF
GO
SET IDENTITY_INSERT [dbo].[Orders] ON 

INSERT [dbo].[Orders] ([OrderID], [CompanyID], [BranchID], [Date], [ClientID], [CarID], [IsService], [ServiceTypeID], [Mileage], [NextServiceMileage], [Notes], [SaleConditionID], [DiscountID], [Subtotal], [Total], [VAT], [UserID], [DocumentID], [PriceListID], [OrderStatusID], [WarehouseID]) VALUES (1, 1, 1, CAST(N'2025-07-07T12:57:18.710' AS DateTime), 2, NULL, 0, NULL, NULL, NULL, N'Es una orden', 1, 1, CAST(100.00 AS Decimal(10, 2)), CAST(121.00 AS Decimal(10, 2)), CAST(21.00 AS Decimal(10, 2)), 1, 1, 1, 1, 1)
INSERT [dbo].[Orders] ([OrderID], [CompanyID], [BranchID], [Date], [ClientID], [CarID], [IsService], [ServiceTypeID], [Mileage], [NextServiceMileage], [Notes], [SaleConditionID], [DiscountID], [Subtotal], [Total], [VAT], [UserID], [DocumentID], [PriceListID], [OrderStatusID], [WarehouseID]) VALUES (6, 1, 1, CAST(N'2025-07-08T00:00:00.000' AS DateTime), 11, NULL, 0, NULL, NULL, NULL, NULL, 1, 1, CAST(222.00 AS Decimal(10, 2)), CAST(268.62 AS Decimal(10, 2)), CAST(46.62 AS Decimal(10, 2)), 1, 1, 1, 1, 1)
INSERT [dbo].[Orders] ([OrderID], [CompanyID], [BranchID], [Date], [ClientID], [CarID], [IsService], [ServiceTypeID], [Mileage], [NextServiceMileage], [Notes], [SaleConditionID], [DiscountID], [Subtotal], [Total], [VAT], [UserID], [DocumentID], [PriceListID], [OrderStatusID], [WarehouseID]) VALUES (7, 1, 1, CAST(N'2025-07-08T00:00:00.000' AS DateTime), 16, NULL, 0, NULL, NULL, NULL, NULL, 1, 1, CAST(222.00 AS Decimal(10, 2)), CAST(268.62 AS Decimal(10, 2)), CAST(46.62 AS Decimal(10, 2)), 1, 1, 1, 1, 1)
INSERT [dbo].[Orders] ([OrderID], [CompanyID], [BranchID], [Date], [ClientID], [CarID], [IsService], [ServiceTypeID], [Mileage], [NextServiceMileage], [Notes], [SaleConditionID], [DiscountID], [Subtotal], [Total], [VAT], [UserID], [DocumentID], [PriceListID], [OrderStatusID], [WarehouseID]) VALUES (8, 1, 1, CAST(N'2025-07-08T00:00:00.000' AS DateTime), 9, NULL, 0, NULL, NULL, NULL, NULL, 1, 1, CAST(3932.00 AS Decimal(10, 2)), CAST(4757.72 AS Decimal(10, 2)), CAST(825.72 AS Decimal(10, 2)), 1, 1, 2, 1, 2)
INSERT [dbo].[Orders] ([OrderID], [CompanyID], [BranchID], [Date], [ClientID], [CarID], [IsService], [ServiceTypeID], [Mileage], [NextServiceMileage], [Notes], [SaleConditionID], [DiscountID], [Subtotal], [Total], [VAT], [UserID], [DocumentID], [PriceListID], [OrderStatusID], [WarehouseID]) VALUES (9, 1, 1, CAST(N'2025-07-08T00:00:00.000' AS DateTime), 9, NULL, 0, NULL, NULL, NULL, NULL, 1, 1, CAST(49454.00 AS Decimal(10, 2)), CAST(59839.34 AS Decimal(10, 2)), CAST(10385.34 AS Decimal(10, 2)), 1, 1, 2, 1, 2)
SET IDENTITY_INSERT [dbo].[Orders] OFF
GO
SET IDENTITY_INSERT [dbo].[OrderStatus] ON 

INSERT [dbo].[OrderStatus] ([OrderStatusID], [Status]) VALUES (1, N'Ingresado')
SET IDENTITY_INSERT [dbo].[OrderStatus] OFF
GO
SET IDENTITY_INSERT [dbo].[PriceLists] ON 

INSERT [dbo].[PriceLists] ([PriceListID], [Name], [Description], [IsActive], [CreatedDate]) VALUES (1, N'Lista 1', N'Lista 1', 1, CAST(N'2025-05-16' AS Date))
INSERT [dbo].[PriceLists] ([PriceListID], [Name], [Description], [IsActive], [CreatedDate]) VALUES (2, N'Lista 2', N'Lista 2', 1, CAST(N'2025-05-24' AS Date))
INSERT [dbo].[PriceLists] ([PriceListID], [Name], [Description], [IsActive], [CreatedDate]) VALUES (3, N'Lista 33', N'', 1, CAST(N'2025-07-06' AS Date))
SET IDENTITY_INSERT [dbo].[PriceLists] OFF
GO
SET IDENTITY_INSERT [dbo].[Provinces] ON 

INSERT [dbo].[Provinces] ([ProvinceID], [CountryID], [Name]) VALUES (1, 54, N'CABA')
INSERT [dbo].[Provinces] ([ProvinceID], [CountryID], [Name]) VALUES (2, 54, N'Santa Fe')
INSERT [dbo].[Provinces] ([ProvinceID], [CountryID], [Name]) VALUES (3, 51, N'Lima')
SET IDENTITY_INSERT [dbo].[Provinces] OFF
GO
SET IDENTITY_INSERT [dbo].[Roles] ON 

INSERT [dbo].[Roles] ([RoleID], [RoleName]) VALUES (1, N'Admin')
INSERT [dbo].[Roles] ([RoleID], [RoleName]) VALUES (2, N'Usuario')
SET IDENTITY_INSERT [dbo].[Roles] OFF
GO
SET IDENTITY_INSERT [dbo].[SaleConditions] ON 

INSERT [dbo].[SaleConditions] ([SaleConditionID], [Name], [DueDate], [Surcharge], [IsActive], [CreditCardID]) VALUES (1, N'Contado', CAST(N'2025-05-26' AS Date), CAST(0.00 AS Decimal(10, 2)), 1, 1)
INSERT [dbo].[SaleConditions] ([SaleConditionID], [Name], [DueDate], [Surcharge], [IsActive], [CreditCardID]) VALUES (3, N'333333', CAST(N'2025-08-09' AS Date), CAST(0.00 AS Decimal(10, 2)), 1, 2)
SET IDENTITY_INSERT [dbo].[SaleConditions] OFF
GO
SET IDENTITY_INSERT [dbo].[Suppliers] ON 

INSERT [dbo].[Suppliers] ([SupplierID], [DocTypeID], [DocNumber], [FirstName], [LastName], [Phone], [Email], [Address], [IsActive], [CountryID], [ProvinceID], [City], [PostalCode]) VALUES (1, 1, N'453453453', N'MI', N'PROVEDORXX', N'345345435', N'd@mail.com', N'sdfsfd3', 1, 51, 1, N'CABA', N'1419')
INSERT [dbo].[Suppliers] ([SupplierID], [DocTypeID], [DocNumber], [FirstName], [LastName], [Phone], [Email], [Address], [IsActive], [CountryID], [ProvinceID], [City], [PostalCode]) VALUES (2, 1, N'99999999', N'Javier', N'Prieto', N'01134862415', N'javier_prieto@outlook.com', N'Valentin Gomez 3887 PB B', 1, 51, 1, N'Capital Federal', N'1195')
INSERT [dbo].[Suppliers] ([SupplierID], [DocTypeID], [DocNumber], [FirstName], [LastName], [Phone], [Email], [Address], [IsActive], [CountryID], [ProvinceID], [City], [PostalCode]) VALUES (3, 1, N'5435345345', N'SARAZA', N'KKKK', N'456787487', N'mail@gmail.com', N'Zaraza 202020', 1, 54, 1, N'LIA', N'1112')
SET IDENTITY_INSERT [dbo].[Suppliers] OFF
GO
INSERT [dbo].[UserAccess] ([UserID], [CompanyID], [BranchID], [RoleID]) VALUES (1, 1, 1, 1)
INSERT [dbo].[UserAccess] ([UserID], [CompanyID], [BranchID], [RoleID]) VALUES (1, 1, 1, 2)
INSERT [dbo].[UserAccess] ([UserID], [CompanyID], [BranchID], [RoleID]) VALUES (1, 1, 2, 1)
INSERT [dbo].[UserAccess] ([UserID], [CompanyID], [BranchID], [RoleID]) VALUES (1, 2, 3, 1)
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([UserID], [Nickname], [FullName], [Password], [IsActive]) VALUES (1, N'javierp', N'Javier Prieto', N'Estronci@', 1)
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
SET IDENTITY_INSERT [dbo].[Vendors] ON 

INSERT [dbo].[Vendors] ([VendorID], [VendorName], [Commission], [IsActive]) VALUES (1, N'Vendedor 1', CAST(10.0000 AS Decimal(18, 4)), 1)
SET IDENTITY_INSERT [dbo].[Vendors] OFF
GO
SET IDENTITY_INSERT [dbo].[Warehouses] ON 

INSERT [dbo].[Warehouses] ([WarehouseID], [Name], [Addres]) VALUES (1, N'Principal', NULL)
INSERT [dbo].[Warehouses] ([WarehouseID], [Name], [Addres]) VALUES (2, N'Capital ', N'Saraza 1234')
SET IDENTITY_INSERT [dbo].[Warehouses] OFF
GO

-- ==========================================
-- Sección: Creación de índices
-- ==========================================

/****** Object:  Index [IX_Clients_IsActive]    Script Date: 9/7/2025 01:07:53 ******/
CREATE NONCLUSTERED INDEX [IX_Clients_IsActive] ON [dbo].[Clients]
(
	[IsActive] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [idx_DiscountID]    Script Date: 9/7/2025 01:07:53 ******/
CREATE NONCLUSTERED INDEX [idx_DiscountID] ON [dbo].[Discounts]
(
	[DiscountID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [ix_Categories_CategoryID]    Script Date: 9/7/2025 01:07:53 ******/
CREATE NONCLUSTERED INDEX [ix_Categories_CategoryID] ON [dbo].[ItemCategories]
(
	[ItemCategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Items__A25C5AA7F6BA0424]    Script Date: 9/7/2025 01:07:53 ******/
ALTER TABLE [dbo].[Items] ADD  CONSTRAINT [UQ__Items__A25C5AA7F6BA0424] UNIQUE NONCLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Items_Code]    Script Date: 9/7/2025 01:07:53 ******/
CREATE NONCLUSTERED INDEX [IX_Items_Code] ON [dbo].[Items]
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [idx_BranchID]    Script Date: 9/7/2025 01:07:53 ******/
CREATE NONCLUSTERED INDEX [idx_BranchID] ON [dbo].[Itemstock]
(
	[CompanyID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [idx_ItemWarehouse]    Script Date: 9/7/2025 01:07:53 ******/
CREATE NONCLUSTERED INDEX [idx_ItemWarehouse] ON [dbo].[Itemstock]
(
	[ItemID] ASC,
	[WarehouseID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [idx_SupplierStatus]    Script Date: 9/7/2025 01:07:53 ******/
CREATE NONCLUSTERED INDEX [idx_SupplierStatus] ON [dbo].[Itemstock]
(
	[SupplierID] ASC,
	[StockStatus] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Itemstock_Warehouse_Item]    Script Date: 9/7/2025 01:07:53 ******/
CREATE NONCLUSTERED INDEX [IX_Itemstock_Warehouse_Item] ON [dbo].[Itemstock]
(
	[WarehouseID] ASC,
	[ItemID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [ix_Subcategories_SubcategoryID]    Script Date: 9/7/2025 01:07:53 ******/
CREATE NONCLUSTERED INDEX [ix_Subcategories_SubcategoryID] ON [dbo].[ItemSubcategories]
(
	[ItemSubcategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [idx_ClientID]    Script Date: 9/7/2025 01:07:53 ******/
CREATE NONCLUSTERED INDEX [idx_ClientID] ON [dbo].[Orders]
(
	[ClientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [idx_CompanyID]    Script Date: 9/7/2025 01:07:53 ******/
CREATE NONCLUSTERED INDEX [idx_CompanyID] ON [dbo].[Orders]
(
	[CompanyID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [idx_OrderDate]    Script Date: 9/7/2025 01:07:53 ******/
CREATE NONCLUSTERED INDEX [idx_OrderDate] ON [dbo].[Orders]
(
	[Date] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Orders_Date]    Script Date: 9/7/2025 01:07:53 ******/
CREATE NONCLUSTERED INDEX [IX_Orders_Date] ON [dbo].[Orders]
(
	[Date] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [idx_ClientID_Transactions]    Script Date: 9/7/2025 01:07:53 ******/
CREATE NONCLUSTERED INDEX [idx_ClientID_Transactions] ON [dbo].[Transactions]
(
	[ClientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [idx_SupplierID]    Script Date: 9/7/2025 01:07:53 ******/
CREATE NONCLUSTERED INDEX [idx_SupplierID] ON [dbo].[Transactions]
(
	[SupplierID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [idx_TransactionDate]    Script Date: 9/7/2025 01:07:53 ******/
CREATE NONCLUSTERED INDEX [idx_TransactionDate] ON [dbo].[Transactions]
(
	[TransactionDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
-- ==========================================
-- Sección: Creación de CONSTRAINTS
-- ==========================================

ALTER TABLE [dbo].[AccountBalances] ADD  CONSTRAINT [DF__AccountBa__Balan__3D2915A8]  DEFAULT ((0)) FOR [Balance]
GO
ALTER TABLE [dbo].[Brands] ADD  CONSTRAINT [DF_Brands_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Clients] ADD  CONSTRAINT [DF_Clients_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Clients] ADD  CONSTRAINT [DF_Clients_VendorID]  DEFAULT ((1)) FOR [VendorID]
GO
ALTER TABLE [dbo].[CreditCards] ADD  CONSTRAINT [DF_CreditCards_Surcharge]  DEFAULT ((0)) FOR [Surcharge]
GO
ALTER TABLE [dbo].[CreditCards] ADD  CONSTRAINT [DF_CreditCards_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[DocTypes] ADD  CONSTRAINT [DF__DocTypes__Active__75C27486]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Documents] ADD  CONSTRAINT [DF__Documents__Activ__789EE131]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Documents] ADD  CONSTRAINT [DF__Documents__Testi__7993056A]  DEFAULT ((0)) FOR [Testing]
GO
ALTER TABLE [dbo].[ItemPriceHistory] ADD  CONSTRAINT [DF__ItemPrice__Effec__3587F3E0]  DEFAULT (getdate()) FOR [EffectiveDate]
GO
ALTER TABLE [dbo].[Items] ADD  CONSTRAINT [DF_Items_ControlStock]  DEFAULT ((1)) FOR [ControlStock]
GO
ALTER TABLE [dbo].[Items] ADD  CONSTRAINT [DF_Items_ReplenishmentStock]  DEFAULT ((0)) FOR [ReplenishmentStock]
GO
ALTER TABLE [dbo].[Items] ADD  CONSTRAINT [DF_Items_IsOffer]  DEFAULT ((0)) FOR [IsOffer]
GO
ALTER TABLE [dbo].[Items] ADD  CONSTRAINT [DF_Items_LastModified]  DEFAULT (CONVERT([date],getdate())) FOR [LastModified]
GO
ALTER TABLE [dbo].[Items] ADD  CONSTRAINT [DF__Items__IsActive__6C190EBB]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Itemstock] ADD  CONSTRAINT [DF_Itemstock_LastModified]  DEFAULT (CONVERT([date],getdate())) FOR [LastModified]
GO
ALTER TABLE [dbo].[Itemstock] ADD  CONSTRAINT [DF_Itemstock_MinStockLevel]  DEFAULT ((0)) FOR [MinStockLevel]
GO
ALTER TABLE [dbo].[Itemstock] ADD  CONSTRAINT [DF_Itemstock_MaxStockLevel]  DEFAULT ((0)) FOR [MaxStockLevel]
GO
ALTER TABLE [dbo].[LastUserLogin] ADD  CONSTRAINT [DF_LastUserLogin_LastLogin]  DEFAULT (getdate()) FOR [LastLogin]
GO
ALTER TABLE [dbo].[OrderDetails] ADD  CONSTRAINT [DF__OrderDeta__LastM__2BFE89A6]  DEFAULT (getdate()) FOR [LastModified]
GO
ALTER TABLE [dbo].[OrderHistory] ADD  CONSTRAINT [DF_OrderHistory_Date]  DEFAULT (getdate()) FOR [Date]
GO
ALTER TABLE [dbo].[OrderHistoryDetails] ADD  CONSTRAINT [DF__OrderHist__LastM__30C33EC3]  DEFAULT (getdate()) FOR [LastModified]
GO
ALTER TABLE [dbo].[Orders] ADD  CONSTRAINT [DF_Orders_Date]  DEFAULT (getdate()) FOR [Date]
GO
ALTER TABLE [dbo].[PriceListItems] ADD  CONSTRAINT [DF_PriceListItems_EffectiveDate]  DEFAULT (getdate()) FOR [EffectiveDate]
GO
ALTER TABLE [dbo].[PriceLists] ADD  CONSTRAINT [DF__PriceList__IsAct__47DBAE45]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[PriceLists] ADD  CONSTRAINT [DF__PriceList__Creat__48CFD27E]  DEFAULT (CONVERT([date],getdate())) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[SaleConditions] ADD  CONSTRAINT [DF_SaleConditions_DueDate]  DEFAULT (getdate()) FOR [DueDate]
GO
ALTER TABLE [dbo].[SaleConditions] ADD  CONSTRAINT [DF_SaleConditions_Surcharge]  DEFAULT ((0)) FOR [Surcharge]
GO
ALTER TABLE [dbo].[SaleConditions] ADD  CONSTRAINT [DF_SaleConditions_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[StockHistory] ADD  CONSTRAINT [DF__StockHist__Trans__797309D9]  DEFAULT (getdate()) FOR [TransactionDate]
GO
ALTER TABLE [dbo].[Suppliers] ADD  CONSTRAINT [DF_Suppliers_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[TempOrderDetails] ADD  CONSTRAINT [DF__TempOrder__Order__0B91BA14]  DEFAULT (newid()) FOR [OrderSessionID]
GO
ALTER TABLE [dbo].[TempStockEntries] ADD  CONSTRAINT [DF__TempStock__Uniqu__123EB7A3]  DEFAULT (newid()) FOR [UniqueID]
GO
ALTER TABLE [dbo].[TempStockEntries] ADD  CONSTRAINT [DF__TempStock__Entry__1332DBDC]  DEFAULT (getdate()) FOR [EntryDate]
GO
ALTER TABLE [dbo].[TempStockEntries] ADD  CONSTRAINT [DF__TempStock__IsPro__14270015]  DEFAULT ((0)) FOR [IsProcessed]
GO
ALTER TABLE [dbo].[Transactions] ADD  CONSTRAINT [DF__Transacti__Trans__245D67DE]  DEFAULT (getdate()) FOR [TransactionDate]
GO
ALTER TABLE [dbo].[UserActivityLog] ADD  CONSTRAINT [DF__UserActiv__Times__395884C4]  DEFAULT (getdate()) FOR [Timestamp]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Vendors] ADD  CONSTRAINT [DF_Vendors_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[AccountBalances]  WITH CHECK ADD  CONSTRAINT [FK__AccountBa__Clien__3F115E1A] FOREIGN KEY([ClientID])
REFERENCES [dbo].[Clients] ([ClientID])
GO
ALTER TABLE [dbo].[AccountBalances] CHECK CONSTRAINT [FK__AccountBa__Clien__3F115E1A]
GO
ALTER TABLE [dbo].[AccountBalances]  WITH CHECK ADD  CONSTRAINT [FK__AccountBa__Suppl__3E1D39E1] FOREIGN KEY([SupplierID])
REFERENCES [dbo].[Suppliers] ([SupplierID])
GO
ALTER TABLE [dbo].[AccountBalances] CHECK CONSTRAINT [FK__AccountBa__Suppl__3E1D39E1]
GO
ALTER TABLE [dbo].[Branches]  WITH CHECK ADD  CONSTRAINT [FK__Branches__Compan__398D8EEE] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[Branches] CHECK CONSTRAINT [FK__Branches__Compan__398D8EEE]
GO
ALTER TABLE [dbo].[CarModels]  WITH CHECK ADD  CONSTRAINT [FK__CarModels__CarBr__5441852A] FOREIGN KEY([CarBrandID])
REFERENCES [dbo].[CarBrands] ([CarBrandID])
GO
ALTER TABLE [dbo].[CarModels] CHECK CONSTRAINT [FK__CarModels__CarBr__5441852A]
GO
ALTER TABLE [dbo].[Cars]  WITH CHECK ADD  CONSTRAINT [FK__Cars__CarModelID__571DF1D5] FOREIGN KEY([CarModelID])
REFERENCES [dbo].[CarModels] ([CarModelID])
GO
ALTER TABLE [dbo].[Cars] CHECK CONSTRAINT [FK__Cars__CarModelID__571DF1D5]
GO
ALTER TABLE [dbo].[Cars]  WITH CHECK ADD  CONSTRAINT [FK_Cars_Clients] FOREIGN KEY([ClientID])
REFERENCES [dbo].[Clients] ([ClientID])
GO
ALTER TABLE [dbo].[Cars] CHECK CONSTRAINT [FK_Cars_Clients]
GO
ALTER TABLE [dbo].[Cars]  WITH CHECK ADD  CONSTRAINT [FK_Cars_Discounts] FOREIGN KEY([DiscountID])
REFERENCES [dbo].[Discounts] ([DiscountID])
GO
ALTER TABLE [dbo].[Cars] CHECK CONSTRAINT [FK_Cars_Discounts]
GO
ALTER TABLE [dbo].[Clients]  WITH CHECK ADD  CONSTRAINT [FK_Clients_Countries] FOREIGN KEY([CountryID])
REFERENCES [dbo].[Countries] ([CountryID])
GO
ALTER TABLE [dbo].[Clients] CHECK CONSTRAINT [FK_Clients_Countries]
GO
ALTER TABLE [dbo].[Clients]  WITH CHECK ADD  CONSTRAINT [FK_Clients_DocTypes] FOREIGN KEY([DocTypeID])
REFERENCES [dbo].[DocTypes] ([DocTypeID])
GO
ALTER TABLE [dbo].[Clients] CHECK CONSTRAINT [FK_Clients_DocTypes]
GO
ALTER TABLE [dbo].[Clients]  WITH CHECK ADD  CONSTRAINT [FK_Clients_PriceLists] FOREIGN KEY([PriceListID])
REFERENCES [dbo].[PriceLists] ([PriceListID])
GO
ALTER TABLE [dbo].[Clients] CHECK CONSTRAINT [FK_Clients_PriceLists]
GO
ALTER TABLE [dbo].[Clients]  WITH CHECK ADD  CONSTRAINT [FK_Clients_Provinces] FOREIGN KEY([ProvinceID])
REFERENCES [dbo].[Provinces] ([ProvinceID])
GO
ALTER TABLE [dbo].[Clients] CHECK CONSTRAINT [FK_Clients_Provinces]
GO
ALTER TABLE [dbo].[Clients]  WITH CHECK ADD  CONSTRAINT [FK_Clients_Vendors] FOREIGN KEY([VendorID])
REFERENCES [dbo].[Vendors] ([VendorID])
GO
ALTER TABLE [dbo].[Clients] CHECK CONSTRAINT [FK_Clients_Vendors]
GO
ALTER TABLE [dbo].[CreditCards]  WITH CHECK ADD  CONSTRAINT [FK_CreditCards_CardGroups] FOREIGN KEY([CreditCardGroupID])
REFERENCES [dbo].[CreditCardGroups] ([CreditCardGroupID])
GO
ALTER TABLE [dbo].[CreditCards] CHECK CONSTRAINT [FK_CreditCards_CardGroups]
GO
ALTER TABLE [dbo].[Documents]  WITH CHECK ADD  CONSTRAINT [FK_Documents_Branches] FOREIGN KEY([BranchID])
REFERENCES [dbo].[Branches] ([BranchID])
GO
ALTER TABLE [dbo].[Documents] CHECK CONSTRAINT [FK_Documents_Branches]
GO
ALTER TABLE [dbo].[Documents]  WITH CHECK ADD  CONSTRAINT [FK_Documents_CompanyData] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[Documents] CHECK CONSTRAINT [FK_Documents_CompanyData]
GO
ALTER TABLE [dbo].[Documents]  WITH CHECK ADD  CONSTRAINT [FK_Documents_DocumentTypes] FOREIGN KEY([DocumentTypeID])
REFERENCES [dbo].[DocumentTypes] ([DocumentTypeID])
GO
ALTER TABLE [dbo].[Documents] CHECK CONSTRAINT [FK_Documents_DocumentTypes]
GO
ALTER TABLE [dbo].[ItemPriceHistory]  WITH CHECK ADD  CONSTRAINT [FK__ItemPrice__ItemI__367C1819] FOREIGN KEY([ItemID])
REFERENCES [dbo].[Items] ([ItemID])
GO
ALTER TABLE [dbo].[ItemPriceHistory] CHECK CONSTRAINT [FK__ItemPrice__ItemI__367C1819]
GO
ALTER TABLE [dbo].[ItemPriceHistory]  WITH CHECK ADD  CONSTRAINT [FK_ItemPriceHistory_PriceLists] FOREIGN KEY([PriceListID])
REFERENCES [dbo].[PriceLists] ([PriceListID])
GO
ALTER TABLE [dbo].[ItemPriceHistory] CHECK CONSTRAINT [FK_ItemPriceHistory_PriceLists]
GO
ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [FK_Items_Branches] FOREIGN KEY([BranchID])
REFERENCES [dbo].[Branches] ([BranchID])
GO
ALTER TABLE [dbo].[Items] CHECK CONSTRAINT [FK_Items_Branches]
GO
ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [FK_Items_Brands] FOREIGN KEY([BrandID])
REFERENCES [dbo].[Brands] ([BrandID])
GO
ALTER TABLE [dbo].[Items] CHECK CONSTRAINT [FK_Items_Brands]
GO
ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [FK_Items_CompanyData] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[Items] CHECK CONSTRAINT [FK_Items_CompanyData]
GO
ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [FK_Items_ItemCategories] FOREIGN KEY([ItemCategoryID])
REFERENCES [dbo].[ItemCategories] ([ItemCategoryID])
GO
ALTER TABLE [dbo].[Items] CHECK CONSTRAINT [FK_Items_ItemCategories]
GO
ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [FK_Items_ItemSubcategories] FOREIGN KEY([ItemSubcategoryID])
REFERENCES [dbo].[ItemSubcategories] ([ItemSubcategoryID])
GO
ALTER TABLE [dbo].[Items] CHECK CONSTRAINT [FK_Items_ItemSubcategories]
GO
ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [FK_Items_Suppliers] FOREIGN KEY([SupplierID])
REFERENCES [dbo].[Suppliers] ([SupplierID])
GO
ALTER TABLE [dbo].[Items] CHECK CONSTRAINT [FK_Items_Suppliers]
GO
ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [FK_Items_Warehouses] FOREIGN KEY([WarehouseID])
REFERENCES [dbo].[Warehouses] ([WarehouseID])
GO
ALTER TABLE [dbo].[Items] CHECK CONSTRAINT [FK_Items_Warehouses]
GO
ALTER TABLE [dbo].[Itemstock]  WITH CHECK ADD  CONSTRAINT [FK_Itemstock_Branches] FOREIGN KEY([BranchID])
REFERENCES [dbo].[Branches] ([BranchID])
GO
ALTER TABLE [dbo].[Itemstock] CHECK CONSTRAINT [FK_Itemstock_Branches]
GO
ALTER TABLE [dbo].[Itemstock]  WITH CHECK ADD  CONSTRAINT [FK_Itemstock_CompanyData] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[Itemstock] CHECK CONSTRAINT [FK_Itemstock_CompanyData]
GO
ALTER TABLE [dbo].[Itemstock]  WITH CHECK ADD  CONSTRAINT [FK_Itemstock_Items] FOREIGN KEY([ItemID])
REFERENCES [dbo].[Items] ([ItemID])
GO
ALTER TABLE [dbo].[Itemstock] CHECK CONSTRAINT [FK_Itemstock_Items]
GO
ALTER TABLE [dbo].[Itemstock]  WITH CHECK ADD  CONSTRAINT [FK_Itemstock_Suppliers] FOREIGN KEY([SupplierID])
REFERENCES [dbo].[Suppliers] ([SupplierID])
GO
ALTER TABLE [dbo].[Itemstock] CHECK CONSTRAINT [FK_Itemstock_Suppliers]
GO
ALTER TABLE [dbo].[Itemstock]  WITH CHECK ADD  CONSTRAINT [FK_Itemstock_Warehouses] FOREIGN KEY([WarehouseID])
REFERENCES [dbo].[Warehouses] ([WarehouseID])
GO
ALTER TABLE [dbo].[Itemstock] CHECK CONSTRAINT [FK_Itemstock_Warehouses]
GO
ALTER TABLE [dbo].[ItemSubcategories]  WITH CHECK ADD  CONSTRAINT [FK_ItemSubcategories_ItemCategories] FOREIGN KEY([ItemCategoryID])
REFERENCES [dbo].[ItemCategories] ([ItemCategoryID])
GO
ALTER TABLE [dbo].[ItemSubcategories] CHECK CONSTRAINT [FK_ItemSubcategories_ItemCategories]
GO
ALTER TABLE [dbo].[LastUserLogin]  WITH CHECK ADD  CONSTRAINT [FK_LastUserLogin_UserAccess] FOREIGN KEY([UserID], [CompanyID], [BranchID], [RoleID])
REFERENCES [dbo].[UserAccess] ([UserID], [CompanyID], [BranchID], [RoleID])
GO
ALTER TABLE [dbo].[LastUserLogin] CHECK CONSTRAINT [FK_LastUserLogin_UserAccess]
GO
ALTER TABLE [dbo].[OrderDetails]  WITH CHECK ADD  CONSTRAINT [FK__OrderDeta__ItemI__2DE6D218] FOREIGN KEY([ItemID])
REFERENCES [dbo].[Items] ([ItemID])
GO
ALTER TABLE [dbo].[OrderDetails] CHECK CONSTRAINT [FK__OrderDeta__ItemI__2DE6D218]
GO
ALTER TABLE [dbo].[OrderDetails]  WITH CHECK ADD  CONSTRAINT [FK__OrderDeta__Order__2CF2ADDF] FOREIGN KEY([OrderID])
REFERENCES [dbo].[Orders] ([OrderID])
GO
ALTER TABLE [dbo].[OrderDetails] CHECK CONSTRAINT [FK__OrderDeta__Order__2CF2ADDF]
GO
ALTER TABLE [dbo].[OrderDetails]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetails_Warehouses] FOREIGN KEY([WarehouseID])
REFERENCES [dbo].[Warehouses] ([WarehouseID])
GO
ALTER TABLE [dbo].[OrderDetails] CHECK CONSTRAINT [FK_OrderDetails_Warehouses]
GO
ALTER TABLE [dbo].[OrderHistory]  WITH CHECK ADD  CONSTRAINT [FK__OrderHist__Branc__1DB06A4F] FOREIGN KEY([BranchID])
REFERENCES [dbo].[Branches] ([BranchID])
GO
ALTER TABLE [dbo].[OrderHistory] CHECK CONSTRAINT [FK__OrderHist__Branc__1DB06A4F]
GO
ALTER TABLE [dbo].[OrderHistory]  WITH CHECK ADD  CONSTRAINT [FK__OrderHist__CarID__2180FB33] FOREIGN KEY([CarID])
REFERENCES [dbo].[Cars] ([CarID])
GO
ALTER TABLE [dbo].[OrderHistory] CHECK CONSTRAINT [FK__OrderHist__CarID__2180FB33]
GO
ALTER TABLE [dbo].[OrderHistory]  WITH CHECK ADD  CONSTRAINT [FK__OrderHist__Compa__1EA48E88] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[OrderHistory] CHECK CONSTRAINT [FK__OrderHist__Compa__1EA48E88]
GO
ALTER TABLE [dbo].[OrderHistory]  WITH CHECK ADD  CONSTRAINT [FK__OrderHist__Order__1F98B2C1] FOREIGN KEY([OrderID])
REFERENCES [dbo].[Orders] ([OrderID])
GO
ALTER TABLE [dbo].[OrderHistory] CHECK CONSTRAINT [FK__OrderHist__Order__1F98B2C1]
GO
ALTER TABLE [dbo].[OrderHistory]  WITH CHECK ADD  CONSTRAINT [FK_OrderHistory_Clients] FOREIGN KEY([ClientID])
REFERENCES [dbo].[Clients] ([ClientID])
GO
ALTER TABLE [dbo].[OrderHistory] CHECK CONSTRAINT [FK_OrderHistory_Clients]
GO
ALTER TABLE [dbo].[OrderHistory]  WITH CHECK ADD  CONSTRAINT [FK_OrderHistory_ServiceType] FOREIGN KEY([ServiceTypeID])
REFERENCES [dbo].[ServiceType] ([ServiceTypeID])
GO
ALTER TABLE [dbo].[OrderHistory] CHECK CONSTRAINT [FK_OrderHistory_ServiceType]
GO
ALTER TABLE [dbo].[OrderHistory]  WITH CHECK ADD  CONSTRAINT [FK_OrderHistory_Users] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[OrderHistory] CHECK CONSTRAINT [FK_OrderHistory_Users]
GO
ALTER TABLE [dbo].[OrderHistoryDetails]  WITH CHECK ADD  CONSTRAINT [FK__OrderHist__Histo__31B762FC] FOREIGN KEY([OrderHistoryID])
REFERENCES [dbo].[OrderHistory] ([OrderHistoryID])
GO
ALTER TABLE [dbo].[OrderHistoryDetails] CHECK CONSTRAINT [FK__OrderHist__Histo__31B762FC]
GO
ALTER TABLE [dbo].[OrderHistoryDetails]  WITH CHECK ADD  CONSTRAINT [FK__OrderHist__ItemI__32AB8735] FOREIGN KEY([ItemID])
REFERENCES [dbo].[Items] ([ItemID])
GO
ALTER TABLE [dbo].[OrderHistoryDetails] CHECK CONSTRAINT [FK__OrderHist__ItemI__32AB8735]
GO
ALTER TABLE [dbo].[OrderHistoryDetails]  WITH CHECK ADD  CONSTRAINT [FK_OrderHistoryDetails_Warehouses] FOREIGN KEY([WarehouseID])
REFERENCES [dbo].[Warehouses] ([WarehouseID])
GO
ALTER TABLE [dbo].[OrderHistoryDetails] CHECK CONSTRAINT [FK_OrderHistoryDetails_Warehouses]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK__Orders__BranchID__01142BA1] FOREIGN KEY([BranchID])
REFERENCES [dbo].[Branches] ([BranchID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK__Orders__BranchID__01142BA1]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK__Orders__CarID__02FC7413] FOREIGN KEY([CarID])
REFERENCES [dbo].[Cars] ([CarID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK__Orders__CarID__02FC7413]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK__Orders__ClientID__00200768] FOREIGN KEY([ClientID])
REFERENCES [dbo].[Clients] ([ClientID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK__Orders__ClientID__00200768]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK__Orders__CompanyI__02084FDA] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK__Orders__CompanyI__02084FDA]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK__Orders__Discount__04E4BC85] FOREIGN KEY([DiscountID])
REFERENCES [dbo].[Discounts] ([DiscountID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK__Orders__Discount__04E4BC85]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK__Orders__Document__06CD04F7] FOREIGN KEY([DocumentID])
REFERENCES [dbo].[DocumentTypes] ([DocumentTypeID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK__Orders__Document__06CD04F7]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK__Orders__PriceLis__08B54D69] FOREIGN KEY([PriceListID])
REFERENCES [dbo].[PriceLists] ([PriceListID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK__Orders__PriceLis__08B54D69]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK__Orders__SaleCond__03F0984C] FOREIGN KEY([SaleConditionID])
REFERENCES [dbo].[SaleConditions] ([SaleConditionID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK__Orders__SaleCond__03F0984C]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK__Orders__UserID__05D8E0BE] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK__Orders__UserID__05D8E0BE]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_OrderStatus] FOREIGN KEY([OrderStatusID])
REFERENCES [dbo].[OrderStatus] ([OrderStatusID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_OrderStatus]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_ServiceType] FOREIGN KEY([ServiceTypeID])
REFERENCES [dbo].[ServiceType] ([ServiceTypeID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_ServiceType]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Warehouses] FOREIGN KEY([WarehouseID])
REFERENCES [dbo].[Warehouses] ([WarehouseID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Warehouses]
GO
ALTER TABLE [dbo].[PriceListItems]  WITH CHECK ADD  CONSTRAINT [FK__PriceList__ItemI__76969D2E] FOREIGN KEY([ItemID])
REFERENCES [dbo].[Items] ([ItemID])
GO
ALTER TABLE [dbo].[PriceListItems] CHECK CONSTRAINT [FK__PriceList__ItemI__76969D2E]
GO
ALTER TABLE [dbo].[PriceListItems]  WITH CHECK ADD  CONSTRAINT [FK__PriceList__Price__75A278F5] FOREIGN KEY([PriceListID])
REFERENCES [dbo].[PriceLists] ([PriceListID])
GO
ALTER TABLE [dbo].[PriceListItems] CHECK CONSTRAINT [FK__PriceList__Price__75A278F5]
GO
ALTER TABLE [dbo].[Provinces]  WITH CHECK ADD  CONSTRAINT [FK__Provinces__Count__403A8C7D] FOREIGN KEY([CountryID])
REFERENCES [dbo].[Countries] ([CountryID])
GO
ALTER TABLE [dbo].[Provinces] CHECK CONSTRAINT [FK__Provinces__Count__403A8C7D]
GO
ALTER TABLE [dbo].[SaleConditions]  WITH CHECK ADD  CONSTRAINT [FK_SaleConditions_CreditCards] FOREIGN KEY([CreditCardID])
REFERENCES [dbo].[CreditCards] ([CreditCardID])
GO
ALTER TABLE [dbo].[SaleConditions] CHECK CONSTRAINT [FK_SaleConditions_CreditCards]
GO
ALTER TABLE [dbo].[StockHistory]  WITH CHECK ADD  CONSTRAINT [FK__StockHist__ItemI__7A672E12] FOREIGN KEY([ItemID])
REFERENCES [dbo].[Items] ([ItemID])
GO
ALTER TABLE [dbo].[StockHistory] CHECK CONSTRAINT [FK__StockHist__ItemI__7A672E12]
GO
ALTER TABLE [dbo].[StockHistory]  WITH CHECK ADD  CONSTRAINT [FK__StockHist__Wareh__7B5B524B] FOREIGN KEY([WarehouseID])
REFERENCES [dbo].[Warehouses] ([WarehouseID])
GO
ALTER TABLE [dbo].[StockHistory] CHECK CONSTRAINT [FK__StockHist__Wareh__7B5B524B]
GO
ALTER TABLE [dbo].[StockHistory]  WITH CHECK ADD  CONSTRAINT [FK_StockHistory_Branches] FOREIGN KEY([BranchID])
REFERENCES [dbo].[Branches] ([BranchID])
GO
ALTER TABLE [dbo].[StockHistory] CHECK CONSTRAINT [FK_StockHistory_Branches]
GO
ALTER TABLE [dbo].[StockHistory]  WITH CHECK ADD  CONSTRAINT [FK_StockHistory_CompanyData] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[StockHistory] CHECK CONSTRAINT [FK_StockHistory_CompanyData]
GO
ALTER TABLE [dbo].[StockHistory]  WITH CHECK ADD  CONSTRAINT [FK_StockHistory_Users] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[StockHistory] CHECK CONSTRAINT [FK_StockHistory_Users]
GO
ALTER TABLE [dbo].[Suppliers]  WITH CHECK ADD  CONSTRAINT [FK__Suppliers__Count__440B1D61] FOREIGN KEY([CountryID])
REFERENCES [dbo].[Countries] ([CountryID])
GO
ALTER TABLE [dbo].[Suppliers] CHECK CONSTRAINT [FK__Suppliers__Count__440B1D61]
GO
ALTER TABLE [dbo].[Suppliers]  WITH CHECK ADD  CONSTRAINT [FK__Suppliers__Provi__44FF419A] FOREIGN KEY([ProvinceID])
REFERENCES [dbo].[Provinces] ([ProvinceID])
GO
ALTER TABLE [dbo].[Suppliers] CHECK CONSTRAINT [FK__Suppliers__Provi__44FF419A]
GO
ALTER TABLE [dbo].[Suppliers]  WITH CHECK ADD  CONSTRAINT [FK_Suppliers_DocTypes] FOREIGN KEY([DocTypeID])
REFERENCES [dbo].[DocTypes] ([DocTypeID])
GO
ALTER TABLE [dbo].[Suppliers] CHECK CONSTRAINT [FK_Suppliers_DocTypes]
GO
ALTER TABLE [dbo].[TempOrderDetails]  WITH CHECK ADD  CONSTRAINT [FK__TempOrder__Compa__0C85DE4D] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[TempOrderDetails] CHECK CONSTRAINT [FK__TempOrder__Compa__0C85DE4D]
GO
ALTER TABLE [dbo].[TempOrderDetails]  WITH CHECK ADD  CONSTRAINT [FK__TempOrder__ItemI__0F624AF8] FOREIGN KEY([ItemID])
REFERENCES [dbo].[Items] ([ItemID])
GO
ALTER TABLE [dbo].[TempOrderDetails] CHECK CONSTRAINT [FK__TempOrder__ItemI__0F624AF8]
GO
ALTER TABLE [dbo].[TempOrderDetails]  WITH CHECK ADD  CONSTRAINT [FK__TempOrder__UserI__0E6E26BF] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[TempOrderDetails] CHECK CONSTRAINT [FK__TempOrder__UserI__0E6E26BF]
GO
ALTER TABLE [dbo].[TempOrderDetails]  WITH CHECK ADD  CONSTRAINT [FK_TempOrderDetails_Branches] FOREIGN KEY([BranchID])
REFERENCES [dbo].[Branches] ([BranchID])
GO
ALTER TABLE [dbo].[TempOrderDetails] CHECK CONSTRAINT [FK_TempOrderDetails_Branches]
GO
ALTER TABLE [dbo].[TempOrderDetails]  WITH CHECK ADD  CONSTRAINT [FK_TempOrderDetails_Orders] FOREIGN KEY([OrderID])
REFERENCES [dbo].[Orders] ([OrderID])
GO
ALTER TABLE [dbo].[TempOrderDetails] CHECK CONSTRAINT [FK_TempOrderDetails_Orders]
GO
ALTER TABLE [dbo].[TempOrderDetails]  WITH CHECK ADD  CONSTRAINT [FK_TempOrderDetails_PriceLists] FOREIGN KEY([PriceListID])
REFERENCES [dbo].[PriceLists] ([PriceListID])
GO
ALTER TABLE [dbo].[TempOrderDetails] CHECK CONSTRAINT [FK_TempOrderDetails_PriceLists]
GO
ALTER TABLE [dbo].[TempOrderDetails]  WITH CHECK ADD  CONSTRAINT [FK_TempOrderDetails_Warehouses] FOREIGN KEY([WarehouseID])
REFERENCES [dbo].[Warehouses] ([WarehouseID])
GO
ALTER TABLE [dbo].[TempOrderDetails] CHECK CONSTRAINT [FK_TempOrderDetails_Warehouses]
GO
ALTER TABLE [dbo].[TempStockEntries]  WITH CHECK ADD  CONSTRAINT [FK__TempStock__Branc__160F4887] FOREIGN KEY([BranchID])
REFERENCES [dbo].[Branches] ([BranchID])
GO
ALTER TABLE [dbo].[TempStockEntries] CHECK CONSTRAINT [FK__TempStock__Branc__160F4887]
GO
ALTER TABLE [dbo].[TempStockEntries]  WITH CHECK ADD  CONSTRAINT [FK__TempStock__Compa__151B244E] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[TempStockEntries] CHECK CONSTRAINT [FK__TempStock__Compa__151B244E]
GO
ALTER TABLE [dbo].[TempStockEntries]  WITH CHECK ADD  CONSTRAINT [FK__TempStock__ItemI__17F790F9] FOREIGN KEY([ItemID])
REFERENCES [dbo].[Items] ([ItemID])
GO
ALTER TABLE [dbo].[TempStockEntries] CHECK CONSTRAINT [FK__TempStock__ItemI__17F790F9]
GO
ALTER TABLE [dbo].[TempStockEntries]  WITH CHECK ADD  CONSTRAINT [FK__TempStock__UserI__17036CC0] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[TempStockEntries] CHECK CONSTRAINT [FK__TempStock__UserI__17036CC0]
GO
ALTER TABLE [dbo].[TempStockEntries]  WITH CHECK ADD  CONSTRAINT [FK__TempStock__Wareh__18EBB532] FOREIGN KEY([WarehouseID])
REFERENCES [dbo].[Warehouses] ([WarehouseID])
GO
ALTER TABLE [dbo].[TempStockEntries] CHECK CONSTRAINT [FK__TempStock__Wareh__18EBB532]
GO
ALTER TABLE [dbo].[Transactions]  WITH CHECK ADD  CONSTRAINT [FK_Transactions_Branches] FOREIGN KEY([BranchID])
REFERENCES [dbo].[Branches] ([BranchID])
GO
ALTER TABLE [dbo].[Transactions] CHECK CONSTRAINT [FK_Transactions_Branches]
GO
ALTER TABLE [dbo].[UserAccess]  WITH CHECK ADD  CONSTRAINT [FK_UserAccess_Branches] FOREIGN KEY([BranchID])
REFERENCES [dbo].[Branches] ([BranchID])
GO
ALTER TABLE [dbo].[UserAccess] CHECK CONSTRAINT [FK_UserAccess_Branches]
GO
ALTER TABLE [dbo].[UserAccess]  WITH CHECK ADD  CONSTRAINT [FK_UserAccess_CompanyData] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[UserAccess] CHECK CONSTRAINT [FK_UserAccess_CompanyData]
GO
ALTER TABLE [dbo].[UserAccess]  WITH CHECK ADD  CONSTRAINT [FK_UserAccess_Roles] FOREIGN KEY([RoleID])
REFERENCES [dbo].[Roles] ([RoleID])
GO
ALTER TABLE [dbo].[UserAccess] CHECK CONSTRAINT [FK_UserAccess_Roles]
GO
ALTER TABLE [dbo].[UserAccess]  WITH CHECK ADD  CONSTRAINT [FK_UserAccess_Users] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[UserAccess] CHECK CONSTRAINT [FK_UserAccess_Users]
GO
ALTER TABLE [dbo].[UserActivityLog]  WITH CHECK ADD  CONSTRAINT [FK__UserActiv__UserI__3A4CA8FD] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[UserActivityLog] CHECK CONSTRAINT [FK__UserActiv__UserI__3A4CA8FD]
GO
ALTER TABLE [dbo].[UserActivityLog]  WITH CHECK ADD  CONSTRAINT [FK_UserActivityLog_UserActions] FOREIGN KEY([UserActionID])
REFERENCES [dbo].[UserActions] ([UserActionID])
GO
ALTER TABLE [dbo].[UserActivityLog] CHECK CONSTRAINT [FK_UserActivityLog_UserActions]
GO
ALTER TABLE [dbo].[Itemstock]  WITH CHECK ADD  CONSTRAINT [chk_Stock_Quantity_Positive] CHECK  (([Quantity]>=(0)))
GO
ALTER TABLE [dbo].[Itemstock] CHECK CONSTRAINT [chk_Stock_Quantity_Positive]
GO
ALTER TABLE [dbo].[OrderDetails]  WITH CHECK ADD  CONSTRAINT [chk_OrderDetails_Quantity_Positive] CHECK  (([Quantity]>=(0)))
GO
ALTER TABLE [dbo].[OrderDetails] CHECK CONSTRAINT [chk_OrderDetails_Quantity_Positive]
GO

-- ==========================================
-- Sección: Creación de Triggers
-- ==========================================
/****** Object:  Trigger [dbo].[trg_ValidateStockEntry]    Script Date: 9/7/2025 01:07:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Trigger para validar transacciones de ingreso de stock
-- Trigger para validar el ingreso de stock
CREATE TRIGGER [dbo].[trg_ValidateStockEntry]
ON [dbo].[TempStockEntries]
AFTER INSERT
AS
BEGIN
    DECLARE @ItemID INT, @WarehouseID INT, @Quantity INT;

    -- Obtener los valores del registro insertado
    SELECT 
        @ItemID = ItemID,
        @WarehouseID = WarehouseID,
        @Quantity = Quantity
    FROM Inserted;

    -- Verificar que el stock actual sea suficiente si el ingreso es negativo
    IF @Quantity < 0
    BEGIN
        -- Validar si el stock disponible es suficiente
        DECLARE @CurrentStock INT;
        SELECT @CurrentStock = Quantity FROM Itemstock
        WHERE ItemID = @ItemID AND WarehouseID = @WarehouseID;

        -- Si el stock actual es insuficiente, lanzar un error
        IF @CurrentStock + @Quantity < 0
        BEGIN
            RAISERROR('No hay suficiente stock disponible para esta operación.', 16, 1);
            ROLLBACK; -- Cancela la transacción
        END
    END
END;
GO
ALTER TABLE [dbo].[TempStockEntries] ENABLE TRIGGER [trg_ValidateStockEntry]
GO
EXEC sys.sp_addextendedproperty @name=N'tSQLt.TestClass', @value=1 , @level0type=N'SCHEMA',@level0name=N'SQLCop'
GO
USE [master]
GO
ALTER DATABASE [LubricentroDB2] SET  READ_WRITE 
GO
