import pytest
from app.graphql.crud.systransactiontypes import create_systransactiontypes, get_systransactiontypes, update_systransactiontypes, delete_systransactiontypes
from app.graphql.schemas.systransactiontypes import SysTransactionTypesCreate, SysTransactionTypesUpdate


def test_create_get_update_delete_systransactiontypes(db_session):
    # Crear
    data = SysTransactionTypesCreate(Name="Tipo Test")
    obj = create_systransactiontypes(db_session, data)
    assert obj.Name == "Tipo Test"
    # Obtener
    all_objs = get_systransactiontypes(db_session)
    assert any(o.SysTransactionTypeID ==
               obj.SysTransactionTypeID for o in all_objs)
    # Actualizar
    update = SysTransactionTypesUpdate(Name="Tipo Modificado")
    updated = update_systransactiontypes(
        db_session, obj.SysTransactionTypeID, update)
    assert updated.Name == "Tipo Modificado"
    # Eliminar
    deleted = delete_systransactiontypes(db_session, obj.SysTransactionTypeID)
    assert deleted.SysTransactionTypeID == obj.SysTransactionTypeID
    assert all(o.SysTransactionTypeID !=
               obj.SysTransactionTypeID for o in get_systransactiontypes(db_session))
