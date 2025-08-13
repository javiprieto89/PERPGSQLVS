import pytest
from app.graphql.crud.taxes import create_taxes, get_taxes, update_taxes, delete_taxes
from app.graphql.schemas.taxes import TaxesCreate, TaxesUpdate


def test_create_get_update_delete_taxes(db_session):
    # Crear
    data = TaxesCreate(TaxName="IVA", TaxPercent=21.0)
    obj = create_taxes(db_session, data)
    assert obj.TaxName == "IVA"
    # Obtener
    all_taxes = get_taxes(db_session)
    assert any(t.TaxID == obj.TaxID for t in all_taxes)
    # Actualizar
    update = TaxesUpdate(TaxName="IVA Modificado")
    updated = update_taxes(db_session, obj.TaxID, update)
    assert updated.TaxName == "IVA Modificado"
    # Eliminar
    deleted = delete_taxes(db_session, obj.TaxID)
    assert deleted.TaxID == obj.TaxID
    assert get_taxes(db_session) == []
