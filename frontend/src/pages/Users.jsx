// frontend/src/pages/Users.jsx
import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { DataTable } from "~/components/table/DataTable";
import {
  AdminTableLoading,
  TableActionButton,
} from "~/components/table/TableExtraComponents";
import TableFilters from "~/components/TableFilters";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { RefreshButton } from "~/components/ui-admin/RefreshButton";
import { Button } from "~/components/ui/button";
import { useGetAllUsersQuery } from "~/graphql/_generated/graphql";
import { userService } from "~/services/user.service";
import { openReactWindow } from "~/utils/openReactWindow";
import UserForm from "./UserForm";

export default function Users() {
  const { data, error, loading, refetch } = useGetAllUsersQuery();
  const [users, setUsers] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-users") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  const handleFilterChange = (filtered) => {
    setUsers(filtered);
  };

  const handleCreate = useCallback(() => {
    openReactWindow(
      (popup) => (
        <UserForm
          onSave={() => {
            popup.opener.postMessage("reload-users", "*");
            popup.close();
          }}
          onClose={() => {
            popup.close();
            refetch();
          }}
        />
      ),
      "Nuevo Usuario"
    );
  }, [refetch]);

  const handleEdit = useCallback(
    (user) => {
      openReactWindow(
        (popup) => (
          <UserForm
            user={user}
            onSave={() => {
              popup.opener.postMessage("reload-users", "*");
              popup.close();
            }}
            onClose={() => {
              popup.close();
              refetch();
            }}
          />
        ),
        "Editar Usuario"
      );
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("¿Borrar usuario?")) return;
      try {
        await userService.deleteUser(id);
        refetch();
      } catch (err) {
        alert("Error al borrar usuario: " + err.message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    if (data?.allUsers) {
      setUsers(data.allUsers);
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "UserID",
        className: "first w-3",
      },
      {
        header: "Nombre",
        accessorKey: "FullName",
      },
      {
        header: "Nickname",
        accessorKey: "Nickname",
      },
      {
        header: "",
        id: "actions",
        enableHiding: false,
        accessorKey: "UserID",
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
      <AdminTopBar title="Usuarios" quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {data && data.allUsers.length > 0 && (
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
            Nuevo
          </Button>
        </div>
      </AdminTopBar>
      <div className="m-x-auto space-y-4 p-4">
        {showFilters && (
          <div className="mb-6">
            <TableFilters
              modelName="users"
              data={data?.allUsers || []}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}
        {error && <ApiErrorMessage error={error} />}
        {loading && <AlertLoading />}
        {users.length > 0 && <DataTable columns={columns} data={users} />}
        {loading && <AdminTableLoading />}
      </div>
    </section>
  );
}
