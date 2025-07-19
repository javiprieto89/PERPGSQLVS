# app/graphql/schemas/afip.py
import strawberry
from typing import Optional


@strawberry.input
class VoucherRequest:
    CbteModo: str
    CuitEmisor: str
    PtoVta: int
    CbteTipo: int
    CbteNro: int
    CbteFch: int
    ImpTotal: float
    CodAutorizacion: str
    DocTipoReceptor: str
    DocNroReceptor: str


@strawberry.type
class VoucherInfo:
    raw: str