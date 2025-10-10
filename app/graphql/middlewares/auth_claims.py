"""Extensión y utilidades de inyección de claims"""
from __future__ import annotations

import inspect
from typing import Any, Dict, Iterable

from graphql import GraphQLError, GraphQLNonNull
from strawberry.types import Info
from strawberry.extensions import SchemaExtension

from app.graphql.context import GraphQLRequestContext

# Alias de argumentos que deben obtenerse desde el token.
#
CLAIM_ARGUMENT_NAMES: Dict[str, Iterable[str]] = {
    "company_id": ["companyID", "companyId", "company_id"],
    "branch_id": ["branchID", "branchId", "branch_id"],
    "role_id": ["roleID", "roleId", "role_id"],
}

# Versión aplanada para búsquedas rápidas.
ARGUMENT_TO_CONTEXT_ATTR = {
    name.lower(): attr
    for attr, names in CLAIM_ARGUMENT_NAMES.items()
    for name in names
}

# Texto para mensajes de error legibles
CLAIM_HUMAN_LABEL = {
    "company_id": "CompanyID",
    "branch_id": "BranchID",
    "role_id": "RoleID",
}

PUBLIC_FIELDS = {"login"}


class AuthClaimsExtension(SchemaExtension):
    """Extensión para inyectar claims JWT en argumentos de resolvers."""

    def resolve(self, _next, root, info: Info, *args, **kwargs):  # type: ignore[override]
        field_name = getattr(info, "field_name", "")
        context = info.context

        if getattr(context, "allow_unauthenticated", False) or field_name in PUBLIC_FIELDS:
            return _next(root, info, *args, **kwargs)

        if not isinstance(context, GraphQLRequestContext) or not context.token_payload:
            raise GraphQLError("Autenticación requerida")

        for attr, aliases in CLAIM_ARGUMENT_NAMES.items():
            claim_value = getattr(context, attr)
            for alias in aliases:
                if alias not in kwargs:
                    continue
                current_value = kwargs.get(alias)
                if current_value is not None:
                    break
                if claim_value is None:
                    label = CLAIM_HUMAN_LABEL.get(attr, attr)
                    raise GraphQLError(f"Claim requerido ausente en el token: {label}")
                kwargs[alias] = claim_value
                break

        result = _next(root, info, *args, **kwargs)
        if inspect.isawaitable(result):
            return self.ensure_async(result)
        return result

    @staticmethod
    async def ensure_async(result):
        return await result


def relax_auth_arguments(strawberry_schema) -> None:
    """Hace opcionales los argumentos que se rellenan vía claims."""
    graphql_schema = getattr(strawberry_schema, "_schema", None)
    if graphql_schema is None:
        return

    for gql_type in graphql_schema.type_map.values():
        if getattr(gql_type, "fields", None) is None:
            continue

        for field in gql_type.fields.values():
            args_dict = getattr(field, "args", None)
            if not args_dict:
                continue
            for arg_name, argument in args_dict.items():
                normalized = arg_name.lower()
                if normalized not in ARGUMENT_TO_CONTEXT_ATTR:
                    continue
                if isinstance(argument.type, GraphQLNonNull):
                    argument.type = argument.type.of_type
                argument.default_value = None
