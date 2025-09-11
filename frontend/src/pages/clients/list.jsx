import { Plus, UserRoundPlus, Users } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import jsonDAta from "~/graphql/mockups/getAllClients.json";
// import { useGetAllClientsQuery } from "~/graphql/_generated/graphql";
import { clientOperations } from "~/graphql/operations";
import { openReactWindow } from "~/utils/openReactWindow";

import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import {
  AdminTableLoading,
  TableActionButton,
  TableIsActiveCell,
} from "~/components/table/TableExtraComponents";
import TableFilters from "~/components/TableFilters";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { RefreshButton } from "~/components/ui-admin/RefreshButton";
// import { AdminTable } from "~/components/table/AdminTable";
import { DataTable } from "~/components/table/DataTable";
import { Button } from "~/components/ui/button";

import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { ClientDetails } from "~/features/client/ClientDetails";
import { ClientsForm } from "./form";

export function Clients() {
  // const { data, error, loading, refetch } = useGetAllClientsQuery({
  //   notifyOnNetworkStatusChange: true,
  // });
  const data = jsonDAta.data;
  const error = null;
  const loading = false;
  const refetch = () => {};
  const [clients, setClients] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // El filtro ahora opera sobre allClients
  const handleFilterChange = (filteredClients) => {
    setClients(filteredClients);
  };

  const handleCreate = useCallback(() => {
    openReactWindow(
      (popup) => (
        <ClientsForm
          onSave={() => {
            popup.opener.postMessage("reload-clients", "*");
            popup.close();
          }}
          onClose={async () => {
            popup.close();
            refetch();
          }}
        />
      ),
      "Nuevo Cliente"
    );
  }, [refetch]);

  const handleEdit = useCallback(
    (client) => {
      openReactWindow(
        (popup) => (
          <ClientsForm
            client={client}
            onSave={() => {
              popup.opener.postMessage("reload-clients", "*");
              popup.close();
            }}
            onClose={async () => {
              popup.close();
              refetch();
            }}
          />
        ),
        "Editar Cliente"
      );
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("¿Borrar cliente?")) return;
      try {
        await clientOperations.deleteClient(id);
        await refetch();
      } catch (err) {
        alert("Error al borrar cliente: " + err.message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-clients") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    if (data?.allClients) {
      console.log("effect", data.allClients);
      setClients(data.allClients);
    }
  }, [data]);

  const columns = useMemo(
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
                onDelete={() => handleDelete(getValue())}
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
          {data && data.allClients.length > 0 && (
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
              data={data ? data.allClients : []} // ← lista original sin filtrar
              onFilterChange={handleFilterChange}
            />
          </div>
        )}

        {/* Error */}
        {error && <ApiErrorMessage error={error} />}

        {loading && <AlertLoading />}

        {/* Estado vacío */}
        {!error && !loading && clients.length === 0 && (
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

        {/* Lista de clientes */}
        {clients.length > 0 && (
          <>
            <DataTable
              columnGroupName="clients"
              defaultColumnVisibility={defaultColumnVisibility}
              getRowCanExpand={() => true}
              renderSubComponent={({ row }) => (
                <ClientDetails client={row.original} />
              )}
              columns={columns}
              data={clients || []}
              expanded={(row) => {
                <div>{row.id}</div>;
              }}
            />
          </>
        )}
        {loading && <AdminTableLoading />}
      </div>
    </>
  );
}
