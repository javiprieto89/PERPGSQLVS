import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { RefreshButton } from "~/components/RefreshButton";
import { AdminTable } from "~/components/table/AdminTable";
import {
  AdminTableLoading,
  TableActionButton,
  TableIsActiveCell,
} from "~/components/TableExtraComponents";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { Button } from "~/components/ui/button";
import { useGetAllBrandsQuery } from "~/graphql/_generated/graphql";
import { brandOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import BrandCreate from "./BrandCreate";

export default function Brands() {
  const { data, error, loading, refetch } = useGetAllBrandsQuery();
  const [brands, setBrands] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleCreate = () => {
    openReactWindow(
      (popup) => (
        <BrandCreate
          onSave={() => {
            popup.opener.postMessage("reload-brands", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Nueva Marca"
    );
  };

  const handleFilterChange = (filtered) => {
    setBrands(filtered);
  };

  const handleEdit = useCallback(
    (brand) => {
      openReactWindow(
        (popup) => (
          <BrandCreate
            brand={brand}
            onSave={() => {
              popup.opener.postMessage("reload-brands", "*");
              popup.close();
            }}
            onClose={() => {
              popup.close();
              refetch();
            }}
          />
        ),
        "Editar Marca"
      );
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("¿Borrar marca?")) return;
      try {
        await brandOperations.deleteBrand(id);
        refetch();
      } catch (err) {
        alert("Error al borrar marca: " + err.message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-brands") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    if (data?.allBrands) {
      setBrands(data.allBrands);
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "BrandID",
        className: "first w-3",
      },
      {
        header: "Nombre",
        accessorKey: "Name",
      },
      {
        header: "Estado",
        accessorKey: "IsActive",
        cell: (props) => <TableIsActiveCell {...props} />,
      },
      {
        header: "",
        id: "actions",
        accessorKey: "BrandID",
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
        <h1 className="text-3xl font-bold text-foreground">Marcas</h1>
        <div className="flex space-x-2">
          {data && data.allBrands.length > 0 && (
            <>
              <InputQuickSearch
                rows={data.allBrands}
                onSearch={(rows) => setBrands(rows)}
              />
              <ShowFilterButton
                onClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
              />
            </>
          )}
          <RefreshButton onClick={() => refetch()} loading={loading} />
          <Button variant="primary" onClick={handleCreate}>
            <Plus strokeWidth={3} />
            Nuevo
          </Button>
        </div>
      </div>
      {showFilters && (
        <div className="mb-6">
          <TableFilters
            modelName="brands"
            data={data?.allBrands || []}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <ApiErrorMessage error={error} />}
      {loading && <AlertLoading />}
      {brands.length > 0 && <AdminTable columns={columns} data={brands} />}
      {loading && <AdminTableLoading />}
    </div>
  );
}
