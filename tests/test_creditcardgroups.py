import pytest
from app.graphql.crud.creditcardgroups import create_creditcardgroups, get_creditcardgroups, update_creditcardgroups, delete_creditcardgroups
from app.graphql.schemas.creditcardgroups import CreditCardGroupsCreate, CreditCardGroupsUpdate


def test_create_get_update_delete_creditcardgroups(db_session):
    # Crear
    data = CreditCardGroupsCreate(GroupName="Grupo Test")
    obj = create_creditcardgroups(db_session, data)
    assert obj.GroupName == "Grupo Test"
    # Obtener
    all_objs = get_creditcardgroups(db_session)
    assert any(o.CreditCardGroupID == obj.CreditCardGroupID for o in all_objs)
    # Actualizar
    update = CreditCardGroupsUpdate(GroupName="Grupo Modificado")
    updated = update_creditcardgroups(
        db_session, obj.CreditCardGroupID, update)
    assert updated.GroupName == "Grupo Modificado"
    # Eliminar
    deleted = delete_creditcardgroups(db_session, obj.CreditCardGroupID)
    assert deleted.CreditCardGroupID == obj.CreditCardGroupID
    assert all(o.CreditCardGroupID !=
               obj.CreditCardGroupID for o in get_creditcardgroups(db_session))
