// frontend/src/pages/Branches.jsx
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
import { ClientDetails } from "~/features/client/ClientDetails";
import { useGetAllBranchesQuery } from "~/graphql/_generated/graphql";
import { branchOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import BranchCreate from "./BranchCreate";

export default function Branches() {
  const { data, error, loading, refetch } = useGetAllBranchesQuery();
  const [branches, setBranches] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleCreate = () => {
    openReactWindow(
      (popup) => (
        <BranchCreate
          onSave={() => {
            popup.opener.postMessage("reload-branches", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Nueva Sucursal"
    );
  };

  const handleFilterChange = (filtered) => setBranches(filtered);

  const handleEdit = useCallback((br) => {
    openReactWindow(
      (popup) => (
        <BranchCreate
          branch={br}
          onSave={() => {
            popup.opener.postMessage("reload-branches", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Editar Sucursal"
    );
  }, []);

  const handleDelete = useCallback(
    async (id, companyID) => {
      if (!confirm("¿Borrar sucursal?")) return;
      try {
        await branchOperations.deleteBranch(companyID, id);
        refetch();
      } catch (err) {
        alert("Error al borrar sucursal: " + err.message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-branches") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    if (data) {
      setBranches(data.allBranches);
    }
  }, [data, setBranches]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "BranchID",
        className: "first w-3",
      },
      {
        header: "Nombre",
        accessorKey: "Name",
      },
      {
        header: "Empresa ID",
        accessorKey: "CompanyID",
      },
      {
        header: "Empresa",
        accessorKey: "CompanyData.Name",
      },
      {
        header: "Teléfono",
        accessorKey: "Phone",
      },
      {
        header: "",
        id: "actions",
        accessorKey: "ItemCategoryID",
        cell: ({ row }) => (
          <TableActionButton
            row={row}
            onDelete={() => handleDelete(row.BranchID, row.CompanyID)}
            onEdit={() => handleEdit(row)}
          />
        ),
      },
    ],
    [handleDelete, handleEdit]
  );

  return (
    <section className="section">
      <AdminTopBar title="Sucursales" quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {data && data.allBranches.length > 0 && (
            <>
              <ShowFilterButton
                onClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
              />
            </>
          )}
          <RefreshButton onClick={() => refetch()} loading={loading} />
          <CreateButton title="Nueva Sucursal" onClick={handleCreate} />
        </div>
      </AdminTopBar>
      <div className="m-x-auto space-y-4 p-4">
        {showFilters && (
          <div className="mb-6">
            <TableFilters
              modelName="branches"
              data={data ? data.allBranches : []} // ← lista original sin filtrar
              onFilterChange={handleFilterChange}
            />
          </div>
        )}
        {error && <ApiErrorMessage error={error} />}
        {loading && <AlertLoading />}
        {branches.length > 0 && (
          <DataTable
            getRowCanExpand={() => true}
            renderSubComponent={({ row }) => (
              <ClientDetails client={row.original} />
            )}
            columns={columns}
            data={branches || []}
          />
        )}
        {loading && <AdminTableLoading />}
      </div>
    </section>
  );
}
