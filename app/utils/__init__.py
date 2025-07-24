from dataclasses import fields
from typing import Any, Type, List, Sequence, get_origin, get_args, Union
import base64

# Helper functions to map SQLAlchemy models to Strawberry schemas


def _expects_str(field_type: Any) -> bool:
    """Return True if the dataclass field expects a string value."""
    if field_type is str:
        return True
    origin = get_origin(field_type)
    if origin is Union:
        args = get_args(field_type)
        return str in args
    return False


def obj_to_schema(schema_type: Type[Any], obj: Any):
    data = {}
    obj_dict = getattr(obj, "__dict__", {})
    for f in fields(schema_type):
        if f.name in obj_dict:
            value = obj_dict.get(f.name)
        else:
            value = getattr(obj, f.name, None)

        if value is None:
            alt = f.name[0].upper() + f.name[1:]
            if alt in obj_dict:
                value = obj_dict.get(alt)
            else:
                value = getattr(obj, alt, None)

        if value is None and f.name.endswith("Name"):
            base = f.name[:-4].lower()
            for attr_name in dir(obj):
                if attr_name.lower().startswith(base):
                    rel = getattr(obj, attr_name, None)
                    if rel is not None and hasattr(rel, "Name"):
                        value = getattr(rel, "Name")
                        if value is not None:
                            break

        if isinstance(value, (bytes, bytearray)) and _expects_str(f.type):
            value = base64.b64encode(value).decode("utf-8")

        data[f.name] = value

    return schema_type(**data)


def list_to_schema(schema_type: Type[Any], objects: Sequence[Any]) -> List[Any]:
    return [obj_to_schema(schema_type, obj) for obj in objects if obj is not None]
