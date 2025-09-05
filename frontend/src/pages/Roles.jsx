// frontend/src/pages/Roles.jsx
import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { RefreshButton } from "~/components/RefreshButton";
import { AdminTable } from "~/components/table/AdminTable";
import {
  AdminTableLoading,
  TableActionButton,
} from "~/components/TableExtraComponents";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { Button } from "~/components/ui/button";
import { useGetAllRolesQuery } from "~/graphql/_generated/graphql";
import { roleOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import RoleForm from "./RoleForm";

export default function Roles() {
  const { data, error, loading, refetch } = useGetAllRolesQuery();
  const [roles, setRoles] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-roles") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  const handleFilterChange = (filtered) => {
    setRoles(filtered);
  };

  const handleCreate = useCallback(() => {
    openReactWindow(
      (popup) => (
        <RoleForm
          onSave={() => {
            popup.opener.postMessage("reload-roles", "*");
            popup.close();
          }}
          onClose={() => {
            popup.close();
            refetch();
          }}
        />
      ),
      "Nuevo Rol"
    );
  }, [refetch]);

  const handleEdit = useCallback(
    (role) => {
      openReactWindow(
        (popup) => (
          <RoleForm
            role={role}
            onSave={() => {
              popup.opener.postMessage("reload-roles", "*");
              popup.close();
            }}
            onClose={() => {
              popup.close();
              refetch();
            }}
          />
        ),
        "Editar Rol"
      );
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("¿Borrar rol?")) return;
      try {
        await roleOperations.deleteRole(id);
        refetch();
      } catch (err) {
        alert("Error al borrar rol: " + err.message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    if (data?.allRoles) {
      setRoles(data.allRoles);
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "RoleID",
        className: "first w-3",
      },
      {
        header: "Nombre",
        accessorKey: "RoleName",
      },
      {
        header: "",
        id: "actions",
        accessorKey: "RoleID",
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
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Roles</h1>
        <div className="flex space-x-2">
          {data && data.allRoles.length > 0 && (
            <>
              <InputQuickSearch
                rows={data.allRoles}
                onSearch={(rows) => setRoles(rows)}
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
            modelName="roles"
            data={data.allRoles}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <ApiErrorMessage error={error} />}
      {loading && <AlertLoading />}
      {loading && <AdminTableLoading />}
      {roles.length > 0 && <AdminTable columns={columns} data={roles} />}
    </div>
  );
}
