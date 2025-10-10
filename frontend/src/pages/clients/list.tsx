import { type ColumnDef } from "@tanstack/react-table";
import { Plus, UserRoundPlus, Users } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useGetAllClientsQuery, type ClientsInDb } from "~/graphql/_generated/graphql";

import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { DataTable } from "~/components/table/DataTable";
import {
  AdminTableLoading,
  TableActionButton,
  TableIsActiveCell,
} from "~/components/table/TableExtraComponents";
import TableFilters from "~/components/TableFilters";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { RefreshButton } from "~/components/ui-admin/RefreshButton";
import { Button } from "~/components/ui/button";

import { useLocation, useNavigate } from "react-router";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { ClientDetails } from "~/features/client/ClientDetails";
import { clientOperations } from "~/services/client.service";

type DataInDB = ClientsInDb;

export function Clients() {
  const location = useLocation();
  const navigate = useNavigate();
  const { highlight } = location.state || {}; // Destructure with a default empty object for safety

  const { data, error, loading, refetch } = useGetAllClientsQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [dataState, setDataState] = useState<DataInDB[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const allData = data?.allClients || [];

  const handleFilterChange = (filtered: DataInDB[]) => {
    setDataState(filtered);
  };

  const handleCreate = useCallback(() => navigate(`form`), []);

  const handleEdit = useCallback(
    (row: DataInDB) => navigate(`form/${row.ClientID}`),
    []
  );

  const handleDelete = useCallback(
    async (id: string) => {
      if (!confirm("¿Borrar cliente?")) return;
      try {
        await clientOperations.deleteClient(id);
        refetch();
      } catch (err) {
        alert("Error al borrar cliente: " + (err as Error).message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data === "reload-clients") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    if (allData.length > 0 && dataState.length === 0) {
      setDataState(allData);
    }
  }, [allData]);

  const columns = useMemo<ColumnDef<DataInDB>[]>(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "ClientID",
      },
      {
        header: "Name",
        accessorFn: (row) => `${row.FirstName} ${row.LastName}`,
        enableHiding: false,
      },
      {
        header: "Email",
        accessorKey: "Email",
      },
      {
        header: "Phone",
        accessorKey: "Phone",
      },
      {
        header: "Address",
        accessorKey: "Address",
      },
      {
        header: "Doc",
        accessorKey: "DocNumber",
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
        accessorKey: "ClientID",
        cell: ({ row, getValue }) => {
          return (
            <div className="ml-auto flex gap-2 justify-end">
              <TableActionButton
                row={row}
                onEdit={() => handleEdit(row.original)}
                onDelete={() => handleDelete(getValue() as string)}
              />
            </div>
          );
        },
      },
    ],
    [handleDelete, handleEdit]
  );

  const defaultColumnVisibility = {
    Address: false,
    id: false,
  };

  return (
    <>
      <AdminTopBar title="Clientes" quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {allData.length > 0 && (
            <>
              <ShowFilterButton
                onClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
              />
            </>
          )}
          <RefreshButton onClick={() => refetch()} loading={loading} />
          <Button variant="primary" onClick={handleCreate}>
            <Plus strokeWidth={3} />
            <span className="hidden lg:inline">Nuevo Cliente</span>
          </Button>
        </div>
      </AdminTopBar>
      <div className="m-x-auto space-y-4 p-4">
        {/* Filtros */}
        {showFilters && (
          <div className="mb-6">
            <TableFilters
              modelName="clients"
              data={allData}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}

        {/* Error */}
        {error && <ApiErrorMessage error={error} />}

        {loading && <AlertLoading />}

        {/* Estado vacío */}
        {!error && !loading && dataState.length === 0 && (
          <div className="bg-card border rounded-2xl text-center py-12">
            <Users size="48" className="m-auto" />
            <h3 className="mt-2 text-sm font-medium">No hay clientes</h3>
            <p className="mt-1 text-sm ">Comienza creando tu primer cliente.</p>
            <div className="mt-6">
              <Button variant="primary" onClick={handleCreate}>
                <UserRoundPlus /> Crear Primer Cliente
              </Button>
            </div>
          </div>
        )}

        {loading && <AdminTableLoading />}

        {/* Lista de clientes */}
        {!loading && dataState.length > 0 && (
          <>
            <DataTable
              id="clients"
              defaultColumnVisibility={defaultColumnVisibility}
              getRowCanExpand={() => true}
              renderSubComponent={({ row }) => (
                <ClientDetails client={row.original} />
              )}
              columns={columns}
              data={dataState || []}
              highlightValue={highlight}
              highlightKey="ClientID"
            />
          </>
        )}
      </div>
    </>
  );
}
