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
    assert any(o.SysUserActionID == obj.SysUserActionID for o in all_objs)
    # Actualizar
    update = SysUserActionsUpdate(ActionName="Acción Modificada")
    updated = update_sysuseractions(db_session, obj.SysUserActionID, update)
    assert updated.ActionName == "Acción Modificada"
    # Eliminar
    deleted = delete_sysuseractions(db_session, obj.SysUserActionID)
    assert deleted.SysUserActionID == obj.SysUserActionID
    assert all(o.SysUserActionID !=
               obj.SysUserActionID for o in get_sysuseractions(db_session))
