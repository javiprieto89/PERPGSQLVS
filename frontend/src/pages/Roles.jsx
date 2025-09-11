// frontend/src/pages/Roles.jsx
import { useCallback, useEffect, useMemo, useState } from "react";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { DataTable } from "~/components/table/DataTable";
import {
  AdminTableLoading,
  TableActionButton,
} from "~/components/table/TableExtraComponents";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { CreateButton } from "~/components/ui-admin/CreateButton";
import { RefreshButton } from "~/components/ui-admin/RefreshButton";
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
        enableHiding: false,
        accessorKey: "RoleID",
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
      <AdminTopBar title="Roles" quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {data && data.allRoles.length > 0 && (
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
              modelName="roles"
              data={data.allRoles}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}
        {error && <ApiErrorMessage error={error} />}
        {loading && <AlertLoading />}
        {loading && <AdminTableLoading />}
        {roles.length > 0 && <DataTable columns={columns} data={roles} />}
      </div>
    </section>
  );
}
