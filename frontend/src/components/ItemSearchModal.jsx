// frontend/src/components/ItemSearchModal.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    brandOperations,
    itemCategoryOperations,
    itemSubcategoryOperations,
    supplierOperations,
    itemOperations,
} from "../utils/graphqlClient";

export default function ItemSearchModal({
    isOpen,
    onClose,
    onItemSelect,
}) {
    const [filters, setFilters] = useState({
        item_id: "",
        code: { value: "", matchType: "contains" },
        description: { value: "", matchType: "contains" },
        brand_id: "",
        category_id: "",
        subcategory_id: "",
        supplier_id: "",
        oem: { value: "", matchType: "contains" },
    });
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Estados para poblar los dropdowns de filtros
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const filtersRef = useRef(filters);
    useEffect(() => {
        filtersRef.current = filters;
    }, [filters]);

    const handleSearch = useCallback(async () => {
        const currentFilters = filtersRef.current;
        setIsLoading(true);
        try {
            const items = await itemOperations.getAllItems();
            const filtered = items.filter((it) => {
                // Filtro por ID exacto si está especificado
                if (currentFilters.item_id && it.itemID !== parseInt(currentFilters.item_id)) {
                    return false;
                }

                // Filtro por código
                if (currentFilters.code.value) {
                    const codeMatch = applyStringFilter(
                        it.Code || "",
                        currentFilters.code.value,
                        currentFilters.code.matchType
                    );
                    if (!codeMatch) return false;
                }

                // Filtro por descripción
                if (currentFilters.description.value) {
                    const descMatch = applyStringFilter(
                        it.Description || "",
                        currentFilters.description.value,
                        currentFilters.description.matchType
                    );
                    if (!descMatch) return false;
                }

                // Filtro por marca
                if (currentFilters.brand_id && it.BrandID !== parseInt(currentFilters.brand_id)) {
                    return false;
                }

                // Filtro por categoría
                if (currentFilters.category_id && it.ItemCategoryID !== parseInt(currentFilters.category_id)) {
                    return false;
                }

                // Filtro por subcategoría
                if (currentFilters.subcategory_id && it.ItemSubcategoryID !== parseInt(currentFilters.subcategory_id)) {
                    return false;
                }

                // Filtro por proveedor
                if (currentFilters.supplier_id && it.SupplierID !== parseInt(currentFilters.supplier_id)) {
                    return false;
                }

                // Filtro por OEM
                if (currentFilters.oem.value) {
                    const oemMatch = applyStringFilter(
                        it.OEM || "",
                        currentFilters.oem.value,
                        currentFilters.oem.matchType
                    );
                    if (!oemMatch) return false;
                }

                return true;
            });
            setResults(filtered);
        } catch (error) {
            console.error("ItemSearchModal - Error searching items:", error);
            setResults([]);
        }
        setIsLoading(false);
    }, []);

    // Función auxiliar para aplicar filtros de string
    const applyStringFilter = (fieldValue, filterValue, matchType) => {
        const field = fieldValue.toLowerCase();
        const filter = filterValue.toLowerCase();

        switch (matchType) {
            case "equals":
                return field === filter;
            case "startsWith":
                return field.startsWith(filter);
            case "endsWith":
                return field.endsWith(filter);
            case "contains":
            default:
                return field.includes(filter);
        }
    };

    useEffect(() => {
        if (isOpen) {
            const fetchFilterData = async () => {
                try {
                    const [brandsData, categoriesData, suppliersData] = await Promise.all([
                        brandOperations.getAllBrands(),
                        itemCategoryOperations.getAllItemCategories(),
                        supplierOperations.getAllSuppliers(),
                    ]);
                    setBrands(brandsData || []);
                    setCategories(categoriesData || []);
                    setSuppliers(suppliersData || []);
                } catch (error) {
                    console.error("Error fetching filter data for item search modal:", error);
                }
            };
            fetchFilterData();

            // Resetear resultados y filtros al abrir
            setResults([]);
            setFilters({
                item_id: "",
                code: { value: "", matchType: "contains" },
                description: { value: "", matchType: "contains" },
                brand_id: "",
                category_id: "",
                subcategory_id: "",
                supplier_id: "",
                oem: { value: "", matchType: "contains" },
            });

            // Cargar todos los ítems inicialmente
            handleSearch();
        }
    }, [isOpen, handleSearch]);

    // Cargar subcategorías cuando cambie la categoría seleccionada
    useEffect(() => {
        if (filters.category_id) {
            itemSubcategoryOperations
                .getItemSubcategoriesByCategory(filters.category_id)
                .then((data) => setSubcategories(data || []))
                .catch((error) => {
                    console.error("Error fetching subcategories:", error);
                    setSubcategories([]);
                });
        } else {
            setSubcategories([]);
        }
    }, [filters.category_id]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        if (name.endsWith("_matchType")) {
            const filterName = name.replace("_matchType", "");
            setFilters((prev) => ({
                ...prev,
                [filterName]: { ...prev[filterName], matchType: value },
            }));
        } else if (
            filters[name] &&
            typeof filters[name] === "object" &&
            Object.prototype.hasOwnProperty.call(filters[name], "value")
        ) {
            setFilters((prev) => ({
                ...prev,
                [name]: { ...prev[name], value: value },
            }));
        } else {
            setFilters((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleItemSelect = (item) => {
        // Preparar el objeto del ítem con toda la información necesaria
        const selectedItem = {
            itemID: item.itemID || item.ItemID, // Asegurar compatibilidad con ambos formatos
            code: item.Code,
            description: item.description || item.Description,
            price: item.price || 0, // Precio base del ítem
            brandName: item.BrandName,
            categoryName: item.categoryName,
            subcategoryName: item.subcategoryName,
            supplierName: item.SupplierName,
            oem: item.OEM,
        };

        console.log("Item seleccionado:", selectedItem); // Debug log
        onItemSelect(selectedItem);
    };

    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-40 flex justify-center items-start pt-10">
            <div className="relative mx-auto p-5 border w-full max-w-6xl shadow-lg rounded-md bg-white space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                    <h3 className="text-2xl font-semibold text-gray-700">Buscar Ítems</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Filtros */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-md bg-gray-50">
                    {/* ID Ítem */}
                    <div>
                        <label htmlFor="filter_item_id" className="block text-sm font-medium text-gray-700">
                            ID Ítem
                        </label>
                        <input
                            type="number"
                            name="item_id"
                            id="filter_item_id"
                            value={filters.item_id}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                        />
                    </div>

                    {/* Filtro Código con tipo de concordancia */}
                    <div className="col-span-1 md:col-span-2 grid grid-cols-3 gap-2 items-end">
                        <div className="col-span-2">
                            <label htmlFor="filter_code" className="block text-sm font-medium text-gray-700">
                                Código
                            </label>
                            <input
                                type="text"
                                name="code"
                                id="filter_code"
                                value={filters.code.value}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                            />
                        </div>
                        <div>
                            <select
                                name="code_matchType"
                                value={filters.code.matchType}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                            >
                                <option key="contains" value="contains">Contiene</option>
                                <option key="equals" value="equals">Es igual</option>
                                <option key="startsWith" value="startsWith">Comienza con</option>
                                <option key="endsWith" value="endsWith">Termina con</option>
                            </select>
                        </div>
                    </div>

                    {/* Filtro Descripción con tipo de concordancia */}
                    <div className="col-span-1 md:col-span-2 grid grid-cols-3 gap-2 items-end">
                        <div className="col-span-2">
                            <label htmlFor="filter_description" className="block text-sm font-medium text-gray-700">
                                Descripción
                            </label>
                            <input
                                type="text"
                                name="description"
                                id="filter_description"
                                value={filters.description.value}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                            />
                        </div>
                        <div>
                            <select
                                name="description_matchType"
                                value={filters.description.matchType}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                            >
                                <option key="contains" value="contains">Contiene</option>
                                <option key="equals" value="equals">Es igual</option>
                                <option key="startsWith" value="startsWith">Comienza con</option>
                                <option key="endsWith" value="endsWith">Termina con</option>
                            </select>
                        </div>
                    </div>

                    {/* Marca */}
                    <div>
                        <label htmlFor="filter_brand_id" className="block text-sm font-medium text-gray-700">
                            Marca
                        </label>
                        <select
                            name="brand_id"
                            id="filter_brand_id"
                            value={filters.brand_id}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                        >
                            <option value="">Todas</option>                            
                            {brands.map((brand, idx) => (
                                <option key={brand.brandID || `brand-${idx}`} value={brand.brandID}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Categoría */}
                    <div>
                        <label htmlFor="filter_category_id" className="block text-sm font-medium text-gray-700">
                            Categoría
                        </label>
                        <select
                            name="category_id"
                            id="filter_category_id"
                            value={filters.category_id}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                        >
                            <option value="">Todas</option>
                            {categories.map((cat, idx) => (
                                <option key={cat.categoryID || `cat-${idx}`} value={cat.categoryID}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Subcategoría */}
                    <div>
                        <label htmlFor="filter_subcategory_id" className="block text-sm font-medium text-gray-700">
                            Subcategoría
                        </label>
                        <select
                            name="subcategory_id"
                            id="filter_subcategory_id"
                            value={filters.subcategory_id}
                            onChange={handleFilterChange}
                            disabled={!filters.category_id || subcategories.length === 0}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm disabled:bg-gray-100"
                        >
                            <option value="">Todas</option>
                            {subcategories.map((sub, idx) => (
                                <option key={sub.subcategoryID || `sub-${idx}`} value={sub.subcategoryID}>
                                    {sub.subcategoryName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Proveedor */}
                    <div>
                        <label htmlFor="filter_supplier_id" className="block text-sm font-medium text-gray-700">
                            Proveedor
                        </label>
                        <select
                            name="supplier_id"
                            id="filter_supplier_id"
                            value={filters.supplier_id}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                        >
                            <option value="">Todos</option>
                            {suppliers.map((sup, idx) => (
                                <option key={sup.supplierID || `sup-${idx}`} value={sup.supplierID}>
                                    {`${sup.firstName} ${sup.lastName || ""}`.trim()}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Filtro OEM con tipo de concordancia */}
                    <div className="col-span-1 md:col-span-2 grid grid-cols-3 gap-2 items-end">
                        <div className="col-span-2">
                            <label htmlFor="filter_oem" className="block text-sm font-medium text-gray-700">
                                OEM
                            </label>
                            <input
                                type="text"
                                name="oem"
                                id="filter_oem"
                                value={filters.oem.value}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                            />
                        </div>
                        <div>
                            <select
                                name="oem_matchType"
                                value={filters.oem.matchType}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                            >
                                <option key="contains" value="contains">Contiene</option>
                                <option key="equals" value="equals">Es igual</option>
                                <option key="startsWith" value="startsWith">Comienza con</option>
                                <option key="endsWith" value="endsWith">Termina con</option>
                            </select>
                        </div>
                    </div>

                    {/* Botón de búsqueda */}
                    <div className="lg:col-start-3 flex items-end">
                        <button
                            onClick={handleSearch}
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm text-sm disabled:opacity-50"
                        >
                            {isLoading ? "Buscando..." : "Buscar"}
                        </button>
                    </div>
                </div>

                {/* Resultados */}
                <div className="overflow-x-auto max-h-96">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcat.</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proveedor</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {results.length > 0 ? (
                                results.map((item, idx) => (
                                    <tr key={item.itemID || `item-${idx}`} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                            {item.itemID}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                            {item.Code}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">
                                            {item.description}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                            {item.BrandName}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                            {item.categoryName}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                            {item.subcategoryName}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                            {item.SupplierName}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleItemSelect(item)}
                                                className="text-indigo-600 hover:text-indigo-900 font-medium"
                                            >
                                                Seleccionar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr key="no-results">
                                    <td
                                        colSpan="8"
                                        className="px-4 py-10 text-center text-sm text-gray-500"
                                    >
                                        {isLoading
                                            ? "Cargando resultados..."
                                            : "No se encontraron ítems con los filtros aplicados o no se ha realizado una búsqueda."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="pt-3 border-t flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md shadow-sm text-sm"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}