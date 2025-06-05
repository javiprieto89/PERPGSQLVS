# app/graphql/schemas/brands.py
import strawberry


@strawberry.input
class BrandsCreate:
    name: str


@strawberry.input
class BrandsUpdate:
    name: str


@strawberry.type
class BrandsInDB:
    brandID: int
    name: str
