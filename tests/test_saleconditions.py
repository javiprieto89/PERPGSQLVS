import pytest
from app.graphql.crud.saleconditions import create_saleconditions, get_saleconditions, update_saleconditions, delete_saleconditions
from app.graphql.schemas.saleconditions import SaleConditionsCreate, SaleConditionsUpdate


def test_create_get_update_delete_saleconditions(db_session):
    from datetime import date
    from sqlalchemy import text
    # Buscar un CreditCardID real
    credit_card_id = db_session.execute(
        text('SELECT TOP 1 CreditCardID FROM CreditCards')).scalar() or 1
    data = SaleConditionsCreate(CreditCardID=credit_card_id, Name="Condición Test", DueDate=date(
        2025, 8, 16), Surcharge=0.0, IsActive=True)
    obj = create_saleconditions(db_session, data)
    assert obj is not None
    obj_dict = vars(obj)
    assert obj_dict["Name"] == "Condición Test" and obj_dict["CreditCardID"] == credit_card_id
    # Obtener
    all_objs = get_saleconditions(db_session)
    obj_id = obj_dict.get("SaleConditionID") or obj_dict.get("id")
    if obj_id is None:
        raise AssertionError(
            "SaleConditionID no encontrado en el objeto creado")
    obj_id = int(obj_id)
    assert any(vars(o)["SaleConditionID"] == obj_id for o in all_objs)
    # Actualizar
    update = SaleConditionsUpdate(Name="Condición Modificada")
    updated = update_saleconditions(db_session, obj_id, update)
    assert updated is not None
    updated_dict = vars(updated)
    assert updated_dict["Name"] == "Condición Modificada"
    # Eliminar
    deleted = delete_saleconditions(db_session, obj_id)
    assert deleted is not None
    deleted_dict = vars(deleted)
    assert deleted_dict["SaleConditionID"] == obj_id
    assert all(vars(o)["SaleConditionID"] !=
               obj_id for o in get_saleconditions(db_session))
