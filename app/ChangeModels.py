import os
import shutil
import re
import datetime
from argparse import ArgumentParser
from pathlib import Path


def _resolve_models_dir() -> str:
    """Return the path to the models directory.

    Precedence order:
    1. ``--models-dir`` command-line argument.
    2. ``MODELS_DIR`` environment variable.
    3. ``app/models`` relative to the repository root.
    """

    parser = ArgumentParser(add_help=False)
    parser.add_argument("--models-dir", dest="models_dir")
    args, _ = parser.parse_known_args()

    if args.models_dir:
        return args.models_dir

    env_dir = os.getenv("MODELS_DIR")
    if env_dir:
        return env_dir

    repo_root = Path(__file__).resolve().parents[1]
    return str(repo_root / "app" / "models")


MODELS_DIR = _resolve_models_dir()
BACKUP_DIR = rf"S:\back_modelos_{datetime.datetime.now():%Y%m%d_%H%M%S}"

os.makedirs(BACKUP_DIR, exist_ok=True)


def backup_file(path):
    relpath = os.path.relpath(path, MODELS_DIR)
    dest = os.path.join(BACKUP_DIR, relpath)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    shutil.copy2(path, dest)
    print(f"Backup de {os.path.basename(path)} hecho.")


def find_relationships(content):
    regex = re.compile(
        r"(\w+)\s*:\s*Mapped.*?=\s*relationship\(\s*['\"](\w+)['\"].*?back_populates\s*=\s*['\"](\w+)['\"]",
        re.S,
    )
    return regex.findall(content)


def find_class(content):
    match = re.search(r"class\s+(\w+)\s*\(.*Base.*\):", content)
    return match.group(1) if match else None


def replace_relationship(content, attr, modelo, backpop):
    pattern = re.compile(
        rf"{attr}\s*:\s*Mapped.*?=\s*relationship\(['\"]{modelo}['\"].*?back_populates\s*=\s*['\"].*?['\"].*?\)",
        re.S,
    )
    new_line = f"{attr}: Mapped = relationship('{modelo}', back_populates='{backpop}')"
    return pattern.sub(new_line, content)


def add_relationship(content, attr, modelo, backpop):
    lines = content.splitlines()
    for i in range(len(lines) - 1, -1, -1):
        if lines[i].strip().startswith("# Relaciones"):
            lines.insert(
                i + 1,
                f"    {attr}: Mapped = relationship('{modelo}', back_populates='{backpop}')",
            )
            break
        if lines[i].startswith("class "):
            lines.insert(
                i + 2,
                f"    {attr}: Mapped = relationship('{modelo}', back_populates='{backpop}')",
            )
            break
    return "\n".join(lines)


# 1. Mapear todos los archivos y relaciones
modelos = {}
relaciones = []

archivos = [f for f in os.listdir(MODELS_DIR) if f.endswith(".py")]
print(f"Analizando {len(archivos)} archivos...")

for idx, fname in enumerate(archivos, 1):
    path = os.path.join(MODELS_DIR, fname)
    print(f"Leyendo archivo {idx}/{len(archivos)}: {fname}")
    with open(path, encoding="utf-8") as f:
        content = f.read()
    clase = find_class(content)
    if not clase:
        continue
    rels = find_relationships(content)
    print(f"  Encontradas {len(rels)} relaciones en {clase}")
    for attr, modelo, backpop in rels:
        relaciones.append(
            {
                "archivo": fname,
                "clase": clase,
                "attr": attr,
                "modelo": modelo,
                "backpop": backpop,
            }
        )
    modelos[clase] = {
        "archivo": fname,
        "content": content,
    }

# 2. Corregir y sincronizar los nombres de relaciones
cambios = {}

print(f"\nSincronizando relaciones cruzadas entre modelos...")

for idx, r in enumerate(relaciones, 1):
    modelo = r["modelo"]
    backpop = r["backpop"]
    clase = r["clase"]
    attr = r["attr"]

    print(f"({idx}/{len(relaciones)}) Revisando {clase}.{attr} <-> {modelo}.{backpop}")

    for r2 in relaciones:
        if r2["clase"] == modelo and r2["modelo"] == clase:
            if r2["backpop"] != attr:
                print(
                    f'  Corrigiendo back_populates de {modelo}.{r2["attr"]} -> {attr}'
                )
                archivo_path = os.path.join(MODELS_DIR, r2["archivo"])
                backup_file(archivo_path)
                contenido = modelos[modelo]["content"]
                nuevo = replace_relationship(contenido, r2["attr"], clase, attr)
                with open(archivo_path, "w", encoding="utf-8") as f:
                    f.write(nuevo)
                modelos[modelo]["content"] = nuevo
                cambios[archivo_path] = True

            archivo_clase = os.path.join(MODELS_DIR, modelos[clase]["archivo"])
            archivo_modelo = os.path.join(MODELS_DIR, modelos[modelo]["archivo"])
            if attr not in modelos[clase]["content"]:
                print(f"  Agregando atributo {clase}.{attr}")
                backup_file(archivo_clase)
                nuevo = add_relationship(
                    modelos[clase]["content"], attr, modelo, r2["attr"]
                )
                with open(archivo_clase, "w", encoding="utf-8") as f:
                    f.write(nuevo)
                modelos[clase]["content"] = nuevo
                cambios[archivo_clase] = True
            if r2["attr"] not in modelos[modelo]["content"]:
                print(f'  Agregando atributo {modelo}.{r2["attr"]}')
                backup_file(archivo_modelo)
                nuevo = add_relationship(
                    modelos[modelo]["content"], r2["attr"], clase, attr
                )
                with open(archivo_modelo, "w", encoding="utf-8") as f:
                    f.write(nuevo)
                modelos[modelo]["content"] = nuevo
                cambios[archivo_modelo] = True

print("\nProceso terminado.")
print(f"Archivos corregidos ({len(cambios)}):")
for k in cambios:
    print(" -", k)
