from datetime import datetime, timezone
import pytest
from app.graphql.crud.useraccess import (
    create_useraccess,
    get_useraccess,
    update_useraccess,
    delete_useraccess,
)
from app.graphql.schemas.useraccess import UserAccessCreate, UserAccessUpdate


def test_create_get_update_delete_useraccess(db_session):
    # Crear
    # Para la prueba asumimos que existen CompanyID=1, BranchID=1, RoleID=1
    # Seleccionar un RoleID que no exista aún para evitar PK duplicada
    from sqlalchemy import text
    max_role = db_session.execute(text(
        "SELECT ISNULL(MAX(RoleID),0) FROM UserPermissions WHERE UserID=1 AND CompanyID=1 AND BranchID=1")).scalar() or 0
    new_role = int(max_role) + 1
    data = UserAccessCreate(UserID=1, CompanyID=1, BranchID=1, RoleID=new_role)
    obj = create_useraccess(db_session, data)
    assert obj.UserID == 1 and obj.CompanyID == 1
    # Obtener
    all_objs = get_useraccess(db_session)
    assert any((o.UserID, o.CompanyID, o.BranchID, o.RoleID) == (
        obj.UserID, obj.CompanyID, obj.BranchID, obj.RoleID) for o in all_objs)
    # Actualizar
    update = UserAccessUpdate(BranchID=2)
    updated = update_useraccess(
        db_session, obj.UserID, obj.CompanyID, obj.BranchID, obj.RoleID, update)
    assert updated is not None and updated.BranchID == 2
    # Eliminar
    deleted = delete_useraccess(
        db_session, obj.UserID, obj.CompanyID, obj.BranchID, obj.RoleID)
    assert deleted is not None
    assert all((o.UserID, o.CompanyID, o.BranchID, o.RoleID) != (
        obj.UserID, obj.CompanyID, obj.BranchID, obj.RoleID) for o in get_useraccess(db_session))
