from dataclasses import fields
from typing import Any, Type, List, Sequence, get_origin, get_args, Union
import dataclasses
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

        suffix_map = {
            "Name": "Name",
            "DocNumber": "DocNumber",
            "LicensePlate": "LicensePlate",
        }
        for suffix, attr in suffix_map.items():
            if value is None and f.name.endswith(suffix):
                base = f.name[: -len(suffix)].lower()
                for attr_name in dir(obj):
                    if attr_name.lower().startswith(base):
                        rel = getattr(obj, attr_name, None)
                        if rel is None:
                            continue
                        candidates = [
                            a
                            for a in dir(rel)
                            if not a.startswith("_")
                            and a.lower().endswith(suffix.lower())
                        ]
                        for cand in candidates:
                            cand_value = getattr(rel, cand, None)
                            if cand_value is not None:
                                value = cand_value
                                break
                        if value is None and hasattr(rel, attr):
                            value = getattr(rel, attr)
                        if value is not None:
                            break

        if isinstance(value, (bytes, bytearray)) and _expects_str(f.type):
            value = base64.b64encode(value).decode("utf-8")

        # Convert nested dataclasses or lists of dataclasses
        origin = get_origin(f.type)
        if dataclasses.is_dataclass(f.type) and value is not None:
            value = obj_to_schema(f.type, value)
        elif origin in {list, List, Sequence}:
            args = get_args(f.type)
            if args:
                inner = args[0]
                if dataclasses.is_dataclass(inner) and value is not None:
                    value = list_to_schema(inner, value)

        data[f.name] = value

    return schema_type(**data)


def list_to_schema(schema_type: Type[Any], objects: Sequence[Any]) -> List[Any]:
    return [obj_to_schema(schema_type, obj) for obj in objects if obj is not None]
