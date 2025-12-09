# app/crud/syscurrencies.py - VERSIÓN COMPLETA (solo lectura)
# Resumen: CRUD mínimo de solo lectura para SysCurrencies

from sqlalchemy.orm import Session
from app.models.syscurrencies import SysCurrencies


def get_syscurrencies(db: Session):
    """Obtiene todas las monedas activas"""
    return db.query(SysCurrencies).all()


def get_syscurrency_by_id(db: Session, currency_id: int):
    """Obtiene una moneda por ID"""
    return db.query(SysCurrencies).filter(SysCurrencies.CurrencyID == currency_id).first()
