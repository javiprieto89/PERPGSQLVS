import pytest
from app.graphql.crud.pricelists import create_pricelists, get_pricelists, update_pricelists, delete_pricelists
from app.graphql.schemas.pricelists import PriceListsCreate, PriceListsUpdate


def test_create_get_update_delete_pricelists(db_session):
    # Crear con campos obligatorios
    from datetime import datetime
    data = PriceListsCreate(Name="Lista Test", Description="desc",
                            IsActive=True, CreatedDate=datetime(2025, 8, 16, 0, 0, 0))
    obj = create_pricelists(db_session, data)
    assert obj is not None
    assert str(getattr(obj, 'Name', '')) == "Lista Test"
    # Obtener
    all_objs = get_pricelists(db_session)
    assert any(int(getattr(o, 'PriceListID', 0)) == int(
        getattr(obj, 'PriceListID', 0)) for o in all_objs)
    # Actualizar
    update = PriceListsUpdate(Name="Lista Modificada")
    updated = update_pricelists(db_session, int(
        getattr(obj, 'PriceListID', 0)), update)
    assert updated is not None
    assert str(getattr(updated, 'Name', '')) == "Lista Modificada"
    # Eliminar
    deleted = delete_pricelists(
        db_session, int(getattr(obj, 'PriceListID', 0)))
    assert deleted is not None
    assert int(getattr(deleted, 'PriceListID', 0)) == int(
        getattr(obj, 'PriceListID', 0))
    assert all(int(getattr(o, 'PriceListID', 0)) != int(
        getattr(obj, 'PriceListID', 0)) for o in get_pricelists(db_session))
