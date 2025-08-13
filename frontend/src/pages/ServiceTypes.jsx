// frontend/src/pages/ServiceTypes.jsx
import { Plus, RefreshCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertLoading } from "~/components/AlertLoading";
import { ApiErrorMessage } from "~/components/ApiErrorMessage";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { TableActionButton } from "~/components/TableActionButtons";
import { AdminTable, AdminTableLoading } from "~/components/TanstackTable";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { Button } from "~/components/ui/button";
import { useGetAllServicetypesQuery } from "~/graphql/_generated/graphql";
import { serviceTypeOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import ServiceTypeCreate from "./ServiceTypeCreate";

export default function ServiceTypes() {
  const { data, error, loading, refetch } = useGetAllServicetypesQuery();
  const [serviceTypes, setServiceTypes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-servicetypes") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  const handleFilterChange = (filtered) => setServiceTypes(filtered);

  const handleCreate = useCallback(() => {
    openReactWindow(
      (popup) => (
        <ServiceTypeCreate
          onSave={() => {
            popup.opener.postMessage("reload-servicetypes", "*");
            popup.close();
          }}
          onClose={() => {
            popup.close();
            refetch();
          }}
        />
      ),
      "Nuevo Tipo de Servicio"
    );
  }, [refetch]);

  const handleEdit = useCallback(
    (st) => {
      openReactWindow(
        (popup) => (
          <ServiceTypeCreate
            serviceType={st}
            onSave={() => {
              popup.opener.postMessage("reload-servicetypes", "*");
              popup.close();
            }}
            onClose={() => {
              popup.close();
              refetch();
            }}
          />
        ),
        "Editar Tipo de Servicio"
      );
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("¿Borrar tipo de servicio?")) return;
      try {
        await serviceTypeOperations.deleteServicetype(id);
        refetch();
      } catch (err) {
        alert("Error al borrar tipo de servicio: " + err.message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    if (data?.allServicetypes) {
      setServiceTypes(data.allServicetypes);
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "ServiceTypeID",
        className: "first w-3",
      },
      {
        header: "Tipo",
        accessorKey: "Type",
      },
      {
        header: "",
        id: "actions",
        accessorKey: "ServiceTypeID",
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
        <h1 className="text-3xl font-bold text-foreground">
          Tipos de Servicio
        </h1>
        <div className="flex space-x-2">
          {data && data.allServicetypes.length > 0 && (
            <>
              <InputQuickSearch
                rows={data.allServicetypes}
                onSearch={(rows) => setServiceTypes(rows)}
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
            modelName="servicetypes"
            data={data.allServicetypes}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <ApiErrorMessage error={error} />}
      {loading && <AlertLoading />}
      <AdminTable columns={columns} data={serviceTypes} />
      {loading && <AdminTableLoading />}
    </div>
  );
}
