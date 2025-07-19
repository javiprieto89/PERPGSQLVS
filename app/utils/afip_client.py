# app/utils/afip_client.py
"""Funciones de integración con AFIP usando la librería afip.py."""
import json
import os
import afip

# Instancia global de la librería AFIP.
# Las credenciales se obtienen de variables de entorno para permitir
# configuraciones flexibles en desarrollo y producción.
_client = afip.Afip(
    {
        "CUIT": int(os.getenv("AFIP_CUIT", "0")),
        "cert": os.getenv("AFIP_CERT"),
        "key": os.getenv("AFIP_KEY"),
        "access_token": os.getenv("AFIP_ACCESS_TOKEN"),
        "production": os.getenv("AFIP_PRODUCTION", "false").lower() == "true",
    }
)


def _ws(service: str):
    """Crea un cliente WebService para el servicio indicado."""
    return _client.webService(service)


def get_ultimo_comprobante(pto_vta: int, cbte_tipo: int) -> int | None:
    """Obtiene el número del último comprobante autorizado."""
    ws = _ws("wsfe")
    ta = ws.getTokenAuthorization()
    data = {
        "Auth": {
            "Token": ta["token"],
            "Sign": ta["sign"],
            "Cuit": _client.CUIT,
        },
        "PtoVta": pto_vta,
        "CbteTipo": cbte_tipo,
    }
    res = ws.executeRequest("FECompUltimoAutorizado", data)
    return res.get("CbteNro")


def constatar_comprobante(cmp_req: dict) -> dict:
    """Confronta un comprobante contra AFIP.

    El parámetro ``cmp_req`` debe contener los campos requeridos por el servicio
    ``wscdc``.
    """
    ws = _ws("wscdc")
    ta = ws.getTokenAuthorization()
    data = {
        "Auth": {
            "Token": ta["token"],
            "Sign": ta["sign"],
            "Cuit": _client.CUIT,
        },
        "CmpReq": cmp_req,
    }
    res = ws.executeRequest("ComprobanteConstatar", data)
    return json.loads(json.dumps(res))
