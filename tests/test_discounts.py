import pytest
from app.graphql.crud.discounts import create_discounts, get_discounts, update_discounts, delete_discounts
from app.graphql.schemas.discounts import DiscountsCreate, DiscountsUpdate


def test_create_get_update_delete_discounts(db_session):
    # Crear
    data = DiscountsCreate(DiscountName="Descuento Test", Percentage=10.0)
    obj = create_discounts(db_session, data)
    assert obj.DiscountName == "Descuento Test"
    # Obtener
    all_objs = get_discounts(db_session)
    assert any(o.DiscountID == obj.DiscountID for o in all_objs)
    # Actualizar
    update = DiscountsUpdate(DiscountName="Descuento Modificado")
    updated = update_discounts(db_session, obj.DiscountID, update)
    assert updated.DiscountName == "Descuento Modificado"
    # Eliminar
    deleted = delete_discounts(db_session, obj.DiscountID)
    assert deleted.DiscountID == obj.DiscountID
    assert all(o.DiscountID != obj.DiscountID for o in get_discounts(db_session))
