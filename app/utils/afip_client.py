# app/utils/afip_client.py
"""Funciones de integración con AFIP usando la librería afip.py."""
import json
import afip


def get_ultimo_comprobante(pto_vta: int, cbte_tipo: int):
    """Obtiene el número del último comprobante autorizado."""
    ws = afip.webService("wsfe")
    ta = ws.getTokenAuthorization()
    data = {
        "Auth": {
            "Token": ta["token"],
            "Sign": ta["sign"],
            "Cuit": afip.CUIT,
        },
        "PtoVta": pto_vta,
        "CbteTipo": cbte_tipo,
    }
    res = ws.executeRequest("FECompUltimoAutorizado", data)
    return res.get("CbteNro")


def constatar_comprobante(cmp_req: dict):
    """Confronta un comprobante contra AFIP.

    El parámetro ``cmp_req`` debe contener los campos requeridos por el servicio
    ``wscdc``.
    """
    ws = afip.webService("wscdc")
    ta = ws.getTokenAuthorization()
    data = {
        "Auth": {
            "Token": ta["token"],
            "Sign": ta["sign"],
            "Cuit": afip.CUIT,
        },
        "CmpReq": cmp_req,
    }
    res = ws.executeRequest("ComprobanteConstatar", data)
    return json.loads(json.dumps(res))