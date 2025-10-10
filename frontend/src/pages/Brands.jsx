import { useCallback, useEffect, useMemo, useState } from "react";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { DataTable } from "~/components/table/DataTable";
import {
  AdminTableLoading,
  TableActionButton,
  TableIsActiveCell,
} from "~/components/table/TableExtraComponents";
import TableFilters from "~/components/TableFilters";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { CreateButton } from "~/components/ui-admin/CreateButton";
import { RefreshButton } from "~/components/ui-admin/RefreshButton";
import { useGetAllBrandsQuery } from "~/graphql/_generated/graphql";
import { brandOperations } from "~/services/brand.service";
import { openReactWindow } from "~/utils/openReactWindow";
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
        enableHiding: false,
        accessorKey: "BrandID",
        cell: ({ row, getValue }) => (
          <TableActionButton
            row={row}
            onDelete={() => handleDelete(getValue())}
            onEdit={() => handleEdit(row.original)}
          />
        ),
      },
    ],
    [handleDelete, handleEdit]
  );

  return (
    <section className="section">
      <AdminTopBar title="Marcas" quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {data && data.allBrands.length > 0 && (
            <>
              <ShowFilterButton
                onClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
              />
            </>
          )}
          <RefreshButton onClick={() => refetch()} loading={loading} />
          <CreateButton title="Nuevo" onClick={handleCreate} />
        </div>
      </AdminTopBar>
      <div className="m-x-auto space-y-4 p-4">
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
        {brands.length > 0 && <DataTable columns={columns} data={brands} />}
        {loading && <AdminTableLoading />}
      </div>
    </section>
  );
}
