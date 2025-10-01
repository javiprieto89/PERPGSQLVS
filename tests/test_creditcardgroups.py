from datetime import datetime, timezone
import pytest
from app.graphql.crud.creditcardgroups import (
    create_creditcardgroup,
    get_creditcardgroups,
    update_creditcardgroup,
    delete_creditcardgroup,
)
from app.graphql.schemas.creditcardgroups import CreditCardGroupCreate, CreditCardGroupUpdate


def test_create_get_update_delete_creditcardgroups(db_session):
    # Crear
    data = CreditCardGroupCreate(GroupName="Grupo Test")
    obj = create_creditcardgroup(db_session, data)
    assert obj.GroupName == "Grupo Test"
    # Obtener
    all_objs = get_creditcardgroups(db_session)
    assert any(o.CreditCardGroupID == obj.CreditCardGroupID for o in all_objs)
    # Actualizar
    update = CreditCardGroupUpdate(GroupName="Grupo Modificado")
    updated = update_creditcardgroup(
        db_session, obj.CreditCardGroupID, update)
    assert updated.GroupName == "Grupo Modificado"
    # Eliminar
    deleted = delete_creditcardgroup(db_session, obj.CreditCardGroupID)
    assert deleted.CreditCardGroupID == obj.CreditCardGroupID
    assert all(o.CreditCardGroupID !=
               obj.CreditCardGroupID for o in get_creditcardgroups(db_session))
