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
    data = UserAccessCreate(UserID=1, CompanyID=1, BranchID=1, RoleID=1)
    obj = create_useraccess(db_session, data)
    assert obj.BranchID == 1
    # Obtener
    all_objs = get_useraccess(db_session)
    assert any(
        o.UserID == obj.UserID
        and o.CompanyID == obj.CompanyID
        and o.BranchID == obj.BranchID
        and o.RoleID == obj.RoleID
        for o in all_objs
    )
    # Actualizar
    update = UserAccessUpdate(BranchID=2)
    updated = update_useraccess(
        db_session,
        obj.UserID,
        obj.CompanyID,
        obj.BranchID,
        obj.RoleID,
        update,
    )
    assert updated.BranchID == 2
    # Eliminar
    deleted = delete_useraccess(
        db_session,
        updated.UserID,
        updated.CompanyID,
        updated.BranchID,
        updated.RoleID,
    )
    assert deleted.BranchID == 2
    assert all(
        not (
            o.UserID == obj.UserID
            and o.CompanyID == obj.CompanyID
            and o.BranchID == 2
            and o.RoleID == obj.RoleID
        )
        for o in get_useraccess(db_session)
    )
