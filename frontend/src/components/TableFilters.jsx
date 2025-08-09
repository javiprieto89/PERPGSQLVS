// frontend/src/components/TableFilters.jsx
import { useCallback, useEffect, useMemo, useState } from "react";
import { graphqlClient } from "~/graphql/graphqlClient.js";

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
  Company: "Companydata",
  DocType: "Sysdoctypes",
  SysDocumentType: "Sysdocumenttypes",
  ItemCategory: "Itemcategories",
  ItemSubcategory: "Itemsubcategories",
  PriceList: "Pricelists",
  Supplier: "Suppliers",
  Vendor: "Vendors",
  Warehouse: "Warehouses",
  Brand: "Brands",
  CarBrand: "Carbrands",
  CarModel: "Carmodels",
  Client: "Clients",
  CreditCard: "Creditcards",
  CreditCardGroup: "Creditcardgroups",
  Discount: "Discounts",
  Item: "Items",
  Order: "Orders",
  OrderStatus: "Sysorderstatus",
  SaleCondition: "Saleconditions",
  ServiceType: "Servicetypes",
  User: "Users",
};

const nameFieldMap = {
  Vendor: "VendorName",
  Client: "FirstName", // Para clientes, usar FirstName como campo principal
  CreditCard: "CardName",
  CreditCardGroup: "GroupName",
  Discount: "DiscountName",
  ItemCategory: "CategoryName",
  ItemSubcategory: "SubcategoryName",
  OrderStatus: "StatusName",
  SaleCondition: "Name",
  ServiceType: "Name",
  User: "Fullname",
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
  const [componentKey, setComponentKey] = useState(0); // Para forzar re-renderizado

  // Memoizar el modelo y datos para evitar bucles
  const memoizedModelName = useMemo(() => modelName, [modelName]);
  const memoizedData = useMemo(() => data, [data]);

  // 1. Cargar definición de filtros del backend
  useEffect(() => {
    async function loadFilterFields() {
      if (!memoizedModelName) return;

      setLoading(true);
      try {
        const res = await graphqlClient.query(FILTER_FIELDS_QUERY, {
          model: memoizedModelName,
        });
        setFilterFields(res.filterFields || []);
      } catch (err) {
        console.error("Error cargando definición de filtros:", err);
        setFilterFields([]);
      }
      setLoading(false);
    }

    loadFilterFields();
  }, [memoizedModelName]);

  // 2. Cargar opciones para campos de tipo select
  useEffect(() => {
    async function loadOptions() {
      const selectFields = filterFields.filter((f) => f.type === "select");
      if (selectFields.length === 0) return;

      const newOptions = {};

      for (const field of selectFields) {
        if (field.relationModel) {
          try {
            // Para modelos dependientes, no cargar inicialmente
            if (field.dependsOn) {
              newOptions[field.field] = [];
            } else {
              const queryName = getQueryName(field.relationModel);
              const nameField = getNameField(field.relationModel);

              // Construir la query dinámicamente basada en el modelo
              let query;
              if (field.relationModel === "Client") {
                query = `{ ${queryName} { ${field.relationModel}ID FirstName LastName } }`;
              } else {
                query = `{ ${queryName} { ${field.relationModel}ID ${nameField} } }`;
              }

              const res = await graphqlClient.query(query);
              console.log("res", JSON.stringify(res));
              newOptions[field.field] = res[queryName] || [];
            }
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

  // 3. Aplicar filtros cuando cambian - OPTIMIZADO
  const applyFilters = useCallback(() => {
    if (!memoizedData || !filterFields.length) return;

    let filtered = [...memoizedData];

    for (const [field, value] of Object.entries(filters)) {
      if (!value || value === "" || value === "all") continue;

      const fieldDef = filterFields.find((f) => f.field === field);
      if (!fieldDef) continue;

      const operator = filters[`${field}_op`] || "contains";

      switch (fieldDef.type) {
        case "text":
          switch (operator) {
            case "startsWith":
              filtered = filtered.filter((item) =>
                String(item[field] || "")
                  .toLowerCase()
                  .startsWith(value.toLowerCase())
              );
              break;
            case "contains":
              filtered = filtered.filter((item) =>
                String(item[field] || "")
                  .toLowerCase()
                  .includes(value.toLowerCase())
              );
              break;
            case "equals":
              filtered = filtered.filter(
                (item) =>
                  String(item[field] || "").toLowerCase() ===
                  value.toLowerCase()
              );
              break;
            case "notEquals":
              filtered = filtered.filter(
                (item) =>
                  String(item[field] || "").toLowerCase() !==
                  value.toLowerCase()
              );
              break;
            case "notContains":
              filtered = filtered.filter(
                (item) =>
                  !String(item[field] || "")
                    .toLowerCase()
                    .includes(value.toLowerCase())
              );
              break;
            default:
              break;
          }
          break;
        case "number":
          filtered = filtered.filter(
            (item) => parseInt(item[field]) === parseInt(value)
          );
          break;
        case "boolean":
          filtered = filtered.filter(
            (item) => item[field] === (value === "true" || value === true)
          );
          break;
        case "select":
          filtered = filtered.filter((item) => item[field] == value);
          break;
        default:
          break;
      }
    }

    // Notificar siempre el resultado de filtrado
    onFilterChange(filtered);
  }, [filters, memoizedData, filterFields, onFilterChange]);

  // Aplicar filtros cuando cambian los filtros
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      applyFilters();
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timeoutId);
  }, [applyFilters]);

  // Función para cargar provincias por país
  const loadProvincesByCountry = async (countryID, fieldName) => {
    try {
      const response = await graphqlClient.query(`
                query { 
                    provincesByCountry(countryID: ${countryID}) { 
                        ProvinceID 
                        Name 
                    } 
                }
            `);
      setOptions((prev) => ({
        ...prev,
        [fieldName]: response.provincesByCountry || [],
      }));
    } catch (err) {
      console.error("Error cargando provincias:", err);
    }
  };

  // Función para cargar modelos por marca
  const loadModelsByBrand = async (brandID, fieldName) => {
    try {
      const response = await graphqlClient.query(`
                query { 
                    carmodelsByBrand(carBrandID: ${brandID}) { 
                        CarModelID 
                        Model 
                    } 
                }
            `);
      setOptions((prev) => ({
        ...prev,
        [fieldName]: response.carmodelsByBrand || [],
      }));
    } catch (err) {
      console.error("Error cargando modelos:", err);
    }
  };

  // Función para cargar subcategorías por categoría
  const loadSubcategoriesByCategory = async (categoryID, fieldName) => {
    try {
      const response = await graphqlClient.query(`
                query {
                    itemsubcategoriesByCategory(categoryID: ${categoryID}) {
                        ItemSubcategoryID
                        SubcategoryName
                    }
                }
            `);
      setOptions((prev) => ({
        ...prev,
        [fieldName]: response.itemsubcategoriesByCategory || [],
      }));
    } catch (err) {
      console.error("Error cargando subcategorías:", err);
    }
  };

  // Cargar sucursales por compañía
  const loadBranchesByCompany = async (companyID, fieldName) => {
    try {
      const response = await graphqlClient.query(`
                query {
                    branchesByCompany(companyID: ${companyID}) {
                        BranchID
                        Name
                    }
                }
            `);
      setOptions((prev) => ({
        ...prev,
        [fieldName]: response.branchesByCompany || [],
      }));
    } catch (err) {
      console.error("Error cargando sucursales:", err);
    }
  };

  const handleChange = useCallback(
    (field, value) => {
      setFilters((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Si es un padre (ej: país, marca, categoría), borra el valor del hijo dependiente
      const depField = filterFields.find((f) => f.dependsOn === field);
      if (depField) {
        setFilters((prev) => ({
          ...prev,
          [depField.field]: "",
          [`${depField.field}_op`]: "contains",
        }));

        // Cargar opciones dinámicamente para el campo dependiente
        if (value) {
          if (depField.relationModel === "Province" && field === "CountryID") {
            loadProvincesByCountry(value, depField.field);
          } else if (
            depField.relationModel === "CarModel" &&
            field === "CarBrandID"
          ) {
            loadModelsByBrand(value, depField.field);
          } else if (
            depField.relationModel === "ItemSubcategory" &&
            field === "ItemCategoryID"
          ) {
            loadSubcategoriesByCategory(value, depField.field);
          } else if (
            depField.relationModel === "Branch" &&
            field === "CompanyID"
          ) {
            loadBranchesByCompany(value, depField.field);
          }
        } else {
          // Si se deselecciona el padre, limpiar las opciones del hijo
          setOptions((prev) => ({
            ...prev,
            [depField.field]: [],
          }));
        }
      }
    },
    [filterFields]
  );

  const handleOperatorChange = useCallback((field, value) => {
    setFilters((prev) => ({
      ...prev,
      [`${field}_op`]: value,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    setComponentKey((prev) => prev + 1); // Forzar re-render
    // Aplicar datos originales inmediatamente
    onFilterChange(memoizedData);
  }, [memoizedData, onFilterChange]);

  // Función para formatear el nombre del cliente
  const formatClientName = useCallback((client) => {
    if (client.FirstName && client.LastName) {
      return `${client.FirstName} ${client.LastName}`;
    }
    return client.FirstName || client.LastName || `Cliente ${client.ClientID}`;
  }, []);

  // Render dinámico según definición
  const renderInput = useCallback(
    (field) => {
      const value = filters[field.field] || "";
      const operator = filters[`${field.field}_op`] || "contains";

      if (field.type === "text")
        return (
          <div className="space-y-2">
            <div className="flex space-x-2">
              <select
                className="w-32 px-3 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={operator}
                onChange={(e) =>
                  handleOperatorChange(field.field, e.target.value)
                }
              >
                {TEXT_OPERATORS.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="flex-1 px-3 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={value}
                onChange={(e) => handleChange(field.field, e.target.value)}
                placeholder={`Buscar por ${field.label.toLowerCase()}...`}
              />
            </div>
          </div>
        );

      if (field.type === "number")
        return (
          <input
            type="number"
            className="w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={value}
            onChange={(e) => handleChange(field.field, e.target.value)}
            placeholder={`Buscar por ${field.label.toLowerCase()}...`}
          />
        );

      if (field.type === "boolean")
        return (
          <select
            className="w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={value}
            onChange={(e) => handleChange(field.field, e.target.value)}
          >
            <option value="">Todos</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        );

      if (field.type === "select")
        return (
          <select
            className="w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={value}
            onChange={(e) => handleChange(field.field, e.target.value)}
            disabled={field.dependsOn && !filters[field.dependsOn]}
          >
            <option value="">Todos</option>
            {(options[field.field] || []).map((opt) => {
              // Manejar diferentes tipos de modelos
              const id = opt[`${field.relationModel}ID`];
              let displayName;

              if (field.relationModel === "Client") {
                displayName = formatClientName(opt);
              } else {
                const nameField = getNameField(field.relationModel);
                displayName = opt[nameField] || `${field.relationModel} ${id}`;
              }

              return (
                <option key={id} value={id}>
                  {displayName}
                </option>
              );
            })}
          </select>
        );
      return null;
    },
    [filters, options, handleChange, handleOperatorChange, formatClientName]
  );

  // Reset del componente cuando cambia el modelo
  useEffect(() => {
    setFilters({});
    setOptions({});
    setComponentKey((prev) => prev + 1);
  }, [memoizedModelName]);

  return (
    <div key={componentKey} className=" rounded-lg border ">
      <div className="px-4 py-3 border-b ">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-foreground">
            Filtros {memoizedModelName && `- ${memoizedModelName}`}
          </h3>
          <button
            onClick={clearFilters}
            className="inline-flex items-center px-3 py-1 border  shadow-sm text-sm leading-4 font-medium rounded-md text-foreground/80  hover: focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
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
          <div className="text-center py-8 text-foreground/80">
            No hay filtros disponibles para este modelo
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterFields.map((field) => (
              <div key={`${field.field}-${componentKey}`} className="space-y-1">
                <label className="block text-sm font-medium text-foreground/80">
                  {field.label}
                  {field.dependsOn && (
                    <span className="text-xs text-foreground/80 ml-1">
                      (depende de{" "}
                      {
                        filterFields.find((f) => f.field === field.dependsOn)
                          ?.label
                      }
                      )
                    </span>
                  )}
                </label>
                {renderInput(field)}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active filters display */}
      {Object.keys(filters).filter(
        (key) => !key.endsWith("_op") && filters[key] && filters[key] !== ""
      ).length > 0 && (
        <div className="px-4 py-3  border-t ">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-foreground/80 mr-2">
              Filtros activos:
            </span>
            {filterFields.map((field) => {
              const value = filters[field.field];
              if (!value || value === "") return null;

              // Mostrar valor legible para selects
              let displayValue = value;
              if (field.type === "select" && options[field.field]) {
                const selectedOption = options[field.field].find(
                  (opt) => opt[`${field.relationModel}ID`] == value
                );
                if (selectedOption) {
                  if (field.relationModel === "Client") {
                    displayValue = formatClientName(selectedOption);
                  } else {
                    const nameField = getNameField(field.relationModel);
                    displayValue = selectedOption[nameField] || value;
                  }
                }
              }

              return (
                <span
                  key={field.field}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-foreground"
                >
                  {field.label}: {displayValue}
                  <button
                    onClick={() => handleChange(field.field, "")}
                    className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-primary-foreground hover:bg-blue-200 hover:text-primary"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
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
