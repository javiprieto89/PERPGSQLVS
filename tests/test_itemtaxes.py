import pytest
from app.graphql.crud.itemtaxes import create_itemtaxes, get_itemtaxes, update_itemtaxes, delete_itemtaxes
from app.graphql.schemas.itemtaxes import ItemTaxesCreate, ItemTaxesUpdate


def test_create_get_update_delete_itemtaxes(db_session):
    # Crear
    data = ItemTaxesCreate(CompanyID=1, BranchID=1, ItemID=1, TaxID=1)
    obj = create_itemtaxes(db_session, data)
    assert obj.ItemID == 1
    # Obtener
    all_objs = get_itemtaxes(db_session)
    assert any(o.ItemTaxID == obj.ItemTaxID for o in all_objs)
    # Actualizar
    update = ItemTaxesUpdate(ItemID=2)
    updated = update_itemtaxes(db_session, obj.ItemTaxID, update)
    assert updated.ItemID == 2
    # Eliminar
    deleted = delete_itemtaxes(db_session, obj.ItemTaxID)
    assert deleted.ItemTaxID == obj.ItemTaxID
    assert all(o.ItemTaxID != obj.ItemTaxID for o in get_itemtaxes(db_session))
