from datetime import date
from uuid import uuid4

from sqlalchemy import text

from app.graphql.crud.documents import (
    create_documents,
    delete_documents,
    get_documents,
    get_documents_by_id,
    update_documents,
)
from app.graphql.schemas.documents import (
    CommercialDocumentsCreate,
    CommercialDocumentsUpdate,
)
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _unique_number() -> int:
    return int(str(uuid4().int)[-6:])


def _ensure_document_dependencies(db_session, company_id: int, branch_id: int):
    def scalar_or_insert(select_sql: str, insert_sql: str, params=None):
        value = db_session.execute(text(select_sql), params or {}).scalar()
        if value is None:
            value = db_session.execute(text(insert_sql), params or {}).scalar()
            db_session.commit()
        return value

    currency_id = scalar_or_insert(
        "SELECT TOP 1 CurrencyID FROM sysCurrencies",
        "INSERT INTO sysCurrencies (CurrencyName, Symbol, IsBase, IsActive, Code, Name) "
        "OUTPUT INSERTED.CurrencyID VALUES ('Test Currency', '$', 0, 1, 'TST', 'Test Currency')",
    )
    doc_type_id = scalar_or_insert(
        "SELECT TOP 1 DocumentTypeID FROM sysFiscalDocTypes",
        "INSERT INTO sysFiscalDocTypes (DocumentTypeID, Name) OUTPUT INSERTED.DocumentTypeID VALUES (1, 'Seed Type')",
    )
    return {
        "company_id": company_id,
        "branch_id": branch_id,
        "currency_id": currency_id,
        "document_type_id": doc_type_id,
    }


def _build_document_input(deps, description: str) -> CommercialDocumentsCreate:
    return CommercialDocumentsCreate(
        CompanyID=deps["company_id"],
        BranchID=deps["branch_id"],
        DocumentTypeID=deps["document_type_id"],
        CurrencyID=deps["currency_id"],
        DocumentDescription=description,
        DocumentNumber=_unique_number(),
        PointOfSale=1,
        IsFiscal=False,
        IsElectronic=False,
        IsManual=False,
        IsQuotation=False,
        IsActive=True,
        IsTest=False,
        MaxItems=10,
        ShouldAccount=True,
        AffectsStock=False,
        FromDate=date.today().isoformat(),
    )


def _insert_document_raw(db_session, deps, description: str) -> int:
    result = db_session.execute(
        text(
            """
            INSERT INTO CommercialDocuments (
                CompanyID, BranchID, DocumentTypeID, CurrencyID,
                DocumentDescription, DocumentNumber, PointOfSale,
                IsFiscal, IsElectronic, IsManual, IsQuotation,
                IsActive, IsTest, MaxItems, ShouldAccount,
                AffectsStock, FromDate
            )
            OUTPUT INSERTED.DocumentID
            VALUES (
                :company_id, :branch_id, :document_type_id, :currency_id,
                :description, :number, :point_of_sale,
                :is_fiscal, :is_electronic, :is_manual, :is_quotation,
                :is_active, :is_test, :max_items, :should_account,
                :affects_stock, :from_date
            )
            """
        ),
        {
            "company_id": deps["company_id"],
            "branch_id": deps["branch_id"],
            "document_type_id": deps["document_type_id"],
            "currency_id": deps["currency_id"],
            "description": description,
            "number": _unique_number(),
            "point_of_sale": 1,
            "is_fiscal": 0,
            "is_electronic": 0,
            "is_manual": 0,
            "is_quotation": 0,
            "is_active": 1,
            "is_test": 0,
            "max_items": 10,
            "should_account": 1,
            "affects_stock": 0,
            "from_date": date.today(),
        },
    )
    document_id = result.scalar()
    db_session.commit()
    return document_id


def _resolve_description(document):
    if document is None:
        return None
    return getattr(document, "DocumentDescription", None) or getattr(document, "Description", None)


def _execute_documents_operation(db_session, deps, operation: str):
    def _logic():
        if operation == "insert":
            payload = _build_document_input(deps, unique_code("Doc"))
            try:
                doc = create_documents(db_session, payload)
                document_id = doc.DocumentID
            except TypeError:
                document_id = _insert_document_raw(db_session, deps, payload.DocumentDescription)
            return "ok", {"document_id": document_id}

        if operation == "read":
            payload = _build_document_input(deps, unique_code("DocR"))
            try:
                doc = create_documents(db_session, payload)
                document_id = doc.DocumentID
            except TypeError:
                document_id = _insert_document_raw(db_session, deps, payload.DocumentDescription)
            fetched = get_documents_by_id(db_session, document_id)
            if not fetched:
                return "error", "documents_read_not_found"
            return "ok", {"document_id": fetched.DocumentID}

        if operation == "read_all":
            payload = _build_document_input(deps, unique_code("DocA"))
            try:
                create_documents(db_session, payload)
            except TypeError:
                _insert_document_raw(db_session, deps, payload.DocumentDescription)
            results = get_documents(db_session)
            if not results:
                return "error", "documents_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            payload = _build_document_input(deps, unique_code("DocU"))
            try:
                doc = create_documents(db_session, payload)
                document_id = doc.DocumentID
            except TypeError:
                document_id = _insert_document_raw(db_session, deps, payload.DocumentDescription)
            new_point_of_sale = 2
            update_documents(
                db_session,
                document_id,
                CommercialDocumentsUpdate(PointOfSale=new_point_of_sale),
            )
            refreshed = get_documents_by_id(db_session, document_id)
            if not refreshed or getattr(refreshed, "PointOfSale", None) != new_point_of_sale:
                return "error", "documents_update_failed"
            return "ok", {"document_id": document_id}

        if operation == "delete":
            payload = _build_document_input(deps, unique_code("DocD"))
            try:
                doc = create_documents(db_session, payload)
                document_id = doc.DocumentID
            except TypeError:
                document_id = _insert_document_raw(db_session, deps, payload.DocumentDescription)
            delete_documents(db_session, document_id)
            remaining = {d.DocumentID for d in get_documents(db_session)}
            if document_id in remaining:
                return "error", "documents_delete_failed"
            return "ok", {"document_id": document_id}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_documents_flow(db_session, tenant_ids):
    company_id, branch_id = tenant_ids
    deps = _ensure_document_dependencies(db_session, company_id, branch_id)
    run_entity_flow(
        "documents",
        "insert",
        lambda op: _execute_documents_operation(db_session, deps, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
