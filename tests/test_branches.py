from app.graphql.crud.branches import (
    create_branches,
    delete_branches,
    get_branches_by_company,
    get_branches_by_id,
    update_branches,
)
from app.graphql.schemas.branches import BranchesCreate, BranchesUpdate
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _execute_branches_operation(db_session, company_id: int, operation: str):
    def _logic():
        if operation == "insert":
            branch = create_branches(
                db_session,
                BranchesCreate(
                    CompanyID=company_id,
                    BranchName=unique_code("Branch"),
                ),
            )
            return "ok", {"branch_id": branch.BranchID}

        if operation == "read":
            branch = create_branches(
                db_session,
                BranchesCreate(
                    CompanyID=company_id,
                    BranchName=unique_code("BranchR"),
                ),
            )
            fetched = get_branches_by_id(db_session, company_id, branch.BranchID)
            if not fetched:
                return "error", "branches_read_not_found"
            return "ok", {"branch_id": fetched.BranchID}

        if operation == "read_all":
            create_branches(
                db_session,
                BranchesCreate(
                    CompanyID=company_id,
                    BranchName=unique_code("BranchA"),
                ),
            )
            results = get_branches_by_company(db_session, company_id)
            if not results:
                return "error", "branches_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            branch = create_branches(
                db_session,
                BranchesCreate(
                    CompanyID=company_id,
                    BranchName=unique_code("BranchU"),
                ),
            )
            new_name = unique_code("BranchU2")
            updated = update_branches(
                db_session,
                company_id,
                branch.BranchID,
                BranchesUpdate(BranchName=new_name),
            )
            if not updated or updated.BranchName != new_name:
                return "error", "branches_update_failed"
            return "ok", {"branch_id": updated.BranchID}

        if operation == "delete":
            branch = create_branches(
                db_session,
                BranchesCreate(
                    CompanyID=company_id,
                    BranchName=unique_code("BranchD"),
                ),
            )
            delete_branches(db_session, company_id, branch.BranchID)
            remaining = {
                b.BranchID for b in get_branches_by_company(db_session, company_id)
            }
            if branch.BranchID in remaining:
                return "error", "branches_delete_failed"
            return "ok", {"branch_id": branch.BranchID}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_branches_flow(db_session, tenant_ids):
    company_id, _ = tenant_ids
    run_entity_flow(
        "branches",
        "insert",
        lambda op: _execute_branches_operation(db_session, company_id, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
