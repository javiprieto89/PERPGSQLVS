import pytest
from app.graphql.crud.sysdoctypes import create_sysdoctypes, get_sysdoctypes, update_sysdoctypes, delete_sysdoctypes
from app.graphql.schemas.sysdoctypes import SysDocTypesCreate, SysDocTypesUpdate


def test_create_get_update_delete_sysdoctypes(db_session):
    # Crear
    data = SysDocTypesCreate(Name="TipoDoc Test", IsActive=True)
    obj = create_sysdoctypes(db_session, data)
    assert obj is not None
    obj_dict = vars(obj)
    assert obj_dict["Name"] == "TipoDoc Test" and obj_dict["IsActive"] is True
    # Obtener
    all_objs = get_sysdoctypes(db_session)
    obj_id = obj_dict.get("DocTypeID") or obj_dict.get("id")
    if obj_id is None:
        raise AssertionError("DocTypeID no encontrado en el objeto creado")
    obj_id = int(obj_id)
    assert any(vars(o)["DocTypeID"] == obj_id for o in all_objs)
    # Actualizar
    update = SysDocTypesUpdate(Name="TipoDoc Modificado")
    updated = update_sysdoctypes(db_session, obj_id, update)
    assert updated is not None
    updated_dict = vars(updated)
    assert updated_dict["Name"] == "TipoDoc Modificado"
    # Eliminar
    deleted = delete_sysdoctypes(db_session, obj_id)
    assert deleted is not None
    deleted_dict = vars(deleted)
    assert deleted_dict["DocTypeID"] == obj_id
    assert all(vars(o)["DocTypeID"] !=
               obj_id for o in get_sysdoctypes(db_session))
