import pytest
from app.graphql.crud.servicetype import create_servicetype, get_servicetype, update_servicetype, delete_servicetype
from app.graphql.schemas.servicetype import ServiceTypeCreate, ServiceTypeUpdate


def test_create_get_update_delete_servicetype(db_session):
    # Crear
    data = ServiceTypeCreate(ServiceName="Servicio Test")
    obj = create_servicetype(db_session, data)
    assert obj.ServiceName == "Servicio Test"
    # Obtener
    all_objs = get_servicetype(db_session)
    assert any(o.ServiceTypeID == obj.ServiceTypeID for o in all_objs)
    # Actualizar
    update = ServiceTypeUpdate(ServiceName="Servicio Modificado")
    updated = update_servicetype(db_session, obj.ServiceTypeID, update)
    assert updated.ServiceName == "Servicio Modificado"
    # Eliminar
    deleted = delete_servicetype(db_session, obj.ServiceTypeID)
    assert deleted.ServiceTypeID == obj.ServiceTypeID
    assert all(o.ServiceTypeID !=
               obj.ServiceTypeID for o in get_servicetype(db_session))
