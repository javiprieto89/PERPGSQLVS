import pytest
from app.graphql.crud.roles import create_roles, get_roles, update_roles, delete_roles
from app.graphql.schemas.roles import RolesCreate, RolesUpdate


def test_create_get_update_delete_roles(db_session):
    # Crear
    data = RolesCreate(RoleName="Rol Test")
    obj = create_roles(db_session, data)
    assert obj.RoleName == "Rol Test"
    # Obtener
    all_objs = get_roles(db_session)
    assert any(o.RoleID == obj.RoleID for o in all_objs)
    # Actualizar
    update = RolesUpdate(RoleName="Rol Modificado")
    updated = update_roles(db_session, obj.RoleID, update)
    assert updated.RoleName == "Rol Modificado"
    # Eliminar
    deleted = delete_roles(db_session, obj.RoleID)
    assert deleted.RoleID == obj.RoleID
    assert all(o.RoleID != obj.RoleID for o in get_roles(db_session))
