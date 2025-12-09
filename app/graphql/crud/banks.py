# app/crud/banks.py - VERSIÓN COMPLETA
# Resumen: CRUD SQLAlchemy para Banks

from sqlalchemy.orm import Session
from app.models.banks import Banks
from app.graphql.schemas.banks import BanksCreate, BanksUpdate



def get_banks(db: Session):
    return db.query(Banks).all()

def get_banks_by_company(db: Session, company_id: int):
    """Obtiene todos los bancos de una compañía"""
    return db.query(Banks).filter(Banks.CompanyID == company_id).all()


def get_bank_by_id(db: Session, bank_id: int):
    """Obtiene un banco específico por ID"""
    return (
        db.query(Banks)
        .filter(Banks.BankID == bank_id)
        .first()
    )


def create_banks(db: Session, data: BanksCreate):
    """Crea un nuevo banco"""
    obj = Banks(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_banks(db: Session, bank_id: int, data: BanksUpdate):
    """Actualiza un banco existente"""
    obj = get_bank_by_id(db, bank_id)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_banks(db: Session, bank_id: int):
    """Elimina un banco existente"""
    obj = get_bank_by_id(db, bank_id)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
