"""Utilidades de contexto GraphQL"""
from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Optional, Union

from starlette.requests import Request
from starlette.websockets import WebSocket


@dataclass(slots=True)
class GraphQLRequestContext:
    """Contexto accesible en cada resolver"""

    request: Union[Request, WebSocket]
    user: Any
    token: Optional[str]
    token_payload: Optional[dict[str, Any]]
    allow_unauthenticated: bool = False

    @property
    def company_id(self) -> Optional[int]:
        if not self.token_payload:
            return None
        return self.token_payload.get("CompanyID")

    @property
    def branch_id(self) -> Optional[int]:
        if not self.token_payload:
            return None
        return self.token_payload.get("BranchID")

    @property
    def role_id(self) -> Optional[int]:
        if not self.token_payload:
            return None
        return self.token_payload.get("RoleID")

    def get_claim(self, key: str, default: Any = None) -> Any:
        if not self.token_payload:
            return default
        return self.token_payload.get(key, default)
