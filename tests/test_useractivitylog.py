from datetime import datetime, timezone
import pytest
from app.graphql.crud.useractivitylog import create_useractivitylog, get_useractivitylog, update_useractivitylog, delete_useractivitylog
from app.graphql.schemas.useractivitylog import UserActivityLogCreate, UserActivityLogUpdate


def test_create_get_update_delete_useractivitylog(db_session):
    # Crear
    data = UserActivityLogCreate(UserID=1, Action="Login")
    obj = create_useractivitylog(db_session, data)
    assert obj.Action == "Login"
    # Obtener
    all_objs = get_useractivitylog(db_session)
    assert any(o.UserActivityLogID == obj.UserActivityLogID for o in all_objs)
    # Actualizar
    update = UserActivityLogUpdate(Action="Logout")
    updated = update_useractivitylog(db_session, obj.UserActivityLogID, update)
    assert updated.Action == "Logout"
    # Eliminar
    deleted = delete_useractivitylog(db_session, obj.UserActivityLogID)
    assert deleted.UserActivityLogID == obj.UserActivityLogID
    assert all(o.UserActivityLogID !=
               obj.UserActivityLogID for o in get_useractivitylog(db_session))