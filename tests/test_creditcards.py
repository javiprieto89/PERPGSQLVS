from datetime import datetime, timezone
import pytest
from app.graphql.crud.creditcards import create_creditcard, get_creditcards, update_creditcard, delete_creditcard
from app.graphql.schemas.creditcards import CreditCardCreate, CreditCardUpdate
from app.models.creditcardgroups import CreditCardGroups
from app.models.company import Company


def test_create_get_update_delete_creditcards(db_session):
    # Crear dependencia CreditCardGroup
    # Asegurar Company existente
    company = db_session.query(Company).first()
    if not company:
        company = Company(CompanyName="SeedCo")
        db_session.add(company)
        db_session.commit()
        db_session.refresh(company)
    group = CreditCardGroups(CompanyID=getattr(
        company, 'CompanyID'), GroupName="Grupo Test")
    db_session.add(group)
    db_session.commit()
    db_session.refresh(group)
    # Crear
    data = CreditCardCreate(
        CompanyID=getattr(company, 'CompanyID'),
        CardName="Tarjeta Test", CreditCardGroupID=group.CreditCardGroupID, IsActive=True)
    obj = create_creditcard(db_session, data)
    assert obj.CardName == "Tarjeta Test"
    # Obtener
    all_objs = get_creditcards(db_session)
    assert any(o.CreditCardID == obj.CreditCardID for o in all_objs)
    # Actualizar
    update = CreditCardUpdate(CardName="Tarjeta Modificada")
    updated = update_creditcard(db_session, obj.CreditCardID, update)
    assert updated.CardName == "Tarjeta Modificada"
    # Eliminar
    deleted = delete_creditcard(db_session, obj.CreditCardID)
    assert deleted.CreditCardID == obj.CreditCardID
    assert all(o.CreditCardID !=
               obj.CreditCardID for o in get_creditcards(db_session))
