// frontend/src/pages/RolesUsers.tsx - Roles and Users Management
import type { ColumnDef } from "@tanstack/react-table";
import { Plus, UserCheck } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

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

import { useGetAllUserPermissionsQuery } from "~/graphql/_generated/graphql";
import { userPermissionsOperations } from "~/services/user.service";

type DataInDB = any; // UserPermissionsInDb has type issues, using any temporarily

export function UserPermissions() {
  const location = useLocation();
  const navigate = useNavigate();
  const { highlight } = location.state || {}; // Destructure with a default empty object for safety

  const { data, error, loading, refetch } = useGetAllUserPermissionsQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [dataState, setDataState] = useState<DataInDB[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const allData = data?.allUserpermissions || [];

  const handleFilterChange = (filtered: DataInDB[]) => {
    setDataState(filtered);
  };

  const handleCreate = useCallback(() => navigate(`form`), [navigate]);

  const handleEdit = useCallback(
    (row: DataInDB) => {
      // Create a composite ID for user access records
      const compositeId = `${row.UserID}-${row.CompanyID}-${row.BranchID}-${row.RoleID}`;
      navigate(`form/${compositeId}`);
    },
    [navigate]
  );

  const handleDelete = useCallback(
    async (record: DataInDB) => {
      if (!confirm("¿Borrar asignación?")) return;
      try {
        await userPermissionsOperations.delete({
          userID: record.UserID,
          companyID: record.CompanyID,
          branchID: record.BranchID,
          roleID: record.RoleID,
        });
        refetch();
      } catch (err) {
        alert("Error al borrar asignación: " + (err as Error).message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data === "reload-useraccess") {
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
          row.original.CompanyData?.CompanyName || getValue(),
      },
      {
        header: "Sucursal",
        accessorKey: "BranchID",
        cell: ({ row, getValue }) =>
          row.original.BranchData?.BranchName || getValue(),
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

  const defaultColumnVisibility = {
    id: false,
  };

  return (
    <>
      <AdminTopBar title="Roles y Usuarios" quickAccessHidden>
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
            <span className="hidden lg:inline">Nueva Asignación</span>
          </Button>
        </div>
      </AdminTopBar>
      <div className="m-x-auto space-y-4 p-4">
        {/* Filtros */}
        {showFilters && (
          <div className="mb-6">
            <TableFilters
              modelName="useraccess"
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
            <UserCheck size="48" className="m-auto" />
            <h3 className="mt-2 text-sm font-medium">No hay asignaciones de roles</h3>
            <p className="mt-1 text-sm">Comienza creando tu primera asignación de rol.</p>
            <div className="mt-6">
              <Button variant="primary" onClick={handleCreate}>
                <UserCheck /> Crear Primera Asignación
              </Button>
            </div>
          </div>
        )}

        {loading && <AdminTableLoading />}

        {/* Lista de asignaciones */}
        {!loading && dataState.length > 0 && (
          <>
            <DataTable
              id="rolesusers"
              defaultColumnVisibility={defaultColumnVisibility}
              columns={columns}
              data={dataState || []}
              highlightValue={highlight}
              highlightKey="UserID"
            />
          </>
        )}
      </div>
    </>
  );
}
