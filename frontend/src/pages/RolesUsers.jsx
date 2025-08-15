// frontend/src/pages/RolesUsers.jsx
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
import { useGetAllUseraccessQuery } from "~/graphql/_generated/graphql";
import { userAccessOperations } from "~/graphql/operations";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import UserAccessForm from "./UserAccessForm";

export default function RolesUsers() {
  const { data, error, loading, refetch } = useGetAllUseraccessQuery();
  const [records, setRecords] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (filtered) => {
    setRecords(filtered);
  };

  const handleCreate = useCallback(() => {
    openReactWindow(
      (popup) => (
        <UserAccessForm
          onSave={() => {
            popup.opener.postMessage("reload-useraccess", "*");
            popup.close();
          }}
          onClose={() => {
            popup.close();
            refetch();
          }}
        />
      ),
      "Nueva Asignación"
    );
  }, [refetch]);

  const handleEdit = useCallback(
    (record) => {
      console.log("record", record);
      openReactWindow(
        (popup) => (
          <UserAccessForm
            record={record}
            onSave={() => {
              popup.opener.postMessage("reload-useraccess", "*");
              popup.close();
            }}
            onClose={() => {
              popup.close();
              refetch();
            }}
          />
        ),
        "Editar Asignación"
      );
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (record) => {
      if (!confirm("¿Borrar asignación?")) return;
      try {
        await userAccessOperations.delete({
          userID: record.UserID,
          companyID: record.CompanyID,
          branchID: record.BranchID,
          roleID: record.RoleID,
        });
        refetch();
      } catch (err) {
        alert("Error al borrar asignación: " + err.message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-useraccess") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    if (data?.allUseraccess) {
      setRecords(data.allUseraccess);
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
        header: "Usuario",
        accessorKey: "UserData.FullName",
        cell: ({ row, getValue }) => getValue() || row.original.UserID,
      },
      {
        header: "Compañía",
        accessorKey: "CompanyID",
        cell: ({ row, getValue }) =>
          row.original.CompanyData?.Name || getValue(),
      },
      {
        header: "Sucursal",
        accessorKey: "BranchID",
        cell: ({ row, getValue }) =>
          row.original.BranchData?.Name || getValue(),
      },
      {
        header: "Rol",
        accessorKey: "RoleID",
        cell: ({ row, getValue }) =>
          row.original.RoleData?.RoleName || getValue(),
      },
      {
        header: "",
        id: "actions",
        accessorKey: "UserID",
        cell: ({ row }) => (
          <TableActionButton
            onDelete={() => handleDelete(row.original)}
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
        <h1 className="text-3xl font-bold">Roles y Usuarios</h1>
        <div className="flex space-x-2">
          {data && data.allUseraccess.length > 0 && (
            <>
              <InputQuickSearch
                rows={data.allUseraccess}
                onSearch={(rows) => setRecords(rows)}
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
            modelName="useraccess"
            data={data.allUseraccess}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <ApiErrorMessage error={error} />}
      {loading && <AlertLoading />}
      {loading && <AdminTableLoading />}
      {records.length > 0 && <AdminTable columns={columns} data={records} />}
    </div>
  );
}
