# scripts/generar_init.py
import os
import re


def upperfirst(s):
    # Convierte "carbrands" en "CarBrands", "orderdetails" en "OrderDetails", etc.
    return ''.join([w.capitalize() for w in re.findall(r'[a-zA-Z][^A-Z]*', s)])


def main():
    ruta = "./models"  # Cambia esto si tu carpeta es otra
    archivos = [f for f in os.listdir(
        ruta) if f.endswith(".py") and f != "__init__.py"]

    imports = []
    for archivo in archivos:
        clase = upperfirst(os.path.splitext(archivo)[0])
        imports.append(f"from .{os.path.splitext(archivo)[0]} import {clase}")

    with open(os.path.join(ruta, "__init__.py"), "w", encoding="utf-8") as f:
        for imp in imports:
            f.write(f"{imp}\n")
    print(f"Archivo __init__.py generado con {len(imports)} modelos.")


if __name__ == "__main__":
    main()

