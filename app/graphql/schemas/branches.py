import base64
import strawberry
from typing import Optional


@strawberry.input
class BranchesCreate:
    CompanyID: int
    Name: str
    Address: Optional[str] = None
    Phone: Optional[str] = None
    Logo: Optional[str] = None  # Cambiado a str (base64)


@strawberry.input
class BranchesUpdate:
    CompanyID: Optional[int] = None
    Bame: Optional[str] = None
    Address: Optional[str] = None
    Phone: Optional[str] = None
    Logo: Optional[str] = None  # Cambiado a str (base64)


@strawberry.type
class BranchesInDB:
    BranchID: int
    CompanyID: int
    Name: str
    Address: Optional[str] = None
    Phone: Optional[str] = None
    Logo: Optional[str] = None  # Cambiado a str (base64)
