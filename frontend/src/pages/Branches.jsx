// frontend/src/pages/Branches.jsx
import { Plus, RefreshCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { AdminTable } from "~/components/table/AdminTable";
import {
  AdminTableLoading,
  TableActionButton,
} from "~/components/TableExtraComponents";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { Button } from "~/components/ui/button";
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

  const handleRefetch = async () => {
    await refetch();
  };

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
            onDelete={() => handleDelete(row.BranchID, row.CompanyID)}
            onEdit={() => handleEdit(row)}
          />
        ),
      },
    ],
    [handleDelete, handleEdit]
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Sucursales</h1>
        <div className="flex space-x-2">
          {data && data.allBranches.length > 0 && (
            <>
              <InputQuickSearch
                rows={data.allBranches}
                onSearch={(rows) => setBranches(rows)}
              />
              <ShowFilterButton
                onClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
              />
            </>
          )}
          <Button onClick={handleRefetch}>
            <RefreshCcw />
            Recargar
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            <Plus strokeWidth={3} />
            Nueva Sucursal
          </Button>
        </div>
      </div>
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
        <AdminTable
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
  );
}
