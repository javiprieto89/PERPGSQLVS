import base64
import strawberry
from typing import Optional


@strawberry.input
class BranchesCreate:
    companyID: int
    name: str
    address: Optional[str] = None
    phone: Optional[str] = None
    logo: Optional[str] = None  # Cambiado a str (base64)


@strawberry.input
class BranchesUpdate:
    companyID: Optional[int] = None
    name: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    logo: Optional[str] = None  # Cambiado a str (base64)


@strawberry.type
class BranchesInDB:
    branchID: int
    companyID: int
    name: str
    address: Optional[str] = None
    phone: Optional[str] = None
    logo: Optional[str] = None  # Cambiado a str (base64)
