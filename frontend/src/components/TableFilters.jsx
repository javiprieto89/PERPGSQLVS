import { useEffect, useState } from "react";
import apiFetch from "../utils/apiFetch";

export default function TableFilters({ modelName, onFilterChange }) {
  const [columns, setColumns] = useState([]);
  const [filters, setFilters] = useState({});
  const [relationOptions, setRelationOptions] = useState({});

  useEffect(() => {
    if (!modelName) return;

    apiFetch(`/${modelName}/filters/`)
      .then(async (data) => {
        setColumns(data);

        const relations = data.filter((col) => col.type === "relation");
        const options = {};

        for (const rel of relations) {
          let items = [];

          try {
            if (rel.field === "provinceID") {
              const countryFilter = filters["countryID"]?.value;
              if (countryFilter) {
                items = await apiFetch(
                  `/provinces/by_country/${countryFilter}`
                );
              } else {
                items = [];
              }
            } else {
              items = await apiFetch(`/${rel.relationName}`);
            }

            const labelField =
              rel.relationLabel ||
              (items.length
                ? Object.keys(items[0]).find(
                    (key) => typeof items[0][key] === "string"
                  )
                : "id");

            options[rel.field] = {
              items,
              labelField,
            };
          } catch (err) {
            console.error(
              `Error loading relation data for ${rel.relationName}:`,
              err
            );
          }
        }

        setRelationOptions(options);
      })
      .catch((err) => console.error("Error cargando columnas:", err));
  }, [modelName]);

  useEffect(() => {
    if (!columns.find((col) => col.field === "provinceID")) return;

    const countryFilter = filters["countryID"]?.value;

    if (!countryFilter) {
      setRelationOptions((prev) => ({
        ...prev,
        provinceID: {
          ...(prev.provinceID || {}),
          items: [],
        },
      }));

      setFilters((prev) => ({
        ...prev,
        provinceID: { ...prev.provinceID, value: "" },
      }));
      return;
    }

    apiFetch(`/provinces/by_country/${countryFilter}`)
      .then((items) => {
        const labelField =
          items.length && typeof items[0] === "object"
            ? Object.keys(items[0]).find(
                (key) => typeof items[0][key] === "string"
              )
            : "id";

        setRelationOptions((prev) => ({
          ...prev,
          provinceID: {
            ...prev.provinceID,
            items,
            labelField,
          },
        }));
      })
      .catch((err) => {
        console.error("Error cargando provincias por país:", err);
      });
  }, [filters.countryID?.value, columns]);

  const buildActiveFilters = () => {
    const active = {};
    for (const key in filters) {
      const { value, mode } = filters[key] || {};
      if (
        (typeof value === "string" && value.trim() !== "") ||
        (typeof value === "number" && !isNaN(value)) ||
        typeof value === "boolean"
      ) {
        active[key] = { value, mode };
      }
    }
    return active;
  };

  const handleSearch = async () => {
    const activeFilters = buildActiveFilters();
    try {
      const data = await apiFetch(`/${modelName}/filters`, {
        method: "POST",
        body: activeFilters,
      });
      onFilterChange(data);
    } catch (err) {
      console.error("Error aplicando filtros:", err);
    }
  };

  const handleClear = async () => {
    setFilters({});
    try {
      const data = await apiFetch(`/${modelName}/`);
      onFilterChange(data);
    } catch (err) {
      console.error("Error al limpiar y recargar datos:", err);
    }
  };

  const handleInputChange = (field, value, mode = null) => {
    setFilters((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
        mode: mode || prev[field]?.mode || "contains",
      },
    }));
  };

  const renderFilterRow = ({ field, type, label }) => {
    const current = filters[field] || { value: "", mode: "contains" };
    let modeSelector = null;
    let inputField = null;

    switch (type) {
      case "text":
        modeSelector = (
          <select
            value={current.mode}
            onChange={(e) =>
              handleInputChange(field, current.value, e.target.value)
            }
            className="border p-1 rounded text-sm w-[130px]"
          >
            <option value="contains">Contiene</option>
            <option value="starts">Comienza con</option>
            <option value="equals">Es igual</option>
          </select>
        );
        inputField = (
          <input
            type="text"
            value={current.value}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="border p-1 rounded text-sm w-full"
          />
        );
        break;

      case "boolean":
        inputField = (
          <select
            value={current.value}
            onChange={(e) =>
              handleInputChange(field, e.target.value === "true")
            }
            className="border p-1 rounded text-sm w-full"
          >
            <option value="">Todos</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        );
        break;

      case "relation":
        const options = relationOptions[field];
        const labelField = options?.labelField || "id";
        inputField = (
          <select
            value={current.value ?? ""}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="border p-1 rounded text-sm w-full"
          >
            <option value="">Todos</option>
            {options?.items?.map((item) => (
              <option
                key={item.id ?? item[Object.keys(item)[0]]}
                value={item.id ?? item[Object.keys(item)[0]]}
              >
                {item[labelField]}
              </option>
            ))}
          </select>
        );
        break;

      case "number":
        modeSelector = (
          <select
            value={current.mode}
            onChange={(e) =>
              handleInputChange(field, current.value, e.target.value)
            }
            className="border p-1 rounded text-sm w-[130px]"
          >
            <option value="equals">Es igual</option>
            <option value="greater">Mayor que</option>
            <option value="less">Menor que</option>
          </select>
        );
        inputField = (
          <input
            type="number"
            value={current.value}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="border p-1 rounded text-sm w-full"
          />
        );
        break;

      default:
        return null;
    }

    return (
      <div
        key={field}
        className="flex items-center gap-2 mb-3 max-w-5xl mx-auto"
      >
        <label className="w-[220px] text-sm font-semibold text-right pr-2">
          {label}:
        </label>

        {modeSelector ? (
          <>
            {modeSelector}
            <div className="flex-1">{inputField}</div>
          </>
        ) : (
          <div className="flex-[1.6]">{inputField}</div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 p-6 border-b rounded-md max-w-6xl mx-auto">
      <div className="space-y-3">{columns.map(renderFilterRow)}</div>
      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={handleClear}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Limpiar filtros
        </button>
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
