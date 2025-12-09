from dataclasses import fields
from typing import Any, List, Sequence, get_origin, get_args, Union
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


def _strip_optional(field_type: Any) -> Any:
    # Detecto los campos anidados y devuelvo el primer tipo de valor en una unión u opcional
    # Por ejemplo campos anidados con <Entidad>Data
    origin = get_origin(field_type)
    if origin is Union:
        args = [arg for arg in get_args(field_type) if arg is not type(None)]
        if len(args) == 1:
            return args[0]
    return field_type


def obj_to_schema(schema_type: Any, obj: Any):
    data = {}
    # Auxiliares para cuando el dato pedido no es exacto
    # Siempre que use <Entidad>Data esto no se va a usar
    alt_map = {
        "BranchData": ["branches_", "Branches_"],
        "RoleData": ["roles_"],
        "UserData": ["users_", "Users_"],
        "WarehouseData": ["warehouses_", "Warehouses_"],
        "SaleConditionData": ["saleConditions_"],
        "DocumentData": ["docTypes_"],
        "VendorData": ["vendors_", "Vendors_"],
        "ClientData": ["clients_", "Clients_"],
        "DiscountData": ["discounts_"],
        "PriceListData": ["priceLists_"],
        "OrderStatusData": ["orderStatus_"],
        "CarData": ["cars_"],
        "ServiceTypeData": ["serviceType_"],
        "CarModelData": ["carModels_", "CarModels_"],
        "CarBrandData": ["carBrand", "carModels_.carBrand"],
        "CreditCardGroupData": ["creditCardGroup_"],
        "ItemData": ["items_", "Items_"],
        "BankData": ["Banks_", "banks_"],
        "CurrencyData": ["sysCurrencies", "SysCurrencies"],
        "CheckStatusData": ["CheckStatuses_"],
        "CheckData": ["Checks_"],
        "BankAccountData": ["BankAccounts_"],
        "TransactionData": ["Transactions_"],
        "DocTypeData": ["docTypes_"],
        "CountryData": ["countries_"],
        "ProvinceData": ["provinces_"],
        "BrandData": ["brands_"],
        "CategoryData": ["itemCategories_"],
        "SubcategoryData": ["itemSubcategories_"],
        "SupplierData": ["suppliers_"],
        "CompanyData": ["company_", "Company_"],
        "PurchaseInvoiceDetailsData": ["PurchaseInvoiceDetails"],
        "PurchaseInvoiceData": ["PurchaseInvoices_"],
        "WarehouseData": ["Warehouses_", "warehouses_"],
    }
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

        if value is None:
            alt_lower = f.name[0].lower() + f.name[1:]
            value = getattr(obj, alt_lower, None)
            if value is None:
                value = getattr(obj, alt_lower + "_", None)

        if value is None and f.name in alt_map:
            for alt_attr in alt_map[f.name]:
                target = obj
                for part in alt_attr.split('.'):
                    if hasattr(target, part):
                        target = getattr(target, part)
                    else:
                        target = None
                        break
                if target is not None:
                    value = target
                    break
        stripped_type = _strip_optional(f.type)
        inner_type = stripped_type
        origin = get_origin(stripped_type)
        if origin in {list, List, Sequence}:
            inner_args = get_args(stripped_type)
            if inner_args:
                inner_type = _strip_optional(inner_args[0])
        if value is None and f.name.endswith("Data") and dataclasses.is_dataclass(inner_type):
            base = f.name[:-4]
            candidates = [base, base.lower(), base + '_', base.lower() + '_']
            for cand in candidates:
                if hasattr(obj, cand):
                    value = getattr(obj, cand)
                    if value is not None:
                        break

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
                            and (
                                a.lower().endswith(suffix.lower())
                                or (
                                    suffix == "Name"
                                    and a.lower().endswith("description")
                                )
                            )
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
        target_type = _strip_optional(f.type)
        origin = get_origin(target_type)

        if dataclasses.is_dataclass(target_type) and value is not None:
            value = obj_to_schema(target_type, value)
        elif origin in {list, List, Sequence}:
            args = get_args(target_type)
            if args:
                inner = _strip_optional(args[0])
                if dataclasses.is_dataclass(inner) and value is not None:
                    value = list_to_schema(inner, value)

        data[f.name] = value

    return schema_type(**data)


def list_to_schema(schema_type: Any, objects: Sequence[Any]) -> List[Any]:
    return [obj_to_schema(schema_type, obj) for obj in objects if obj is not None]
