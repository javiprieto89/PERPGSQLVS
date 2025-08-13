import pytest
from app.graphql.crud.creditcards import create_creditcards, get_creditcards, update_creditcards, delete_creditcards
from app.graphql.schemas.creditcards import CreditCardsCreate, CreditCardsUpdate
from app.models.creditcardgroups import CreditCardGroups


def test_create_get_update_delete_creditcards(db_session):
    # Crear dependencia CreditCardGroup
    group = CreditCardGroups(GroupName="Grupo Test")
    db_session.add(group)
    db_session.commit()
    db_session.refresh(group)
    # Crear
    data = CreditCardsCreate(
        CardName="Tarjeta Test", CreditCardGroupID=group.CreditCardGroupID, IsActive=True)
    obj = create_creditcards(db_session, data)
    assert obj.CardName == "Tarjeta Test"
    # Obtener
    all_objs = get_creditcards(db_session)
    assert any(o.CreditCardID == obj.CreditCardID for o in all_objs)
    # Actualizar
    update = CreditCardsUpdate(CardName="Tarjeta Modificada")
    updated = update_creditcards(db_session, obj.CreditCardID, update)
    assert updated.CardName == "Tarjeta Modificada"
    # Eliminar
    deleted = delete_creditcards(db_session, obj.CreditCardID)
    assert deleted.CreditCardID == obj.CreditCardID
    assert all(o.CreditCardID !=
               obj.CreditCardID for o in get_creditcards(db_session))
