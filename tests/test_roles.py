from datetime import datetime, timezone
import pytest
from app.graphql.crud.roles import create_roles, get_roles, update_roles, delete_roles
from app.graphql.schemas.roles import RolesCreate, RolesUpdate


def test_create_get_update_delete_roles(db_session):
    # Crear con campo obligatorio
    data = RolesCreate(RoleName="Rol Test")
    obj = create_roles(db_session, data)
    assert obj is not None
    assert str(getattr(obj, 'RoleName', '')) == "Rol Test"
    # Obtener
    all_objs = get_roles(db_session)
    assert any(int(getattr(o, 'RoleID', 0)) == int(
        getattr(obj, 'RoleID', 0)) for o in all_objs)
    # Actualizar
    update = RolesUpdate(RoleName="Rol Modificado")
    updated = update_roles(db_session, int(getattr(obj, 'RoleID', 0)), update)
    assert updated is not None
    assert str(getattr(updated, 'RoleName', '')) == "Rol Modificado"
    # Eliminar
    deleted = delete_roles(db_session, int(getattr(obj, 'RoleID', 0)))
    assert deleted is not None
    assert int(getattr(deleted, 'RoleID', 0)) == int(getattr(obj, 'RoleID', 0))
    assert all(int(getattr(o, 'RoleID', 0)) != int(
        getattr(obj, 'RoleID', 0)) for o in get_roles(db_session))