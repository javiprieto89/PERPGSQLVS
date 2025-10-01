import uuid
import decimal
import pytest
from app.graphql.crud.temporderdetails import (
    create_temporderdetails,
    get_temporderdetails,
    update_temporderdetails,
    delete_temporderdetails,
    get_temporderdetails_by_session,
)


class _TempOrderDetailsCreateLike(dict):
    """Objeto simple para simular un input create; CRUD acepta dict/dataclass."""


@pytest.mark.usefixtures("order_base_dependencies")
def test_create_get_update_delete_temporderdetails(db_session, order_base_dependencies):
    deps = order_base_dependencies
    session_id = str(uuid.uuid4())
    payload = _TempOrderDetailsCreateLike(
        CompanyID=deps["CompanyID"],
        BranchID=deps["BranchID"],
        UserID=deps["UserID"],
        OrderSessionID=session_id,  # Forzamos el session para validar consultas
        ItemID=deps["ItemID"],
        Quantity=1,
        WarehouseID=deps["WarehouseID"],
        PriceListID=deps["PriceListID"],
        UnitPrice=decimal.Decimal("100.00"),
        Description="Item temporal",
    )
    obj = create_temporderdetails(db_session, payload)
    assert obj.Quantity == 1
    assert str(obj.OrderSessionID) == session_id

    # Obtener por sesión
    session_items = get_temporderdetails_by_session(db_session, session_id)
    assert any(i.ItemID == deps["ItemID"] for i in session_items)

    # Actualizar cantidad usando session + item
    update_payload = {"Quantity": 3}
    updated = update_temporderdetails(db_session, session_id, deps["ItemID"], update_payload)
    assert updated is not None
    assert updated.Quantity == 3

    # Eliminar
    deleted = delete_temporderdetails(db_session, session_id, deps["ItemID"])
    assert deleted is not None
    remaining = get_temporderdetails_by_session(db_session, session_id)
    assert not any(i.ItemID == deps["ItemID"] for i in remaining)