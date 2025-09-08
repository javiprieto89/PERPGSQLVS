import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { RefreshButton } from "~/components/RefreshButton";
import { AdminTable } from "~/components/table/AdminTable";
import {
  AdminTableLoading,
  TableActionButton,
} from "~/components/table/TableExtraComponents";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { Button } from "~/components/ui/button";
import { useGetAllCreditCardGroupsQuery } from "~/graphql/_generated/graphql";
import { creditCardGroupOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import CreditCardGroupCreate from "./CreditCardGroupCreate";

export default function CreditCardGroups() {
  const { data, error, loading, refetch } = useGetAllCreditCardGroupsQuery();
  const [groups, setGroups] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleCreate = useCallback(() => {
    openReactWindow(
      (popup) => (
        <CreditCardGroupCreate
          onSave={() => {
            popup.opener.postMessage("reload-cardgroups", "*");
            popup.close();
          }}
          onClose={() => {
            popup.close();
            refetch();
          }}
        />
      ),
      "Nuevo Grupo"
    );
  }, [refetch]);

  const handleFilterChange = (filtered) => {
    setGroups(filtered);
  };

  const handleEdit = useCallback(
    (group) => {
      openReactWindow(
        (popup) => (
          <CreditCardGroupCreate
            group={group}
            onSave={() => {
              popup.opener.postMessage("reload-cardgroups", "*");
              popup.close();
            }}
            onClose={() => {
              popup.close();
              refetch();
            }}
          />
        ),
        "Editar Grupo"
      );
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("¿Borrar grupo?")) return;
      try {
        await creditCardGroupOperations.deleteGroup(id);
        refetch();
      } catch (err) {
        alert("Error al borrar grupo: " + err.message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-cardgroups") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    if (data?.allCreditcardgroups) {
      setGroups(data.allCreditcardgroups);
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "CreditCardGroupID",
        className: "first w-3",
      },
      {
        header: "Nombre",
        accessorKey: "GroupName",
      },
      {
        header: "",
        id: "actions",
        accessorKey: "CreditCardGroupID",
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
          Grupos de Tarjetas
        </h1>
        <div className="flex space-x-2">
          {data && data.allCreditcardgroups.length > 0 && (
            <>
              <InputQuickSearch
                rows={data.allCreditcardgroups}
                onSearch={(rows) => setGroups(rows)}
              />
              <ShowFilterButton
                onClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
              />
            </>
          )}
          <RefreshButton onClick={() => refetch()} loading={loading} />
          <Button variant="primary" onClick={handleCreate}>
            <Plus strokeWidth={3} /> Nuevo
          </Button>
        </div>
      </div>
      {showFilters && (
        <div className="mb-6">
          <TableFilters
            modelName="creditcardgroups"
            data={data.allCreditcardgroups}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <ApiErrorMessage error={error} />}
      {loading && <AlertLoading />}
      {groups.length > 0 && <AdminTable columns={columns} data={groups} />}
      {loading && <AdminTableLoading />}
    </div>
  );
}
