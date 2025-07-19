# app/graphql/resolvers/afip.py
import json
import strawberry
from strawberry.types import Info
from app.utils.afip_client import get_ultimo_comprobante, constatar_comprobante
from app.graphql.schemas.afip import VoucherRequest, VoucherInfo


@strawberry.type
class AfipQuery:
    @strawberry.field
    def ultimo_comprobante(self, info: Info, pto_vta: int, cbte_tipo: int) -> int:
        """Devuelve el último número de comprobante autorizado."""
        nro = get_ultimo_comprobante(pto_vta, cbte_tipo)
        return nro or 0

    @strawberry.field
    def informacion_comprobante(self, info: Info, data: VoucherRequest) -> VoucherInfo:
        """Consulta la información de un comprobante en AFIP."""
        cmp_req = data.__dict__.copy()
        if isinstance(cmp_req.get("CuitEmisor"), str):
            try:
                cmp_req["CuitEmisor"] = int(cmp_req["CuitEmisor"])
            except ValueError:
                pass
        res = constatar_comprobante(cmp_req)
        return VoucherInfo(raw=json.dumps(res))