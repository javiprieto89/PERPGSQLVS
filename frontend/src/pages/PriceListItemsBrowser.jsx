// frontend/src/pages/PriceListItemsBrowser.jsx
import { useCallback, useEffect, useMemo, useState } from "react";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { AdminTable } from "~/components/table/AdminTable";
import {
  AdminTableLoading,
  EditableInput,
  TableActionButton,
  TableIsActiveCell,
} from "~/components/TableExtraComponents";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  useGetAllPricelistItemsQuery,
  useGetPricelistItemsFilteredLazyQuery,
} from "~/graphql/_generated/graphql";
import { pricelistItemOperations } from "~/graphql/operations.js";
import ItemSearchModal from "../components/ItemSearchModal";
import { openReactWindow } from "../utils/openReactWindow";
import PriceListCreate from "./PriceListCreate";
import PriceListItems from "./PriceListItems";

export default function PriceListItemsBrowser() {
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

  const [priceLists, setPriceLists] = useState([]);
  const [priceListID, setPriceListID] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  console.log({ priceListID, selectedItem });

  const fetchFiltered = useCallback(
    (priceListID = null) => {
      if (!priceListID && !selectedItem) return;
      console.log("getFiltered", { priceListID, selectedItem });
      getFiltered({
        variables: {
          priceListID,
          itemID: selectedItem?.ItemID || null,
        },
      });
    },
    [selectedItem, getFiltered]
  );

  const handleSelectItem = (item) => {
    console.log("handleSelectItem", item);
    setSelectedItem({
      ItemID: item.itemID,
      Code: item.code,
      Description: item.description,
    });
    setShowFilters(false);
  };

  const clearFilters = () => {
    setPriceListID("");
    setSelectedItem(null);
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
          <PriceListCreate
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

  // set filtered list
  useEffect(() => {
    if (filteredResult?.pricelistitemsFiltered) {
      setPriceLists(filteredResult.pricelistitemsFiltered);
    }
  }, [filteredResult]);

  // set all list information
  useEffect(() => {
    if (data?.allPricelistitems) {
      setPriceLists(data.allPricelistitems);
    }
  }, [data]);

  const columns = useMemo(
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
        accessorKey: "PriceListData.Name",
      },
      {
        header: "Descripción",
        accessorKey: "PriceListData.Description",
      },
      {
        header: "Precio",
        accessorKey: "Price",
        className: "w-3",
        cell: ({ getValue, row }) => {
          return (
            <EditableInput
              defaultValue={getValue()}
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
        accessorKey: "BrandID",
        cell: ({ row }) => (
          <TableActionButton onEdit={() => handleEdit(row.original)} />
        ),
      },
    ],
    [updatePrice, handleEdit]
  );

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Listas de precios - Items</h1>
      <div className="flex gap-2 items-center">
        {data && data.allPricelistitems.length > 0 && (
          <>
            <InputQuickSearch
              rows={data.allPricelistitems}
              onSearch={(rows) => setPriceLists(rows)}
            />
            <ShowFilterButton
              onClick={() => setShowFilters(!showFilters)}
              showFilters={showFilters}
            />
          </>
        )}
        <select
          value={priceListID}
          onChange={(e) => setPriceListID(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Todas las listas</option>
          {priceLists?.map((pl) => (
            <option
              key={`select-${pl.PriceListID}-${pl.ItemID}`}
              value={pl.PriceListID}
            >
              {pl.PriceListData.Name}
            </option>
          ))}
        </select>
        <Input
          type="text"
          readOnly
          onClick={() => setShowFilters(true)}
          value={
            selectedItem
              ? `${selectedItem.Code} - ${selectedItem.Description}`
              : ""
          }
          placeholder="Buscar ítem"
        />
        <Button variant="primary" onClick={() => fetchFiltered()}>
          Filtrar
        </Button>
        <Button onClick={clearFilters}>Limpiar</Button>
        <Button onClick={handleAdd}>Agregar</Button>
      </div>

      {error && <ApiErrorMessage error={error} />}
      {errorListFiltered && <ApiErrorMessage error={errorListFiltered} />}
      {loading && <AlertLoading />}
      {loadingListFiltered && <AlertLoading message="Cargando filtros..." />}

      {priceLists.length > 0 && (
        <AdminTable columns={columns} data={priceLists} />
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
  );
}
