import pytest
from app.graphql.crud.suppliers import create_suppliers, get_suppliers, update_suppliers, delete_suppliers
from app.graphql.schemas.suppliers import SuppliersCreate, SuppliersUpdate


def test_create_get_update_delete_suppliers(db_session):
    from sqlalchemy import text
    # Buscar FKs reales
    doctype_id = db_session.execute(
        text('SELECT TOP 1 DocTypeID FROM SysDocTypes')).scalar() or 1
    company_id = db_session.execute(
        text('SELECT TOP 1 CompanyID FROM CompanyData')).scalar() or 1
    branch_id = db_session.execute(
        text('SELECT TOP 1 BranchID FROM Branches')).scalar() or 1
    country_id = db_session.execute(
        text('SELECT TOP 1 CountryID FROM Countries')).scalar() or 1
    province_id = db_session.execute(
        text('SELECT TOP 1 ProvinceID FROM Provinces')).scalar() or 1
    # Crear
    data = SuppliersCreate(DocTypeID=doctype_id, CompanyID=company_id, BranchID=branch_id,
                           FirstName="Proveedor Test", CountryID=country_id, ProvinceID=province_id)
    obj = create_suppliers(db_session, data)
    assert obj is not None
    obj_dict = vars(obj)
    assert obj_dict["FirstName"] == "Proveedor Test" and obj_dict["DocTypeID"] == doctype_id
    # Obtener
    all_objs = get_suppliers(db_session)
    obj_id = obj_dict.get("SupplierID") or obj_dict.get("id")
    if obj_id is None:
        raise AssertionError("SupplierID no encontrado en el objeto creado")
    obj_id = int(obj_id)
    assert any(vars(o)["SupplierID"] == obj_id for o in all_objs)
    # Actualizar
    update = SuppliersUpdate(FirstName="Proveedor Modificado")
    updated = update_suppliers(db_session, obj_id, update)
    assert updated is not None
    updated_dict = vars(updated)
    assert updated_dict["FirstName"] == "Proveedor Modificado"
    # Eliminar
    deleted = delete_suppliers(db_session, obj_id)
    assert deleted is not None
    deleted_dict = vars(deleted)
    assert deleted_dict["SupplierID"] == obj_id
    assert all(vars(o)["SupplierID"] !=
               obj_id for o in get_suppliers(db_session))
