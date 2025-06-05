# app/graphql/schemas/carbrands.py
import strawberry

@strawberry.input
class CarBrandsCreate:
    name: str

@strawberry.input
class CarBrandsUpdate:
    name: str  # si querés que sea opcional poné: Optional[str] = None

@strawberry.type
class CarBrandsInDB:
    carBrandID: int
    name: str
