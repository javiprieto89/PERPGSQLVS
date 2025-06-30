# app/utils/cache.py
import json
import hashlib
from typing import Any, Optional, Dict, List
from functools import wraps
from datetime import datetime, timedelta

class SimpleCache:
    """Cache simple en memoria para datos que no cambian frecuentemente"""
    
    def __init__(self):
        self._cache: Dict[str, Dict[str, Any]] = {}
        self._expiry: Dict[str, datetime] = {}
    
    def get(self, key: str) -> Optional[Any]:
        """Obtiene un valor del cache"""
        if key in self._cache and key in self._expiry:
            if datetime.utcnow() < self._expiry[key]:
                return self._cache[key]['data']
            else:
                # Expiró, limpiar
                self.delete(key)
        return None
    
    def set(self, key: str, value: Any, ttl_seconds: int = 300) -> None:
        """Guarda un valor en el cache"""
        self._cache[key] = {'data': value}
        self._expiry[key] = datetime.utcnow() + timedelta(seconds=ttl_seconds)
    
    def delete(self, key: str) -> None:
        """Elimina un valor del cache"""
        self._cache.pop(key, None)
        self._expiry.pop(key, None)
    
    def clear(self) -> None:
        """Limpia todo el cache"""
        self._cache.clear()
        self._expiry.clear()
    
    def size(self) -> int:
        """Retorna el número de items en cache"""
        return len(self._cache)

# Instancia global del cache
cache = SimpleCache()

def cache_key(*args, **kwargs) -> str:
    """Genera una clave de cache basada en argumentos"""
    key_data = str(args) + str(sorted(kwargs.items()))
    return hashlib.md5(key_data.encode()).hexdigest()

def cached(ttl_seconds: int = 300, key_prefix: str = ""):
    """
    Decorador para cachear resultados de funciones
    
    Args:
        ttl_seconds: Tiempo de vida del cache en segundos
        key_prefix: Prefijo para la clave del cache
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            # Generar clave de cache
            func_key = f"{key_prefix}:{func.__name__}:{cache_key(*args, **kwargs)}"
            
            # Intentar obtener del cache
            cached_result = cache.get(func_key)
            if cached_result is not None:
                return cached_result
            
            # Ejecutar función y cachear resultado
            result = func(*args, **kwargs)
            cache.set(func_key, result, ttl_seconds)
            return result
        
        return wrapper
    return decorator

# Decoradores específicos para diferentes tipos de datos
def cache_static_data(ttl_seconds: int = 3600):
    """Cache para datos estáticos como países, provincias, marcas"""
    return cached(ttl_seconds, "static")

def cache_dynamic_data(ttl_seconds: int = 300):
    """Cache para datos que cambian pero no frecuentemente"""
    return cached(ttl_seconds, "dynamic")

def cache_user_data(ttl_seconds: int = 600):
    """Cache para datos específicos del usuario"""
    return cached(ttl_seconds, "user")

# Funciones de utilidad para limpiar cache específico
def invalidate_cache_pattern(pattern: str) -> None:
    """Invalida entradas de cache que coincidan con un patrón"""
    keys_to_delete = []
    for key in cache._cache.keys():
        if pattern in key:
            keys_to_delete.append(key)
    
    for key in keys_to_delete:
        cache.delete(key)

def invalidate_user_cache(user_id: int) -> None:
    """Invalida todo el cache relacionado con un usuario específico"""
    invalidate_cache_pattern(f"user:{user_id}")

def invalidate_company_cache(company_id: int) -> None:
    """Invalida cache relacionado con una empresa específica"""
    invalidate_cache_pattern(f"company:{company_id}")

def invalidate_items_cache() -> None:
    """Invalida cache de items cuando hay cambios en inventario"""
    invalidate_cache_pattern("items")
    invalidate_cache_pattern("stock")

# Middleware para limpiar cache automáticamente en mutaciones
class CacheInvalidationMixin:
    """Mixin para invalidar cache automáticamente después de mutaciones"""
    
    def invalidate_related_cache(self, operation_type: str, **kwargs):
        """Invalida cache relacionado basado en el tipo de operación"""
        if operation_type in ['create_item', 'update_item', 'delete_item']:
            invalidate_items_cache()
        elif operation_type in ['create_order', 'update_order']:
            company_id = kwargs.get('company_id')
            if company_id:
                invalidate_company_cache(company_id)
        elif operation_type in ['update_stock']:
            invalidate_items_cache()
            warehouse_id = kwargs.get('warehouse_id')
            if warehouse_id:
                invalidate_cache_pattern(f"warehouse:{warehouse_id}")