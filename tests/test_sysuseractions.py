import pytest
from app.graphql.crud.sysuseractions import create_sysuseractions, get_sysuseractions, update_sysuseractions, delete_sysuseractions
from app.graphql.schemas.sysuseractions import SysUserActionsCreate, SysUserActionsUpdate


def test_create_get_update_delete_sysuseractions(db_session):
    # Crear
    data = SysUserActionsCreate(ActionName="Acción Test")
    obj = create_sysuseractions(db_session, data)
    assert obj.ActionName == "Acción Test"
    # Obtener
    all_objs = get_sysuseractions(db_session)
    assert any(o.UserActionID == obj.UserActionID for o in all_objs)
    # Actualizar
    update = SysUserActionsUpdate(ActionName="Acción Modificada")
    updated = update_sysuseractions(db_session, obj.UserActionID, update)
    assert updated.ActionName == "Acción Modificada"
    # Eliminar
    deleted = delete_sysuseractions(db_session, obj.UserActionID)
    assert deleted.UserActionID == obj.UserActionID
    assert all(
        o.UserActionID != obj.UserActionID
        for o in get_sysuseractions(db_session)
    )
