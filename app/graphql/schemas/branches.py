import base64
import strawberry
from typing import Optional
from app.graphql.schemas.company import CompanyInDB


@strawberry.input
class BranchesCreate:
    CompanyID: int
    BranchName: str
    Address: Optional[str] = None
    Phone: Optional[str] = None
    Logo: Optional[str] = None  # Cambiado a str (base64)


@strawberry.input
class BranchesUpdate:
    CompanyID: Optional[int] = None
    BranchName: Optional[str] = None
    Address: Optional[str] = None
    Phone: Optional[str] = None
    Logo: Optional[str] = None  # Cambiado a str (base64)


@strawberry.type
class BranchesInDB:
    BranchID: int
    CompanyID: int
    BranchName: str
    Address: Optional[str] = None
    Phone: Optional[str] = None
    Logo: Optional[str] = None  # Cambiado a str (base64)
    CompanyData: Optional[CompanyInDB] = None
