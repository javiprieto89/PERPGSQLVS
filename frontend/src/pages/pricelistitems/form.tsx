// frontend/src/pages/pricelistitems/form.tsx
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Input } from "~/components/form/Input";
import { Select } from "~/components/form/Select";
import ItemSearchModal, { type SelectedItem } from "~/components/ItemSearchModal";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  CreatePricelistItemDocument,
  GetAllPricelistItemsDocument,
  useGetAllPricelistItemsQuery,
  useGetPriceListsQuery
} from "~/graphql/_generated/graphql";

// Zod schema for price list item form
const priceListItemSchema = z.object({
  priceListId: z.string().min(1, "Debe seleccionar una lista de precios"),
  filterItemId: z.string().optional(),
});

type PriceListItemFilters = z.infer<typeof priceListItemSchema>;

// Interface for items in the form
interface PriceListItemRow {
  itemID: number;
  code: string;
  description: string;
  price: number;
  brandName?: string;
}

interface PriceListItemsFormProps {
  onClose?: () => void;
  onSaved?: () => void;
}

export default function PriceListItemsForm({ onClose, onSaved }: PriceListItemsFormProps) {
  // Local state for items being added
  const [items, setItems] = useState<PriceListItemRow[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterItem, setFilterItem] = useState<SelectedItem | null>(null);

  // React Hook Form with Zod validation
  const { register, watch, formState: { errors } } = useForm<PriceListItemFilters>({
    resolver: zodResolver(priceListItemSchema),
    defaultValues: {
      priceListId: "",
      filterItemId: "",
    },
  });

  const selectedPriceListId = watch("priceListId");

  // Apollo Query for price lists
  const { data: priceListsData, loading: priceListsLoading } = useGetPriceListsQuery({
    fetchPolicy: "cache-and-network",
  });

  const priceLists = priceListsData?.allPricelists || [];

  // Apollo Query for filtered price list items
  const {
    data: existingItemsData,
    loading: existingItemsLoading,
    refetch: refetchExistingItems,
  } = useGetAllPricelistItemsQuery({
    variables: {
      priceListID: selectedPriceListId ? Number(selectedPriceListId) : undefined,
      itemID: filterItem?.itemID ? Number(filterItem.itemID) : undefined,
    },
    skip: !selectedPriceListId && !filterItem,
    fetchPolicy: "cache-and-network",
  });

  const existingItems = existingItemsData?.allPricelistitems || [];

  // Apollo Mutation for creating price list items
  const [createPricelistItem, { loading: createLoading }] = useMutation(
    CreatePricelistItemDocument,
    {
      refetchQueries: [
        { query: GetAllPricelistItemsDocument },
        {
          query: GetAllPricelistItemsDocument,
          variables: {
            priceListID: selectedPriceListId ? Number(selectedPriceListId) : undefined,
            itemID: filterItem?.itemID ? Number(filterItem.itemID) : undefined,
          }
        }
      ],
      awaitRefetchQueries: true,
      onError: (error) => {
        console.error("Error creating price list item:", error);
        toast.error("Error al guardar ítem");
      },
    }
  );

  // Add item from modal
  const handleAddItem = (selectedItem: SelectedItem) => {
    // Check if item already exists in the list
    if (items.some((i) => i.itemID === selectedItem.itemID)) {
      alert("Este ítem ya está en la lista");
      return;
    }

    const newItem: PriceListItemRow = {
      itemID: selectedItem.itemID,
      code: selectedItem.code,
      description: selectedItem.description,
      price: selectedItem.price || 0,
      brandName: selectedItem.brandName,
    };

    setItems((prev) => [...prev, newItem]);
    setShowAddModal(false);
  };

  // Update price for an item
  const handleUpdatePrice = (itemID: number, newPrice: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.itemID === itemID
          ? { ...item, price: parseFloat(newPrice) || 0 }
          : item
      )
    );
  };

  // Remove item from list
  const handleRemoveItem = (itemID: number) => {
    setItems((prev) => prev.filter((item) => item.itemID !== itemID));
  };

  // Save all items
  const handleSaveAll = async () => {
    if (!selectedPriceListId) {
      toast.error("Debe seleccionar una lista de precios");
      return;
    }

    if (items.length === 0) {
      toast.error("Debe agregar al menos un ítem");
      return;
    }

    try {
      // Create all items
      const promises = items.map((item) =>
        createPricelistItem({
          variables: {
            input: {
              PriceListID: parseInt(selectedPriceListId, 10),
              ItemID: item.itemID,
              Price: item.price,
              EffectiveDate: new Date().toISOString(),
            },
          },
        })
      );

      await Promise.all(promises);

      // Clear the items list
      setItems([]);

      // Notify parent component
      if (window.opener) {
        window.opener.postMessage("reload-pricelistitems", "*");
      }

      onSaved?.();

      toast.success("Ítems guardados correctamente");
    } catch (error) {
      console.error("Error saving items:", error);
      toast.error("Error al guardar los ítems");
    }
  };

  // Handle filter item selection
  const handleFilterItemSelect = (selectedItem: SelectedItem) => {
    setFilterItem(selectedItem);
    setShowFilterModal(false);
  };

  // Clear filter
  const handleClearFilter = () => {
    setFilterItem(null);
  };

  // Selected price list name
  const selectedPriceListName = useMemo(() => {
    if (!selectedPriceListId || !priceLists) return "";
    const selected = priceLists.find(
      (pl) => pl.PriceListID === parseInt(selectedPriceListId, 10)
    );
    return selected?.PriceListName || "";
  }, [selectedPriceListId, priceLists]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Asignar Precios a Ítems</h2>
        <Button variant="outline" onClick={onClose}>
          Cerrar
        </Button>
      </div>

      {/* Filters Section */}
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-semibold">Filtros</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Price List Selector */}
          <div>
            <Select
              label="Lista de Precios"
              placeholder="Seleccione una lista..."
              error={errors.priceListId?.message}
              {...register("priceListId")}
            >
              <option value="">Seleccione una lista...</option>
              {priceLists?.map((pl) => (
                <option key={pl.PriceListID} value={pl.PriceListID.toString()}>
                  {pl.PriceListName}
                </option>
              ))}
            </Select>
          </div>

          {/* Filter by Item */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Filtrar por Ítem
            </label>
            <div className="flex gap-2">
              <Input
                type="text"
                readOnly
                value={
                  filterItem
                    ? `${filterItem.code} - ${filterItem.description}`
                    : ""
                }
                placeholder="Click para seleccionar ítem..."
                onClick={() => setShowFilterModal(true)}
                className="cursor-pointer flex-1"
              />
              {filterItem && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleClearFilter}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={() => setShowAddModal(true)}
          disabled={!selectedPriceListId}
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar Ítems
        </Button>
        <Button
          onClick={handleSaveAll}
          disabled={items.length === 0 || createLoading}
          variant="default"
        >
          {createLoading ? "Guardando..." : "Guardar Todo"}
        </Button>
      </div>

      {/* New Items Table */}
      {items.length > 0 && (
        <div className="border rounded-lg p-4 space-y-3">
          <h3 className="text-lg font-semibold">Ítems a Agregar</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Marca</TableHead>
                  <TableHead className="w-32">Precio</TableHead>
                  <TableHead className="w-20">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.itemID}>
                    <TableCell className="font-medium">{item.code}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.brandName || "-"}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={item.price}
                        onChange={(e) =>
                          handleUpdatePrice(item.itemID, e.target.value)
                        }
                        className="w-28"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.itemID)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Existing Items Table */}
      <div className="border rounded-lg p-4 space-y-3">
        <h3 className="text-lg font-semibold">
          Ítems Existentes
          {selectedPriceListName && ` - ${selectedPriceListName}`}
        </h3>

        {existingItemsLoading ? (
          <p className="text-center py-4 text-muted-foreground">
            Cargando ítems existentes...
          </p>
        ) : existingItems && existingItems.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item ID</TableHead>
                  <TableHead>Lista</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Fecha Efectiva</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {existingItems.map((item) => (
                  <TableRow key={`${item.PriceListID}-${item.ItemID}`}>
                    <TableCell>{item.ItemID}</TableCell>
                    <TableCell>
                      {item.PriceListData?.PriceListName || "-"}
                    </TableCell>
                    <TableCell>{item.EffectiveDate?.ItemCode || "-"}</TableCell>
                    <TableCell>
                      {item.PriceListData?.PriceListDescription || "-"}
                    </TableCell>
                    <TableCell>${item.Price.toFixed(2)}</TableCell>
                    <TableCell>
                      {item.EffectiveDate
                        ? new Date(item.EffectiveDate).toLocaleDateString()
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-center py-8 text-muted-foreground">
            {selectedPriceListId || filterItem
              ? "No se encontraron ítems con los filtros aplicados"
              : "Seleccione una lista de precios para ver los ítems existentes"}
          </p>
        )}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <ItemSearchModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onItemSelect={handleAddItem}
        />
      )}

      {/* Filter Item Modal */}
      {showFilterModal && (
        <ItemSearchModal
          isOpen={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          onItemSelect={handleFilterItemSelect}
        />
      )}
    </div>
  );
}
