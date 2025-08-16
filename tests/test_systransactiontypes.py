import pytest
from app.graphql.crud.systransactiontypes import create_systransactiontypes, get_systransactiontypes, update_systransactiontypes, delete_systransactiontypes
from app.graphql.schemas.systransactiontypes import SysTransactionTypesCreate, SysTransactionTypesUpdate


def test_create_get_update_delete_systransactiontypes(db_session):
    # Crear
    data = SysTransactionTypesCreate(TypeName="Tipo Test")
    obj = create_systransactiontypes(db_session, data)
    assert obj.TypeName == "Tipo Test"
    # Obtener
    all_objs = get_systransactiontypes(db_session)
    assert any(o.TransactTypeID == obj.TransactTypeID for o in all_objs)
    # Actualizar
    update = SysTransactionTypesUpdate(TypeName="Tipo Modificado")
    updated = update_systransactiontypes(
        db_session, obj.TransactTypeID, update)
    assert updated.TypeName == "Tipo Modificado"
    # Eliminar
    deleted = delete_systransactiontypes(db_session, obj.TransactTypeID)
    assert deleted.TransactTypeID == obj.TransactTypeID
    assert all(
        o.TransactTypeID != obj.TransactTypeID
        for o in get_systransactiontypes(db_session)
    )
