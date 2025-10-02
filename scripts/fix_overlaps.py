import os
import re
from pathlib import Path

# Fuente de verdad
OVERLAPS_MAP = {
    "Orders.warehouses_": "branches_",
    "PriceListItems.priceLists_": "priceListItems",
    "PriceLists.clients": "branches_",
    "StockHistory.branches_": "items_,warehouses_",
    "TempOrderDetails.items_": "branches_",
    "TempOrderDetails.priceLists_": "branches_",
    "TempOrderDetails.users_": "branches_",
    "TempOrderDetails.warehouses_": "branches_",
}

# Heurística de destino por atributo (por si el nombre exacto no aparece)
TARGET_CLASS_BY_ATTR = {
    "warehouses_": "Warehouses",
    "priceLists_": "PriceLists",
    "clients": "Clients",
    "branches_": "Branches",
    "items_": "Items",
    "users_": "Users",
}

REL_ASSIGN_RE = re.compile(r"^(\s*)(\w+)\s*=\s*relationship\(\s*([\'\"])(\w+)\3(.*)$")
CLASS_RE = re.compile(r"^class\s+(\w+)\(Base\)\s*:\s*$")


def find_blocks(lines):
    """Yield (start_idx, end_idx) for each relationship(...) call block, supporting multiline."""
    i = 0
    n = len(lines)
    while i < n:
        m = REL_ASSIGN_RE.match(lines[i])
        if not m:
            i += 1
            continue
        # capture until matching closing parenthesis of relationship(
        start = i
        # count parentheses from the first 'relationship(' occurrence on the line
        chunk = lines[i]
        paren = chunk.count("(") - chunk.count(")")
        i += 1
        while i < n and paren > 0:
            chunk += "\n" + lines[i]
            paren += lines[i].count("(") - lines[i].count(")")
            i += 1
        end = i  # non-inclusive
        yield start, end


def apply_fix_to_file(path: Path) -> bool:
    src = path.read_text(encoding="utf-8", errors="ignore").splitlines()
    changed = False

    # map line index to current class name by scanning upwards
    class_at_line = {}
    current_class = None
    for idx, line in enumerate(src):
        mcls = CLASS_RE.match(line)
        if mcls:
            current_class = mcls.group(1)
        class_at_line[idx] = current_class

    # collect relationship blocks
    for start, end in list(find_blocks(src)):
        header = src[start]
        m = REL_ASSIGN_RE.match(header)
        if not m:
            continue
        indent, attr, quote, target_cls, tail = m.groups()
        cls = class_at_line.get(start) or ""
        key = f"{cls}.{attr}"

        # Determine desired overlaps
        desired = OVERLAPS_MAP.get(key)
        if not desired:
            # Heurística: si no coincide el atributo, pero la clase coincide y
            # hay exactamente una relationship hacia el destino esperado, aplica.
            # Identificar destino esperado por el nombre del atributo si es parte de la tabla
            for k, v in OVERLAPS_MAP.items():
                k_cls, k_attr = k.split(".")
                if k_cls != cls:
                    continue
                t_guess = TARGET_CLASS_BY_ATTR.get(k_attr)
                if not t_guess:
                    continue
                if t_guess == target_cls:
                    # en este bloque estamos sobre la entity de destino esperada
                    # si el nombre del atributo contiene una pista del nombre objetivo, favorecerlo
                    if k_attr.strip("_").lower() in attr.lower():
                        desired = v
                        key = k  # registrar como si fuera el objetivo
                        break
            if not desired:
                continue

        # Reunir el bloque completo
        block = "\n".join(src[start:end])
        # Saltar si ya tiene overlaps=
        if "overlaps=" in block:
            continue

        # Insertar antes del cierre de relationship(...)
        # Buscar la última ')' en el bloque y agregar ', overlaps="..."' antes de ella
        # Conservando formato de comas
        # Si la línea final ya tiene una coma antes de ')', simplemente añadimos el argumento
        insert = f", overlaps=\"{desired}\""
        # reconstruir bloque con la inserción justo antes del último ')'
        last_line = src[end - 1]
        # Insert en la última ocurrencia de ')'
        pos = last_line.rfind(")")
        if pos == -1:
            # fallback: anexar en la misma línea
            src[end - 1] = last_line + insert
        else:
            src[end - 1] = last_line[:pos] + insert + last_line[pos:]
        changed = True

    if changed:
        path.write_text("\n".join(src) + "\n", encoding="utf-8")
    return changed


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    models_dir = root / "app" / "models"
    changed_any = False
    for p in sorted(models_dir.glob("*.py")):
        if apply_fix_to_file(p):
            changed_any = True
            print(f"patched: {p}")
    if not changed_any:
        print("No changes needed (idempotent run).")


if __name__ == "__main__":
    main()

