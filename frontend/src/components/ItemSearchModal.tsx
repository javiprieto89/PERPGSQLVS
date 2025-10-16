// frontend/src/components/ItemSearchModal.tsx
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Input as FormInput } from "~/components/form/Input";
import { Select as FormSelect } from "~/components/form/Select";
import { brandOperations } from "~/services/brand.service";
import {
  itemCategoryOperations,
  itemOperations,
  itemSubcategoryOperations,
} from "~/services/item.service";
import { supplierOperations } from "~/services/supplier.service";
import type { MatchType } from "./filter/constants";
import type {
  GetAllItemsQuery,
  BrandsInDb,
  ItemCategoriesInDb,
  ItemSubcategoriesInDb,
  SuppliersInDb,
} from "~/graphql/_generated/graphql";

const defaultMatchType: MatchType = "contains";

// Zod schema for filter validation
const itemSearchFilterSchema = z.object({
  item_id: z.string(),
  code: z.string(),
  code_matchType: z.enum(["contains", "equals", "startsWith", "endsWith"]),
  description: z.string(),
  description_matchType: z.enum(["contains", "equals", "startsWith", "endsWith"]),
  brand_id: z.string(),
  category_id: z.string(),
  subcategory_id: z.string(),
  supplier_id: z.string(),
  oem: z.string(),
  oem_matchType: z.enum(["contains", "equals", "startsWith", "endsWith"]),
});

type ItemSearchFilters = z.infer<typeof itemSearchFilterSchema>;

// Type aliases for cleaner code
type ItemFromQuery = GetAllItemsQuery["allItems"][number];

// Selected item structure for parent component
export interface SelectedItem {
  itemID: number;
  code: string;
  description: string;
  price: number;
  brandName?: string;
  categoryName?: string;
  subcategoryName?: string;
  supplierName?: string;
  oem?: string | null;
}

interface ItemSearchModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onItemSelect: (item: SelectedItem) => void;
}

const defaultFilters: ItemSearchFilters = {
  item_id: "",
  code: "",
  code_matchType: defaultMatchType,
  description: "",
  description_matchType: defaultMatchType,
  brand_id: "",
  category_id: "",
  subcategory_id: "",
  supplier_id: "",
  oem: "",
  oem_matchType: defaultMatchType,
};

export default function ItemSearchModal({ isOpen, onClose, onItemSelect }: ItemSearchModalProps) {
  const [filteredResults, setFilteredResults] = useState<ItemFromQuery[]>([]);

  // React Hook Form with Zod validation
  const { register, watch, setValue, reset, formState: { errors } } = useForm<ItemSearchFilters>({
    resolver: zodResolver(itemSearchFilterSchema),
    defaultValues: defaultFilters,
  });

  const watchedFilters = watch();
  const categoryId = watch("category_id");

  // TanStack Query for all filter data (fetched together for better performance)
  const { data, isLoading } = useQuery({
    queryKey: ["itemSearchModal", "filterData"],
    queryFn: async () => {
      const [items, brands, categories, suppliers] = await Promise.all([
        itemOperations.getAllItems(),
        brandOperations.getAllBrands(),
        itemCategoryOperations.getAllItemCategories(),
        supplierOperations.getAllSuppliers(),
      ]);

      return { items, brands, categories, suppliers };
    },
    enabled: !!isOpen,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // TanStack Query for subcategories (conditional - only when category selected)
  const { data: subcategoriesData } = useQuery({
    queryKey: ["itemSubcategories", "byCategory", categoryId],
    queryFn: () => itemSubcategoryOperations.getItemSubcategoriesByCategory(categoryId!),
    enabled: !!isOpen && !!categoryId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const items = data?.items || [];
  const brands = data?.brands || [];
  const categories = data?.categories || [];
  const suppliers = data?.suppliers || [];
  const subcategories = subcategoriesData || [];

  // String filter helper function
  const applyStringFilter = useCallback((fieldValue: string, filterValue: string, matchType: MatchType): boolean => {
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
  }, []);

  // Apply filters to items
  const applyFilters = useCallback(() => {
    if (!items.length) {
      setFilteredResults([]);
      return;
    }

    const filtered = items.filter((item) => {
      // Filter by ID
      if (watchedFilters.item_id) {
        const itemIdNum = parseInt(watchedFilters.item_id, 10);
        if (!isNaN(itemIdNum) && item.ItemID !== itemIdNum) {
          return false;
        }
      }

      // Filter by code
      if (watchedFilters.code) {
        const codeMatch = applyStringFilter(
          item.ItemCode,
          watchedFilters.code,
          watchedFilters.code_matchType
        );
        if (!codeMatch) return false;
      }

      // Filter by description
      if (watchedFilters.description) {
        const descMatch = applyStringFilter(
          item.ItemDescription,
          watchedFilters.description,
          watchedFilters.description_matchType
        );
        if (!descMatch) return false;
      }

      // Filter by brand
      if (watchedFilters.brand_id) {
        const brandIdNum = parseInt(watchedFilters.brand_id, 10);
        if (!isNaN(brandIdNum) && item.BrandID !== brandIdNum) {
          return false;
        }
      }

      // Filter by category
      if (watchedFilters.category_id) {
        const categoryIdNum = parseInt(watchedFilters.category_id, 10);
        if (!isNaN(categoryIdNum) && item.ItemCategoryID !== categoryIdNum) {
          return false;
        }
      }

      // Filter by subcategory
      if (watchedFilters.subcategory_id) {
        const subcategoryIdNum = parseInt(watchedFilters.subcategory_id, 10);
        if (!isNaN(subcategoryIdNum) && item.ItemSubcategoryID !== subcategoryIdNum) {
          return false;
        }
      }

      // Filter by supplier
      if (watchedFilters.supplier_id) {
        const supplierIdNum = parseInt(watchedFilters.supplier_id, 10);
        if (!isNaN(supplierIdNum) && item.SupplierID !== supplierIdNum) {
          return false;
        }
      }

      // Filter by OEM
      if (watchedFilters.oem && item.OEM) {
        const oemMatch = applyStringFilter(
          item.OEM,
          watchedFilters.oem,
          watchedFilters.oem_matchType
        );
        if (!oemMatch) return false;
      }

      return true;
    });

    setFilteredResults(filtered);
  }, [items, watchedFilters, applyStringFilter]);

  // Auto-apply filters when items or filters change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Reset filters when modal opens
  useEffect(() => {
    if (isOpen) {
      reset(defaultFilters);
      setFilteredResults([]);
    }
  }, [isOpen, reset]);

  // Reset subcategory when category changes
  useEffect(() => {
    if (!categoryId) {
      setValue("subcategory_id", "");
    }
  }, [categoryId, setValue]);

  const handleItemSelect = (item: ItemFromQuery) => {
    const selectedItem: SelectedItem = {
      itemID: item.ItemID,
      code: item.ItemCode,
      description: item.ItemDescription,
      price: 0,
      brandName: item.BrandData?.BrandName,
      categoryName: item.CategoryData?.CategoryName,
      subcategoryName: undefined,
      supplierName: item.SupplierData 
        ? `${item.SupplierData.FirstName} ${item.SupplierData.LastName || ""}`.trim() 
        : undefined,
      oem: item.OEM,
    };

    console.log("Item seleccionado:", selectedItem);
    onItemSelect(selectedItem);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="bg-background/80 fixed inset-0 overflow-y-auto h-full w-full z-40 flex justify-center items-start pt-10">
      <div className="bg-background relative mx-auto p-5 border w-full max-w-6xl shadow-lg rounded-md space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b">
          <h3 className="text-2xl font-semibold">Buscar Ítems</h3>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-foreground"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Filters Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-md">
          {/* ID Item */}
          <div>
            <FormInput
              type="number"
              label="ID Ítem"
              placeholder="Filtrar por ID..."
              error={errors.item_id?.message}
              {...register("item_id")}
            />
          </div>

          {/* Code Filter */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-3 gap-2 items-end">
            <div className="col-span-2">
              <FormInput
                type="text"
                label="Código"
                placeholder="Filtrar por código..."
                error={errors.code?.message}
                {...register("code")}
              />
            </div>
            <div>
              <FormSelect
                {...register("code_matchType")}
                error={errors.code_matchType?.message}
              >
                <option value="contains">Contiene</option>
                <option value="equals">Es igual</option>
                <option value="startsWith">Comienza con</option>
                <option value="endsWith">Termina con</option>
              </FormSelect>
            </div>
          </div>

          {/* Description Filter */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-3 gap-2 items-end">
            <div className="col-span-2">
              <FormInput
                type="text"
                label="Descripción"
                placeholder="Filtrar por descripción..."
                error={errors.description?.message}
                {...register("description")}
              />
            </div>
            <div>
              <FormSelect
                {...register("description_matchType")}
                error={errors.description_matchType?.message}
              >
                <option value="contains">Contiene</option>
                <option value="equals">Es igual</option>
                <option value="startsWith">Comienza con</option>
                <option value="endsWith">Termina con</option>
              </FormSelect>
            </div>
          </div>

          {/* Brand */}
          <div>
            <FormSelect
              label="Marca"
              placeholder="Todas"
              error={errors.brand_id?.message}
              {...register("brand_id")}
            >
              <option value="">Todas</option>
              {brands.map((brand) => (
                <option key={brand.BrandID} value={brand.BrandID.toString()}>
                  {brand.BrandName}
                </option>
              ))}
            </FormSelect>
          </div>

          {/* Category */}
          <div>
            <FormSelect
              label="Categoría"
              placeholder="Todas"
              error={errors.category_id?.message}
              {...register("category_id")}
            >
              <option value="">Todas</option>
              {categories.map((cat) => (
                <option key={cat.ItemCategoryID} value={cat.ItemCategoryID.toString()}>
                  {cat.CategoryName}
                </option>
              ))}
            </FormSelect>
          </div>

          {/* Subcategory */}
          <div>
            <FormSelect
              label="Subcategoría"
              placeholder="Todas"
              disabled={!categoryId || subcategories.length === 0}
              error={errors.subcategory_id?.message}
              {...register("subcategory_id")}
            >
              <option value="">Todas</option>
              {subcategories.map((sub) => (
                <option key={sub.ItemSubcategoryID} value={sub.ItemSubcategoryID.toString()}>
                  {sub.SubcategoryName}
                </option>
              ))}
            </FormSelect>
          </div>

          {/* Supplier */}
          <div>
            <FormSelect
              label="Proveedor"
              placeholder="Todos"
              error={errors.supplier_id?.message}
              {...register("supplier_id")}
            >
              <option value="">Todos</option>
              {suppliers.map((sup) => (
                <option key={sup.SupplierID} value={sup.SupplierID.toString()}>
                  {`${sup.FirstName} ${sup.LastName || ""}`.trim()}
                </option>
              ))}
            </FormSelect>
          </div>

          {/* OEM Filter */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-3 gap-2 items-end">
            <div className="col-span-2">
              <FormInput
                type="text"
                label="OEM"
                placeholder="Filtrar por OEM..."
                error={errors.oem?.message}
                {...register("oem")}
              />
            </div>
            <div>
              <FormSelect
                {...register("oem_matchType")}
                error={errors.oem_matchType?.message}
              >
                <option value="contains">Contiene</option>
                <option value="equals">Es igual</option>
                <option value="startsWith">Comienza con</option>
                <option value="endsWith">Termina con</option>
              </FormSelect>
            </div>
          </div>

          {/* Search Button */}
          <div className="lg:col-start-3 flex items-end">
            <Button 
              type="button" 
              onClick={applyFilters} 
              disabled={isLoading} 
              className="w-full"
            >
              {isLoading ? "Buscando..." : "Buscar"}
            </Button>
          </div>
        </form>

        {/* Results Table */}
        <div className="overflow-x-auto max-h-96">
          <Table className="min-w-full">
            <TableHeader className="sticky top-0 bg-background">
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
              {filteredResults.length > 0 ? (
                filteredResults.map((item) => (
                  <TableRow key={item.ItemID}>
                    <TableCell>{item.ItemID}</TableCell>
                    <TableCell>{item.ItemCode}</TableCell>
                    <TableCell className="truncate max-w-xs">
                      {item.ItemDescription}
                    </TableCell>
                    <TableCell>{item.BrandData?.BrandName || "-"}</TableCell>
                    <TableCell>{item.CategoryData?.CategoryName || "-"}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      {item.SupplierData 
                        ? `${item.SupplierData.FirstName} ${item.SupplierData.LastName || ""}`.trim()
                        : "-"
                      }
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      <Button
                        variant="link"
                        onClick={() => handleItemSelect(item)}
                        className="text-indigo-600 hover:text-indigo-900 p-0 h-auto"
                      >
                        Seleccionar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="px-4 py-10 text-center text-sm text-foreground/80"
                  >
                    {isLoading
                      ? "Cargando resultados..."
                      : "No se encontraron ítems con los filtros aplicados."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t flex justify-end gap-2">
          <Button variant="secondary" onClick={() => reset(defaultFilters)}>
            Limpiar Filtros
          </Button>
          <Button onClick={onClose}>Cerrar</Button>
        </div>
      </div>
    </div>
  );
}
