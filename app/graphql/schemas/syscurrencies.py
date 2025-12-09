# app/graphql/schemas/syscurrencies.py
# Schema GraphQL de solo lectura para SysCurrencies

import strawberry
from typing import Optional


@strawberry.type
class SysCurrenciesInDB:
    """Schema para monedas desde la base de datos"""
    CurrencyID: int
    CurrencyName: str
    Symbol: str
    IsBase: bool
    IsActive: bool
    Code: Optional[str]
    Name: str


@strawberry.type
class SysCurrenciesSummary:
    """Schema resumido para listados de monedas"""
    CurrencyID: int
    CurrencyName: str
    Symbol: str
    Code: Optional[str]
    IsActive: bool
