# app/graphql/schemas/carbrands.py
import strawberry

@strawberry.input
class CarBrandsCreate:
    Name: str

@strawberry.input
class CarBrandsUpdate:
    Name: str  # si querés que sea opcional poné: Optional[str] = None

@strawberry.type
class CarBrandsInDB:
    CarBrandID: int
    Name: str
