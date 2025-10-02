import warnings
import importlib
import pkgutil
import sys
import os

from sqlalchemy.orm import configure_mappers
from sqlalchemy.exc import SAWarning


def main() -> None:
    # Ensure project root is on sys.path
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir))
    if repo_root not in sys.path:
        sys.path.insert(0, repo_root)
    # Import all model modules under app.models to ensure relationships are registered
    import app.models as models_pkg

    # Prefer the curated list in __all__ to avoid importing legacy modules
    module_names = []
    if hasattr(models_pkg, "__all__") and isinstance(models_pkg.__all__, list):
        module_names = list(models_pkg.__all__)
    else:
        module_names = [m for _, m, _ in pkgutil.iter_modules(models_pkg.__path__)]

    for modname in module_names:
        importlib.import_module(f"{models_pkg.__name__}.{modname}")

    # Capture SAWarnings emitted during mapper configuration
    with warnings.catch_warnings(record=True) as caught:
        warnings.simplefilter("always", SAWarning)
        configure_mappers()

    remaining = [
        str(w.message)
        for w in caught
        if "To silence this warning, add the parameter 'overlaps=" in str(w.message)
    ]

    if remaining:
        print("SAWarnings restantes:")
        for m in remaining:
            print("-", m)
        raise SystemExit(1)
    print("OK: sin SAWarnings de overlaps pendientes.")


if __name__ == "__main__":
    main()
