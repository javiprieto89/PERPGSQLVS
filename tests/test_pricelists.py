import pytest
from app.graphql.crud.pricelists import create_pricelists, get_pricelists, update_pricelists, delete_pricelists
from app.graphql.schemas.pricelists import PriceListsCreate, PriceListsUpdate


def test_create_get_update_delete_pricelists(db_session):
    # Crear
    data = PriceListsCreate(ListName="Lista Test")
    obj = create_pricelists(db_session, data)
    assert obj.ListName == "Lista Test"
    # Obtener
    all_objs = get_pricelists(db_session)
    assert any(o.PriceListID == obj.PriceListID for o in all_objs)
    # Actualizar
    update = PriceListsUpdate(ListName="Lista Modificada")
    updated = update_pricelists(db_session, obj.PriceListID, update)
    assert updated.ListName == "Lista Modificada"
    # Eliminar
    deleted = delete_pricelists(db_session, obj.PriceListID)
    assert deleted.PriceListID == obj.PriceListID
    assert all(o.PriceListID !=
               obj.PriceListID for o in get_pricelists(db_session))
