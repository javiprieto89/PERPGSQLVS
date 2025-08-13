import pytest
from app.graphql.crud.transactions import create_transactions, get_transactions, update_transactions, delete_transactions
from app.graphql.schemas.transactions import TransactionsCreate, TransactionsUpdate


def test_create_get_update_delete_transactions(db_session):
    # Crear
    data = TransactionsCreate(Amount=100.0)
    obj = create_transactions(db_session, data)
    assert obj.Amount == 100.0
    # Obtener
    all_objs = get_transactions(db_session)
    assert any(o.TransactionID == obj.TransactionID for o in all_objs)
    # Actualizar
    update = TransactionsUpdate(Amount=200.0)
    updated = update_transactions(db_session, obj.TransactionID, update)
    assert updated.Amount == 200.0
    # Eliminar
    deleted = delete_transactions(db_session, obj.TransactionID)
    assert deleted.TransactionID == obj.TransactionID
    assert all(o.TransactionID !=
               obj.TransactionID for o in get_transactions(db_session))
