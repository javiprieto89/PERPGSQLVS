// frontend/src/pages/Discounts.jsx
import { Plus, RefreshCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertLoading } from "~/components/AlertLoading";
import { ApiErrorMessage } from "~/components/ApiErrorMessage";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { TableActionButton } from "~/components/TableActionButtons";
import { AdminTable, AdminTableLoading } from "~/components/TanstackTable";
import { Button } from "~/components/ui/button";
import { useGetAllDiscountsQuery } from "~/graphql/_generated/graphql";
import { discountOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import DiscountCreate from "./DiscountCreate";

export default function Discounts() {
  const { data, error, loading, refetch } = useGetAllDiscountsQuery();
  const [discounts, setDiscounts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-discounts") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  const handleFilterChange = (filtered) => {
    setDiscounts(filtered);
  };

  const handleCreate = useCallback(() => {
    openReactWindow(
      (popup) => (
        <DiscountCreate
          onSave={() => {
            popup.opener.postMessage("reload-discounts", "*");
            popup.close();
          }}
          onClose={() => {
            popup.close();
            refetch();
          }}
        />
      ),
      "Nuevo Descuento"
    );
  }, [refetch]);

  const handleEdit = useCallback(
    (discount) => {
      openReactWindow(
        (popup) => (
          <DiscountCreate
            discount={discount}
            onSave={() => {
              popup.opener.postMessage("reload-discounts", "*");
              popup.close();
            }}
            onClose={() => {
              popup.close();
              refetch();
            }}
          />
        ),
        "Editar Descuento"
      );
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("¿Borrar descuento?")) return;
      try {
        await discountOperations.deleteDiscount(id);
        refetch();
      } catch (err) {
        alert("Error al borrar descuento: " + err.message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    if (data?.allDiscounts) {
      setDiscounts(data.allDiscounts);
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "DiscountID",
        className: "first w-3",
      },
      {
        header: "Name",
        accessorKey: "DiscountName",
      },
      {
        header: "Porcentaje",
        accessorKey: "Percentage",
        cell: ({ getValue }) => `${getValue()}%`,
      },
      {
        header: "",
        id: "actions",
        accessorKey: "DiscountID",
        cell: ({ row, getValue }) => (
          <TableActionButton
            onDelete={() => handleDelete(getValue())}
            onEdit={() => handleEdit(row.original)}
          />
        ),
      },
    ],
    [handleDelete, handleEdit]
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Descuentos</h1>
        <div className="flex space-x-2">
          {data && data.allDiscounts.length > 0 && (
            <>
              <InputQuickSearch
                rows={data.allDiscounts}
                onSearch={(rows) => setDiscounts(rows)}
              />
              <ShowFilterButton
                onClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
              />
            </>
          )}
          <Button onClick={() => refetch()}>
            <RefreshCcw />
            Recargar
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            <Plus />
            Nuevo
          </Button>
        </div>
      </div>
      {showFilters && (
        <div className="mb-6">
          <TableFilters
            modelName="discounts"
            data={data.allDiscounts}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <ApiErrorMessage error={error} />}
      {loading && <AlertLoading />}
      <AdminTable columns={columns} data={discounts || []} />
      {loading && <AdminTableLoading />}
    </div>
  );
}
