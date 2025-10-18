// frontend/src/pages/PriceListItemsBrowser.jsx
import type { ColumnDef } from "@tanstack/react-table";
import { BrushCleaning } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { DataTable } from "~/components/table/DataTable";
import {
  AdminTableLoading,
  EditableInput,
  TableActionButton,
  TableIsActiveCell,
} from "~/components/table/TableExtraComponents";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { CreateButton } from "~/components/ui-admin/CreateButton";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  useGetAllPricelistItemsQuery,
  useGetPricelistItemsFilteredLazyQuery,
  type PriceListItemsInDb
} from "~/graphql/_generated/graphql";
import { pricelistItemOperations } from "~/services/price-list.service";
import { openReactWindow } from "~/utils/openReactWindow";
import ItemSearchModal, { type SelectedItem } from "../../components/ItemSearchModal";
import PriceListItemsForm from "./form";

export default function PriceListItems() {
  const { data, loading, error } = useGetAllPricelistItemsQuery();
  console.log({ data, loading, error });
  const [
    getFiltered,
    {
      data: filteredResult,
      loading: loadingListFiltered,
      error: errorListFiltered,
      refetch,
    },
  ] = useGetPricelistItemsFilteredLazyQuery();

  const [priceListID, setPriceListID] = useState("");
  const [selectedItem, setSelectedItem] = useState<SelectedItem>();
  const [showFilters, setShowFilters] = useState(false);

  const priceLists = filteredResult?.pricelistitemsFiltered || data?.allPricelistitems || [];

  console.log({ priceListID, selectedItem });

  const fetchFiltered = useCallback(
    (priceListID = null) => {
      if (!priceListID && !selectedItem) return;
      console.log("getFiltered", { priceListID, selectedItem });
      getFiltered({
        variables: {
          priceListID,
          itemID: selectedItem?.itemID || null,
        },
      });
    },
    [selectedItem, getFiltered]
  );

  const handleSelectItem = (item: SelectedItem) => {
    console.log("handleSelectItem", item);
    setSelectedItem(item);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setPriceListID("");
    setSelectedItem(undefined);
  };

  const handleAdd = () => {
    openReactWindow(
      (popup) => <PriceListItems onClose={() => popup.close()} />,
      "Asignar precios a ítems",
      { width: 1000, height: 700 }
    );
  };

  const handleEdit = useCallback(
    (pricelist) => {
      console.log({ pricelist });
      openReactWindow(
        (popup) => (
          <PriceListItemsForm
            isOpen={true}
            onSave={() => {
              popup.opener.postMessage("reload", "*");
              popup.close();
            }}
            onClose={() => {
              setShowFilters(false);
              popup.close();
              refetch();
            }}
            onItemSelect={handleSelectItem}
            pricelist={pricelist}
          // setEditing({
          //   PriceListID: pl.PriceListID,
          //   ItemID: pl.ItemID,
          // });
          // setEditPrice(pl.Price);
          />
        ),
        "Editar Precio"
      );
    },
    [refetch]
  );

  const updatePrice = useCallback(
    async (row, value) => {
      console.log("updatePrice", { row, value });
      await pricelistItemOperations.updatePricelistItem(
        row.original.PriceListID,
        row.original.ItemID,
        { Price: parseFloat(value) }
      );
      refetch();
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  const columns = useMemo<ColumnDef<PriceListItemsInDb>[]>(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "PriceListID",
        className: "first w-3",
      },
      {
        header: "Item ID",
        accessorKey: "ItemID",
        className: "w-3",
      },
      {
        header: "Nombre",
        accessorKey: "PriceListData.PriceListName",
      },
      {
        header: "Descripción",
        accessorKey: "PriceListData.PriceListDescription",
      },
      {
        header: "Precio",
        accessorKey: "Price",
        className: "w-3",
        cell: ({ getValue, row }) => {
          return (
            <EditableInput
              defaultValue={getValue() as any}
              onSave={(value) => updatePrice(row, value)}
            />
          );
          // if (!editing) return getValue();
          // return (
          //   <Input
          //     defaultValue={editPrice || getValue()}
          //     type="number"
          //     step="0.01"
          //     onChange={(e) => setEditPrice(e.target.value)}
          //     className="w-24 border rounded p-1"
          //   />
          // );
        },
      },
      // {
      //   header: "Código",
      //   accessorKey: "Code",
      // },
      {
        header: "Estado",
        accessorKey: "PriceListData.IsActive",
        cell: (props) => <TableIsActiveCell {...props} />,
      },
      {
        header: "Última modificación",
        accessorKey: "EffectiveDate",
        cell: ({ getValue }) => getValue()?.slice(0, 10),
      },
      {
        header: "",
        id: "actions",
        enableHiding: false,
        accessorKey: "BrandID",
        cell: ({ row }) => (
          <TableActionButton
            row={row}
            onEdit={() => handleEdit(row.original)}
          />
        ),
      },
    ],
    [updatePrice, handleEdit]
  );

  return (
    <section className="section">
      <AdminTopBar title="Listas de precios - Items" quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {data && data.allPricelistitems.length > 0 && (
            <>
              <ShowFilterButton
                onClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
              />
            </>
          )}
          <CreateButton title="Agregar" onClick={handleAdd} />
        </div>
      </AdminTopBar>
      <div className="m-x-auto space-y-4 p-4">
        <div className="filters flex gap-2">
          <select
            value={priceListID}
            onChange={(e) => setPriceListID(e.target.value)}
            className="border p-2 rounded w-[220px]"
          >
            <option value="">Todas las listas</option>
            {priceLists?.map((pl) => (
              <option
                key={`select-${pl.PriceListID}-${pl.ItemID}`}
                value={pl.PriceListID}
              >
                {pl.PriceListData?.PriceListName}
              </option>
            ))}
          </select>
          <Input
            type="text"
            readOnly
            onClick={() => setShowFilters(true)}
            value={
              selectedItem
                ? `${selectedItem.code} - ${selectedItem.description}`
                : ""
            }
            placeholder="Buscar ítem"
          />
          <Button variant="primary" onClick={() => fetchFiltered()}>
            Filtrar
          </Button>
          <Button onClick={clearFilters}>
            <BrushCleaning />
            Limpiar
          </Button>
        </div>
        {error && <ApiErrorMessage error={error} />}
        {errorListFiltered && <ApiErrorMessage error={errorListFiltered} />}
        {loading && <AlertLoading />}
        {loadingListFiltered && <AlertLoading message="Cargando filtros..." />}

        {priceLists.length > 0 && (
          <DataTable columns={columns} data={priceLists} />
        )}
        {showFilters && (
          <ItemSearchModal
            isOpen={true}
            onClose={() => setShowFilters(false)}
            onItemSelect={handleSelectItem}
          />
        )}
        {loading && <AdminTableLoading />}
      </div>
    </section>
  );
}
