from datetime import datetime, timezone
import pytest
from app.graphql.crud.users import create_users, get_users, update_users, delete_users
from app.graphql.schemas.users import UsersCreate, UsersUpdate


def test_create_get_update_delete_users(db_session):
    # Crear
    data = UsersCreate(UserName="usuario_test")
    obj = create_users(db_session, data)
    assert obj.UserName == "usuario_test"
    # Obtener
    all_objs = get_users(db_session)
    assert any(o.UserID == obj.UserID for o in all_objs)
    # Actualizar
    update = UsersUpdate(UserName="usuario_modificado")
    updated = update_users(db_session, obj.UserID, update)
    assert updated.UserName == "usuario_modificado"
    # Eliminar
    deleted = delete_users(db_session, obj.UserID)
    assert deleted.UserID == obj.UserID
    assert all(o.UserID != obj.UserID for o in get_users(db_session))