from datetime import datetime, timezone
import pytest
from app.graphql.crud.documents import create_documents, get_documents, update_documents, delete_documents
from app.graphql.schemas.documents import CommercialDocumentsCreate, CommercialDocumentsUpdate


def test_create_get_update_delete_documents(db_session):
    # Crear
    data = CommercialDocumentsCreate(CompanyID=1, BranchID=1, DocumentTypeID=1, CurrencyID=1, DocumentDescription="Documento Test", DocumentNumber=1, PointOfSale=1, IsFiscal=False, IsElectronic=False, IsManual=False, IsQuotation=False, IsActive=True, IsTest=False, MaxItems=10, ShouldAccount=True, AffectsStock=False, FromDate="2025-01-01")
    obj = create_documents(db_session, data)
    assert obj.DocumentDescription == "Documento Test"
    # Obtener
    all_objs = get_documents(db_session)
    assert any(o.DocumentID == obj.DocumentID for o in all_objs)
    # Actualizar
    update = CommercialDocumentsUpdate(DocumentDescription="Documento Modificado")
    updated = update_documents(db_session, obj.DocumentID, update)
    assert updated.DocumentDescription == "Documento Modificado"
    # Eliminar
    deleted = delete_documents(db_session, obj.DocumentID)
    assert deleted.DocumentID == obj.DocumentID
    assert all(o.DocumentID != obj.DocumentID for o in get_documents(db_session))