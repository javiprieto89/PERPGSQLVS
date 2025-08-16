import pytest
from app.graphql.crud.documents import create_documents, get_documents, update_documents, delete_documents
from app.graphql.schemas.documents import DocumentsCreate, DocumentsUpdate


def test_create_get_update_delete_documents(db_session):
    # Crear
    data = DocumentsCreate(DocumentName="Documento Test")
    obj = create_documents(db_session, data)
    assert obj.DocumentName == "Documento Test"
    # Obtener
    all_objs = get_documents(db_session)
    assert any(o.DocumentID == obj.DocumentID for o in all_objs)
    # Actualizar
    update = DocumentsUpdate(DocumentName="Documento Modificado")
    updated = update_documents(db_session, obj.DocumentID, update)
    assert updated.DocumentName == "Documento Modificado"
    # Eliminar
    deleted = delete_documents(db_session, obj.DocumentID)
    assert deleted.DocumentID == obj.DocumentID
    assert all(o.DocumentID != obj.DocumentID for o in get_documents(db_session))
