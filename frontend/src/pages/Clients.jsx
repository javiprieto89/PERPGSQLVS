import { Eye, Pencil, UserRoundPlus, Users } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useGetAllClientsQuery } from "~/graphql/_generated/graphql";
import { clientOperations } from "~/graphql/operations";
import { openReactWindow } from "../utils/openReactWindow";

import { ApiErrorMessage } from "~/components/ApiErrorMessage";
import { ClientDetails } from "~/components/client/ClientDetails";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import {
  AdminTableLoading,
  TableIsActiveCell,
} from "~/components/TableExtraComponents";
import TableFilters from "~/components/TableFilters";
import { AdminTable } from "~/components/TanstackTable";
import { Button } from "~/components/ui/button";

import { AlertLoading } from "~/components/AlertLoading";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { RefreshButton } from "~/components/RefreshButton";
import { TableActionDropdown } from "~/components/TableExtraComponents";
import ClientCreate from "./ClientCreate";

export default function Clients() {
  const { data, error, loading, refetch } = useGetAllClientsQuery();
  const [clients, setClients] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // El filtro ahora opera sobre allClients
  const handleFilterChange = (filteredClients) => {
    setClients(filteredClients);
  };

  const handleCreate = useCallback(() => {
    openReactWindow(
      (popup) => (
        <ClientCreate
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
          <ClientCreate
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
        accessorKey: "ClientID",
        cell: ({ row, getValue }) => {
          return (
            <div className="flex gap-2">
              {row.getCanExpand() && (
                <Button
                  variant={row.getIsExpanded() ? "primary" : "outline"}
                  onClick={row.getToggleExpandedHandler()}
                >
                  <Eye />
                </Button>
              )}
              <Button
                onClick={() => handleEdit(row.original)}
                className="hidden md:inline px-3 py-2 text-sm rounded"
              >
                <Pencil />
              </Button>
              <TableActionDropdown onDelete={() => handleDelete(getValue())} />
            </div>
          );
        },
      },
    ],
    [handleDelete, handleEdit]
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <div className="flex space-x-2">
          {data && data.allClients.length > 0 && (
            <>
              <InputQuickSearch
                rows={data.allClients}
                onSearch={(rows) => setClients(rows)}
              />
              <ShowFilterButton
                onClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
              />
            </>
          )}
          <RefreshButton onClick={() => refetch()} loading={loading} />
          <Button variant="primary" onClick={handleCreate}>
            <UserRoundPlus />
            Nuevo Cliente
          </Button>
        </div>
      </div>

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
          <AdminTable
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
          <div className="mb-4 flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              Mostrando {clients.length} cliente
              {clients.length !== 1 ? "s" : ""}
            </p>
          </div>
        </>
      )}
      {loading && <AdminTableLoading />}
    </div>
  );
}
