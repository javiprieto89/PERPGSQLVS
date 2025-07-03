// src/components/TableFilters.jsx

import { useEffect, useState } from "react";
import { graphqlClient } from "../utils/graphqlClient";

const TEXT_OPERATORS = [
    { value: "all", label: "Todos" },
    { value: "startsWith", label: "Comienza con" },
    { value: "contains", label: "Contiene" },
    { value: "equals", label: "Es igual" },
    { value: "notEquals", label: "Es distinto a" },
    { value: "notContains", label: "No contiene" },
];

const pluralMap = {
    Country: "Countries",
    Province: "Provinces",
    Branch: "Branches",
    Company: "Companies",
    DocType: "Doctypes",
    ItemCategory: "Itemcategories",
    ItemSubcategory: "Itemsubcategories",
    PriceList: "Pricelists",
    Supplier: "Suppliers",
    Vendor: "Vendors",
    Warehouse: "Warehouses",
    Brand: "Brands",
};

const nameFieldMap = {
    Vendor: "VendorName",
};

const getNameField = (model) => nameFieldMap[model] || "Name";

const getQueryName = (model) => {
    const plural = pluralMap[model] || `${model}s`;
    return `all${plural}`;
};

// Query para obtener los filtros dinámicos de una entidad
const FILTER_FIELDS_QUERY = `
  query GetFilterFields($model: String!) {
    filterFields(model: $model) {
      field
      label
      type
      relationModel
      dependsOn
    }
  }
`;

export default function TableFilters({ modelName, data, onFilterChange }) {
    const [filterFields, setFilterFields] = useState([]);
    const [filters, setFilters] = useState({});
    const [options, setOptions] = useState({}); // Opciones de selects
    const [loading, setLoading] = useState(true);

    // 1. Cargar definición de filtros del backend
    useEffect(() => {
        async function loadFilterFields() {
            setLoading(true);
            try {
                const res = await graphqlClient.query(FILTER_FIELDS_QUERY, { model: modelName });
                setFilterFields(res.filterFields || []);
            } catch (err) {
                console.error("Error cargando definición de filtros:", err);
                setFilterFields([]);
            }
            setLoading(false);
        }
        if (modelName) loadFilterFields();
    }, [modelName]);

    // 2. Cargar las opciones de los selects, incluyendo dependientes
    useEffect(() => {

        async function loadSelectOptions() {
            let newOptions = { ...options };
            for (const field of filterFields) {
                if (field.type === "select" && !field.dependsOn) {
                    // Cargar opciones de select simples
                    const queryName = getQueryName(field.relationModel);
                    const nameField = getNameField(field.relationModel);
                    const QUERY = `
            query {
              ${queryName} {
                ${field.relationModel}ID
                ${nameField}
              }
            }
          `;
                    try {
                        const res = await graphqlClient.query(QUERY);
                        newOptions[field.field] = res[queryName] || [];
                    } catch (e) {
                        newOptions[field.field] = [];
                    }
                }
            }
            setOptions(newOptions);
        }
        if (filterFields.length) loadSelectOptions();
        // eslint-disable-next-line
    }, [filterFields]);

    // 3. Manejar selects dependientes (por ejemplo, provincias por país)
    useEffect(() => {
        async function loadDependentOptions() {
            for (const field of filterFields) {
                if (field.type === "select" && field.dependsOn && filters[field.dependsOn]) {
                    // Ej: provincias por país
                    const parentValue = filters[field.dependsOn];
                    const queryName = field.relationModel === "Province"
                        ? "provincesByCountry"
                        : getQueryName(field.relationModel);

                    let QUERY, variables;
                    if (queryName === "provincesByCountry") {
                        QUERY = `
              query($countryID: Int!) {
                provincesByCountry(countryID: $countryID) {
                  ProvinceID
                  Name
                }
              }
            `;
                        variables = { countryID: parseInt(parentValue) };
                    } else {
                        const nameField = getNameField(field.relationModel);
                        QUERY = `
              query {
                ${queryName} {
                  ${field.relationModel}ID
                  ${nameField}
                }
              }
            `;
                        variables = {};
                    }
                    try {
                        const res = await graphqlClient.query(QUERY, variables);
                        const key = queryName === "provincesByCountry" ? "provincesByCountry" : queryName;
                        setOptions(prev => ({
                            ...prev,
                            [field.field]: res[key] || []
                        }));
                    } catch (e) {
                        setOptions(prev => ({
                            ...prev,
                            [field.field]: []
                        }));
                    }
                }
            }
            // eslint-disable-next-line
        }
        if (filterFields.some(f => f.dependsOn)) loadDependentOptions();
        // eslint-disable-next-line
    }, [filters, filterFields]);

    // 4. Filtrar los datos en memoria según los filtros aplicados
    useEffect(() => {
        if (!filterFields.length) return;
        let filtered = [...(data || [])];
        for (const field of filterFields) {
            const value = filters[field.field];
            if (value === undefined || value === "" || value === null) continue;

            // Ajustar nombres para que coincidan con el modelo original
            const realField = field.field;

            switch (field.type) {
                case "text":
                    const op = filters[`${field.field}_op`] || "contains";
                    if (op === "all") break;
                    filtered = filtered.filter(item => {
                        const itemVal = (item[realField] || "").toString().toLowerCase();
                        const val = value.toLowerCase();
                        switch (op) {
                            case "startsWith":
                                return itemVal.startsWith(val);
                            case "equals":
                                return itemVal === val;
                            case "notEquals":
                                return itemVal !== val;
                            case "notContains":
                                return !itemVal.includes(val);
                            case "contains":
                                return itemVal.includes(val);
                            default:
                                return true;
                        }
                    });
                    break;
                case "number":
                    filtered = filtered.filter(item => parseInt(item[realField]) === parseInt(value));
                    break;
                case "boolean":
                    filtered = filtered.filter(item => (item[realField] === (value === "true" || value === true)));
                    break;
                case "select":
                    filtered = filtered.filter(item => (item[realField] == value));
                    break;
                default:
                    break;
            }
        }
        onFilterChange(filtered);
        // eslint-disable-next-line
    }, [filters, data, filterFields]);

    const handleChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
        // Si es un padre (ej: país), borra el valor del hijo dependiente (ej: provincia)
        const depField = filterFields.find(f => f.dependsOn === field);
        if (depField) {
            setFilters(prev => ({
                ...prev,
                [depField.field]: "",
                [`${depField.field}_op`]: "contains"
            }));
        }
    };

    const handleOperatorChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [`${field}_op`]: value
        }));
    };

    const clearFilters = () => {
        setFilters({});
        onFilterChange(data);
    };

    // Render dinámico según definición
    const renderInput = (field) => {
        const value = filters[field.field] || "";
        if (field.type === "text") {
            const opValue = filters[`${field.field}_op`] || "contains";
            return (
                <div className="flex gap-2">
                    <select
                        className="px-2 py-2 border rounded"
                        value={opValue}
                        onChange={e => handleOperatorChange(field.field, e.target.value)}
                    >
                        {TEXT_OPERATORS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded"
                        value={value}
                        onChange={e => handleChange(field.field, e.target.value)}
                    />
                </div>
            );
        }
        if (field.type === "number")
            return (
                <input
                    type="number"
                    className="w-full px-3 py-2 border rounded"
                    value={value}
                    onChange={e => handleChange(field.field, e.target.value)}
                />
            );
        if (field.type === "boolean")
            return (
                <select
                    className="w-full px-3 py-2 border rounded"
                    value={value}
                    onChange={e => handleChange(field.field, e.target.value)}
                >
                    <option value="">Todos</option>
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                </select>
            );
        if (field.type === "select")
            return (
                <select
                    className="w-full px-3 py-2 border rounded"
                    value={value}
                    onChange={e => handleChange(field.field, e.target.value)}
                    disabled={field.dependsOn && !filters[field.dependsOn]}
                >
                    <option value="">Todos</option>
                    {(options[field.field] || []).map(opt => (
                        <option key={opt[`${field.relationModel}ID`]} value={opt[`${field.relationModel}ID`]}>
                            {opt[getNameField(field.relationModel)]}
                        </option>
                    ))}
                </select>
            );
        return null;
    };

    return (
        <div className="bg-white p-4 rounded shadow border mb-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Filtros</h3>
                <button onClick={clearFilters} className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm">
                    Limpiar
                </button>
            </div>
            {loading ? (
                <div className="py-8 text-center text-gray-500">Cargando filtros...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filterFields.map(f => (
                        <div key={f.field}>
                            <label className="block text-sm font-medium mb-1">{f.label}</label>
                            {renderInput(f)}
                        </div>
                    ))}
                </div>
            )}
            {Object.keys(filters).length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {filterFields.map(f =>
                        filters[f.field] ? (
                            <span key={f.field} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                                {f.label}: {filters[f.field]}
                            </span>
                        ) : null
                    )}
                </div>
            )}
        </div>
    );
}
