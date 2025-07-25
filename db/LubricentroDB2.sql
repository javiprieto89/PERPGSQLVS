USE [master]
GO
/****** Object:  Database [LubricentroDB2]    Script Date: 22/7/2025 04:21:33 ******/
CREATE DATABASE [LubricentroDB2]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'LubricentroDB2', FILENAME = N'Q:\SQL_DB\2017\Data\LubricentroDB2.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'LubricentroDB2_log', FILENAME = N'Q:\SQL_DB\2017\Data\LubricentroDB2_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 COLLATE Modern_Spanish_CI_AS
GO
ALTER DATABASE [LubricentroDB2] SET COMPATIBILITY_LEVEL = 140
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
ALTER DATABASE [LubricentroDB2] SET  DISABLE_BROKER 
GO
ALTER DATABASE [LubricentroDB2] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [LubricentroDB2] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [LubricentroDB2] SET TRUSTWORTHY OFF 
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
/****** Object:  User [tSQLt.TestClass]    Script Date: 22/7/2025 04:21:34 ******/
CREATE USER [tSQLt.TestClass] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Schema [SQLCop]    Script Date: 22/7/2025 04:21:34 ******/
CREATE SCHEMA [SQLCop]
GO
/****** Object:  Schema [tSQLt]    Script Date: 22/7/2025 04:21:34 ******/
CREATE SCHEMA [tSQLt]
GO
/****** Object:  UserDefinedFunction [dbo].[fn_toCamelCase]    Script Date: 22/7/2025 04:21:34 ******/
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
/****** Object:  Table [dbo].[AccountBalances]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AccountBalances](
	[AccountID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyID] [int] NOT NULL,
	[BranchID] [int] NOT NULL,
	[SupplierID] [int] NULL,
	[ClientID] [int] NULL,
	[Balance] [decimal](10, 2) NOT NULL,
 CONSTRAINT [PK__AccountB__349DA5866875C1B5] PRIMARY KEY CLUSTERED 
(
	[AccountID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Branches]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Branches](
	[CompanyID] [int] NOT NULL,
	[BranchID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[Address] [nvarchar](200) COLLATE Modern_Spanish_CI_AS NULL,
	[Phone] [nvarchar](20) COLLATE Modern_Spanish_CI_AS NULL,
	[Logo] [varbinary](max) NULL,
 CONSTRAINT [PK_Branches_CompanyID_BranchID] PRIMARY KEY CLUSTERED 
(
	[CompanyID] ASC,
	[BranchID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Brands]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Brands](
	[BrandID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CompanyID] [int] NULL,
 CONSTRAINT [PK__Brands__DAD4F3BEC807F89F] PRIMARY KEY CLUSTERED 
(
	[BrandID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CarBrands]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarBrands](
	[CarBrandID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[CompanyID] [int] NULL,
 CONSTRAINT [PK__CarBrand__3EAE0B29835BF1AC] PRIMARY KEY CLUSTERED 
(
	[CarBrandID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CarModels]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarModels](
	[CarModelID] [int] IDENTITY(1,1) NOT NULL,
	[CarBrandID] [int] NOT NULL,
	[Model] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
 CONSTRAINT [PK__CarModel__C585C36F707AD8EA] PRIMARY KEY CLUSTERED 
(
	[CarModelID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cars]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cars](
	[CarID] [int] IDENTITY(1,1) NOT NULL,
	[CarModelID] [int] NOT NULL,
	[ClientID] [int] NOT NULL,
	[LicensePlate] [nvarchar](20) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[Year] [int] NULL,
	[LastServiceMileage] [int] NULL,
	[IsDebtor] [bit] NULL,
	[DiscountID] [int] NOT NULL,
	[CompanyID] [int] NULL,
 CONSTRAINT [PK__Cars__68A0340E0C926E4D] PRIMARY KEY CLUSTERED 
(
	[CarID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CashBoxes]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CashBoxes](
	[CashBoxID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyID] [int] NOT NULL,
	[BranchID] [int] NOT NULL,
	[Name] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[Description] [nvarchar](255) COLLATE Modern_Spanish_CI_AS NULL,
	[IsActive] [bit] NOT NULL,
	[OpenDate] [datetime] NULL,
	[CloseDate] [datetime] NULL,
	[InitialBalance] [decimal](18, 2) NOT NULL,
	[CurrentBalance] [decimal](18, 2) NOT NULL,
	[UserID] [int] NULL,
	[Notes] [nvarchar](255) COLLATE Modern_Spanish_CI_AS NULL,
PRIMARY KEY CLUSTERED 
(
	[CashBoxID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CashBoxMovements]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CashBoxMovements](
	[CashBoxMovementID] [int] IDENTITY(1,1) NOT NULL,
	[CashBoxID] [int] NOT NULL,
	[CompanyID] [int] NOT NULL,
	[BranchID] [int] NOT NULL,
	[MovementDate] [datetime] NOT NULL,
	[Amount] [decimal](18, 2) NOT NULL,
	[MovementType] [nvarchar](50) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[Description] [nvarchar](255) COLLATE Modern_Spanish_CI_AS NULL,
	[UserID] [int] NULL,
	[Notes] [nvarchar](255) COLLATE Modern_Spanish_CI_AS NULL,
PRIMARY KEY CLUSTERED 
(
	[CashBoxMovementID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Clients]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clients](
	[ClientID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyID] [int] NOT NULL,
	[BranchID] [int] NOT NULL,
	[DocTypeID] [int] NOT NULL,
	[DocNumber] [nvarchar](50) COLLATE Modern_Spanish_CI_AS NULL,
	[FirstName] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[LastName] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NULL,
	[Phone] [nvarchar](20) COLLATE Modern_Spanish_CI_AS NULL,
	[Email] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NULL,
	[Address] [nvarchar](200) COLLATE Modern_Spanish_CI_AS NULL,
	[IsActive] [bit] NOT NULL,
	[CountryID] [int] NOT NULL,
	[ProvinceID] [int] NOT NULL,
	[City] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NULL,
	[PostalCode] [nvarchar](20) COLLATE Modern_Spanish_CI_AS NULL,
	[PriceListID] [int] NOT NULL,
	[VendorID] [int] NOT NULL,
 CONSTRAINT [PK__Clients__E67E1A048D5F930D] PRIMARY KEY CLUSTERED 
(
	[ClientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CompanyData]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CompanyData](
	[CompanyID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[Address] [nvarchar](200) COLLATE Modern_Spanish_CI_AS NULL,
	[CUIT] [nvarchar](20) COLLATE Modern_Spanish_CI_AS NULL,
	[GrossIncome] [nvarchar](20) COLLATE Modern_Spanish_CI_AS NULL,
	[StartDate] [date] NULL,
	[Logo] [varbinary](max) NULL,
 CONSTRAINT [PK__CompanyD__2D971C4CF963B1F3] PRIMARY KEY CLUSTERED 
(
	[CompanyID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Countries]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Countries](
	[CountryID] [int] NOT NULL,
	[Name] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[CountryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CreditCardGroups]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CreditCardGroups](
	[CreditCardGroupID] [int] IDENTITY(1,1) NOT NULL,
	[GroupName] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[CompanyID] [int] NULL,
 CONSTRAINT [PK_CreditCardGroups] PRIMARY KEY CLUSTERED 
(
	[CreditCardGroupID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CreditCards]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CreditCards](
	[CreditCardID] [int] IDENTITY(1,1) NOT NULL,
	[CardName] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[Surcharge] [decimal](18, 4) NULL,
	[Installments] [int] NULL,
	[CreditCardGroupID] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CompanyID] [int] NULL,
 CONSTRAINT [PK_CreditCards] PRIMARY KEY CLUSTERED 
(
	[CreditCardID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Discounts]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Discounts](
	[DiscountID] [int] IDENTITY(1,1) NOT NULL,
	[DiscountName] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[Percentage] [decimal](5, 2) NOT NULL,
	[CompanyID] [int] NULL,
 CONSTRAINT [PK__Discount__E43F6DF6AAF602B3] PRIMARY KEY CLUSTERED 
(
	[DiscountID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Documents]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Documents](
	[DocumentID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyID] [int] NOT NULL,
	[BranchID] [int] NOT NULL,
	[DocumentTypeID] [int] NOT NULL,
	[Description] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
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
/****** Object:  Table [dbo].[ItemCategories]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ItemCategories](
	[ItemCategoryID] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [varchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[CompanyID] [int] NULL,
 CONSTRAINT [PK_ItemCategories] PRIMARY KEY CLUSTERED 
(
	[ItemCategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ItemPriceHistory]    Script Date: 22/7/2025 04:21:34 ******/
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
/****** Object:  Table [dbo].[Items]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Items](
	[ItemID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyID] [int] NOT NULL,
	[BranchID] [int] NOT NULL,
	[BrandID] [int] NOT NULL,
	[Code] [nvarchar](50) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[Description] [nvarchar](200) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[ItemCategoryID] [int] NOT NULL,
	[ItemSubcategoryID] [int] NOT NULL,
	[SupplierID] [int] NOT NULL,
	[ControlStock] [bit] NOT NULL,
	[ReplenishmentStock] [int] NOT NULL,
	[IsOffer] [bit] NOT NULL,
	[OEM] [nvarchar](50) COLLATE Modern_Spanish_CI_AS NULL,
	[LastModified] [date] NOT NULL,
	[WarehouseID] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK__Items__727E83EB997DFA51] PRIMARY KEY CLUSTERED 
(
	[ItemID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UQ__Items__A25C5AA7F6BA0424] UNIQUE NONCLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Itemstock]    Script Date: 22/7/2025 04:21:34 ******/
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
	[StockStatus] [nvarchar](50) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[MinStockLevel] [int] NOT NULL,
	[MaxStockLevel] [int] NOT NULL,
	[StockLocation] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NULL,
	[SupplierID] [int] NOT NULL,
	[BatchNumber] [nvarchar](50) COLLATE Modern_Spanish_CI_AS NULL,
	[ExpiryDate] [date] NULL,
 CONSTRAINT [PK__Itemstoc__F01E09161DA94055] PRIMARY KEY CLUSTERED 
(
	[ItemID] ASC,
	[WarehouseID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ItemSubcategories]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ItemSubcategories](
	[ItemSubcategoryID] [int] IDENTITY(1,1) NOT NULL,
	[ItemCategoryID] [int] NOT NULL,
	[SubcategoryName] [varchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
 CONSTRAINT [PK_ItemSubcategories_1] PRIMARY KEY CLUSTERED 
(
	[ItemSubcategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ItemTaxes]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ItemTaxes](
	[ItemTaxID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyID] [int] NOT NULL,
	[BranchID] [int] NOT NULL,
	[ItemID] [int] NOT NULL,
	[TaxID] [int] NOT NULL,
 CONSTRAINT [PK__ItemTaxe__0E367AA2F11B9CE0] PRIMARY KEY CLUSTERED 
(
	[ItemTaxID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LastUserLogin]    Script Date: 22/7/2025 04:21:34 ******/
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
/****** Object:  Table [dbo].[OrderDetails]    Script Date: 22/7/2025 04:21:34 ******/
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
	[Description] [nvarchar](200) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[LastModified] [datetime] NULL,
 CONSTRAINT [PK__OrderDet__9DD74D9DF5D37EDA] PRIMARY KEY CLUSTERED 
(
	[OrderDetailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderHistory]    Script Date: 22/7/2025 04:21:34 ******/
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
	[Status] [nvarchar](50) COLLATE Modern_Spanish_CI_AS NULL,
	[Comments] [nvarchar](500) COLLATE Modern_Spanish_CI_AS NULL,
 CONSTRAINT [PK__OrderHis__4D7B4ADD5AAE57F2] PRIMARY KEY CLUSTERED 
(
	[OrderHistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderHistoryDetails]    Script Date: 22/7/2025 04:21:34 ******/
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
	[Description] [nvarchar](200) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[LastModified] [datetime] NULL,
 CONSTRAINT [PK__OrderHis__D6D0F42ABBC4939A] PRIMARY KEY CLUSTERED 
(
	[OrderHistoryDetailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 22/7/2025 04:21:34 ******/
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
	[Notes] [nvarchar](500) COLLATE Modern_Spanish_CI_AS NULL,
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
/****** Object:  Table [dbo].[PriceListItems]    Script Date: 22/7/2025 04:21:34 ******/
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
/****** Object:  Table [dbo].[PriceLists]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PriceLists](
	[PriceListID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[Description] [nvarchar](250) COLLATE Modern_Spanish_CI_AS NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedDate] [date] NULL,
	[CompanyID] [int] NULL,
 CONSTRAINT [PK__PriceLis__1E30F34C58783DD3] PRIMARY KEY CLUSTERED 
(
	[PriceListID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Provinces]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Provinces](
	[CountryID] [int] NOT NULL,
	[ProvinceID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
 CONSTRAINT [PK_Provinces_CountryID_ProvinceID] PRIMARY KEY CLUSTERED 
(
	[CountryID] ASC,
	[ProvinceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PurchaseInvoiceDetails]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PurchaseInvoiceDetails](
	[PurchaseInvoiceDetailID] [int] IDENTITY(1,1) NOT NULL,
	[PurchaseInvoiceID] [int] NOT NULL,
	[ItemID] [int] NOT NULL,
	[TaxID] [int] NOT NULL,
	[WarehouseID] [int] NOT NULL,
	[Quantity] [decimal](18, 2) NOT NULL,
	[UnitPrice] [decimal](18, 2) NOT NULL,
	[Notes] [nvarchar](255) COLLATE Modern_Spanish_CI_AS NULL,
 CONSTRAINT [PK__Purchase__737EA39C9E0B63A8] PRIMARY KEY CLUSTERED 
(
	[PurchaseInvoiceDetailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PurchaseInvoiceDetailTaxes]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PurchaseInvoiceDetailTaxes](
	[PurchaseInvoiceDetailTaxID] [int] IDENTITY(1,1) NOT NULL,
	[PurchaseInvoiceDetailID] [int] NOT NULL,
	[TaxID] [int] NOT NULL,
	[TaxPercent] [decimal](5, 2) NOT NULL,
	[TaxAmount] [decimal](18, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[PurchaseInvoiceDetailTaxID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PurchaseInvoices]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PurchaseInvoices](
	[PurchaseInvoiceID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyID] [int] NOT NULL,
	[BranchID] [int] NOT NULL,
	[SupplierID] [int] NOT NULL,
	[UserID] [int] NOT NULL,
	[InvoiceNumber] [nvarchar](50) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[InvoiceDate] [datetime] NOT NULL,
	[TotalAmount] [decimal](18, 2) NOT NULL,
	[IsPaid] [bit] NOT NULL,
	[PaymentDate] [datetime] NULL,
	[Notes] [nvarchar](255) COLLATE Modern_Spanish_CI_AS NULL,
 CONSTRAINT [PK__Purchase__4E3CABF3CE07A961] PRIMARY KEY CLUSTERED 
(
	[PurchaseInvoiceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[RoleID] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [nvarchar](50) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[CompanyID] [int] NULL,
 CONSTRAINT [PK__Roles__8AFACE3A6B39B353] PRIMARY KEY CLUSTERED 
(
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SaleConditions]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SaleConditions](
	[SaleConditionID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NULL,
	[DueDate] [date] NULL,
	[Surcharge] [decimal](10, 2) NULL,
	[IsActive] [bit] NULL,
	[CreditCardID] [int] NOT NULL,
	[CompanyID] [int] NULL,
 CONSTRAINT [PK__SaleCond__22A3A655BD0A6B44] PRIMARY KEY CLUSTERED 
(
	[SaleConditionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ServiceType]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ServiceType](
	[ServiceTypeID] [int] IDENTITY(1,1) NOT NULL,
	[Type] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[CompanyID] [int] NULL,
 CONSTRAINT [PK_tipos_casos] PRIMARY KEY CLUSTERED 
(
	[ServiceTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StockHistory]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StockHistory](
	[StockHistoryID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyID] [int] NOT NULL,
	[BranchID] [int] NOT NULL,
	[UserID] [int] NOT NULL,
	[TransactionDate] [datetime] NOT NULL,
	[Reason] [nvarchar](200) COLLATE Modern_Spanish_CI_AS NULL,
	[TransactionType] [nvarchar](50) COLLATE Modern_Spanish_CI_AS NULL,
	[Notes] [nvarchar](255) COLLATE Modern_Spanish_CI_AS NULL,
 CONSTRAINT [PK__StockHis__A6CE86DBEB46B995] PRIMARY KEY CLUSTERED 
(
	[StockHistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StockHistoryDetail]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StockHistoryDetail](
	[StockHistoryDetailID] [int] IDENTITY(1,1) NOT NULL,
	[StockHistoryID] [int] NOT NULL,
	[ItemID] [int] NOT NULL,
	[WarehouseID] [int] NOT NULL,
	[QuantityUpdate] [int] NOT NULL,
	[QuantityBefore] [int] NOT NULL,
	[QuantityAfter] [int] NOT NULL,
	[BatchNumber] [nvarchar](50) COLLATE Modern_Spanish_CI_AS NULL,
	[ExpiryDate] [date] NULL,
	[Reason] [nvarchar](200) COLLATE Modern_Spanish_CI_AS NULL,
PRIMARY KEY CLUSTERED 
(
	[StockHistoryDetailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Suppliers]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Suppliers](
	[SupplierID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyID] [int] NULL,
	[BranchID] [int] NULL,
	[DocTypeID] [int] NOT NULL,
	[DocNumber] [nvarchar](50) COLLATE Modern_Spanish_CI_AS NULL,
	[FirstName] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[LastName] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NULL,
	[Phone] [nvarchar](20) COLLATE Modern_Spanish_CI_AS NULL,
	[Email] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NULL,
	[Address] [nvarchar](200) COLLATE Modern_Spanish_CI_AS NULL,
	[IsActive] [bit] NOT NULL,
	[CountryID] [int] NULL,
	[ProvinceID] [int] NULL,
	[City] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NULL,
	[PostalCode] [nvarchar](20) COLLATE Modern_Spanish_CI_AS NULL,
 CONSTRAINT [PK__Supplier__4BE6669487E21347] PRIMARY KEY CLUSTERED 
(
	[SupplierID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sysDocTypes]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sysDocTypes](
	[DocTypeID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK__DocTypes__055E26832A8E0FF3] PRIMARY KEY CLUSTERED 
(
	[DocTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sysDocumentTypes]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sysDocumentTypes](
	[DocumentTypeID] [int] NOT NULL,
	[Name] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
 CONSTRAINT [PK__Document__DBA390C10019FEFA] PRIMARY KEY CLUSTERED 
(
	[DocumentTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sysOrderStatus]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sysOrderStatus](
	[OrderStatusID] [int] IDENTITY(1,1) NOT NULL,
	[Status] [nvarchar](50) COLLATE Modern_Spanish_CI_AS NOT NULL,
 CONSTRAINT [PK__OrderSta__BC674F4170B3E561] PRIMARY KEY CLUSTERED 
(
	[OrderStatusID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sysTransactionTypes]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sysTransactionTypes](
	[TransactTypeID] [int] IDENTITY(1,1) NOT NULL,
	[TypeName] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
 CONSTRAINT [PK_TransactionTypes] PRIMARY KEY CLUSTERED 
(
	[TransactTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sysUserActions]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sysUserActions](
	[UserActionID] [int] IDENTITY(1,1) NOT NULL,
	[ActionName] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
 CONSTRAINT [PK_UserActions] PRIMARY KEY CLUSTERED 
(
	[UserActionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Taxes]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Taxes](
	[TaxID] [int] IDENTITY(1,1) NOT NULL,
	[CountryID] [int] NULL,
	[ProvinceID] [int] NULL,
	[TaxName] [nvarchar](50) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[TaxPercent] [decimal](5, 2) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CompanyID] [int] NULL,
 CONSTRAINT [PK__Taxes__711BE08C21750481] PRIMARY KEY CLUSTERED 
(
	[TaxID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TempOrderDetails]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TempOrderDetails](
	[CompanyID] [int] NOT NULL,
	[BranchID] [int] NOT NULL,
	[UserID] [int] NOT NULL,
	[OrderID] [int] NULL,
	[OrderDetailID] [int] NULL,
	[PriceListID] [int] NOT NULL,
	[WarehouseID] [int] NOT NULL,
	[ItemID] [int] NOT NULL,
	[OrderSessionID] [uniqueidentifier] NOT NULL,
	[Quantity] [int] NOT NULL,
	[UnitPrice] [decimal](10, 2) NOT NULL,
	[Description] [nvarchar](200) COLLATE Modern_Spanish_CI_AS NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TempPurchaseInvoiceDetails]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TempPurchaseInvoiceDetails](
	[TempPurchaseInvoiceDetailID] [int] IDENTITY(1,1) NOT NULL,
	[UniqueID] [uniqueidentifier] NOT NULL,
	[SessionID] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[UserID] [int] NOT NULL,
	[ItemID] [int] NOT NULL,
	[Quantity] [decimal](18, 2) NOT NULL,
	[UnitPrice] [decimal](18, 2) NOT NULL,
	[VATPercent] [decimal](5, 2) NULL,
	[WarehouseID] [int] NULL,
	[Notes] [nvarchar](255) COLLATE Modern_Spanish_CI_AS NULL,
	[EntryDate] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[TempPurchaseInvoiceDetailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TempStockHistoryDetails]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TempStockHistoryDetails](
	[TempStockEntryID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyID] [int] NOT NULL,
	[BranchID] [int] NOT NULL,
	[UniqueID] [uniqueidentifier] NOT NULL,
	[SessionID] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[UserID] [int] NOT NULL,
	[ItemID] [int] NOT NULL,
	[WarehouseID] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
	[EntryDate] [datetime] NOT NULL,
	[Reason] [nvarchar](200) COLLATE Modern_Spanish_CI_AS NULL,
	[IsProcessed] [bit] NOT NULL,
 CONSTRAINT [PK__TempStockHistoryDetails] PRIMARY KEY CLUSTERED 
(
	[TempStockEntryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Transactions]    Script Date: 22/7/2025 04:21:34 ******/
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
	[Notes] [nvarchar](200) COLLATE Modern_Spanish_CI_AS NULL,
	[BranchID] [int] NULL,
 CONSTRAINT [PK__Transact__55433A4BB5EE9535] PRIMARY KEY CLUSTERED 
(
	[TransactionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserAccess]    Script Date: 22/7/2025 04:21:34 ******/
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
/****** Object:  Table [dbo].[UserActivityLog]    Script Date: 22/7/2025 04:21:34 ******/
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
/****** Object:  Table [dbo].[Users]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[Nickname] [nvarchar](50) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[FullName] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[Password] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CompanyID] [int] NULL,
 CONSTRAINT [PK__Users__1788CCAC4149E5BC] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vendors]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vendors](
	[VendorID] [int] IDENTITY(1,1) NOT NULL,
	[VendorName] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[Commission] [decimal](18, 4) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CompanyID] [int] NULL,
 CONSTRAINT [PK_Vendors] PRIMARY KEY CLUSTERED 
(
	[VendorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Warehouses]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Warehouses](
	[WarehouseID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[Addres] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NULL,
	[CountryID] [int] NULL,
	[ProvinceID] [int] NULL,
 CONSTRAINT [PK__Warehous__2608AFD9216E9B31] PRIMARY KEY CLUSTERED 
(
	[WarehouseID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [UQ_Branches_CompanyID_BranchID]    Script Date: 22/7/2025 04:21:34 ******/
CREATE UNIQUE NONCLUSTERED INDEX [UQ_Branches_CompanyID_BranchID] ON [dbo].[Branches]
(
	[CompanyID] ASC,
	[BranchID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Clients_IsActive]    Script Date: 22/7/2025 04:21:34 ******/
CREATE NONCLUSTERED INDEX [IX_Clients_IsActive] ON [dbo].[Clients]
(
	[IsActive] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [idx_DiscountID]    Script Date: 22/7/2025 04:21:34 ******/
CREATE NONCLUSTERED INDEX [idx_DiscountID] ON [dbo].[Discounts]
(
	[DiscountID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [ix_Categories_CategoryID]    Script Date: 22/7/2025 04:21:34 ******/
CREATE NONCLUSTERED INDEX [ix_Categories_CategoryID] ON [dbo].[ItemCategories]
(
	[ItemCategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Items_Code]    Script Date: 22/7/2025 04:21:34 ******/
CREATE NONCLUSTERED INDEX [IX_Items_Code] ON [dbo].[Items]
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [idx_BranchID]    Script Date: 22/7/2025 04:21:34 ******/
CREATE NONCLUSTERED INDEX [idx_BranchID] ON [dbo].[Itemstock]
(
	[CompanyID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [idx_ItemWarehouse]    Script Date: 22/7/2025 04:21:34 ******/
CREATE NONCLUSTERED INDEX [idx_ItemWarehouse] ON [dbo].[Itemstock]
(
	[ItemID] ASC,
	[WarehouseID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [idx_SupplierStatus]    Script Date: 22/7/2025 04:21:34 ******/
CREATE NONCLUSTERED INDEX [idx_SupplierStatus] ON [dbo].[Itemstock]
(
	[SupplierID] ASC,
	[StockStatus] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Itemstock_Warehouse_Item]    Script Date: 22/7/2025 04:21:34 ******/
CREATE NONCLUSTERED INDEX [IX_Itemstock_Warehouse_Item] ON [dbo].[Itemstock]
(
	[WarehouseID] ASC,
	[ItemID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [ix_Subcategories_SubcategoryID]    Script Date: 22/7/2025 04:21:34 ******/
CREATE NONCLUSTERED INDEX [ix_Subcategories_SubcategoryID] ON [dbo].[ItemSubcategories]
(
	[ItemSubcategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [idx_ClientID]    Script Date: 22/7/2025 04:21:34 ******/
CREATE NONCLUSTERED INDEX [idx_ClientID] ON [dbo].[Orders]
(
	[ClientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [idx_CompanyID]    Script Date: 22/7/2025 04:21:34 ******/
CREATE NONCLUSTERED INDEX [idx_CompanyID] ON [dbo].[Orders]
(
	[CompanyID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [idx_OrderDate]    Script Date: 22/7/2025 04:21:34 ******/
CREATE NONCLUSTERED INDEX [idx_OrderDate] ON [dbo].[Orders]
(
	[Date] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Orders_Date]    Script Date: 22/7/2025 04:21:34 ******/
CREATE NONCLUSTERED INDEX [IX_Orders_Date] ON [dbo].[Orders]
(
	[Date] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [idx_ClientID_Transactions]    Script Date: 22/7/2025 04:21:34 ******/
CREATE NONCLUSTERED INDEX [idx_ClientID_Transactions] ON [dbo].[Transactions]
(
	[ClientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [idx_SupplierID]    Script Date: 22/7/2025 04:21:34 ******/
CREATE NONCLUSTERED INDEX [idx_SupplierID] ON [dbo].[Transactions]
(
	[SupplierID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [idx_TransactionDate]    Script Date: 22/7/2025 04:21:34 ******/
CREATE NONCLUSTERED INDEX [idx_TransactionDate] ON [dbo].[Transactions]
(
	[TransactionDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AccountBalances] ADD  CONSTRAINT [DF__AccountBa__Balan__3D2915A8]  DEFAULT ((0)) FOR [Balance]
GO
ALTER TABLE [dbo].[Brands] ADD  CONSTRAINT [DF_Brands_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[CashBoxes] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[CashBoxes] ADD  DEFAULT ((0)) FOR [InitialBalance]
GO
ALTER TABLE [dbo].[CashBoxes] ADD  DEFAULT ((0)) FOR [CurrentBalance]
GO
ALTER TABLE [dbo].[CashBoxMovements] ADD  DEFAULT (getdate()) FOR [MovementDate]
GO
ALTER TABLE [dbo].[Clients] ADD  CONSTRAINT [DF_Clients_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Clients] ADD  CONSTRAINT [DF_Clients_VendorID]  DEFAULT ((1)) FOR [VendorID]
GO
ALTER TABLE [dbo].[CreditCards] ADD  CONSTRAINT [DF_CreditCards_Surcharge]  DEFAULT ((0)) FOR [Surcharge]
GO
ALTER TABLE [dbo].[CreditCards] ADD  CONSTRAINT [DF_CreditCards_IsActive]  DEFAULT ((1)) FOR [IsActive]
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
ALTER TABLE [dbo].[PurchaseInvoices] ADD  CONSTRAINT [DF__PurchaseI__IsPai__446B1014]  DEFAULT ((0)) FOR [IsPaid]
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
ALTER TABLE [dbo].[sysDocTypes] ADD  CONSTRAINT [DF__DocTypes__Active__75C27486]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Taxes] ADD  CONSTRAINT [DF_Taxes_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[TempOrderDetails] ADD  CONSTRAINT [DF__TempOrder__Order__0B91BA14]  DEFAULT (newid()) FOR [OrderSessionID]
GO
ALTER TABLE [dbo].[TempPurchaseInvoiceDetails] ADD  DEFAULT (newid()) FOR [UniqueID]
GO
ALTER TABLE [dbo].[TempPurchaseInvoiceDetails] ADD  DEFAULT (getdate()) FOR [EntryDate]
GO
ALTER TABLE [dbo].[TempStockHistoryDetails] ADD  CONSTRAINT [DF__TempStockHistoryDetails__UniqueID]  DEFAULT (newid()) FOR [UniqueID]
GO
ALTER TABLE [dbo].[TempStockHistoryDetails] ADD  CONSTRAINT [DF__TempStockHistoryDetails__EntryDate]  DEFAULT (getdate()) FOR [EntryDate]
GO
ALTER TABLE [dbo].[TempStockHistoryDetails] ADD  CONSTRAINT [DF__TempStockHistoryDetails__IsProcessed]  DEFAULT ((0)) FOR [IsProcessed]
GO
ALTER TABLE [dbo].[Transactions] ADD  CONSTRAINT [DF__Transacti__Trans__245D67DE]  DEFAULT (getdate()) FOR [TransactionDate]
GO
ALTER TABLE [dbo].[UserActivityLog] ADD  CONSTRAINT [DF__UserActiv__Times__395884C4]  DEFAULT (getdate()) FOR [Timestamp]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Vendors] ADD  CONSTRAINT [DF_Vendors_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[AccountBalances]  WITH CHECK ADD  CONSTRAINT [FK_AccountBalances_AccountBalances] FOREIGN KEY([AccountID])
REFERENCES [dbo].[AccountBalances] ([AccountID])
GO
ALTER TABLE [dbo].[AccountBalances] CHECK CONSTRAINT [FK_AccountBalances_AccountBalances]
GO
ALTER TABLE [dbo].[AccountBalances]  WITH CHECK ADD  CONSTRAINT [FK_AccountBalances_Branches] FOREIGN KEY([CompanyID], [BranchID])
REFERENCES [dbo].[Branches] ([CompanyID], [BranchID])
GO
ALTER TABLE [dbo].[AccountBalances] CHECK CONSTRAINT [FK_AccountBalances_Branches]
GO
ALTER TABLE [dbo].[AccountBalances]  WITH CHECK ADD  CONSTRAINT [FK_AccountBalances_CompanyBranch] FOREIGN KEY([CompanyID], [BranchID])
REFERENCES [dbo].[Branches] ([CompanyID], [BranchID])
GO
ALTER TABLE [dbo].[AccountBalances] CHECK CONSTRAINT [FK_AccountBalances_CompanyBranch]
GO
ALTER TABLE [dbo].[Branches]  WITH CHECK ADD  CONSTRAINT [FK_Branches_CompanyBranch] FOREIGN KEY([CompanyID], [BranchID])
REFERENCES [dbo].[Branches] ([CompanyID], [BranchID])
GO
ALTER TABLE [dbo].[Branches] CHECK CONSTRAINT [FK_Branches_CompanyBranch]
GO
ALTER TABLE [dbo].[Brands]  WITH CHECK ADD  CONSTRAINT [FK_Brands_Company] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[Brands] CHECK CONSTRAINT [FK_Brands_Company]
GO
ALTER TABLE [dbo].[CarBrands]  WITH CHECK ADD  CONSTRAINT [FK_CarBrands_Company] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[CarBrands] CHECK CONSTRAINT [FK_CarBrands_Company]
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
ALTER TABLE [dbo].[Cars]  WITH CHECK ADD  CONSTRAINT [FK_Cars_Company] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[Cars] CHECK CONSTRAINT [FK_Cars_Company]
GO
ALTER TABLE [dbo].[Cars]  WITH CHECK ADD  CONSTRAINT [FK_Cars_Discounts] FOREIGN KEY([DiscountID])
REFERENCES [dbo].[Discounts] ([DiscountID])
GO
ALTER TABLE [dbo].[Cars] CHECK CONSTRAINT [FK_Cars_Discounts]
GO
ALTER TABLE [dbo].[CashBoxes]  WITH CHECK ADD  CONSTRAINT [FK_CashBoxes_CompanyBranch] FOREIGN KEY([CompanyID], [BranchID])
REFERENCES [dbo].[Branches] ([CompanyID], [BranchID])
GO
ALTER TABLE [dbo].[CashBoxes] CHECK CONSTRAINT [FK_CashBoxes_CompanyBranch]
GO
ALTER TABLE [dbo].[CashBoxes]  WITH CHECK ADD  CONSTRAINT [FK_CashBoxes_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[CashBoxes] CHECK CONSTRAINT [FK_CashBoxes_User]
GO
ALTER TABLE [dbo].[CashBoxMovements]  WITH CHECK ADD  CONSTRAINT [FK_CashBoxMovements_CashBox] FOREIGN KEY([CashBoxID])
REFERENCES [dbo].[CashBoxes] ([CashBoxID])
GO
ALTER TABLE [dbo].[CashBoxMovements] CHECK CONSTRAINT [FK_CashBoxMovements_CashBox]
GO
ALTER TABLE [dbo].[CashBoxMovements]  WITH CHECK ADD  CONSTRAINT [FK_CashBoxMovements_CompanyBranch] FOREIGN KEY([CompanyID], [BranchID])
REFERENCES [dbo].[Branches] ([CompanyID], [BranchID])
GO
ALTER TABLE [dbo].[CashBoxMovements] CHECK CONSTRAINT [FK_CashBoxMovements_CompanyBranch]
GO
ALTER TABLE [dbo].[CashBoxMovements]  WITH CHECK ADD  CONSTRAINT [FK_CashBoxMovements_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[CashBoxMovements] CHECK CONSTRAINT [FK_CashBoxMovements_User]
GO
ALTER TABLE [dbo].[Clients]  WITH CHECK ADD  CONSTRAINT [FK_Clients_Branches] FOREIGN KEY([CompanyID], [BranchID])
REFERENCES [dbo].[Branches] ([CompanyID], [BranchID])
GO
ALTER TABLE [dbo].[Clients] CHECK CONSTRAINT [FK_Clients_Branches]
GO
ALTER TABLE [dbo].[Clients]  WITH CHECK ADD  CONSTRAINT [FK_Clients_CompanyBranch] FOREIGN KEY([CompanyID], [BranchID])
REFERENCES [dbo].[Branches] ([CompanyID], [BranchID])
GO
ALTER TABLE [dbo].[Clients] CHECK CONSTRAINT [FK_Clients_CompanyBranch]
GO
ALTER TABLE [dbo].[Clients]  WITH CHECK ADD  CONSTRAINT [FK_Clients_DocTypes] FOREIGN KEY([DocTypeID])
REFERENCES [dbo].[sysDocTypes] ([DocTypeID])
GO
ALTER TABLE [dbo].[Clients] CHECK CONSTRAINT [FK_Clients_DocTypes]
GO
ALTER TABLE [dbo].[Clients]  WITH CHECK ADD  CONSTRAINT [FK_Clients_PriceLists] FOREIGN KEY([PriceListID])
REFERENCES [dbo].[PriceLists] ([PriceListID])
GO
ALTER TABLE [dbo].[Clients] CHECK CONSTRAINT [FK_Clients_PriceLists]
GO
ALTER TABLE [dbo].[Clients]  WITH CHECK ADD  CONSTRAINT [FK_Clients_Provinces] FOREIGN KEY([CountryID], [ProvinceID])
REFERENCES [dbo].[Provinces] ([CountryID], [ProvinceID])
GO
ALTER TABLE [dbo].[Clients] CHECK CONSTRAINT [FK_Clients_Provinces]
GO
ALTER TABLE [dbo].[Clients]  WITH CHECK ADD  CONSTRAINT [FK_Clients_Vendors] FOREIGN KEY([VendorID])
REFERENCES [dbo].[Vendors] ([VendorID])
GO
ALTER TABLE [dbo].[Clients] CHECK CONSTRAINT [FK_Clients_Vendors]
GO
ALTER TABLE [dbo].[CreditCardGroups]  WITH CHECK ADD  CONSTRAINT [FK_CreditCardGroups_Company] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[CreditCardGroups] CHECK CONSTRAINT [FK_CreditCardGroups_Company]
GO
ALTER TABLE [dbo].[CreditCards]  WITH CHECK ADD  CONSTRAINT [FK_CreditCards_CardGroups] FOREIGN KEY([CreditCardGroupID])
REFERENCES [dbo].[CreditCardGroups] ([CreditCardGroupID])
GO
ALTER TABLE [dbo].[CreditCards] CHECK CONSTRAINT [FK_CreditCards_CardGroups]
GO
ALTER TABLE [dbo].[CreditCards]  WITH CHECK ADD  CONSTRAINT [FK_CreditCards_Company] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[CreditCards] CHECK CONSTRAINT [FK_CreditCards_Company]
GO
ALTER TABLE [dbo].[Discounts]  WITH CHECK ADD  CONSTRAINT [FK_Discounts_Company] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[Discounts] CHECK CONSTRAINT [FK_Discounts_Company]
GO
ALTER TABLE [dbo].[Documents]  WITH CHECK ADD  CONSTRAINT [FK_Documents_CompanyBranch] FOREIGN KEY([CompanyID], [BranchID])
REFERENCES [dbo].[Branches] ([CompanyID], [BranchID])
GO
ALTER TABLE [dbo].[Documents] CHECK CONSTRAINT [FK_Documents_CompanyBranch]
GO
ALTER TABLE [dbo].[Documents]  WITH CHECK ADD  CONSTRAINT [FK_Documents_DocumentTypes] FOREIGN KEY([DocumentTypeID])
REFERENCES [dbo].[sysDocumentTypes] ([DocumentTypeID])
GO
ALTER TABLE [dbo].[Documents] CHECK CONSTRAINT [FK_Documents_DocumentTypes]
GO
ALTER TABLE [dbo].[ItemCategories]  WITH CHECK ADD  CONSTRAINT [FK_ItemCategories_Company] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[ItemCategories] CHECK CONSTRAINT [FK_ItemCategories_Company]
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
ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [FK_Items_Brands] FOREIGN KEY([BrandID])
REFERENCES [dbo].[Brands] ([BrandID])
GO
ALTER TABLE [dbo].[Items] CHECK CONSTRAINT [FK_Items_Brands]
GO
ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [FK_Items_CompanyBranch] FOREIGN KEY([CompanyID], [BranchID])
REFERENCES [dbo].[Branches] ([CompanyID], [BranchID])
GO
ALTER TABLE [dbo].[Items] CHECK CONSTRAINT [FK_Items_CompanyBranch]
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
ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [FK_Items_Warehouses] FOREIGN KEY([WarehouseID])
REFERENCES [dbo].[Warehouses] ([WarehouseID])
GO
ALTER TABLE [dbo].[Items] CHECK CONSTRAINT [FK_Items_Warehouses]
GO
ALTER TABLE [dbo].[Itemstock]  WITH CHECK ADD  CONSTRAINT [FK_Itemstock_CompanyBranch] FOREIGN KEY([CompanyID], [BranchID])
REFERENCES [dbo].[Branches] ([CompanyID], [BranchID])
GO
ALTER TABLE [dbo].[Itemstock] CHECK CONSTRAINT [FK_Itemstock_CompanyBranch]
GO
ALTER TABLE [dbo].[Itemstock]  WITH CHECK ADD  CONSTRAINT [FK_Itemstock_Items] FOREIGN KEY([ItemID])
REFERENCES [dbo].[Items] ([ItemID])
GO
ALTER TABLE [dbo].[Itemstock] CHECK CONSTRAINT [FK_Itemstock_Items]
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
ALTER TABLE [dbo].[ItemTaxes]  WITH CHECK ADD  CONSTRAINT [FK_ItemTaxes_CompanyBranch] FOREIGN KEY([CompanyID], [BranchID])
REFERENCES [dbo].[Branches] ([CompanyID], [BranchID])
GO
ALTER TABLE [dbo].[ItemTaxes] CHECK CONSTRAINT [FK_ItemTaxes_CompanyBranch]
GO
ALTER TABLE [dbo].[ItemTaxes]  WITH CHECK ADD  CONSTRAINT [FK_ItemTaxes_Item] FOREIGN KEY([ItemID])
REFERENCES [dbo].[Items] ([ItemID])
GO
ALTER TABLE [dbo].[ItemTaxes] CHECK CONSTRAINT [FK_ItemTaxes_Item]
GO
ALTER TABLE [dbo].[ItemTaxes]  WITH CHECK ADD  CONSTRAINT [FK_ItemTaxes_ItemTaxes] FOREIGN KEY([ItemTaxID])
REFERENCES [dbo].[ItemTaxes] ([ItemTaxID])
GO
ALTER TABLE [dbo].[ItemTaxes] CHECK CONSTRAINT [FK_ItemTaxes_ItemTaxes]
GO
ALTER TABLE [dbo].[LastUserLogin]  WITH CHECK ADD  CONSTRAINT [FK_LastUserLogin_Branches] FOREIGN KEY([CompanyID], [BranchID])
REFERENCES [dbo].[Branches] ([CompanyID], [BranchID])
GO
ALTER TABLE [dbo].[LastUserLogin] CHECK CONSTRAINT [FK_LastUserLogin_Branches]
GO
ALTER TABLE [dbo].[LastUserLogin]  WITH CHECK ADD  CONSTRAINT [FK_LastUserLogin_CompanyBranch] FOREIGN KEY([CompanyID], [BranchID])
REFERENCES [dbo].[Branches] ([CompanyID], [BranchID])
GO
ALTER TABLE [dbo].[LastUserLogin] CHECK CONSTRAINT [FK_LastUserLogin_CompanyBranch]
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
ALTER TABLE [dbo].[OrderHistory]  WITH CHECK ADD  CONSTRAINT [FK__OrderHist__CarID__2180FB33] FOREIGN KEY([CarID])
REFERENCES [dbo].[Cars] ([CarID])
GO
ALTER TABLE [dbo].[OrderHistory] CHECK CONSTRAINT [FK__OrderHist__CarID__2180FB33]
GO
ALTER TABLE [dbo].[OrderHistory]  WITH CHECK ADD  CONSTRAINT [FK__OrderHist__Order__1F98B2C1] FOREIGN KEY([OrderID])
REFERENCES [dbo].[Orders] ([OrderID])
GO
ALTER TABLE [dbo].[OrderHistory] CHECK CONSTRAINT [FK__OrderHist__Order__1F98B2C1]
GO
ALTER TABLE [dbo].[OrderHistory]  WITH CHECK ADD  CONSTRAINT [FK_OrderHistory_CompanyBranch] FOREIGN KEY([CompanyID], [BranchID])
REFERENCES [dbo].[Branches] ([CompanyID], [BranchID])
GO
ALTER TABLE [dbo].[OrderHistory] CHECK CONSTRAINT [FK_OrderHistory_CompanyBranch]
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
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK__Orders__CarID__02FC7413] FOREIGN KEY([CarID])
REFERENCES [dbo].[Cars] ([CarID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK__Orders__CarID__02FC7413]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK__Orders__Discount__04E4BC85] FOREIGN KEY([DiscountID])
REFERENCES [dbo].[Discounts] ([DiscountID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK__Orders__Discount__04E4BC85]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK__Orders__Document__06CD04F7] FOREIGN KEY([DocumentID])
REFERENCES [dbo].[sysDocumentTypes] ([DocumentTypeID])
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
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_CompanyBranch] FOREIGN KEY([CompanyID], [BranchID])
REFERENCES [dbo].[Branches] ([CompanyID], [BranchID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_CompanyBranch]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_OrderStatus] FOREIGN KEY([OrderStatusID])
REFERENCES [dbo].[sysOrderStatus] ([OrderStatusID])
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
ALTER TABLE [dbo].[PriceLists]  WITH CHECK ADD  CONSTRAINT [FK_PriceLists_Company] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[PriceLists] CHECK CONSTRAINT [FK_PriceLists_Company]
GO
ALTER TABLE [dbo].[Provinces]  WITH CHECK ADD  CONSTRAINT [FK__Provinces__Count__403A8C7D] FOREIGN KEY([CountryID])
REFERENCES [dbo].[Countries] ([CountryID])
GO
ALTER TABLE [dbo].[Provinces] CHECK CONSTRAINT [FK__Provinces__Count__403A8C7D]
GO
ALTER TABLE [dbo].[Provinces]  WITH CHECK ADD  CONSTRAINT [FK_Provinces_Provinces] FOREIGN KEY([CountryID], [ProvinceID])
REFERENCES [dbo].[Provinces] ([CountryID], [ProvinceID])
GO
ALTER TABLE [dbo].[Provinces] CHECK CONSTRAINT [FK_Provinces_Provinces]
GO
ALTER TABLE [dbo].[PurchaseInvoiceDetails]  WITH CHECK ADD  CONSTRAINT [FK_PurchaseInvoiceDetails_Item] FOREIGN KEY([ItemID])
REFERENCES [dbo].[Items] ([ItemID])
GO
ALTER TABLE [dbo].[PurchaseInvoiceDetails] CHECK CONSTRAINT [FK_PurchaseInvoiceDetails_Item]
GO
ALTER TABLE [dbo].[PurchaseInvoiceDetails]  WITH CHECK ADD  CONSTRAINT [FK_PurchaseInvoiceDetails_PurchaseInvoice] FOREIGN KEY([PurchaseInvoiceID])
REFERENCES [dbo].[PurchaseInvoices] ([PurchaseInvoiceID])
GO
ALTER TABLE [dbo].[PurchaseInvoiceDetails] CHECK CONSTRAINT [FK_PurchaseInvoiceDetails_PurchaseInvoice]
GO
ALTER TABLE [dbo].[PurchaseInvoiceDetails]  WITH CHECK ADD  CONSTRAINT [FK_PurchaseInvoiceDetails_Warehouse] FOREIGN KEY([WarehouseID])
REFERENCES [dbo].[Warehouses] ([WarehouseID])
GO
ALTER TABLE [dbo].[PurchaseInvoiceDetails] CHECK CONSTRAINT [FK_PurchaseInvoiceDetails_Warehouse]
GO
ALTER TABLE [dbo].[PurchaseInvoiceDetailTaxes]  WITH CHECK ADD  CONSTRAINT [FK_PurchaseInvoiceDetailTaxes_Detail] FOREIGN KEY([PurchaseInvoiceDetailID])
REFERENCES [dbo].[PurchaseInvoiceDetails] ([PurchaseInvoiceDetailID])
GO
ALTER TABLE [dbo].[PurchaseInvoiceDetailTaxes] CHECK CONSTRAINT [FK_PurchaseInvoiceDetailTaxes_Detail]
GO
ALTER TABLE [dbo].[PurchaseInvoices]  WITH CHECK ADD  CONSTRAINT [FK_PurchaseInvoices_CompanyBranch] FOREIGN KEY([CompanyID], [BranchID])
REFERENCES [dbo].[Branches] ([CompanyID], [BranchID])
GO
ALTER TABLE [dbo].[PurchaseInvoices] CHECK CONSTRAINT [FK_PurchaseInvoices_CompanyBranch]
GO
ALTER TABLE [dbo].[PurchaseInvoices]  WITH CHECK ADD  CONSTRAINT [FK_PurchaseInvoices_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[PurchaseInvoices] CHECK CONSTRAINT [FK_PurchaseInvoices_User]
GO
ALTER TABLE [dbo].[Roles]  WITH CHECK ADD  CONSTRAINT [FK_Roles_Company] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[Roles] CHECK CONSTRAINT [FK_Roles_Company]
GO
ALTER TABLE [dbo].[SaleConditions]  WITH CHECK ADD  CONSTRAINT [FK_SaleConditions_Company] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[SaleConditions] CHECK CONSTRAINT [FK_SaleConditions_Company]
GO
ALTER TABLE [dbo].[SaleConditions]  WITH CHECK ADD  CONSTRAINT [FK_SaleConditions_CreditCards] FOREIGN KEY([CreditCardID])
REFERENCES [dbo].[CreditCards] ([CreditCardID])
GO
ALTER TABLE [dbo].[SaleConditions] CHECK CONSTRAINT [FK_SaleConditions_CreditCards]
GO
ALTER TABLE [dbo].[ServiceType]  WITH CHECK ADD  CONSTRAINT [FK_ServiceType_Company] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[ServiceType] CHECK CONSTRAINT [FK_ServiceType_Company]
GO
ALTER TABLE [dbo].[StockHistory]  WITH CHECK ADD  CONSTRAINT [FK_StockHistory_CompanyBranch] FOREIGN KEY([CompanyID], [BranchID])
REFERENCES [dbo].[Branches] ([CompanyID], [BranchID])
GO
ALTER TABLE [dbo].[StockHistory] CHECK CONSTRAINT [FK_StockHistory_CompanyBranch]
GO
ALTER TABLE [dbo].[StockHistory]  WITH CHECK ADD  CONSTRAINT [FK_StockHistory_Users] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[StockHistory] CHECK CONSTRAINT [FK_StockHistory_Users]
GO
ALTER TABLE [dbo].[StockHistoryDetail]  WITH CHECK ADD  CONSTRAINT [FK_StockHistoryDetail_Item] FOREIGN KEY([ItemID])
REFERENCES [dbo].[Items] ([ItemID])
GO
ALTER TABLE [dbo].[StockHistoryDetail] CHECK CONSTRAINT [FK_StockHistoryDetail_Item]
GO
ALTER TABLE [dbo].[StockHistoryDetail]  WITH CHECK ADD  CONSTRAINT [FK_StockHistoryDetail_Warehouse] FOREIGN KEY([WarehouseID])
REFERENCES [dbo].[Warehouses] ([WarehouseID])
GO
ALTER TABLE [dbo].[StockHistoryDetail] CHECK CONSTRAINT [FK_StockHistoryDetail_Warehouse]
GO
ALTER TABLE [dbo].[Suppliers]  WITH CHECK ADD  CONSTRAINT [FK_Suppliers_Branches] FOREIGN KEY([CompanyID], [BranchID])
REFERENCES [dbo].[Branches] ([CompanyID], [BranchID])
GO
ALTER TABLE [dbo].[Suppliers] CHECK CONSTRAINT [FK_Suppliers_Branches]
GO
ALTER TABLE [dbo].[Suppliers]  WITH CHECK ADD  CONSTRAINT [FK_Suppliers_CompanyBranch] FOREIGN KEY([CompanyID], [BranchID])
REFERENCES [dbo].[Branches] ([CompanyID], [BranchID])
GO
ALTER TABLE [dbo].[Suppliers] CHECK CONSTRAINT [FK_Suppliers_CompanyBranch]
GO
ALTER TABLE [dbo].[Suppliers]  WITH CHECK ADD  CONSTRAINT [FK_Suppliers_DocTypes] FOREIGN KEY([DocTypeID])
REFERENCES [dbo].[sysDocTypes] ([DocTypeID])
GO
ALTER TABLE [dbo].[Suppliers] CHECK CONSTRAINT [FK_Suppliers_DocTypes]
GO
ALTER TABLE [dbo].[Suppliers]  WITH CHECK ADD  CONSTRAINT [FK_Suppliers_Provinces] FOREIGN KEY([CountryID], [ProvinceID])
REFERENCES [dbo].[Provinces] ([CountryID], [ProvinceID])
GO
ALTER TABLE [dbo].[Suppliers] CHECK CONSTRAINT [FK_Suppliers_Provinces]
GO
ALTER TABLE [dbo].[Taxes]  WITH CHECK ADD  CONSTRAINT [FK_Taxes_Company] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[Taxes] CHECK CONSTRAINT [FK_Taxes_Company]
GO
ALTER TABLE [dbo].[Taxes]  WITH CHECK ADD  CONSTRAINT [FK_Taxes_Provinces] FOREIGN KEY([CountryID], [ProvinceID])
REFERENCES [dbo].[Provinces] ([CountryID], [ProvinceID])
GO
ALTER TABLE [dbo].[Taxes] CHECK CONSTRAINT [FK_Taxes_Provinces]
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
ALTER TABLE [dbo].[TempOrderDetails]  WITH CHECK ADD  CONSTRAINT [FK_TempOrderDetails_CompanyBranch] FOREIGN KEY([CompanyID], [BranchID])
REFERENCES [dbo].[Branches] ([CompanyID], [BranchID])
GO
ALTER TABLE [dbo].[TempOrderDetails] CHECK CONSTRAINT [FK_TempOrderDetails_CompanyBranch]
GO
ALTER TABLE [dbo].[TempOrderDetails]  WITH CHECK ADD  CONSTRAINT [FK_TempOrderDetails_OrderDetails] FOREIGN KEY([OrderDetailID])
REFERENCES [dbo].[OrderDetails] ([OrderDetailID])
GO
ALTER TABLE [dbo].[TempOrderDetails] CHECK CONSTRAINT [FK_TempOrderDetails_OrderDetails]
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
ALTER TABLE [dbo].[TempPurchaseInvoiceDetails]  WITH CHECK ADD  CONSTRAINT [FK_TempPurchaseInvoiceDetails_Item] FOREIGN KEY([ItemID])
REFERENCES [dbo].[Items] ([ItemID])
GO
ALTER TABLE [dbo].[TempPurchaseInvoiceDetails] CHECK CONSTRAINT [FK_TempPurchaseInvoiceDetails_Item]
GO
ALTER TABLE [dbo].[TempPurchaseInvoiceDetails]  WITH CHECK ADD  CONSTRAINT [FK_TempPurchaseInvoiceDetails_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[TempPurchaseInvoiceDetails] CHECK CONSTRAINT [FK_TempPurchaseInvoiceDetails_User]
GO
ALTER TABLE [dbo].[TempPurchaseInvoiceDetails]  WITH CHECK ADD  CONSTRAINT [FK_TempPurchaseInvoiceDetails_Warehouse] FOREIGN KEY([WarehouseID])
REFERENCES [dbo].[Warehouses] ([WarehouseID])
GO
ALTER TABLE [dbo].[TempPurchaseInvoiceDetails] CHECK CONSTRAINT [FK_TempPurchaseInvoiceDetails_Warehouse]
GO
ALTER TABLE [dbo].[TempStockHistoryDetails]  WITH CHECK ADD  CONSTRAINT [FK__TempStockHistoryDetails__ItemID] FOREIGN KEY([ItemID])
REFERENCES [dbo].[Items] ([ItemID])
GO
ALTER TABLE [dbo].[TempStockHistoryDetails] CHECK CONSTRAINT [FK__TempStockHistoryDetails__ItemID]
GO
ALTER TABLE [dbo].[TempStockHistoryDetails]  WITH CHECK ADD  CONSTRAINT [FK__TempStockHistoryDetails__UserID] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[TempStockHistoryDetails] CHECK CONSTRAINT [FK__TempStockHistoryDetails__UserID]
GO
ALTER TABLE [dbo].[TempStockHistoryDetails]  WITH CHECK ADD  CONSTRAINT [FK__TempStockHistoryDetails__WarehouseID] FOREIGN KEY([WarehouseID])
REFERENCES [dbo].[Warehouses] ([WarehouseID])
GO
ALTER TABLE [dbo].[TempStockHistoryDetails] CHECK CONSTRAINT [FK__TempStockHistoryDetails__WarehouseID]
GO
ALTER TABLE [dbo].[TempStockHistoryDetails]  WITH CHECK ADD  CONSTRAINT [FK_TempStockHistoryDetails_CompanyBranch] FOREIGN KEY([CompanyID], [BranchID])
REFERENCES [dbo].[Branches] ([CompanyID], [BranchID])
GO
ALTER TABLE [dbo].[TempStockHistoryDetails] CHECK CONSTRAINT [FK_TempStockHistoryDetails_CompanyBranch]
GO
ALTER TABLE [dbo].[Transactions]  WITH CHECK ADD  CONSTRAINT [FK_Transactions_CompanyBranch] FOREIGN KEY([CompanyID], [BranchID])
REFERENCES [dbo].[Branches] ([CompanyID], [BranchID])
GO
ALTER TABLE [dbo].[Transactions] CHECK CONSTRAINT [FK_Transactions_CompanyBranch]
GO
ALTER TABLE [dbo].[UserAccess]  WITH CHECK ADD  CONSTRAINT [FK_UserAccess_CompanyBranch] FOREIGN KEY([CompanyID], [BranchID])
REFERENCES [dbo].[Branches] ([CompanyID], [BranchID])
GO
ALTER TABLE [dbo].[UserAccess] CHECK CONSTRAINT [FK_UserAccess_CompanyBranch]
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
REFERENCES [dbo].[sysUserActions] ([UserActionID])
GO
ALTER TABLE [dbo].[UserActivityLog] CHECK CONSTRAINT [FK_UserActivityLog_UserActions]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Company] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Company]
GO
ALTER TABLE [dbo].[Vendors]  WITH CHECK ADD  CONSTRAINT [FK_Vendors_Company] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[CompanyData] ([CompanyID])
GO
ALTER TABLE [dbo].[Vendors] CHECK CONSTRAINT [FK_Vendors_Company]
GO
ALTER TABLE [dbo].[Warehouses]  WITH CHECK ADD  CONSTRAINT [FK_Warehouses_Countries] FOREIGN KEY([CountryID])
REFERENCES [dbo].[Countries] ([CountryID])
GO
ALTER TABLE [dbo].[Warehouses] CHECK CONSTRAINT [FK_Warehouses_Countries]
GO
ALTER TABLE [dbo].[Warehouses]  WITH CHECK ADD  CONSTRAINT [FK_Warehouses_Provinces] FOREIGN KEY([CountryID], [ProvinceID])
REFERENCES [dbo].[Provinces] ([CountryID], [ProvinceID])
GO
ALTER TABLE [dbo].[Warehouses] CHECK CONSTRAINT [FK_Warehouses_Provinces]
GO
ALTER TABLE [dbo].[Itemstock]  WITH CHECK ADD  CONSTRAINT [chk_Stock_Quantity_Positive] CHECK  (([Quantity]>=(0)))
GO
ALTER TABLE [dbo].[Itemstock] CHECK CONSTRAINT [chk_Stock_Quantity_Positive]
GO
ALTER TABLE [dbo].[OrderDetails]  WITH CHECK ADD  CONSTRAINT [chk_OrderDetails_Quantity_Positive] CHECK  (([Quantity]>=(0)))
GO
ALTER TABLE [dbo].[OrderDetails] CHECK CONSTRAINT [chk_OrderDetails_Quantity_Positive]
GO
/****** Object:  Trigger [dbo].[trg_ValidateStockEntry]    Script Date: 22/7/2025 04:21:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Trigger para validar transacciones de ingreso de stock
-- Trigger para validar el ingreso de stock
CREATE TRIGGER [dbo].[trg_ValidateStockEntry]
ON [dbo].[TempStockHistoryDetails]
AFTER INSERT
AS
BEGIN
    DECLARE @ItemID INT, @WarehouseID INT, @QuantityChange INT;

    -- Obtener los valores del registro insertado
    SELECT 
        @ItemID = ItemID,
        @WarehouseID = WarehouseID,
        @QuantityChange = QuantityChange
    FROM Inserted;

    -- Verificar que el stock actual sea suficiente si el ingreso es negativo
    IF @QuantityChange < 0
    BEGIN
        -- Validar si el stock disponible es suficiente
        DECLARE @CurrentStock INT;
        SELECT @CurrentStock = Quantity FROM Itemstock
        WHERE ItemID = @ItemID AND WarehouseID = @WarehouseID;

        -- Si el stock actual es insuficiente, lanzar un error
        IF @CurrentStock + @QuantityChange < 0
        BEGIN
            RAISERROR('No hay suficiente stock disponible para esta operación.', 16, 1);
            ROLLBACK; -- Cancela la transacción
        END
    END
END;
GO
ALTER TABLE [dbo].[TempStockHistoryDetails] ENABLE TRIGGER [trg_ValidateStockEntry]
GO
EXEC sys.sp_addextendedproperty @name=N'tSQLt.TestClass', @value=1 , @level0type=N'SCHEMA',@level0name=N'SQLCop'
GO
USE [master]
GO
ALTER DATABASE [LubricentroDB2] SET  READ_WRITE 
GO
