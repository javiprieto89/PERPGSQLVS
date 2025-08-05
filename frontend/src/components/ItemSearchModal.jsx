// frontend/src/components/ItemSearchModal.jsx
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  brandOperations,
  itemCategoryOperations,
  itemOperations,
  itemSubcategoryOperations,
  supplierOperations,
} from "~/graphql/operations.js";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function ItemSearchModal({ isOpen, onClose, onItemSelect }) {
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
        if (
          currentFilters.item_id &&
          it.itemID !== parseInt(currentFilters.item_id)
        ) {
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
        if (
          currentFilters.brand_id &&
          it.BrandID !== parseInt(currentFilters.brand_id)
        ) {
          return false;
        }

        // Filtro por categoría
        if (
          currentFilters.category_id &&
          it.ItemCategoryID !== parseInt(currentFilters.category_id)
        ) {
          return false;
        }

        // Filtro por subcategoría
        if (
          currentFilters.subcategory_id &&
          it.ItemSubcategoryID !== parseInt(currentFilters.subcategory_id)
        ) {
          return false;
        }

        // Filtro por proveedor
        if (
          currentFilters.supplier_id &&
          it.SupplierID !== parseInt(currentFilters.supplier_id)
        ) {
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
          const [brandsData, categoriesData, suppliersData] = await Promise.all(
            [
              brandOperations.getAllBrands(),
              itemCategoryOperations.getAllItemCategories(),
              supplierOperations.getAllSuppliers(),
            ]
          );
          setBrands(brandsData || []);
          setCategories(categoriesData || []);
          setSuppliers(suppliersData || []);
        } catch (error) {
          console.error(
            "Error fetching filter data for item search modal:",
            error
          );
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
    <div className="bg-background/80 fixed inset-0 overflow-y-auto h-full w-full z-40 flex justify-center items-start pt-10">
      <div className="bg-background relative mx-auto p-5 border w-full max-w-6xl shadow-lg rounded-md space-y-4">
        <div className="flex justify-between items-center pb-3 border-b">
          <h3 className="text-2xl font-semibold">Buscar Ítems</h3>
          <Button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
          </Button>
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-md">
          {/* ID Ítem */}
          <div>
            <Label htmlFor="filter_item_id">ID Ítem</Label>
            <Input
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
              <Label htmlFor="filter_code">Código</Label>
              <Input
                type="text"
                name="code"
                id="filter_code"
                value={filters.code.value}
                onChange={handleFilterChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
              />
            </div>
            <div>
              <Select
                name="code_matchType"
                value={filters.code.matchType}
                onChange={handleFilterChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="contains" value="contains">
                    Contiene
                  </SelectItem>
                  <SelectItem key="equals" value="equals">
                    Es igual
                  </SelectItem>
                  <SelectItem key="startsWith" value="startsWith">
                    Comienza con
                  </SelectItem>
                  <SelectItem key="endsWith" value="endsWith">
                    Termina con
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filtro Descripción con tipo de concordancia */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-3 gap-2 items-end">
            <div className="col-span-2">
              <Label htmlFor="filter_description">Descripción</Label>
              <Input
                type="text"
                name="description"
                id="filter_description"
                value={filters.description.value}
                onChange={handleFilterChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
              />
            </div>
            <div>
              <Select
                name="description_matchType"
                value={filters.description.matchType}
                onChange={handleFilterChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="contains" value="contains">
                    Contiene
                  </SelectItem>
                  <SelectItem key="equals" value="equals">
                    Es igual
                  </SelectItem>
                  <SelectItem key="startsWith" value="startsWith">
                    Comienza con
                  </SelectItem>
                  <SelectItem key="endsWith" value="endsWith">
                    Termina con
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Marca */}
          <div>
            <Label htmlFor="filter_brand_id">Marca</Label>
            <Select
              name="brand_id"
              id="filter_brand_id"
              value={filters.brand_id}
              onChange={handleFilterChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas" value="" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand, idx) => (
                  <SelectItem
                    key={brand.brandID || `brand-${idx}`}
                    value={brand.brandID}
                  >
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Categoría */}
          <div>
            <Label htmlFor="filter_category_id">Categoría</Label>
            <Select
              name="category_id"
              id="filter_category_id"
              value={filters.category_id}
              onChange={handleFilterChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas" value="" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat, idx) => (
                  <SelectItem
                    key={cat.categoryID || `cat-${idx}`}
                    value={cat.categoryID}
                  >
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subcategoría */}
          <div>
            <Label htmlFor="filter_subcategory_id">Subcategoría</Label>
            <Select
              name="subcategory_id"
              id="filter_subcategory_id"
              value={filters.subcategory_id}
              onChange={handleFilterChange}
              disabled={!filters.category_id || subcategories.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas" value="" />
              </SelectTrigger>
              <SelectContent>
                {subcategories.map((sub, idx) => (
                  <SelectItem
                    key={sub.subcategoryID || `sub-${idx}`}
                    value={sub.subcategoryID}
                  >
                    {sub.subcategoryName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Proveedor */}
          <div>
            <Label htmlFor="filter_supplier_id">Proveedor</Label>
            <Select
              name="supplier_id"
              id="filter_supplier_id"
              value={filters.supplier_id}
              onChange={handleFilterChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos" value="" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((sup, idx) => (
                  <SelectItem
                    key={sup.supplierID || `sup-${idx}`}
                    value={sup.supplierID}
                  >
                    {`${sup.firstName} ${sup.lastName || ""}`.trim()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filtro OEM con tipo de concordancia */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-3 gap-2 items-end">
            <div className="col-span-2">
              <Label htmlFor="filter_oem">OEM</Label>
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
              <Select
                name="oem_matchType"
                value={filters.oem.matchType}
                onChange={handleFilterChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="contains" value="contains">
                    Contiene
                  </SelectItem>
                  <SelectItem key="equals" value="equals">
                    Es igual
                  </SelectItem>
                  <SelectItem key="startsWith" value="startsWith">
                    Comienza con
                  </SelectItem>
                  <SelectItem key="endsWith" value="endsWith">
                    Termina con
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Botón de búsqueda */}
          <div className="lg:col-start-3 flex items-end">
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? "Buscando..." : "Buscar"}
            </Button>
          </div>
        </div>

        {/* Resultados */}
        <div className="overflow-x-auto max-h-96">
          <Table className="min-w-full">
            <TableHeader className="sticky top-0">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Subcat.</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.length > 0 ? (
                results.map((item, idx) => (
                  <TableRow key={item.itemID || `item-${idx}`}>
                    <TableCell>{item.itemID}</TableCell>
                    <TableCell>{item.Code}</TableCell>
                    <TableCell className="truncate">
                      {item.description}
                    </TableCell>
                    <TableCell>{item.BrandName}</TableCell>
                    <TableCell>{item.categoryName}</TableCell>
                    <TableCell>{item.subcategoryName}</TableCell>
                    <TableCell>{item.SupplierName}</TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleItemSelect(item)}
                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                      >
                        Seleccionar
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow key="no-results">
                  <TableCell
                    colSpan="8"
                    className="px-4 py-10 text-center text-sm text-gray-500"
                  >
                    {isLoading
                      ? "Cargando resultados..."
                      : "No se encontraron ítems con los filtros aplicados o no se ha realizado una búsqueda."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="pt-3 border-t flex justify-end">
          <Button onClick={onClose}>Cerrar</Button>
        </div>
      </div>
    </div>
  );
}
