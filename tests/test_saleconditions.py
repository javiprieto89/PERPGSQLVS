import pytest
from app.graphql.crud.saleconditions import create_saleconditions, get_saleconditions, update_saleconditions, delete_saleconditions
from app.graphql.schemas.saleconditions import SaleConditionsCreate, SaleConditionsUpdate


def test_create_get_update_delete_saleconditions(db_session):
    # Crear
    data = SaleConditionsCreate(ConditionName="Condición Test")
    obj = create_saleconditions(db_session, data)
    assert obj.ConditionName == "Condición Test"
    # Obtener
    all_objs = get_saleconditions(db_session)
    assert any(o.SaleConditionID == obj.SaleConditionID for o in all_objs)
    # Actualizar
    update = SaleConditionsUpdate(ConditionName="Condición Modificada")
    updated = update_saleconditions(db_session, obj.SaleConditionID, update)
    assert updated.ConditionName == "Condición Modificada"
    # Eliminar
    deleted = delete_saleconditions(db_session, obj.SaleConditionID)
    assert deleted.SaleConditionID == obj.SaleConditionID
    assert all(o.SaleConditionID !=
               obj.SaleConditionID for o in get_saleconditions(db_session))
