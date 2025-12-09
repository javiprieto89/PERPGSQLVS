import strawberry
from typing import List, Optional
from app.utils.filter_schemas import FILTER_SCHEMAS
from app import models
from app.db import get_db
from sqlalchemy import inspect


# =====================================================
# Tipos GraphQL
# =====================================================

@strawberry.type
class FilterOption:
    """Representa una opción individual de un filtro select."""
    value: str
    option: str


@strawberry.type
class FilterField:
    """Representa un campo filtrable dentro de un modelo."""
    field: str
    label: str
    type: str
    relationModel: Optional[str]
    dependsOn: Optional[str]
    data: Optional[List[FilterOption]] = None


# =====================================================
# Funciones auxiliares
# =====================================================

def _get_related_data(model_name: str) -> list[dict]:
    """
    Obtiene dinámicamente los registros del modelo relacionado
    y los convierte a [{"value": ..., "option": ...}].
    Compatible con cualquier tabla relacionada (Company, Branch, etc.).
    """
    model_class = getattr(models, model_name, None)
    if not model_class:
        return []

    db_gen = get_db()
    db = next(db_gen)

    try:
        mapper = inspect(model_class)
        pk_col = list(mapper.primary_key)[0].key

        # Buscar una columna descriptiva (Name / Description)
        name_col = next(
            (c.key for c in mapper.columns if "name" in c.key.lower()
             or "description" in c.key.lower()),
            pk_col,
        )

        items = db.query(model_class).all()

        # Convertir todos los valores a string (GraphQL-safe)
        return [
            {
                "value": str(getattr(item, pk_col)),
                "option": str(getattr(item, name_col))
            }
            for item in items
        ]

    except Exception as e:
        print(f"[FILTERS] Error obteniendo datos para {model_name}: {e}")
        return []

    finally:
        db_gen.close()


# =====================================================
# Query principal de filtros
# =====================================================

@strawberry.type
class FiltersQuery:
    """
    Query GraphQL que devuelve los filtros disponibles por modelo.
    Incluye los datos dinámicos para selects (Company, Branch, etc.).
    """

    @strawberry.field
    def filter_fields(self, model: str) -> List[FilterField]:
        schema = FILTER_SCHEMAS.get(model.lower())
        if not schema:
            return []

        fields: List[FilterField] = []

        for f in schema:
            field_data = {
                "field": f.get("field"),
                "label": f.get("label"),
                "type": f.get("type"),
                "relationModel": f.get("relationModel"),
                "dependsOn": f.get("dependsOn"),
                "data": None,
            }

            # Si el tipo es select, cargar los datos relacionados
            if f.get("type") == "select" and f.get("relationModel"):
                relation_model = f["relationModel"]
                field_data["data"] = _get_related_data(relation_model)

            fields.append(FilterField(**field_data))

        return fields
