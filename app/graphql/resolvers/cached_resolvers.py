# app/graphql/resolvers/cached_resolvers.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.branches import BranchesInDB
from app.graphql.schemas.brands import BrandsInDB
from app.graphql.schemas.countries import CountriesInDB
from app.graphql.schemas.itemcategories import ItemCategoriesInDB
from app.graphql.crud.branches import get_branches, get_branches_by_id
from app.graphql.crud.brands import get_brands, get_brands_by_id
from app.graphql.crud.countries import get_countries, get_countries_by_id
from app.graphql.crud.itemcategories import get_itemcategories, get_itemcategories_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from app.utils.cache import cache_static_data, cache_dynamic_data
from strawberry.types import Info

@strawberry.type
class CachedDataQuery:
    """Queries para datos que se cachean automticamente"""

    @strawberry.field
    @cache_static_data(ttl_seconds=3600)  # Cache por 1 hora
    def all_countries(self, info: Info) -> List[CountriesInDB]:
        """Lista de pases (datos estticos)"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            countries = get_countries(db)
            return list_to_schema(CountriesInDB, countries)
        finally:
            db_gen.close()

    @strawberry.field
    @cache_static_data(ttl_seconds=3600)
    def all_brands(self, info: Info) -> List[BrandsInDB]:
        """Lista de marcas (datos estticos)"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            brands = get_brands(db)
            return list_to_schema(BrandsInDB, brands)
        finally:
            db_gen.close()

    @strawberry.field
    @cache_static_data(ttl_seconds=1800)  # Cache por 30 minutos
    def all_item_categories(self, info: Info) -> List[ItemCategoriesInDB]:
        """Lista de categoras de items"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            categories = get_itemcategories(db)
            return list_to_schema(ItemCategoriesInDB, categories)
        finally:
            db_gen.close()

    @strawberry.field
    @cache_dynamic_data(ttl_seconds=600)  # Cache por 10 minutos
    def all_branches(self, info: Info, company_id: Optional[int] = None) -> List[BranchesInDB]:
        """Lista de sucursales (pueden cambiar ms frecuentemente)"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            branches = get_branches(db)
            if company_id:
                branches = [b for b in branches if b.companyID == company_id]
            
            result = []
            for branch in branches:
                obj = obj_to_schema(BranchesInDB, branch)
                # Codificar logo en base64 si existe
                logo_bytes = getattr(branch, "Logo", None)
                if logo_bytes:
                    import base64
                    obj.Logo = base64.b64encode(logo_bytes).decode("utf-8")
                result.append(obj)
            return result
        finally:
            db_gen.close()

# Instancia para usar en el schema principal
cachedDataQuery = CachedDataQuery()
