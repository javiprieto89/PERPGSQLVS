# app/graphql/schemas/afip.py
import strawberry

@strawberry.input
class VoucherRequest:
    """Datos de entrada para consultar un comprobante en AFIP."""
    CbteModo: str = "CAE"  # Modo del comprobante (siempre CAE)
    CuitEmisor: str  # CUIT del emisor del comprobante (como string)
    PtoVta: int  # Punto de venta
    CbteTipo: int  # Tipo de comprobante (6=Factura B, 11=Factura C, etc.)
    CbteNro: int  # Número del comprobante
    CbteFch: int  # Fecha en formato YYYYMMDD
    ImpTotal: float  # Importe total del comprobante
    CodAutorizacion: str  # Código de autorización (CAE)
    DocTipoReceptor: str  # Tipo de documento del receptor
    DocNroReceptor: str  # Número de documento del receptor

@strawberry.type
class VoucherInfo:
    """Información de respuesta de un comprobante consultado."""
    raw: str  # Respuesta completa de AFIP en formato JSON

@strawberry.type
class TestConnectionResult:
    """Resultado de la prueba de conexión con AFIP."""
    success: bool  # Indica si la conexión fue exitosa
    message: str  # Mensaje descriptivo del resultado
    details: str  # Detalles adicionales en formato JSON