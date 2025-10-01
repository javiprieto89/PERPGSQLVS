from datetime import datetime, timezone
import pytest
from sqlalchemy import text
from app.graphql.crud.sysidentitydoctypes import create_sysidentitydoctypes as create_sysdoctypes, get_sysidentitydoctypes as get_sysdoctypes, update_sysidentitydoctypes as update_sysdoctypes, delete_sysidentitydoctypes as delete_sysdoctypes
from app.graphql.schemas.sysidentitydoctypes import SysIdentityDocTypesCreate as SysDocTypesCreate, SysIdentityDocTypesUpdate as SysDocTypesUpdate


def test_create_get_update_delete_sysdoctypes(db_session):
    # Crear
    # Asignar DocTypeID manual si la tabla no tiene Identity
    max_id = db_session.execute(text("SELECT ISNULL(MAX(DocTypeID),0) FROM sysIdentityDocTypes")).scalar() or 0
    next_id = int(max_id) + 1
    data = SysDocTypesCreate(DocTypeID=next_id, DocTypeName="TipoDoc Test", IsActive=True)  # type: ignore
    obj = create_sysdoctypes(db_session, data)
    assert obj is not None
    obj_dict = vars(obj)
    assert obj_dict["DocTypeName"] == "TipoDoc Test" and obj_dict["IsActive"] is True
    # Obtener
    all_objs = get_sysdoctypes(db_session)
    obj_id = obj_dict.get("DocTypeID") or obj_dict.get("id")
    if obj_id is None:
        raise AssertionError("DocTypeID no encontrado en el objeto creado")
    obj_id = int(obj_id)
    assert any(vars(o)["DocTypeID"] == obj_id for o in all_objs)
    # Actualizar
    update = SysDocTypesUpdate(DocTypeName="TipoDoc Modificado")
    updated = update_sysdoctypes(db_session, obj_id, update)
    assert updated is not None
    updated_dict = vars(updated)
    assert updated_dict["DocTypeName"] == "TipoDoc Modificado"
    # Eliminar
    deleted = delete_sysdoctypes(db_session, obj_id)
    assert deleted is not None
    deleted_dict = vars(deleted)
    assert deleted_dict["DocTypeID"] == obj_id
    assert all(vars(o)["DocTypeID"] !=
               obj_id for o in get_sysdoctypes(db_session))