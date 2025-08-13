import pytest
from app.graphql.crud.useraccess import create_useraccess, get_useraccess, update_useraccess, delete_useraccess
from app.graphql.schemas.useraccess import UserAccessCreate, UserAccessUpdate


def test_create_get_update_delete_useraccess(db_session):
    # Crear
    data = UserAccessCreate(UserID=1, BranchID=1)
    obj = create_useraccess(db_session, data)
    assert obj.UserID == 1
    # Obtener
    all_objs = get_useraccess(db_session)
    assert any(o.UserAccessID == obj.UserAccessID for o in all_objs)
    # Actualizar
    update = UserAccessUpdate(BranchID=2)
    updated = update_useraccess(db_session, obj.UserAccessID, update)
    assert updated.BranchID == 2
    # Eliminar
    deleted = delete_useraccess(db_session, obj.UserAccessID)
    assert deleted.UserAccessID == obj.UserAccessID
    assert all(o.UserAccessID !=
               obj.UserAccessID for o in get_useraccess(db_session))
