# app/utils/pagination.py
import strawberry
from typing import List, Optional, TypeVar, Generic, Callable, Any
from sqlalchemy.orm import Query
from dataclasses import dataclass
from app.graphql.schemas.clients import ClientsInDB
from app.graphql.schemas.items import ItemsInDB
from app.graphql.schemas.orders import OrdersInDB
import math

T = TypeVar('T')

@strawberry.input
class PaginationInput:
    page: int = 1
    limit: int = 25
    offset: Optional[int] = None

@strawberry.input
class SortInput:
    field: str
    direction: str = "ASC"  # ASC o DESC

@strawberry.type
class PageInfo:
    current_page: int
    per_page: int
    total_items: int
    total_pages: int
    has_next_page: bool
    has_previous_page: bool
    start_cursor: Optional[str] = None
    end_cursor: Optional[str] = None

@strawberry.type
class PaginatedResponse(Generic[T]):
    """Respuesta paginada genérica"""
    items: List[T]
    page_info: PageInfo

def paginate_query(
    query: Query,
    pagination: Optional[PaginationInput] = None,
    transform_fn: Optional[Callable[[Any], T]] = None
) -> PaginatedResponse[T]:
    """
    Función genérica para paginar cualquier query de SQLAlchemy
    
    Args:
        query: Query de SQLAlchemy
        pagination: Parámetros de paginación
        transform_fn: Función para transformar cada item del resultado
    
    Returns:
        PaginatedResponse con los datos paginados
    """
    # Configurar valores por defecto
    page = pagination.page if pagination and pagination.page > 0 else 1
    limit = pagination.limit if pagination and 0 < pagination.limit <= 100 else 25
    offset = pagination.offset if pagination and pagination.offset else (page - 1) * limit
    
    # Contar total de items
    total_items = query.count()
    
    # Calcular información de páginas
    total_pages = math.ceil(total_items / limit) if total_items > 0 else 0
    has_next = offset + limit < total_items
    has_previous = page > 1
    
    # Obtener items de la página actual
    items = query.offset(offset).limit(limit).all()
    
    # Transformar items si se proporciona función
    if transform_fn:
        items = [transform_fn(item) for item in items]
    
    # Crear información de página
    page_info = PageInfo(
        current_page=page,
        per_page=limit,
        total_items=total_items,
        total_pages=total_pages,
        has_next_page=has_next,
        has_previous_page=has_previous,
        start_cursor=str(offset) if items else None,
        end_cursor=str(offset + len(items) - 1) if items else None
    )
    
    return PaginatedResponse(items=items, page_info=page_info)

@strawberry.type
class ClientsPaginatedResponse:
    """Respuesta paginada específica para clientes"""
    items: List['ClientsInDB']
    page_info: PageInfo

@strawberry.type
class ItemsPaginatedResponse:
    """Respuesta paginada específica para items"""
    items: List['ItemsInDB']
    page_info: PageInfo

@strawberry.type
class OrdersPaginatedResponse:
    """Respuesta paginada específica para órdenes"""
    items: List['OrdersInDB']
    page_info: PageInfo

def apply_sorting(query: Query, model_class: Any, sort: Optional[SortInput] = None) -> Query:
    """
    Aplica ordenamiento a una query
    
    Args:
        query: Query de SQLAlchemy
        model_class: Clase del modelo SQLAlchemy
        sort: Parámetros de ordenamiento
    
    Returns:
        Query con ordenamiento aplicado
    """
    if not sort:
        return query
    
    # Verificar que el campo existe en el modelo
    if not hasattr(model_class, sort.field):
        raise ValueError(f"Field {sort.field} does not exist in {model_class.__name__}")
    
    field = getattr(model_class, sort.field)
    
    if sort.direction.upper() == "DESC":
        return query.order_by(field.desc())
    else:
        return query.order_by(field.asc())

# Funciones de utilidad para filtros comunes
def apply_date_range_filter(query: Query, date_field, start_date=None, end_date=None) -> Query:
    """Aplica filtro de rango de fechas"""
    if start_date:
        query = query.filter(date_field >= start_date)
    if end_date:
        query = query.filter(date_field <= end_date)
    return query

def apply_text_search_filter(query: Query, fields: List[Any], search_term: str) -> Query:
    """Aplica filtro de búsqueda de texto en múltiples campos"""
    if not search_term:
        return query
    
    from sqlalchemy import or_
    search_pattern = f"%{search_term}%"
    conditions = [field.ilike(search_pattern) for field in fields]
    return query.filter(or_(*conditions))

def apply_active_filter(query: Query, is_active_field, is_active: Optional[bool] = None) -> Query:
    """Aplica filtro de activo/inactivo"""
    if is_active is not None:
        query = query.filter(is_active_field == is_active)
    return query
