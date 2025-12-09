# app/crud/bankreconciliations.py - VERSIÓN COMPLETA
# Resumen: Lógica CRUD para conciliaciones bancarias (BankReconciliations) según el estándar PERPGSQLVS.

from sqlalchemy.orm import Session
from typing import List, Optional
import datetime
from app.models.bankreconciliations import BankReconciliations


# 🔹 Obtener todas las conciliaciones
def get_bankreconciliations(db: Session) -> List[BankReconciliations]:
    return db.query(BankReconciliations).all()


# 🔹 Obtener conciliación por ID
def get_bankreconciliation_by_id(db: Session, id: int) -> Optional[BankReconciliations]:
    return db.query(BankReconciliations).filter(BankReconciliations.BankReconciliationID == id).first()


# ?? Obtener conciliaciones por cuenta bancaria
def get_bankreconciliations_by_account(db: Session, bankaccount_id: int) -> List[BankReconciliations]:
    return (
        db.query(BankReconciliations)
        .filter(BankReconciliations.BankAccountID == bankaccount_id)
        .order_by(BankReconciliations.StartDate.desc())
        .all()
    )


# 🔹 Crear conciliación bancaria
def create_bankreconciliation(db: Session, data) -> BankReconciliations:
    new_item = BankReconciliations(
        CompanyID=data.CompanyID,
        BankAccountID=data.BankAccountID,
        StartDate=data.StartDate,
        EndDate=data.EndDate,
        OpeningBalance=data.OpeningBalance,
        ClosingBalance=data.ClosingBalance,
        Notes=data.Notes,
        CreatedAt=datetime.datetime.utcnow(),
        CreatedBy=data.CreatedBy,
        Confirmed=data.Confirmed,
        ConfirmedAt=data.ConfirmedAt
    )

    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


# 🔹 Actualizar conciliación bancaria
def update_bankreconciliation(db: Session, id: int, data) -> Optional[BankReconciliations]:
    item = db.query(BankReconciliations).filter(
        BankReconciliations.BankReconciliationID == id).first()
    if not item:
        return None

    # Asignación de campos dinámicos
    for field, value in data.__dict__.items():
        if hasattr(item, field) and value is not None:
            setattr(item, field, value)

    db.commit()
    db.refresh(item)
    return item


# 🔹 Eliminar conciliación bancaria
def delete_bankreconciliation(db: Session, id: int) -> bool:
    item = db.query(BankReconciliations).filter(
        BankReconciliations.BankReconciliationID == id).first()
    if not item:
        return False

    db.delete(item)
    db.commit()
    return True
