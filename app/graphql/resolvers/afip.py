# app/graphql/resolvers/afip.py
import json
import strawberry
from strawberry.types import Info
from typing import Optional
from app.utils.afip_client import (
    get_ultimo_comprobante, 
    constatar_comprobante, 
    test_afip_connection,  # Corregir nombre
    get_test_voucher_data,
    get_alternative_test_data
)
from app.graphql.schemas.afip import VoucherRequest, VoucherRequestBasic,  VoucherInfo, VoucherBasicInfo,  TestConnectionResult

@strawberry.type
class AfipQuery:
    @strawberry.field
    def ultimo_comprobante(self, info: Info, pto_vta: int, cbte_tipo: int) -> int:
        """
        Devuelve el último número de comprobante autorizado.
        
        Args:
            pto_vta: Punto de venta (ej: 1)
            cbte_tipo: Tipo de comprobante (ej: 6 para Factura B)
        """
        try:
            nro = get_ultimo_comprobante(pto_vta, cbte_tipo)
            return nro or 0
        except Exception as e:
            print(f"Error en ultimo_comprobante: {str(e)}")
            return 0

    @strawberry.field
    def informacion_comprobante(self, info: Info, data: VoucherRequest) -> VoucherInfo:
        """
        Consulta la información de un comprobante en AFIP usando WSCDC.
        
        Args:
            data: Datos del comprobante a consultar
        """
        try:
            # Convertir datos de entrada al formato esperado
            cmp_req = {
                "CbteModo": data.CbteModo,
                "CuitEmisor": int(data.CuitEmisor),  # Convertir string a int
                "PtoVta": data.PtoVta,
                "CbteTipo": data.CbteTipo,
                "CbteNro": data.CbteNro,
                "CbteFch": data.CbteFch,
                "ImpTotal": data.ImpTotal,
                "CodAutorizacion": data.CodAutorizacion,
                "DocTipoReceptor": data.DocTipoReceptor,
                "DocNroReceptor": data.DocNroReceptor,
            }
            
            res = constatar_comprobante(cmp_req)
            return VoucherInfo(raw=json.dumps(res, indent=2, ensure_ascii=False))
            
        except Exception as e:
            error_response = {
                "error": True,
                "message": str(e),
                "timestamp": "2024-01-01T00:00:00Z"
            }
            return VoucherInfo(raw=json.dumps(error_response, indent=2, ensure_ascii=False))


    @strawberry.field
    def informacion_rapida_comprobante(self, info: Info, data: VoucherRequestBasic) -> VoucherBasicInfo:
        """
        Consulta la información de un comprobante en AFIP usando WSCDC.
        
        Args:
            data: Datos del comprobante a consultar
        """
        try:
            # Convertir datos de entrada al formato esperado
            cmp_req = {                                
                "PtoVta": data.PtoVta,                
                "CbteNro": data.CbteNro,                
                "CbteTipo": data.CbteTipo,
            }
            
            res = constatar_comprobante(cmp_req)
            return VoucherBasicInfo(raw=json.dumps(res, indent=2, ensure_ascii=False))
            
        except Exception as e:
            error_response = {
                "error": True,
                "message": str(e),
                "timestamp": "2024-01-01T00:00:00Z"
            }
            return VoucherBasicInfo(raw=json.dumps(error_response, indent=2, ensure_ascii=False))

    @strawberry.field
    def test_afip_connection(self, info: Info) -> TestConnectionResult:
        """
        Prueba la conexión con WSAA de AFIP.
        """
        try:
            result = test_afip_connection()  # Corregir nombre de función
            return TestConnectionResult(
                success=result["success"],
                message=result["message"],
                details=json.dumps(result, indent=2, ensure_ascii=False)
            )
        except Exception as e:
            return TestConnectionResult(
                success=False,
                message=f"Error inesperado: {str(e)}",
                details=json.dumps({"error": str(e)}, indent=2)
            )

    @strawberry.field
    def get_test_voucher_data(self, info: Info) -> str:
        """
        Devuelve datos de prueba válidos para consultar un comprobante.
        """
        test_data = get_test_voucher_data()
        return json.dumps(test_data, indent=2, ensure_ascii=False)
    
    @strawberry.field
    def get_alternative_test_data(self, info: Info) -> str:
        """
        Devuelve datos alternativos de prueba (Factura B).
        """
        test_data = get_alternative_test_data()
        return json.dumps(test_data, indent=2, ensure_ascii=False)