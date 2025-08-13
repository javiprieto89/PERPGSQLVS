import pytest
from app.graphql.crud.pricelistitems import create_pricelistitems, get_pricelistitems, update_pricelistitems, delete_pricelistitems
from app.graphql.schemas.pricelistitems import PriceListItemsCreate, PriceListItemsUpdate


def test_create_get_update_delete_pricelistitems(db_session):
    # Crear
    data = PriceListItemsCreate(Price=100.0)
    obj = create_pricelistitems(db_session, data)
    assert obj.Price == 100.0
    # Obtener
    all_objs = get_pricelistitems(db_session)
    assert any(o.PriceListItemID == obj.PriceListItemID for o in all_objs)
    # Actualizar
    update = PriceListItemsUpdate(Price=200.0)
    updated = update_pricelistitems(db_session, obj.PriceListItemID, update)
    assert updated.Price == 200.0
    # Eliminar
    deleted = delete_pricelistitems(db_session, obj.PriceListItemID)
    assert deleted.PriceListItemID == obj.PriceListItemID
    assert all(o.PriceListItemID !=
               obj.PriceListItemID for o in get_pricelistitems(db_session))
