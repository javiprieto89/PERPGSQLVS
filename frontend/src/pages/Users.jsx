// frontend/src/pages/Users.jsx
import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertLoading } from "~/components/AlertLoading";
import { ApiErrorMessage } from "~/components/ApiErrorMessage";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { RefreshButton } from "~/components/RefreshButton";
import {
  AdminTableLoading,
  TableActionButton,
} from "~/components/TableExtraComponents";
import { AdminTable } from "~/components/TanstackTable";
import { Button } from "~/components/ui/button";
import { useGetAllUsersQuery } from "~/graphql/_generated/graphql";
import { userOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
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
        await userOperations.deleteUser(id);
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
        accessorKey: "UserID",
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
        <h1 className="text-3xl font-bold">Usuarios</h1>
        <div className="flex space-x-2">
          {data && data.allUsers.length > 0 && (
            <>
              <InputQuickSearch
                rows={data.allUsers}
                onSearch={(rows) => setUsers(rows)}
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
            modelName="users"
            data={data?.allUsers || []}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <ApiErrorMessage error={error} />}
      {loading && <AlertLoading />}
      {users.length > 0 && <AdminTable columns={columns} data={users} />}
      {loading && <AdminTableLoading />}
    </div>
  );
}
