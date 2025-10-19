import os
import sys
import uuid

import pytest

_DEFAULT_VALID_OPS = {"read", "read_all", "insert", "update", "delete"}
_OPERATION_ALIASES = {
    "1": "read",
    "lectura": "read",
    "read": "read",
    "2": "read_all",
    "lectura completa": "read_all",
    "read_all": "read_all",
    "3": "insert",
    "alta": "insert",
    "insert": "insert",
    "4": "update",
    "actualizar": "update",
    "update": "update",
    "5": "delete",
    "baja": "delete",
    "delete": "delete",
}


def unique_code(prefix: str) -> str:
    return f"{prefix}{uuid.uuid4().hex[:8].upper()}"


def _normalize_op(raw_choice: str):
    if not raw_choice:
        return None
    return _OPERATION_ALIASES.get(raw_choice.strip().lower(), raw_choice.strip().lower())


def prompt_operation(entity: str, default_op: str, valid_ops=None):
    valid_ops = set(valid_ops or _DEFAULT_VALID_OPS)
    if default_op not in valid_ops:
        valid_ops.add(default_op)

    env_key = f"{entity.upper()}_TEST_OP"
    env_choice = os.getenv(env_key)
    op = _normalize_op(env_choice)
    if op in valid_ops:
        return op

    if not sys.stdin or not sys.stdin.isatty():
        return default_op

    prompt = (
        f"Seleccioná la operación para {entity} "
        "(1=lectura, 2=lectura completa, 3=insert, 4=update, 5=delete)"
        f" [{default_op}]: "
    )
    try:
        raw_choice = input(prompt)
    except (EOFError, OSError):
        return default_op

    op = _normalize_op(raw_choice) or default_op
    return op if op in valid_ops else default_op


def finish_operation(status: str, payload_or_error):
    if status == "ok":
        print("ok")
        return
    print(payload_or_error)
    pytest.fail(str(payload_or_error))


def run_entity_flow(entity: str, default_op: str, executor, valid_ops=None):
    operation = prompt_operation(entity, default_op, valid_ops=valid_ops)
    status, payload = executor(operation)
    finish_operation(status, payload)


def safe_db_call(db_session, callback):
    try:
        return callback()
    except Exception as exc:  # pragma: no cover - defensive
        db_session.rollback()
        return "error", f"{type(exc).__name__}:{exc}"
