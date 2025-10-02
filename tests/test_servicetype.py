from datetime import datetime, timezone
import pytest
from app.graphql.crud.servicetype import (
    create as create_servicetype,
    get_servicetypes as get_servicetype,
    update as update_servicetype,
    delete as delete_servicetype,
)
from app.graphql.schemas.servicetype import ServiceTypeCreate, ServiceTypeUpdate


def test_create_get_update_delete_servicetype(db_session):
    # Crear
    data = ServiceTypeCreate(CompanyID=1, ServiceTypeName="Servicio Test")
    obj = create_servicetype(db_session, data)
    assert obj is not None
    obj_dict = vars(obj)
    assert obj_dict["ServiceTypeName"] == "Servicio Test"
    # Obtener
    all_objs = get_servicetype(db_session)
    obj_id = obj_dict.get("ServiceTypeID") or obj_dict.get("id")
    if obj_id is None:
        raise AssertionError("ServiceTypeID no encontrado en el objeto creado")
    obj_id = int(obj_id)
    assert any(vars(o)["ServiceTypeID"] == obj_id for o in all_objs)
    # Actualizar
    update = ServiceTypeUpdate(ServiceTypeName="Servicio Modificado")
    # update requires company_id
    updated = update_servicetype(db_session, 1, obj_id, update)
    assert updated is not None
    updated_dict = vars(updated)
    assert updated_dict["ServiceTypeName"] == "Servicio Modificado"
    # Eliminar
    deleted = delete_servicetype(db_session, 1, obj_id)
    assert deleted is not None
    deleted_dict = vars(deleted)
    assert deleted_dict["ServiceTypeID"] == obj_id
    assert all(vars(o)["ServiceTypeID"] !=
               obj_id for o in get_servicetype(db_session))
