# app/utils/afip_client.py
"""Funciones de integración con AFIP usando la librería afip.py simplificada."""
import json
import os
import logging
from typing import Dict, Any, Optional
import afip

# Configurar logging
logger = logging.getLogger(__name__)

# Configuración AFIP desde variables de entorno
AFIP_CONFIG = {
    "CUIT": int(os.getenv("AFIP_CUIT", "20409378472")),  # CUIT por defecto para pruebas
    "production": os.getenv("AFIP_PRODUCTION", "false").lower() == "true",
}

# Solo agregar certificados si están configurados
cert_path = os.getenv("AFIP_CERT_PATH")
key_path = os.getenv("AFIP_KEY_PATH")

if cert_path and key_path and os.path.exists(cert_path) and os.path.exists(key_path):
    AFIP_CONFIG["cert"] = cert_path
    AFIP_CONFIG["key"] = key_path
    logger.info("Usando certificados AFIP configurados")
else:
    logger.info(f"Modo desarrollo sin certificado - CUIT: {AFIP_CONFIG['CUIT']}")

# Instancia global del cliente AFIP
_afip_client = afip.Afip(AFIP_CONFIG)

def get_ultimo_comprobante(pto_vta: int, cbte_tipo: int) -> Optional[int]:
    """
    Obtiene el número del último comprobante autorizado usando la librería.
    
    Args:
        pto_vta: Punto de venta
        cbte_tipo: Tipo de comprobante
        
    Returns:
        Número del último comprobante o None si hay error
    """
    try:
        # Usar método directo de la librería
        last_voucher = _afip_client.ElectronicBilling.getLastVoucher(pto_vta, cbte_tipo)
        
        logger.info(f"Último comprobante obtenido: PtoVta={pto_vta}, CbteTipo={cbte_tipo}, Resultado={last_voucher}")
        
        return last_voucher
        
    except Exception as e:
        logger.error(f"Error obteniendo último comprobante: {str(e)}")
        return None

def constatar_comprobante(cmp_req: Dict[str, Any]) -> Dict[str, Any]:
    """
    Confronta un comprobante contra AFIP usando la librería.
    
    Args:
        cmp_req: Datos del comprobante a consultar
        
    Returns:
        Respuesta de AFIP con información del comprobante
        
    Raises:
        Exception: Si hay error en la consulta
    """
    try:
        # Crear instancia del servicio wscdc según el artículo
        ws = _afip_client.webService("wscdc")
        
        # Obtener el token de autorización
        ta = ws.getTokenAuthorization()
        
        # Preparar los datos según el formato del artículo
        data = {
            "Auth": { 
                "Token": ta["token"],
                "Sign": ta["sign"],
                "Cuit": _afip_client.CUIT
            },
            "CmpReq": cmp_req
        }
        
        # Ejecutar la solicitud
        response = ws.executeRequest("ComprobanteConstatar", data)
        
        logger.info(f"Comprobante constatado exitosamente: {cmp_req}")
        
        return response
        
    except Exception as e:
        logger.error(f"Error constatando comprobante: {str(e)}")
        raise Exception(f"Error consultando comprobante: {str(e)}")

def informacion_rapida_comprobante(cmp_req: Dict[str, Any]) -> Dict[str, Any]:
    """
    Confronta un comprobante contra AFIP usando la librería.
    
    Args:
        cmp_req: Datos del comprobante a consultar
        
    Returns:
        Respuesta de AFIP con información del comprobante
        
    Raises:
        Exception: Si hay error en la consulta
    """
    try:
        # Numero de punto de venta
        CbteNro = 1

        # Punto de venta
        PtoVta = 6 

        # Tipo de comprobante
        CbteTipo = 1 # 1 = Factura A                
        
        info_voucher = _afip_client.ElectronicBilling.getVoucherInfo(CbteNro, PtoVta, CbteTipo)        
        
        logger.info(f"Comprobante constatado exitosamente: {cmp_req}")
        
        return info_voucher
        
    except Exception as e:
        logger.error(f"Error constatando comprobante: {str(e)}")
        raise Exception(f"Error consultando comprobante: {str(e)}")

def test_afip_connection() -> Dict[str, Any]:
    """
    Función de prueba para verificar la conexión con AFIP.
    
    Returns:
        Resultado de la prueba
    """
    try:
        # Probar conexión obteniendo el último comprobante
        test_result = get_ultimo_comprobante(1, 6)  # Punto 1, Factura B
        
        return {
            "success": True,
            "message": "Conexión AFIP exitosa",
            "test_result": f"Último comprobante PtoVta=1, Tipo=6: {test_result}",
            "cuit": AFIP_CONFIG["CUIT"]
        }
        
    except Exception as e:
        return {
            "success": False,
            "message": f"Error de conexión: {str(e)}"
        }

# Datos de prueba que devuelven respuestas válidas según afipsdk.com
def get_test_voucher_data() -> Dict[str, Any]:
    """
    Devuelve datos de prueba que garantizan respuesta válida de AFIP.
    Basado en: https://afipsdk.com/blog/realizar-constatacion-de-comprobantes-de-arca-en-python/
    """
    return {
        "CbteModo": "CAE",
        "CuitEmisor": 20111111112,  # CUIT que devuelve respuesta válida
        "PtoVta": 1,
        "CbteTipo": 1,  # Factura A
        "CbteNro": 1,
        "CbteFch": 20170802,  # Fecha específica que funciona
        "ImpTotal": 100.0,
        "CodAutorizacion": "67123456789012",  # CAE válido para testing
        "DocTipoReceptor": "80",  # CUIT
        "DocNroReceptor": "20111111112"
    }

def get_alternative_test_data() -> Dict[str, Any]:
    """
    Datos alternativos para testing - Factura B.
    """
    return {
        "CbteModo": "CAE",
        "CuitEmisor": 20111111112,
        "PtoVta": 1,
        "CbteTipo": 6,  # Factura B
        "CbteNro": 2,
        "CbteFch": 20170802,
        "ImpTotal": 150.0,
        "CodAutorizacion": "67123456789013",
        "DocTipoReceptor": "96",  # DNI
        "DocNroReceptor": "12345678"
    }

# Funciones auxiliares para información de la librería
def get_voucher_types() -> Dict[int, str]:
    """
    Devuelve los tipos de comprobante más comunes.
    """
    return {
        1: "Factura A",
        6: "Factura B", 
        11: "Factura C",
        51: "Factura M",
        3: "Nota de Crédito A",
        8: "Nota de Crédito B",
        13: "Nota de Crédito C",
        2: "Nota de Débito A",
        7: "Nota de Débito B",
        12: "Nota de Débito C"
    }

def get_document_types() -> Dict[str, str]:
    """
    Devuelve los tipos de documento más comunes.
    """
    return {
        "80": "CUIT",
        "86": "CUIL", 
        "96": "DNI",
        "99": "Sin identificar"
    }