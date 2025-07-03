from dataclasses import fields
from typing import Any, Type, List

# Helper functions to map SQLAlchemy models to Strawberry schemas

def obj_to_schema(schema_type: Type[Any], obj: Any):
    if obj is None:
        return None
    data = {}
    obj_dict = getattr(obj, '__dict__', {})
    for f in fields(schema_type):
        data[f.name] = obj_dict.get(f.name)
    return schema_type(**data)


def list_to_schema(schema_type: Type[Any], objects: List[Any]):
    return [obj_to_schema(schema_type, obj) for obj in objects]
