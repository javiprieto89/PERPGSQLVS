import pytest
from sqlalchemy import text
from sqlalchemy.exc import IntegrityError
from app.graphql.crud.suppliers import create_suppliers, get_suppliers, update_suppliers, delete_suppliers
from app.graphql.schemas.suppliers import SuppliersCreate, SuppliersUpdate


@pytest.mark.usefixtures("tenant_ids")
def test_create_get_update_delete_suppliers(db_session, tenant_ids):
    company_id, _ = tenant_ids
    # DocType mínimo
    doctype_id = db_session.execute(text('SELECT TOP 1 DocTypeID FROM SysIdentityDocTypes ORDER BY DocTypeID')).scalar()
    if not doctype_id:
        # Intentar insertar un DocType mínimo. Si otro test ya lo creó, ignorar el error de clave duplicada.
        try:
            db_session.execute(text("INSERT INTO SysIdentityDocTypes (DocTypeID, DocTypeName, IsActive) VALUES (1,'DNI',1)"))
            db_session.commit()
        except IntegrityError:
            db_session.rollback()
        finally:
            doctype_id = db_session.execute(text('SELECT TOP 1 DocTypeID FROM SysIdentityDocTypes ORDER BY DocTypeID')).scalar()

    data = SuppliersCreate(
        DocTypeID=doctype_id,
        CompanyID=company_id,
        FirstName="Proveedor Test",
        CountryID=None,
        ProvinceID=None,
        IsActive=True,
    )
    obj = create_suppliers(db_session, data)
    assert obj and obj.FirstName == "Proveedor Test"

    all_objs = get_suppliers(db_session)
    assert any(o.SupplierID == obj.SupplierID for o in all_objs)

    update = SuppliersUpdate(FirstName="Proveedor Modificado")
    updated = update_suppliers(db_session, obj.SupplierID, update)
    assert updated and updated.FirstName == "Proveedor Modificado"

    deleted = delete_suppliers(db_session, obj.SupplierID)
    assert deleted and deleted.SupplierID == obj.SupplierID
    assert all(o.SupplierID != obj.SupplierID for o in get_suppliers(db_session))