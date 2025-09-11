// frontend/src/pages/RolesUsers.jsx
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
        enableHiding: false,
        accessorKey: "UserID",
        cell: ({ row }) => (
          <TableActionButton
            row={row}
            onDelete={() => handleDelete(row.original)}
            onEdit={() => handleEdit(row.original)}
          />
        ),
      },
    ],
    [handleDelete, handleEdit]
  );

  return (
    <section className="section">
      <AdminTopBar title="Roles y Usuarios" quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {data && data.allUseraccess.length > 0 && (
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
              modelName="useraccess"
              data={data.allUseraccess}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}
        {error && <ApiErrorMessage error={error} />}
        {loading && <AlertLoading />}
        {loading && <AdminTableLoading />}
        {records.length > 0 && <DataTable columns={columns} data={records} />}
      </div>
    </section>
  );
}
