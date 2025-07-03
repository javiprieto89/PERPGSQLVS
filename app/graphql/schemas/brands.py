# app/graphql/schemas/brands.py
import strawberry


@strawberry.input
class BrandsCreate:
    Name: str


@strawberry.input
class BrandsUpdate:
    Name: str


@strawberry.type
class BrandsInDB:
    BrandID: int
    Name: str
