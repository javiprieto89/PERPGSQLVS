// frontend/src/components/TableFilters.jsx
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

    // 2. Cargar opciones para campos de tipo select
    useEffect(() => {
        async function loadOptions() {
            const selectFields = filterFields.filter(f => f.type === "select");
            const newOptions = {};

            for (const field of selectFields) {
                if (field.relationModel) {
                    try {
                        const queryName = getQueryName(field.relationModel);
                        const query = `{ ${queryName} { ${field.relationModel}ID ${getNameField(field.relationModel)} } }`;
                        const res = await graphqlClient.query(query);
                        newOptions[field.field] = res[queryName] || [];
                    } catch (err) {
                        console.error(`Error cargando opciones para ${field.field}:`, err);
                        newOptions[field.field] = [];
                    }
                }
            }
            setOptions(newOptions);
        }

        if (filterFields.length > 0) {
            loadOptions();
        }
    }, [filterFields]);

    // 3. Aplicar filtros cuando cambian
    useEffect(() => {
        if (!data || !filterFields.length) return;

        let filtered = [...data];
        for (const [field, value] of Object.entries(filters)) {
            if (!value || value === "" || value === "all") continue;

            const fieldDef = filterFields.find(f => f.field === field);
            if (!fieldDef) continue;

            const operator = filters[`${field}_op`] || "contains";
            const realField = field;

            switch (fieldDef.type) {
                case "text":
                    switch (operator) {
                        case "startsWith":
                            filtered = filtered.filter(item =>
                                String(item[realField] || "").toLowerCase().startsWith(value.toLowerCase())
                            );
                            break;
                        case "contains":
                            filtered = filtered.filter(item =>
                                String(item[realField] || "").toLowerCase().includes(value.toLowerCase())
                            );
                            break;
                        case "equals":
                            filtered = filtered.filter(item =>
                                String(item[realField] || "").toLowerCase() === value.toLowerCase()
                            );
                            break;
                        case "notEquals":
                            filtered = filtered.filter(item =>
                                String(item[realField] || "").toLowerCase() !== value.toLowerCase()
                            );
                            break;
                        case "notContains":
                            filtered = filtered.filter(item =>
                                !String(item[realField] || "").toLowerCase().includes(value.toLowerCase())
                            );
                            break;
                        default:
                            break;
                    }
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
    }, [filters, data, filterFields, onFilterChange]);

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
        const operator = filters[`${field.field}_op`] || "contains";

        if (field.type === "text")
            return (
                <div className="space-y-2">
                    <div className="flex space-x-2">
                        <select
                            className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={operator}
                            onChange={e => handleOperatorChange(field.field, e.target.value)}
                        >
                            {TEXT_OPERATORS.map(op => (
                                <option key={op.value} value={op.value}>
                                    {op.label}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={value}
                            onChange={e => handleChange(field.field, e.target.value)}
                            placeholder={`Buscar por ${field.label.toLowerCase()}...`}
                        />
                    </div>
                </div>
            );

        if (field.type === "number")
            return (
                <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={value}
                    onChange={e => handleChange(field.field, e.target.value)}
                    placeholder={`Buscar por ${field.label.toLowerCase()}...`}
                />
            );

        if (field.type === "boolean")
            return (
                <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Filtros</h3>
                    <button
                        onClick={clearFilters}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Limpiar
                    </button>
                </div>
            </div>

            <div className="p-4">
                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <span className="ml-2 text-gray-600">Cargando filtros...</span>
                    </div>
                ) : filterFields.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No hay filtros disponibles para este modelo
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filterFields.map(field => (
                            <div key={field.field} className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    {field.label}
                                </label>
                                {renderInput(field)}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Active filters display */}
            {Object.keys(filters).filter(key => !key.endsWith('_op') && filters[key] && filters[key] !== "").length > 0 && (
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
                        <span className="text-sm font-medium text-gray-700 mr-2">Filtros activos:</span>
                        {filterFields.map(field => {
                            const value = filters[field.field];
                            if (!value || value === "") return null;

                            return (
                                <span
                                    key={field.field}
                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                >
                                    {field.label}: {value}
                                    <button
                                        onClick={() => handleChange(field.field, "")}
                                        className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600"
                                    >
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}