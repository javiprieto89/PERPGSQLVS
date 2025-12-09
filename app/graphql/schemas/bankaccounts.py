# app/graphql/schemas/bankaccounts.py
# Schema GraphQL para BankAccounts

from __future__ import annotations

import strawberry
from typing import Optional

# Relaciones importadas desde sus schemas
from app.graphql.schemas.company import CompanyInDB
from app.graphql.schemas.syscurrencies import SysCurrenciesInDB
from app.graphql.schemas.banks import BanksInDB


# ===============================================
# 🟩 INPUTS
# ===============================================

@strawberry.input
class BankAccountsCreate:
    """Schema para crear una nueva cuenta bancaria"""
    CompanyID: int
    BankID: int
    AccountNumber: str
    CurrencyID: int
    Alias: Optional[str] = None
    IsActive: bool = True


@strawberry.input
class BankAccountsUpdate:
    """Schema para actualizar una cuenta bancaria existente"""
    CompanyID: Optional[int] = None
    BankID: Optional[int] = None
    AccountNumber: Optional[str] = None
    CurrencyID: Optional[int] = None
    Alias: Optional[str] = None
    IsActive: Optional[bool] = None


# ===============================================
# 🟩 SCHEMAS DE RESPUESTA DESDE DB
# ===============================================

@strawberry.type
class BankAccountsInDB:
    """Schema para la respuesta de cuentas bancarias desde la DB"""
    CompanyID: int
    BankID: int
    BankAccountID: int
    AccountNumber: str
    CurrencyID: int
    Alias: Optional[str]
    IsActive: bool

    # Relaciones ORM
    CompanyData: Optional[CompanyInDB] = None
    BankData: Optional[BanksInDB] = None
    CurrencyData: Optional[SysCurrenciesInDB] = None
# ===============================================
# 🟩 SCHEMA CON RELACIONES EXTENDIDAS
# ===============================================


@strawberry.type
class BankAccountsWithRelations:
    """Schema extendido para cuentas bancarias con relaciones y campos derivados"""
    CompanyID: int
    BankID: int
    BankAccountID: int
    AccountNumber: str
    CurrencyID: int
    Alias: Optional[str]
    IsActive: bool

    # Relaciones
    CompanyData: Optional[CompanyInDB] = None
    BankData: Optional[BanksInDB] = None
    CurrencyData: Optional[SysCurrenciesInDB] = None

    # Campos calculados
    BankName: Optional[str] = None
    CurrencyName: Optional[str] = None
    StatusText: Optional[str] = None


# ===============================================
# 🟩 SCHEMA RESUMIDO PARA LISTADOS
# ===============================================

@strawberry.type
class BankAccountsSummary:
    """Schema resumido para listados de cuentas bancarias"""
    BankAccountID: int
    AccountNumber: str
    Alias: Optional[str]
    IsActive: bool
