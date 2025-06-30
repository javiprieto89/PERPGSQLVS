from sqlalchemy.orm import Query
from sqlalchemy import inspect, String, Integer, Boolean


def build_dynamic_query(query: Query, model, filters: dict) -> Query:
    mapper = inspect(model)

    for field, condition in filters.items():
        if field not in mapper.columns:
            continue

        column = mapper.columns[field]
        value = condition.get("value")
        mode = condition.get("mode", "equals")

        if value is None or value == "":
            continue

        # Si es texto, respetamos los modos (contains, starts, equals)
        if isinstance(column.type, String):
            if mode == "contains":
                query = query.filter(column.ilike(f"%{value}%"))
            elif mode == "starts":
                query = query.filter(column.ilike(f"{value}%"))
            elif mode == "equals":
                query = query.filter(column == value)

        # Si no es texto (Integer, Boolean), siempre usamos igualdad
        else:
            query = query.filter(column == value)

    return query
